import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { RootState, AppDispatch } from '../store';
import { fetchReservations, createReservation, requestReservationUpdate, requestReservationCancellation } from '../store/slices/reservationSlice';
import { Reservation, ReservationRequest } from '../types/reservation';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
}

const Reservations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reservations, loading } = useSelector((state: RootState) => state.reservations as ReservationState);
  const [openDialog, setOpenDialog] = useState(false);
  const [newReservation, setNewReservation] = useState<ReservationRequest>({
    tableNumber: 1,
    numberOfGuests: 2,
    reservationDateTime: '',
    specialRequests: '',
  });

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleCreateReservation = async () => {
    try {
      await dispatch(createReservation(newReservation)).unwrap();
      setOpenDialog(false);
      setNewReservation({
        tableNumber: 1,
        numberOfGuests: 2,
        reservationDateTime: '',
        specialRequests: '',
      });
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  };

  const handleUpdateRequest = async (id: number) => {
    try {
      const reservation = reservations.find(r => r.id === id);
      if (reservation) {
        await dispatch(requestReservationUpdate({
          reservationId: id,
          tableNumber: reservation.tableNumber,
          numberOfGuests: reservation.numberOfGuests,
          reservationDateTime: reservation.reservationDateTime,
          specialRequests: reservation.specialRequests,
          requestType: 'UPDATE'
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to request update:', error);
    }
  };

  const handleCancellationRequest = async (id: number) => {
    try {
      await dispatch(requestReservationCancellation(id)).unwrap();
    } catch (error) {
      console.error('Failed to request cancellation:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({
      ...prev,
      [name]: name === 'tableNumber' || name === 'numberOfGuests' ? parseInt(value, 10) : value,
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Reservations</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          New Reservation
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Table Number</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Special Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations?.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>#{reservation.id}</TableCell>
                <TableCell>{reservation.tableNumber}</TableCell>
                <TableCell>
                  {new Date(reservation.reservationDateTime).toLocaleString()}
                </TableCell>
                <TableCell>{reservation.numberOfGuests}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.specialRequests || '-'}</TableCell>
                <TableCell>
                  <Tooltip title="Request Update">
                    <IconButton onClick={() => handleUpdateRequest(reservation.id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Request Cancellation">
                    <IconButton onClick={() => handleCancellationRequest(reservation.id)}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Reservation</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="tableNumber"
                  label="Table Number"
                  type="number"
                  fullWidth
                  value={newReservation.tableNumber}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="reservationDateTime"
                  label="Date & Time"
                  type="datetime-local"
                  fullWidth
                  value={newReservation.reservationDateTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="numberOfGuests"
                  label="Number of Guests"
                  type="number"
                  fullWidth
                  value={newReservation.numberOfGuests}
                  onChange={handleChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="specialRequests"
                  label="Special Requests"
                  multiline
                  rows={3}
                  fullWidth
                  value={newReservation.specialRequests}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateReservation} variant="contained">
            Create Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Reservations; 