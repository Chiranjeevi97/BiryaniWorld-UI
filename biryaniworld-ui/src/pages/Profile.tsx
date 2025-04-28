import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { userProfileService, UserProfile, UpdateProfileRequest } from '../services/userProfileService';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UpdateProfileRequest>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userProfileService.getProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
        preferences: data.preferences,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updatedProfile = await userProfileService.updateProfile(formData);
      setProfile(updatedProfile);
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await userProfileService.updatePassword(currentPassword, newPassword);
      setShowPasswordDialog(false);
      setSuccess('Password updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userProfileService.deleteAccount();
      logout();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profile?.email || ''}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.preferences?.notificationPreferences?.email || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            notificationPreferences: {
                              email: e.target.checked,
                              sms: formData.preferences?.notificationPreferences?.sms || false,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.preferences?.notificationPreferences?.sms || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            notificationPreferences: {
                              email: formData.preferences?.notificationPreferences?.email || false,
                              sms: e.target.checked,
                            },
                          },
                        })
                      }
                    />
                  }
                  label="SMS Notifications"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => setShowPasswordDialog(true)}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
            required
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained" color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 