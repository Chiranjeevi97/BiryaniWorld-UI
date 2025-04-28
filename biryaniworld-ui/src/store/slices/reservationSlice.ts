import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Reservation, ReservationRequest } from '../../types/reservation';
import { reservationService } from '../../services/reservationService';

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchAll',
  async () => {
    const response = await reservationService.getAllReservations();
    return response;
  }
);

export const createReservation = createAsyncThunk(
  'reservations/create',
  async (request: ReservationRequest) => {
    const response = await reservationService.createReservation(request);
    return response;
  }
);

export const requestReservationUpdate = createAsyncThunk(
  'reservations/requestUpdate',
  async (request: ReservationRequest) => {
    const response = await reservationService.requestReservationUpdate(request);
    return response;
  }
);

export const requestReservationCancellation = createAsyncThunk(
  'reservations/requestCancellation',
  async (id: number) => {
    const response = await reservationService.requestReservationCancellation(id);
    return response;
  }
);

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reservations';
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create reservation';
      })
      .addCase(requestReservationUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestReservationUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(requestReservationUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request reservation update';
      })
      .addCase(requestReservationCancellation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestReservationCancellation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reservations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(requestReservationCancellation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to request reservation cancellation';
      });
  },
});

export default reservationSlice.reducer; 