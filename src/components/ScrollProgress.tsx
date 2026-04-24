import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        background: 'linear-gradient(90deg, #0D3B66 0%, #472187 50%, #0D3B66 100%)',
        backgroundSize: '200% 100%',
        zIndex: 9999,
        transition: 'width 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: '0 0 15px rgba(127, 208, 255, 0.6), 0 0 30px rgba(167, 139, 250, 0.3)',
        animation: 'shimmer 3s linear infinite',
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      }}
    />
  );
};

export default ScrollProgress;
