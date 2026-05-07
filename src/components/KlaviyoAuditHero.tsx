import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import {
  Box,
  Container,
  Stack,
  Typography,
  alpha
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

const THEME_COLOR = "#7fd0ff";
const ACCENT_COLOR = "#a78bfa";

const BENEFITS = [
  {
    text: "Quick & Easy",
    sub: "Complete your audit in under 15 minutes.",
  },
  {
    text: "100% Free",
    sub: "Get valuable insights at no cost.",
  },
  {
    text: "Instant Results",
    sub: "No calls, no waiting — your report is ready right away.",
  },
  {
    text: "Tailored to You",
    sub: "Receive personalized recommendations for your business.",
  },
];

const STATS = [
  { value: "15 min", label: "Avg. Completion Time" },
  { value: "100%", label: "Free, No Strings" },
  { value: "1,000+", label: "Brands Audited" },
];

const KlaviyoAuditHero: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        overflow: "hidden",
        background: "linear-gradient(to bottom, #060e1a 0%, #081121 100%)",
      }}
    >
      {/* Background glows */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.07)} 0%, transparent 70%)`,
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${alpha(ACCENT_COLOR, 0.07)} 0%, transparent 70%)`,
          filter: "blur(70px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 1,
              borderRadius: "50px",
              bgcolor: alpha(THEME_COLOR, 0.1),
              border: `1px solid ${alpha(THEME_COLOR, 0.25)}`,
              mb: 4,
            }}
          >
            <FlashOnIcon sx={{ color: THEME_COLOR, fontSize: 18 }} />
            <Typography
              sx={{
                color: THEME_COLOR,
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Free Klaviyo Audit
            </Typography>
          </Box>
        </motion.div>

        {/* ── Two-column layout ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: { xs: 8, md: 10 },
            alignItems: "center",
          }}
        >
          {/* LEFT: Headline + benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.6rem", sm: "3.4rem", md: "4.2rem" },
                fontWeight: 900,
                lineHeight: 1.08,
                mb: 3,
                background: `linear-gradient(135deg, #fff 0%, ${THEME_COLOR} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get a FREE
              <br />
              Klaviyo{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${THEME_COLOR}, ${ACCENT_COLOR})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Self-Audit
              </span>
            </Typography>

            <Typography
              sx={{
                color: alpha("#fff", 0.65),
                fontSize: "1.15rem",
                lineHeight: 1.7,
                mb: 6,
                maxWidth: 520,
              }}
            >
              See how your Klaviyo account performs against proven best practices
              and uncover simple ways to increase your email revenue.
            </Typography>

            {/* Benefit list */}
            <Stack spacing={3} sx={{ mb: 6 }}>
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                    <CheckCircleIcon
                      sx={{
                        color: THEME_COLOR,
                        fontSize: 22,
                        mt: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontWeight: 800, color: "#fff", fontSize: "1rem" }}
                      >
                        {b.text}
                      </Typography>
                      <Typography
                        sx={{
                          color: alpha("#fff", 0.5),
                          fontSize: "0.92rem",
                          mt: 0.25,
                        }}
                      >
                        {b.sub}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Stack>

            {/* Stats row */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, sm: 5 },
                flexWrap: "wrap",
              }}
            >
              {STATS.map((s, i) => (
                <Box key={i}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "1.6rem",
                      background: `linear-gradient(135deg, ${THEME_COLOR}, ${ACCENT_COLOR})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{ color: alpha("#fff", 0.45), fontSize: "0.82rem" }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>

          {/* RIGHT: Embedded Audit Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Box
              sx={{
                borderRadius: "28px",
                overflow: "hidden",
                bgcolor: alpha("#fff", 0.03),
                backdropFilter: "blur(16px)",
                border: `1px solid ${alpha("#fff", 0.08)}`,
                boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(THEME_COLOR, 0.05)}`,
                position: "relative",
              }}
            >
              {/* Top accent bar */}
              <Box
                sx={{
                  height: "4px",
                  background: `linear-gradient(90deg, ${THEME_COLOR}, ${ACCENT_COLOR})`,
                }}
              />

              {/* Form iframe placeholder */}
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#fff", mb: 1 }}
                >
                  Start Your Free Audit
                </Typography>
                <Typography
                  sx={{
                    color: alpha("#fff", 0.5),
                    fontSize: "0.9rem",
                    mb: 3,
                  }}
                >
                  Fill in the form below and get your personalised Klaviyo
                  report instantly.
                </Typography>

                {/* Embedded HubSpot / Typeform / custom form iframe */}
                <Box
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    minHeight: 480,
                    bgcolor: alpha("#fff", 0.02),
                    border: `1px solid ${alpha("#fff", 0.05)}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <iframe
                    title="Klaviyo Self-Audit Form"
                    src="https://share.hsforms.com/YOUR_FORM_ID"
                    style={{
                      width: "100%",
                      minHeight: 480,
                      border: "none",
                      borderRadius: 16,
                      background: "transparent",
                    }}
                    loading="lazy"
                  />
                  {/* Fallback loading overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Typography
                        sx={{
                          color: alpha("#fff", 0.25),
                          fontSize: "0.85rem",
                          textAlign: "center",
                          px: 3,
                        }}
                      >
                        *Sometimes it takes a few extra seconds to load the
                        form. Please hang tight and don't leave the page.
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* "Talk to an Expert" CTA below the card */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography
                sx={{
                  color: alpha("#fff", 0.45),
                  fontSize: "0.9rem",
                  mb: 1.5,
                }}
              >
                Prefer to speak with someone first?
              </Typography>
              <Box
                component={RouterLink}
                to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  border: `1.5px solid ${alpha(THEME_COLOR, 0.4)}`,
                  bgcolor: "transparent",
                  cursor: "pointer",
                  color: THEME_COLOR,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: alpha(THEME_COLOR, 0.08),
                    borderColor: THEME_COLOR,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 24px ${alpha(THEME_COLOR, 0.2)}`,
                  },
                }}
              >
                Talk to an Expert →
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default KlaviyoAuditHero;
