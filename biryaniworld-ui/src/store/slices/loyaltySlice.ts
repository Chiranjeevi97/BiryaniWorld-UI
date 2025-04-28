import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loyaltyAPI } from '../../services/api';
import { LoyaltyProgram } from '../../types';

interface LoyaltyState {
  loyaltyProgram: LoyaltyProgram | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoyaltyState = {
  loyaltyProgram: null,
  loading: false,
  error: null,
};

export const fetchLoyaltyDashboard = createAsyncThunk(
  'loyalty/fetchDashboard',
  async () => {
    const response = await loyaltyAPI.getLoyaltyDashboard();
    return response.data;
  }
);

export const subscribeToPlan = createAsyncThunk(
  'loyalty/subscribe',
  async (planId: number) => {
    const response = await loyaltyAPI.subscribeToPlan(planId);
    return response.data;
  }
);

export const toggleAutoRenew = createAsyncThunk(
  'loyalty/toggleAutoRenew',
  async () => {
    await loyaltyAPI.toggleAutoRenew();
    return null;
  }
);

export const cancelSubscription = createAsyncThunk(
  'loyalty/cancelSubscription',
  async () => {
    await loyaltyAPI.cancelSubscription();
    return null;
  }
);

const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoyaltyDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoyaltyDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.loyaltyProgram = action.payload;
      })
      .addCase(fetchLoyaltyDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch loyalty dashboard';
      })
      .addCase(subscribeToPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.loyaltyProgram = action.payload;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to subscribe to plan';
      })
      .addCase(toggleAutoRenew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAutoRenew.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleAutoRenew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to toggle auto-renew';
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel subscription';
      });
  },
});

export const { clearError } = loyaltySlice.actions;
export default loyaltySlice.reducer; 