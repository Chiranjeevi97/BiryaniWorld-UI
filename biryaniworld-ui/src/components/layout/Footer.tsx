import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Biryani World. All rights reserved.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="/privacy">
            Privacy Policy
          </Link>
          {' | '}
          <Link color="inherit" href="/terms">
            Terms of Service
          </Link>
          {' | '}
          <Link color="inherit" href="/contact">
            Contact Us
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 