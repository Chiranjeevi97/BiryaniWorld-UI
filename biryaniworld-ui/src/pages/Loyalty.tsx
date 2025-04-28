import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { RootState, AppDispatch, StoreState } from '../store';
import { fetchLoyaltyDashboard, toggleAutoRenew, cancelSubscription } from '../store/slices/loyaltySlice';

const Loyalty: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loyaltyProgram, loading } = useSelector((state: RootState) => state.loyalty as StoreState['loyalty']);

  useEffect(() => {
    dispatch(fetchLoyaltyDashboard());
  }, [dispatch]);

  const handleToggleAutoRenew = () => {
    dispatch(toggleAutoRenew());
  };

  const handleCancelSubscription = () => {
    dispatch(cancelSubscription());
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
      <Typography variant="h4" gutterBottom>
        Loyalty Program
      </Typography>

      {loyaltyProgram && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Status
                </Typography>
                <Typography variant="body1">
                  Points: {loyaltyProgram.points}
                </Typography>
                <Typography variant="body1">
                  Tier: {loyaltyProgram.tier}
                </Typography>
                <Typography variant="body1">
                  Expiry Date: {new Date(loyaltyProgram.expiryDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <ul>
                  {loyaltyProgram.benefits.map((benefit: string, index: number) => (
                    <li key={index}>
                      <Typography variant="body1">{benefit}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Subscription Settings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={loyaltyProgram.autoRenew}
                      onChange={handleToggleAutoRenew}
                    />
                  }
                  label="Auto-renew subscription"
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Loyalty; 