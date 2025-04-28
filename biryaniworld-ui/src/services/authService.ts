import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  customerId: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: {
    customerId: number;
    name: string;
    email: string;
  };
}

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      const { token, user } = response.data;
      this.setToken(token);
      return { token, user };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      const { token, user } = response.data;
      this.setToken(token);
      return { token, user };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  }

  async validateToken(): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}/auth/validate`);
      return response.data;
    } catch (error: any) {
      this.logout();
      throw new Error('Invalid token');
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = new AuthService(); 