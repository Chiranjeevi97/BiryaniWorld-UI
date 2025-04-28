import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const { reservations } = useSelector((state: RootState) => state.reservations);
  const { loyaltyProgram } = useSelector((state: RootState) => state.loyalty);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id}>
                  <Typography>Order #{order.id}</Typography>
                  <Typography>Status: {order.status}</Typography>
                  <Typography>Total: ${order.totalAmount}</Typography>
                </div>
              ))
            ) : (
              <Typography>No recent orders</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Reservations
            </Typography>
            {reservations && reservations.length > 0 ? (
              reservations.map((reservation) => (
                <div key={reservation.id}>
                  <Typography>Table: {reservation.tableNumber}</Typography>
                  <Typography>Date & Time: {new Date(reservation.reservationDateTime).toLocaleString()}</Typography>
                  <Typography>Guests: {reservation.numberOfGuests}</Typography>
                  <Typography>Status: {reservation.status}</Typography>
                </div>
              ))
            ) : (
              <Typography>No recent reservations</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loyalty Program
            </Typography>
            {loyaltyProgram ? (
              <>
                <Typography>Tier: {loyaltyProgram.tier}</Typography>
                <Typography>Points: {loyaltyProgram.points}</Typography>
                <Typography>Benefits: {loyaltyProgram.benefits.join(', ')}</Typography>
              </>
            ) : (
              <Typography>No active loyalty program</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 