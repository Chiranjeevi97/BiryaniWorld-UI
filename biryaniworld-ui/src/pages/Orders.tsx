import React, { useState, useEffect } from 'react';
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
  Box,
  Chip,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchOrders, requestOrderCancellation } from '../store/slices/orderSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
    setIsCancelling(false);
  };

  const handleRequestCancellation = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
    setIsCancelling(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setOpenDialog(false);
    setCancelReason('');
    setIsCancelling(false);
  };

  const handleSubmitCancellation = async () => {
    if (selectedOrder && cancelReason) {
      try {
        await dispatch(requestOrderCancellation({
          orderId: selectedOrder.id,
          reason: cancelReason
        })).unwrap();
        handleCloseDialog();
      } catch (error) {
        console.error('Failed to request cancellation:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'preparing':
        return 'primary';
      case 'ready':
        return 'success';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.items.length} items
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleViewOrder(order)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    {order.status.toLowerCase() === 'pending' && (
                      <Tooltip title="Request Cancellation">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRequestCancellation(order)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No orders found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isCancelling ? 'Request Order Cancellation' : 'Order Details'}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Order #{selectedOrder.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {new Date(selectedOrder.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Items:
              </Typography>
              {selectedOrder.items.map((item: any) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Total: ${selectedOrder.totalAmount.toFixed(2)}
              </Typography>
              {isCancelling && (
                <TextField
                  fullWidth
                  label="Cancellation Reason"
                  multiline
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  sx={{ mt: 2 }}
                  required
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {isCancelling && (
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitCancellation}
              disabled={!cancelReason}
            >
              Request Cancellation
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders; 