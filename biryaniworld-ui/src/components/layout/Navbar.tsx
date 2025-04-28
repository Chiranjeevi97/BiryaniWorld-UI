import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Biryani World
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/menu'); }}>
                Menu
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/reservations'); }}>
                Reservations
              </MenuItem>
              <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/loyalty'); }}>
                Loyalty
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Biryani World
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/menu')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Menu
            </Button>
            <Button
              onClick={() => navigate('/reservations')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Reservations
            </Button>
            <Button
              onClick={() => navigate('/loyalty')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Loyalty
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/dashboard'); }}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 