// ============================================================
// src/pages/admin/AdminLogin.tsx
// Superadmin Authentication Portal
// ============================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Container,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { adminLogin } from '../../services/blogApi';
import { ROUTE_PATHS } from '../../routes/paths';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || ROUTE_PATHS.ADMIN_BLOGS;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError('Please provide both username/email and password.');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(identifier.trim(), password.trim(), remember);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setIdentifier('smitkava21@gmail.com');
    setPassword('smit@123456');
    setError(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#060e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
        px: 2,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(127, 208, 255, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(71, 33, 135, 0.15) 0%, transparent 50%)
        `,
      }}
    >
      {/* Return to website button */}
      <Button
        onClick={() => navigate(ROUTE_PATHS.HOME)}
        startIcon={<ArrowBackIcon />}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': { color: '#7fd0ff', backgroundColor: 'rgba(127, 208, 255, 0.05)' },
        }}
      >
        Back to Website
      </Button>

      <Container maxWidth="sm">
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(8, 17, 33, 0.85) 0%, rgba(13, 27, 54, 0.75) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(127, 208, 255, 0.2)',
            borderRadius: 4,
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(127, 208, 255, 0.08)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: 4,
              background: 'linear-gradient(90deg, #7fd0ff, #a78bfa, #472187)',
            }}
          />

          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            {/* Header / Brand */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(127, 208, 255, 0.15) 0%, rgba(71, 33, 135, 0.25) 100%)',
                  border: '1px solid rgba(127, 208, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  color: '#7fd0ff',
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 28 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #7fd0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Superadmin Portal
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1, fontSize: '0.95rem' }}>
                AksharSync Dynamic Blog & Content Management
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#fca5a5',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontSize: '0.875rem', fontWeight: 600 }}>
                    Username or Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="superadmin or admin@aksharsync.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.7)',
                        borderRadius: 2,
                        color: '#fff',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                        '&:hover fieldset': { borderColor: 'rgba(127, 208, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#7fd0ff', borderWidth: '1.5px' },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1, fontSize: '0.875rem', fontWeight: 600 }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={loading}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(6, 14, 26, 0.7)',
                        borderRadius: 2,
                        color: '#fff',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                        '&:hover fieldset': { borderColor: 'rgba(127, 208, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#7fd0ff', borderWidth: '1.5px' },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.4)',
                          '&.Mui-checked': { color: '#7fd0ff' },
                        }}
                      />
                    }
                    label={<Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>Remember this device</Typography>}
                  />

                  <Button
                    type="button"
                    variant="text"
                    size="small"
                    onClick={handleFillDemo}
                    startIcon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      color: '#a78bfa',
                      fontSize: '0.8rem',
                      textTransform: 'none',
                      '&:hover': { color: '#7fd0ff', background: 'transparent' },
                    }}
                  >
                    Quick Autofill
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mt: 1,
                    borderRadius: 2.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #7fd0ff 0%, #472187 100%)',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(71, 33, 135, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #a78bfa 0%, #0D3B66 100%)',
                      boxShadow: '0 12px 30px rgba(127, 208, 255, 0.3)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In as Superadmin'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminLogin;
