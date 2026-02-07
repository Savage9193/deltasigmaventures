export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In real app, this should be hashed
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface AuthResponse {
  customer: Omit<Customer, 'password'>;
  token: string;
}

export interface AuthState {
  customer: Omit<Customer, 'password'> | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
