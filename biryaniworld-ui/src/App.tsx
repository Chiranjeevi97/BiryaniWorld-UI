import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import AppRoutes from './routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
              }}
            >
              <Navbar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 4,
                  px: { xs: 2, sm: 3, md: 4 },
                }}
              >
                <AppRoutes />
              </Box>
              <Footer />
            </Box>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
