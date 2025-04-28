import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'menu' | 'item' | 'reservation'>('menu');
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenDialog = (type: 'menu' | 'item' | 'reservation') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Menu Management" />
          <Tab label="Reservations" />
          <Tab label="Orders" />
          <Tab label="Users" />
          <Tab label="Campaigns" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('menu')}
            >
              Add New Menu
            </Button>
          </Box>
          <Grid container spacing={2}>
            {/* Sample menu cards - replace with actual data */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Lunch Menu</Typography>
                  <Typography color="textSecondary">12 items</Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/reservations')}
            >
              View All Reservations
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/orders')}
            >
              View All Orders
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/users')}
            >
              Manage Users
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/campaigns')}
            >
              Manage Campaigns
            </Button>
          </Box>
        </TabPanel>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'menu' ? 'Add New Menu' :
           dialogType === 'item' ? 'Add Menu Item' :
           'Add Reservation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {dialogType === 'menu' && (
              <TextField
                fullWidth
                label="Menu Name"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
            {dialogType === 'item' && (
              <>
                <TextField
                  fullWidth
                  label="Item Name"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 