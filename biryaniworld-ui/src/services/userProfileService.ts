import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface UserProfile {
  customerId: number;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  preferences?: {
    dietaryRestrictions?: string[];
    favoriteItems?: number[];
    notificationPreferences?: {
      email: boolean;
      sms: boolean;
    };
  };
}

export interface UpdateProfileRequest {
  name?: string;
  phoneNumber?: string;
  address?: string;
  preferences?: {
    dietaryRestrictions?: string[];
    favoriteItems?: number[];
    notificationPreferences?: {
      email: boolean;
      sms: boolean;
    };
  };
}

class UserProfileService {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await axios.get(`${API_URL}/user/profile`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    try {
      const response = await axios.put(`${API_URL}/user/profile`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await axios.put(`${API_URL}/user/password`, {
        currentPassword,
        newPassword,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update password');
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await axios.delete(`${API_URL}/user/account`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  }
}

export const userProfileService = new UserProfileService(); 