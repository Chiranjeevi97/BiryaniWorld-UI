import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { passwordResetService } from '../services/passwordResetService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await passwordResetService.requestPasswordReset({ email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to request password reset');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Forgot Password
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset instructions have been sent to your email.
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Reset Password
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Remember your password?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword; 