import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  alpha,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  ToggleOn as StatusIcon,
} from '@mui/icons-material';
import { userFormSchema, userFormFields, UserFormData } from '../config/userFormSchema';
import { User } from '../types/user';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, loading = false }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      status: user.status || 'pending',
    } : {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      status: 'pending' as const,
    },
  });

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      if (!user) {
        reset();
      }
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* User Avatar Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            fontWeight: 600,
            fontSize: '1.5rem',
          }}
        >
          {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : <PersonIcon />}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {user ? 'Edit User Information' : 'Create New User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? 'Update the details below' : 'Fill in the information below to create a new user'}
          </Typography>
        </Box>
      </Box>

      {/* Form Fields */}
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={3}>
              {userFormFields.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <Controller
                    name={field.name as keyof UserFormData}
                    control={control}
                    render={({ field: controllerField }) => {
                      if (field.type === 'select') {
                        return (
                          <FormControl fullWidth>
                            <InputLabel
                              error={!!errors[field.name as keyof UserFormData]}
                              sx={{
                                '&.Mui-focused': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            >
                              {field.label}
                            </InputLabel>
                            <Select
                              {...controllerField}
                              label={field.label}
                              error={!!errors[field.name as keyof UserFormData]}
                              disabled={loading}
                              sx={{
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  transition: 'all 0.2s ease-in-out',
                                  '&:hover': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: alpha(theme.palette.primary.main, 0.5),
                                    },
                                  },
                                  '&.Mui-focused': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: theme.palette.primary.main,
                                      borderWidth: 2,
                                    },
                                  },
                                },
                              }}
                              startAdornment={
                                <InputAdornment position="start" sx={{ mt: 1 }}>
                                  <StatusIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                </InputAdornment>
                              }
                            >
                              {field.options?.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </MenuItem>
                              ))}
                            </Select>
                            {(errors[field.name as keyof UserFormData] as any)?.message && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                                {(errors[field.name as keyof UserFormData] as any)?.message}
                              </Typography>
                            )}
                          </FormControl>
                        );
                      }
                      
                      return (
                        <TextField
                          {...controllerField}
                          fullWidth
                          label={field.label}
                          type={field.type}
                          variant="outlined"
                          error={!!errors[field.name as keyof UserFormData]}
                          helperText={(errors[field.name as keyof UserFormData] as any)?.message || ''}
                          disabled={loading}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: alpha(theme.palette.primary.main, 0.5),
                                },
                              },
                              '&.Mui-focused': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: theme.palette.primary.main,
                                  borderWidth: 2,
                                },
                              },
                            },
                            '& .MuiInputLabel-root': {
                              fontWeight: 500,
                              '&.Mui-focused': {
                                color: theme.palette.primary.main,
                              },
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {field.name === 'firstName' || field.name === 'lastName' ? (
                                  <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                ) : field.name === 'email' ? (
                                  <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                ) : (
                                  <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || (!isDirty && !!user)}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {user ? 'Update User' : 'Create User'}
                  </Button>
                  {!user && (
                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      onClick={() => reset()}
                      disabled={loading}
                      startIcon={<ClearIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderColor: alpha(theme.palette.divider, 0.5),
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Clear Form
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
