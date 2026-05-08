import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.4, 0, 0.2, 1] // Quicker initial start, smooth finish
      }}
      style={{ 
        width: "100%", 
        minHeight: "100vh", 
        transformOrigin: "center center",
        overflow: "hidden"
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
