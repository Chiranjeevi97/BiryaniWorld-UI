import api from './api';
import { Reservation, ReservationRequest } from '../types/reservation';

export const reservationService = {
  createReservation: async (request: ReservationRequest): Promise<Reservation> => {
    const response = await api.post('/api/reservations', request);
    return response.data;
  },

  getAllReservations: async (): Promise<Reservation[]> => {
    const response = await api.get('/api/reservations');
    return response.data;
  },

  getReservationById: async (id: number): Promise<Reservation> => {
    const response = await api.get(`/api/reservations/${id}`);
    return response.data;
  },

  requestReservationUpdate: async (request: ReservationRequest): Promise<Reservation> => {
    const response = await api.put('/api/reservations/request-update', request);
    return response.data;
  },

  requestReservationCancellation: async (id: number): Promise<Reservation> => {
    const response = await api.put(`/api/reservations/${id}/request-cancellation`);
    return response.data;
  },

  getReservationsByDateRange: async (fromDate: string, toDate: string): Promise<Reservation[]> => {
    const response = await api.get('/api/reservations/admin/date-range', {
      params: { fromDate, toDate }
    });
    return response.data;
  }
}; 