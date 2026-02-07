import axios from 'axios';
import { Customer, LoginRequest, SignupRequest, AuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Get all customers to find the matching one
      const response = await api.get<Customer[]>('/customers');
      const customers = response.data;
      
      // Find customer by email and password
      const customer = customers.find(
        (c) => c.email === credentials.email && c.password === credentials.password
      );
      
      if (!customer) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password from response
      const { password, ...customerWithoutPassword } = customer;
      
      // Generate a simple token (in real app, use JWT)
      const token = btoa(`${customer.id}:${customer.email}:${Date.now()}`);
      
      return {
        customer: customerWithoutPassword,
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      // Check if customer already exists
      const existingCustomers = await api.get<Customer[]>('/customers');
      const customerExists = existingCustomers.data.some(
        (c) => c.email === userData.email
      );
      
      if (customerExists) {
        throw new Error('Customer with this email already exists');
      }
      
      // Create new customer
      const newCustomer = {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const response = await api.post<Customer>('/customers', newCustomer);
      const customer = response.data;
      
      // Remove password from response
      const { password, ...customerWithoutPassword } = customer;
      
      // Generate a simple token
      const token = btoa(`${customer.id}:${customer.email}:${Date.now()}`);
      
      return {
        customer: customerWithoutPassword,
        token,
      };
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error && error.message.includes('already exists')) {
        throw error;
      }
      throw new Error('Signup failed');
    }
  },

  async getProfile(token: string): Promise<Omit<Customer, 'password'>> {
    try {
      // Decode token to get customer ID
      const decoded = atob(token);
      const customerId = parseInt(decoded.split(':')[0]);
      
      const response = await api.get<Customer>(`/customers/${customerId}`);
      const customer = response.data;
      
      // Remove password from response
      const { password, ...customerWithoutPassword } = customer;
      
      return customerWithoutPassword;
    } catch (error) {
      console.error('Get profile error:', error);
      throw new Error('Failed to get profile');
    }
  },

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeToken(): void {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Simple token validation (in real app, validate JWT)
      const decoded = atob(token);
      const timestamp = parseInt(decoded.split(':')[2]);
      const now = Date.now();
      
      // Token expires after 24 hours
      return now - timestamp < 24 * 60 * 60 * 1000;
    } catch {
      return false;
    }
  },
};
