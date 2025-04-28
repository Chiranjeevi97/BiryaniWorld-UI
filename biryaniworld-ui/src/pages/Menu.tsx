import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Badge,
  Alert,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { RootState, AppDispatch } from '../store';
import { fetchMenu } from '../store/slices/menuSlice';
import { createOrder } from '../store/slices/orderSlice';
import { MenuItem } from '../types/menu';
import { useAuth } from '../contexts/AuthContext';

interface CartItem {
  id: number;
  item: MenuItem;
  quantity: number;
}

const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menu, loading, error } = useSelector((state: RootState) => state.menu);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [location, setLocation] = useState('default');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        await dispatch(fetchMenu(location)).unwrap();
      } catch (error) {
        console.error('Failed to fetch menu:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load menu. Please try again later.',
          severity: 'error',
        });
      }
    };
    fetchMenuData();
  }, [dispatch, location]);

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleAddToCart = (item: MenuItem) => {
    console.log('Adding to cart:', item);
    setCart((prevCart) => {
      const newCartItem: CartItem = {
        id: Date.now(),
        item: {
          itemId: item.itemId,
          name: item.name,
          description: item.description,
          price: item.price,
          itemQuantity: item.itemQuantity,
          seasonal: item.seasonal,
          menu: item.menu
        },
        quantity: 1
      };
      console.log('New cart item:', newCartItem);
      return [...prevCart, newCartItem];
    });
  };

  const handleRemoveFromCart = (cartItemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === cartItemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== cartItemId);
    });
  };

  const handlePlaceOrder = async () => {
    try {
      if (!isAuthenticated) {
        setSnackbar({
          open: true,
          message: 'Please login to place an order',
          severity: 'error',
        });
        return;
      }

      if (cart.length === 0) {
        setSnackbar({
          open: true,
          message: 'Your cart is empty. Please add items before placing an order.',
          severity: 'error',
        });
        return;
      }

      console.log('Cart Items:', cart);

      const orderItems = cart.map((cartItem) => {
        console.log('Cart Item:', cartItem);
        return {
          itemId: cartItem.item.itemId,
          quantity: cartItem.quantity,
          price: cartItem.item.price
        };
      });

      console.log('Order Items:', orderItems);

      const orderData = {
        orderId: Math.floor(Math.random() * 1000) + 1,
        customerName: user?.name,
        orderFullFilled: false,
        orderStatus: "PENDING",
        totalAmount: totalAmount,
        orderDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        items: orderItems
      };

      console.log('Final Order Data:', orderData);

      const response = await dispatch(createOrder(orderData)).unwrap();
      
      setCart([]);
      setOrderNote('');
      setOpenCart(false);
      
      setSnackbar({
        open: true,
        message: `Order placed successfully! Order #${response.orderId}`,
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Failed to place order:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to place order. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const menuByCategory = menu.reduce((acc, item) => {
    const category = item.menu?.name || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!menu || menu.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="info">No menu items available at the moment.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
            Our Menu
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              label="Location"
              onChange={handleLocationChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MuiMenuItem value="default">Default</MuiMenuItem>
              <MuiMenuItem value="downtown">Downtown</MuiMenuItem>
              <MuiMenuItem value="uptown">Uptown</MuiMenuItem>
              <MuiMenuItem value="westside">Westside</MuiMenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton
          color="primary"
          onClick={() => setOpenCart(true)}
          sx={{
            position: 'relative',
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {Object.entries(menuByCategory).map(([category, items]) => (
        <Box key={category} sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 600,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 3,
                backgroundColor: 'primary.main',
                borderRadius: 2,
              },
            }}
          >
            {category}
          </Typography>
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" color="primary">
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddToCart(item)}
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Dialog
        open={openCart}
        onClose={() => setOpenCart(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
          Shopping Cart
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {cart.length === 0 ? (
            <Typography>Your cart is empty</Typography>
          ) : (
            <>
              {cart.map((cartItem) => (
                <Box
                  key={cartItem.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  p={2}
                  sx={{
                    backgroundColor: 'background.default',
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" color="primary">
                      {cartItem.item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFromCart(cartItem.id)}
                      sx={{ color: 'primary.main' }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{cartItem.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleAddToCart(cartItem.item)}
                      sx={{ color: 'primary.main' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Order Note"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Box
                mt={2}
                p={2}
                sx={{
                  backgroundColor: 'background.default',
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" color="primary">
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenCart(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Menu; 