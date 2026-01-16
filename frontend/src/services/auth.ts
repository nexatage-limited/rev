import { LoginData, RegisterData, AuthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const MOCK_MODE = !process.env.NEXT_PUBLIC_API_URL;

// Mock delay for development
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

export const authService = {
  async login(loginData: LoginData): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      return {
        role: loginData.email?.includes('admin') ? 'admin' : 'user',
        access_token: 'mock-token-123',
        token_type: 'bearer'
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Login failed');
    }
    
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    return {
      role: data.role,
      access_token: data.access_token,
      token_type: data.token_type
    };
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      return {
        role: userData.role || 'user',
        id: 1,
        email: userData.email,
        phone: userData.phone,
        full_name: userData.full_name,
        is_verified: false
      };
    }

    try {
      console.log('Sending registration data:', userData);
      console.log('API URL:', `${API_BASE_URL}/auth/register`);
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          console.log('Error response:', errorData);
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          console.log('Could not parse error response');
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      
      return {
        role: data.role,
        id: data.id,
        email: data.email,
        phone: data.phone,
        full_name: data.full_name,
        is_verified: data.is_verified
      };
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the backend server on port 8000.');
      }
      throw error;
    }
  },

  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      return {
        role: 'user',
        access_token: 'mock-token-123',
        token_type: 'bearer'
      };
    }

    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });
    
    if (!response.ok) {
      throw new Error('OTP verification failed');
    }
    
    return response.json();
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  }
};
