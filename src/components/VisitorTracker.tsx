// ============================================================
// src/components/VisitorTracker.tsx
// Invisible, non-blocking component that records page visits
// ============================================================

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit } from '../services/customerApi';

export const VisitorTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track public pages (avoid logging admin dashboard actions as public visitor views)
    if (!location.pathname.startsWith('/admin')) {
      trackPageVisit(location.pathname);
    }
  }, [location.pathname]);

  return null;
};
