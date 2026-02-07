import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Avatar,
  Container,
  useTheme,
  alpha,
  InputAdornment,
  Link,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { LoginRequest } from '../types/auth';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

interface LoginProps {
  onLogin: (credentials: LoginRequest) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  loading = false,
  error = null,
  onSwitchToSignup,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await onLogin(data);
    } catch (error) {
      // Error is handled by the parent component
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          py: 4,
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: '100%',
            maxWidth: 450,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'white',
                color: 'primary.main',
                mx: 'auto',
                mb: 2,
                fontSize: '2rem',
              }}
            >
              <PersonIcon />
            </Avatar>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Sign in to your account to continue
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.primary.main, 0.5),
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.primary.main, 0.5),
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: 'text.secondary' }} />
                            ) : (
                              <Visibility sx={{ color: 'text.secondary' }} />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
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
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={onSwitchToSignup}
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
