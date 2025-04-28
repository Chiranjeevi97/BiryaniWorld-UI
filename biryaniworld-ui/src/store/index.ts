import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import reservationReducer from './slices/reservationSlice';
import loyaltyReducer from './slices/loyaltySlice';
import campaignReducer from './slices/campaignSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    reservations: reservationReducer,
    loyalty: loyaltyReducer,
    campaigns: campaignReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Add type definitions for the store state
export interface StoreState {
  auth: {
    user: {
      id: number;
      username: string;
      email: string;
      roles: string[];
    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  };
  orders: {
    orders: Array<{
      orderId: number;
      customerId: number;
      status: string;
      totalAmount: number;
      orderItems: Array<{
        itemId: number;
        itemName: string;
        description: string;
        quantity: number;
        price: number;
        itemQuantity: string;
        seasonal: boolean;
      }>;
      createdAt: string;
      note?: string;
      location?: string;
    }>;
    currentOrder: any | null;
    loading: boolean;
    error: string | null;
  };
  reservations: {
    reservations: Array<{
      id: number;
      customerId: number;
      date: string;
      time: string;
      partySize: number;
      status: string;
    }>;
    currentReservation: any | null;
    loading: boolean;
    error: string | null;
  };
  loyalty: {
    loyaltyProgram: {
      id: number;
      customerId: number;
      points: number;
      tier: string;
      benefits: string[];
      autoRenew: boolean;
      expiryDate: string;
    } | null;
    loading: boolean;
    error: string | null;
  };
  campaigns: {
    campaigns: Array<{
      id: number;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      status: string;
      targetAudience: string;
      discountType: string;
      discountValue: number;
      minimumPurchase?: number;
      maxRedemptions?: number;
      termsAndConditions: string[];
    }>;
    currentCampaign: any | null;
    loading: boolean;
    error: string | null;
  };
  menu: {
    menu: Array<{
      id: number;
      name: string;
      description: string;
      price: number;
      image?: string;
      category: string;
      isAvailable: boolean;
      isVegetarian: boolean;
      isSpicy: boolean;
      preparationTime: number;
      calories?: number;
      allergens?: string[];
    }>;
    loading: boolean;
    error: string | null;
  };
} 