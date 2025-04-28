import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';
import { LoginRequest, RegisterRequest, User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string; user: User },
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to login');
  }
});

export const register = createAsyncThunk<
  { token: string; user: User },
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authAPI.register(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to register');
  }
});

export const getCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getCurrentUser();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get current user');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to get current user';
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer; 