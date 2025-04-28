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
} from '@mui/material';
import { RootState, AppDispatch, StoreState } from '../store';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../store/slices/campaignSlice';
import { Campaign } from '../types/campaign';

const Campaigns: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading } = useSelector((state: RootState) => state.campaigns as StoreState['campaigns']);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState<Partial<Campaign>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    discountType: '',
    discountValue: 0,
    minimumPurchase: 0,
    maxRedemptions: 0,
    termsAndConditions: [],
  });

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleOpenDialog = (campaign?: Campaign) => {
    if (campaign) {
      setSelectedCampaign(campaign);
      setFormData(campaign);
    } else {
      setSelectedCampaign(null);
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        targetAudience: '',
        discountType: '',
        discountValue: 0,
        minimumPurchase: 0,
        maxRedemptions: 0,
        termsAndConditions: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCampaign(null);
    setFormData({});
  };

  const handleSubmit = async () => {
    try {
      if (selectedCampaign) {
        await dispatch(updateCampaign({ id: selectedCampaign.id, data: formData })).unwrap();
      } else {
        await dispatch(createCampaign(formData)).unwrap();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save campaign:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteCampaign(id)).unwrap();
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
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
        <Typography variant="h4">Campaigns</Typography>
        <Button variant="contained" onClick={() => handleOpenDialog()}>
          New Campaign
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns?.map((campaign: Campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.title}</TableCell>
                <TableCell>{new Date(campaign.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(campaign.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(campaign)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCampaign ? 'Edit Campaign' : 'New Campaign'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  fullWidth
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="targetAudience"
                  label="Target Audience"
                  fullWidth
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="discountType"
                  label="Discount Type"
                  fullWidth
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="discountValue"
                  label="Discount Value"
                  type="number"
                  fullWidth
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="minimumPurchase"
                  label="Minimum Purchase"
                  type="number"
                  fullWidth
                  value={formData.minimumPurchase}
                  onChange={(e) => setFormData({ ...formData, minimumPurchase: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="maxRedemptions"
                  label="Max Redemptions"
                  type="number"
                  fullWidth
                  value={formData.maxRedemptions}
                  onChange={(e) => setFormData({ ...formData, maxRedemptions: Number(e.target.value) })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCampaign ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Campaigns; 