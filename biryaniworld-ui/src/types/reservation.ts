export interface Reservation {
  id: number;
  tableNumber: number;
  numberOfGuests: number;
  reservationDateTime: string;
  status: string;
  specialRequests?: string;
  customerId: number;
  customerName: string;
}

export interface ReservationRequest {
  reservationId?: number;
  tableNumber: number;
  numberOfGuests: number;
  reservationDateTime: string;
  specialRequests?: string;
  requestType?: string;
} 