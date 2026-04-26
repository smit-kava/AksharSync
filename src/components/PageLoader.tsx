import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, alpha, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader on mount and route changes
    setLoading(true);
    
    // Hide loader after a short delay (e.g., 600ms)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999, // Ensure it's above everything (header is usually 1100-1200)
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060e1a",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Animated Spinner */}
          <Box sx={{ position: "relative", width: 80, height: 80, mb: 4 }}>
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${alpha("#1596DD", 0.1)}`,
                borderTopColor: "#1596DD",
              }}
            />
            {/* Inner spinning ring (opposite direction) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 12,
                borderRadius: "50%",
                border: `2px solid ${alpha("#a78bfa", 0.1)}`,
                borderTopColor: "#a78bfa",
              }}
            />
            {/* Center pulsing core */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 32,
                borderRadius: "50%",
                backgroundColor: "#7fd0ff",
                boxShadow: `0 0 20px ${alpha("#7fd0ff", 0.8)}`,
              }}
            />
          </Box>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Loading
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
            </Typography>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
