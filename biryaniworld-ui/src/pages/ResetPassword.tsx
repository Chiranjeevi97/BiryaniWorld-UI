import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }
      const isValid = await passwordResetService.validateResetToken(token);
      setIsValidToken(isValid);
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await passwordResetService.resetPassword({
        token: token!,
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    }
  };

  if (!isValidToken) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Alert severity="error">
              Invalid or expired password reset link. Please request a new password reset.
            </Alert>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/forgot-password')}
                sx={{ textTransform: 'none' }}
              >
                Request Password Reset
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Reset Password
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password has been reset successfully. Redirecting to login...
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword; 