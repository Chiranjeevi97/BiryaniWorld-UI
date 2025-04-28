import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

class PasswordResetService {
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/password-reset-request`, data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to request password reset');
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }

  async validateResetToken(token: string): Promise<boolean> {
    try {
      await axios.get(`${API_URL}/auth/validate-reset-token/${token}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const passwordResetService = new PasswordResetService(); 