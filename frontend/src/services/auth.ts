import { apiClient } from './api';

export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  full_name: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: string;
}

export interface UserResponse {
  id: number;
  email: string;
  phone: string;
  full_name: string;
  role: string;
  is_verified: boolean;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user_role', response.role);
    return response;
  }

  async register(userData: RegisterRequest): Promise<UserResponse> {
    return apiClient.post<UserResponse>('/auth/register', userData);
  }

  async sendOTP(phone: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/otp/send', { phone });
  }

  async verifyOTP(phone: string, otp: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/otp/verify', { phone, otp });
  }

  async getCurrentUser(): Promise<UserResponse> {
    return apiClient.get<UserResponse>('/users/me');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

export const authService = new AuthService();