import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Fab,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  HourglassEmpty as PendingIcon,
  PersonOff as InactiveIcon,
} from '@mui/icons-material';
import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm';
import { UserTable } from '../components/UserTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { User } from '../types/user';
import { UserFormData } from '../config/userFormSchema';

export const UsersPage: React.FC = () => {
  const theme = useTheme();
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deletingUser, setDeletingUser] = useState<User | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateUser = async (data: UserFormData) => {
    try {
      await createUser(data);
      setSuccessMessage('User created successfully!');
      setShowForm(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!editingUser) return;
    
    try {
      await updateUser(editingUser.id, data);
      setSuccessMessage('User updated successfully!');
      setEditingUser(undefined);
      setShowForm(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    
    try {
      await deleteUser(deletingUser.id);
      setSuccessMessage('User deleted successfully!');
      setDeletingUser(undefined);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleCancelDelete = () => {
    setDeletingUser(undefined);
  };

  const handleNewUser = () => {
    setEditingUser(undefined);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingUser(undefined);
    setShowForm(false);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
  };

  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {Array.isArray(users) ? users.length : 0}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Total Users
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: alpha('#ffffff', 0.2), color: 'white' }}>
                      <GroupIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, #059669 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {Array.isArray(users) ? users.filter(u => (u.status || 'pending') === 'active').length : 0}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Active Users
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: alpha('#ffffff', 0.2), color: 'white' }}>
                      <TrendingUpIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, #d97706 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {Array.isArray(users) ? users.filter(u => (u.status || 'pending') === 'pending').length : 0}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Pending Users
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: alpha('#ffffff', 0.2), color: 'white' }}>
                      <PendingIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={2}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, #dc2626 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {Array.isArray(users) ? users.filter(u => (u.status || 'pending') === 'inactive').length : 0}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Inactive Users
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: alpha('#ffffff', 0.2), color: 'white' }}>
                      <InactiveIcon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Header Section */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              background: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  User Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                  Manage your users with full CRUD operations. Create, read, update, and delete user records with our intuitive interface.
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<PersonAddIcon />}
                onClick={handleNewUser}
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Add New User
              </Button>
            </Box>
          </Paper>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-message': {
                  fontWeight: 500,
                },
              }}
            >
              {error}
            </Alert>
          )}

          {!showForm ? (
            <Paper
              elevation={3}
              sx={{
                p: 0,
                background: 'white',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  User Directory
                </Typography>
              </Box>
              <UserTable
                users={Array.isArray(users) ? users : []}
                loading={loading}
                onEdit={handleEditUser}
                onDelete={handleDeleteClick}
              />
            </Paper>
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: 'white',
                borderRadius: 3,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {editingUser ? 'Edit User' : 'Create New User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {editingUser 
                    ? 'Update the user information below and save changes.'
                    : 'Fill in the form below to create a new user account.'}
                </Typography>
              </Box>
              <UserForm
                user={editingUser}
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                loading={loading}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancelForm}
                  disabled={loading}
                  sx={{
                    px: 3,
                    borderRadius: 2,
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          )}
        </Container>

        {/* Floating Action Button for Mobile */}
        <Fab
          color="primary"
          aria-label="add user"
          onClick={handleNewUser}
          disabled={loading}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'flex', sm: 'none' },
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <ConfirmDialog
        open={!!deletingUser}
        title="Delete User"
        message={`Are you sure you want to delete ${deletingUser?.firstName} ${deletingUser?.lastName}?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
