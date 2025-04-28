import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
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
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
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

const MenuManagement: React.FC = () => {
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'menu' | 'item'>('menu');
  const [newMenu, setNewMenu] = useState({ name: '' });
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenDialog = (type: 'menu' | 'item') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewMenu({ name: '' });
    setNewItem({
      name: '',
      price: '',
      description: '',
      category: '',
    });
  };

  const handleSaveMenu = () => {
    // TODO: Implement menu creation/update
    handleCloseDialog();
  };

  const handleSaveItem = () => {
    // TODO: Implement item creation/update
    handleCloseDialog();
  };

  const handleDeleteMenu = (menuId: number) => {
    // TODO: Implement menu deletion
  };

  const handleDeleteItem = (itemId: number) => {
    // TODO: Implement item deletion
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Menu Management
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
          <Tab label="Menus" />
          <Tab label="Menu Items" />
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
                  <IconButton onClick={() => handleOpenDialog('menu')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteMenu(1)}>
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
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('item')}
            >
              Add New Menu Item
            </Button>
          </Box>
          <Grid container spacing={2}>
            {/* Sample menu item cards - replace with actual data */}
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Chicken Biryani</Typography>
                  <Typography color="textSecondary">$12.99</Typography>
                  <Typography variant="body2">Spicy rice dish with chicken</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleOpenDialog('item')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteItem(1)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'menu' ? 'Add New Menu' : 'Add Menu Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {dialogType === 'menu' ? (
              <TextField
                fullWidth
                label="Menu Name"
                variant="outlined"
                value={newMenu.name}
                onChange={(e) => setNewMenu({ name: e.target.value })}
                sx={{ mb: 2 }}
              />
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Item Name"
                  variant="outlined"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Category"
                  variant="outlined"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={dialogType === 'menu' ? handleSaveMenu : handleSaveItem}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MenuManagement; 