import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuItem } from '../../types/menu';
import { mockMenuItems } from '../../mocks/menuData';

interface MenuState {
  menu: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menu: [],
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (location: string, { rejectWithValue }) => {
    try {
      // For development, use mock data
      if (process.env.NODE_ENV === 'development') {
        return mockMenuItems;
      }

      const response = await fetch(`/api/menu?location=${location}`);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to fetch menu');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: Expected JSON');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch menu');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch menu';
      });
  },
});

export default menuSlice.reducer; 