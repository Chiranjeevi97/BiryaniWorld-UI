import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../../services/api';
import { Order } from '../../types/order';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => {
    const response = await orderAPI.getOrders();
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: {
    items: Array<{
      itemId: number;
      quantity: number;
      price: number;
    }>;
    orderStatus?: string;
    orderFullFilled?: boolean;
    totalAmount?: number;
  }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.createOrder(orderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create order'
      );
    }
  }
);

export const requestOrderCancellation = createAsyncThunk(
  'orders/requestCancellation',
  async ({ orderId, reason }: { orderId: number; reason: string }) => {
    const response = await orderAPI.requestCancellation(orderId, reason);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(requestOrderCancellation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOrderCancellation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(requestOrderCancellation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request cancellation';
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer; 