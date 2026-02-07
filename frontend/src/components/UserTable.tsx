import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Chip,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { User } from '../types/user';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={300}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
          borderRadius: 2,
        }}
      >
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            color: 'primary.main',
            mb: 2,
          }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          Loading users...
        </Typography>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight={300}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main',
          }}
        >
          <PersonIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first user to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', minWidth: 80 }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', minWidth: 200 }}>
                Contact Information
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', minWidth: 150 }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', minWidth: 120 }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: 'text.primary', minWidth: 120 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                  transition: 'background-color 0.2s ease-in-out',
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {user.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.primary">
                      {user.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.primary">
                      {user.phoneNumber}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={(user.status || 'pending').charAt(0).toUpperCase() + (user.status || 'pending').slice(1)}
                    size="small"
                    sx={{
                      bgcolor: (user.status || 'pending') === 'active' 
                        ? alpha(theme.palette.success.main, 0.1)
                        : (user.status || 'pending') === 'inactive'
                        ? alpha(theme.palette.error.main, 0.1)
                        : alpha(theme.palette.warning.main, 0.1),
                      color: (user.status || 'pending') === 'active'
                        ? 'success.main'
                        : (user.status || 'pending') === 'inactive'
                        ? 'error.main'
                        : 'warning.main',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Edit user" arrow>
                      <IconButton
                        onClick={() => onEdit(user)}
                        aria-label="Edit user"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user" arrow>
                      <IconButton
                        onClick={() => onDelete(user)}
                        aria-label="Delete user"
                        sx={{
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          color: 'error.main',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.2),
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
