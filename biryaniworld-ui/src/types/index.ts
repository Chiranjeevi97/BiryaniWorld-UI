export interface User {
  customerId: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface Order {
  id: number;
  customerId: number;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  menuItemId: number;
  quantity: number;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export * from './order';
export * from './reservation';
export * from './loyalty';
export * from './campaign';
export * from './menu'; 