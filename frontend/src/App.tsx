import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, useTheme, useMediaQuery } from '@mui/material';
import { AccountCircle, Logout as LogoutIcon, Menu as MenuIcon, Dashboard, People, Settings } from '@mui/icons-material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { UsersPage } from './pages/UsersPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import { LoginRequest, SignupRequest } from './types/auth';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h4: {
      fontWeight: 600,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.05)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#f8fafc',
          fontWeight: 600,
          color: '#475569',
          borderBottom: '2px solid #e2e8f0',
        },
        body: {
          borderBottom: '1px solid #f1f5f9',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { customer, isAuthenticated, loading, login, signup, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard' | 'users' | 'settings'>(() => {
    // Set initial view based on current authentication state
    return isAuthenticated ? 'users' : 'login';
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Update view when authentication state changes
  useEffect(() => {
    if (isAuthenticated && (currentView === 'login' || currentView === 'signup')) {
      setCurrentView('users');
    }
  }, [isAuthenticated, currentView]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box 
            sx={{ 
              width: 60, 
              height: 60, 
              borderRadius: 3, 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              animation: 'pulse 2s infinite'
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              U
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const navigateTo = (page: 'dashboard' | 'users' | 'settings') => {
    setCurrentView(page);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    logout();
    setCurrentView('login');
    handleMenuClose();
  };

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      await login(credentials);
      // Don't manually set view here - let auth state change trigger re-render
    } catch (error) {
      // Error handled by Login component
    }
  };

  const handleSignup = async (userData: SignupRequest) => {
    try {
      await signup(userData);
      // Don't manually set view here - let auth state change trigger re-render
    } catch (error) {
      // Error handled by Signup component  
    }
  };

  if (!isAuthenticated) {
    if (currentView === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      );
    } else {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      );
    }
  }

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, sm: 3 } }}>
            {/* Logo/Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.2rem'
                }}
              >
                U
              </Box>
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '-0.5px'
                }}
              >
                {isMobile ? 'UMS' : 'User Management System'}
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Button 
                  color="inherit" 
                  startIcon={<Dashboard />}
                  onClick={() => navigateTo('dashboard')}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    backgroundColor: currentView === 'dashboard' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<People />}
                  onClick={() => navigateTo('users')}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    backgroundColor: currentView === 'users' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  Users
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<Settings />}
                  onClick={() => navigateTo('settings')}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    backgroundColor: currentView === 'settings' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  Settings
                </Button>
              </Box>
            )}

            {/* User Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                  }}
                >
                  Welcome, {customer?.firstName} {customer?.lastName}
                </Typography>
              )}
              
              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleMobileMenuToggle}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Desktop User Menu */}
              {!isMobile && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                  }}
                >
                  <AccountCircle />
                </IconButton>
              )}
              
              {/* Desktop User Dropdown Menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 2,
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, mx: 1, my: 0.5 }}>
                  <AccountCircle sx={{ mr: 2 }} />
                  <Typography variant="body2" fontWeight={500}>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ borderRadius: 1, mx: 1, my: 0.5 }}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  <Typography variant="body2" fontWeight={500}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: 280,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          {customer && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {customer.firstName} {customer.lastName}
            </Typography>
          )}
        </Box>
        
        <List sx={{ p: 1 }}>
          <ListItem 
            button 
            onClick={() => navigateTo('dashboard')}
            sx={{ 
              borderRadius: 2, 
              mb: 1,
              backgroundColor: currentView === 'dashboard' ? 'action.selected' : 'transparent'
            }}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => navigateTo('users')}
            sx={{ 
              borderRadius: 2, 
              mb: 1,
              backgroundColor: currentView === 'users' ? 'action.selected' : 'transparent'
            }}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => navigateTo('settings')}
            sx={{ 
              borderRadius: 2, 
              mb: 1,
              backgroundColor: currentView === 'settings' ? 'action.selected' : 'transparent'
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => {
              handleMenuClose();
              handleMobileMenuClose();
              handleLogout();
            }}
            sx={{ borderRadius: 2, mt: 2 }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      {currentView === 'dashboard' && <DashboardPage />}
      {currentView === 'users' && <UsersPage />}
      {currentView === 'settings' && <SettingsPage />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
