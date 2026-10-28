// ============================================================
// src/pages/admin/AdminRoute.tsx
// Route protection wrapper for Superadmin portal
// ============================================================

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAdminToken, verifyAdminSession } from '../../services/blogApi';
import { ROUTE_PATHS } from '../../routes/paths';
import { Box, CircularProgress, Typography } from '@mui/material';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = getAdminToken();

    if (!token) {
      setIsAuthenticated(false);
      setChecking(false);
      return;
    }

    verifyAdminSession()
      .then((user) => {
        if (isMounted) {
          setIsAuthenticated(!!user);
          setChecking(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setChecking(false);
        }
      });

    // Active 60-second periodic checker to auto-logout once 24 hours expire
    const interval = setInterval(() => {
      const activeToken = getAdminToken();
      if (!activeToken && isMounted) {
        setIsAuthenticated(false);
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (checking) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060e1a',
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: '#7fd0ff' }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
          Verifying Superadmin Credentials...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.ADMIN_LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
