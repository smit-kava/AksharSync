import React, { useEffect, useRef } from "react";
import { Box, Typography, alpha } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "../../assets/Logo.svg";

interface EmailSendTemplateProps {
  recipientName: string;
  recipientEmail: string;
  subject?: string;
  visible: boolean;
}

const FloatingParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      x: [0, x],
      y: [0, y],
    }}
    transition={{ delay, duration: 1.2, ease: "easeOut" }}
    style={{
      position: "absolute",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7fd0ff, #472187)",
      top: "50%",
      left: "50%",
    }}
  />
);

const DotTrail = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
    transition={{ delay: 0.3 + index * 0.08, duration: 0.6 }}
    style={{
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: alpha("#7fd0ff", 0.6),
      margin: "0 3px",
      display: "inline-block",
    }}
  />
);

const EmailSendTemplate: React.FC<EmailSendTemplateProps> = ({
  recipientName,
  recipientEmail,
  subject = "Consultation Call Booked",
  visible,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(6,14,26,0.95) 0%, rgba(8,17,33,0.98) 100%)",
              border: `1px solid ${alpha("#7fd0ff", 0.15)}`,
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(127,208,255,0.05)",
              p: { xs: 3, md: 4 },
            }}
          >
            {/* Glowing top bar */}
            <Box
              sx={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "3px",
                background: "linear-gradient(90deg, transparent, #7fd0ff, #472187, transparent)",
              }}
            />

            {/* Ambient glow */}
            <Box
              sx={{
                position: "absolute",
                top: "-40%", right: "-20%",
                width: "300px", height: "300px",
                background: "radial-gradient(circle, rgba(127,208,255,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Email client header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box sx={{ display: "flex", gap: 0.7 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
                  <Box key={i} sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: color }} />
                ))}
              </Box>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    flex: 1,
                    height: "32px",
                    borderRadius: "8px",
                    bgcolor: alpha("#ffffff", 0.04),
                    border: `1px solid ${alpha("#ffffff", 0.06)}`,
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: alpha("#fff", 0.3), fontSize: "0.65rem" }}>
                    📧 aksharsync.com • New Email Draft
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Logo + From section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ delay: 0.4, duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Box
                  component="img"
                  src={logoSrc}
                  alt="AksharSync"
                  sx={{ width: 48, height: 48, objectFit: "contain" }}
                />
              </motion.div>
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#7fd0ff", fontSize: "0.9rem" }}>
                  AksharSync
                </Typography>
                <Typography variant="caption" sx={{ color: alpha("#fff", 0.4), fontSize: "0.7rem" }}>
                  hello@aksharsync.com
                </Typography>
              </Box>
              {/* Animated send status */}
              <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#28c840",
                      boxShadow: "0 0 8px #28c840",
                    }}
                  />
                </motion.div>
                <Typography variant="caption" sx={{ color: "#28c840", fontSize: "0.68rem", fontWeight: 600 }}>
                  Sent
                </Typography>
              </Box>
            </Box>

            {/* Email fields */}
            {[
              { label: "To", value: `${recipientName} <${recipientEmail}>` },
              { label: "Subject", value: subject },
            ].map((field, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1.5,
                    borderBottom: `1px solid ${alpha("#ffffff", 0.06)}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#7fd0ff", 0.6), minWidth: 52, fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha("#fff", 0.85), fontSize: "0.82rem" }}>
                    {field.value}
                  </Typography>
                </Box>
              </motion.div>
            ))}

            {/* Email body preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Box sx={{ mt: 3, p: 2.5, borderRadius: "12px", bgcolor: alpha("#ffffff", 0.02), border: `1px solid ${alpha("#ffffff", 0.05)}` }}>
                {/* Email banner */}
                <Box
                  sx={{
                    height: 60,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(127,208,255,0.12) 0%, rgba(71,33,135,0.15) 100%)",
                    border: `1px solid ${alpha("#7fd0ff", 0.1)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    gap: 2,
                  }}
                >
                  <Box component="img" src={logoSrc} alt="" sx={{ width: 28, height: 28, objectFit: "contain" }} />
                  <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", background: "linear-gradient(90deg,#7fd0ff,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    AksharSync
                  </Typography>
                </Box>

                {/* Skeleton content lines */}
                {[100, 95, 88, 70].map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                  >
                    <Box
                      sx={{
                        height: 6,
                        width: `${w}%`,
                        borderRadius: 3,
                        bgcolor: alpha("#ffffff", 0.07),
                        mb: 1.2,
                      }}
                    />
                  </motion.div>
                ))}

                {/* CTA Button preview */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Box
                    sx={{
                      mt: 2,
                      width: 140,
                      height: 32,
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #7fd0ff, #472187)",
                    }}
                  />
                </motion.div>
              </Box>
            </motion.div>

            {/* Send animation overlay */}
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
              {[
                { x: 60, y: -40 }, { x: -50, y: -60 }, { x: 80, y: 30 },
                { x: -70, y: 20 }, { x: 40, y: 60 }, { x: -30, y: -80 },
              ].map((p, i) => (
                <FloatingParticle key={i} delay={0.8 + i * 0.1} x={p.x} y={p.y} />
              ))}
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailSendTemplate;
