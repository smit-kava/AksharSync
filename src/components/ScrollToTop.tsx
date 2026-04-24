import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #0D3B66 0%, #472187 100%)',
          color: 'white',
          boxShadow: '0 10px 25px rgba(13, 59, 102, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          '&:hover': {
            background: 'linear-gradient(135deg, #472187 0%, #0D3B66 100%)',
            transform: 'translateY(-5px) scale(1.1)',
            boxShadow: '0 15px 30px rgba(71, 33, 135, 0.4)',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
