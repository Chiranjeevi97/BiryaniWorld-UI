import axios from 'axios';
import { LoginRequest, RegisterRequest } from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (data: LoginRequest) => api.post('/auth/signin', data),
  register: (data: RegisterRequest) => api.post('/auth/signup', data),
  getCurrentUser: () => api.get('/users/me'),
};

// Menu APIs
export const menuAPI = {
  getMenu: (location: string = 'default') => api.get(`/menu/${location}`),
  getMenuItem: (menuId: number, location: string = 'default') => api.get(`/menu/${menuId}/${location}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (data: {
    items: Array<{
      itemId: number;
      quantity: number;
      price: number;
    }>;
    orderStatus?: string;
    orderFullFilled?: boolean;
    totalAmount?: number;
  }) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrderById: (id: number) => api.get(`/orders/${id}`),
  requestCancellation: (orderId: number, reason: string) => 
    api.put(`/orders/${orderId}/cancel`, { reason }),
};

// Reservation APIs
export const reservationAPI = {
  createReservation: (data: any) => api.post('/reservations', data),
  getReservations: () => api.get('/reservations'),
  getReservationById: (id: number) => api.get(`/reservations/${id}`),
};

// Loyalty APIs
export const loyaltyAPI = {
  getLoyaltyDashboard: () => api.get('/loyalty/dashboard'),
  subscribeToPlan: (planId: number) => api.post(`/loyalty/subscribe/${planId}`),
  toggleAutoRenew: () => api.put('/loyalty/auto-renew'),
  cancelSubscription: () => api.delete('/loyalty/subscription'),
};

// Campaign APIs
export const campaignAPI = {
  getCampaigns: () => api.get('/admin/campaigns'),
  getCampaignById: (id: number) => api.get(`/admin/campaigns/${id}`),
  createCampaign: (data: any) => api.post('/admin/campaigns', data),
  updateCampaign: (id: number, data: any) => api.put(`/admin/campaigns/${id}`, data),
  deleteCampaign: (id: number) => api.delete(`/admin/campaigns/${id}`),
};

export default api; 