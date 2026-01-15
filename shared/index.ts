export interface User {
  id: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
