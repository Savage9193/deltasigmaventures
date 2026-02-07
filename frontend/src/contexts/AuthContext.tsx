import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authService } from '../api/authService';
import { AuthState, LoginRequest, SignupRequest } from '../types/auth';

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { customer: any; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  customer: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        customer: action.payload.customer,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        customer: null,
        token: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        customer: null,
        token: null,
        isAuthenticated: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initAuth = async () => {
      const token = authService.getToken();
      if (token && authService.isAuthenticated()) {
        try {
          dispatch({ type: 'AUTH_START' });
          const customer = await authService.getProfile(token);
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { customer, token },
          });
        } catch (error) {
          authService.removeToken();
          dispatch({
            type: 'AUTH_FAILURE',
            payload: 'Session expired. Please login again.',
          });
        }
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      
      // Store token
      authService.setToken(response.token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          customer: response.customer,
          token: response.token,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({
        type: 'AUTH_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  };

  const signup = async (userData: SignupRequest): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.signup(userData);
      
      // Store token
      authService.setToken(response.token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          customer: response.customer,
          token: response.token,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      dispatch({
        type: 'AUTH_FAILURE',
        payload: errorMessage,
      });
      throw error;
    }
  };

  const logout = (): void => {
    authService.removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
