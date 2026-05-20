import React from "react";
import { Box, Typography, Stack, alpha, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { CalendarMonth as CalendarMonthIcon, AccessTime as AccessTimeIcon, Videocam as VideocamIcon, Person as PersonIcon, EmailOutlined as EmailOutlinedIcon, Language as LanguageIcon } from "@mui/icons-material";

interface ScheduleDetail {
  name: string;
  email: string;
  date?: string;
  time?: string;
  duration?: string;
  meetingType?: string;
  website?: string;
  notes?: string;
}

interface ScheduleBookingTemplateProps {
  details: ScheduleDetail;
  visible: boolean;
}

const DetailRow = ({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.35 }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: alpha("#7fd0ff", 0.08),
          border: `1px solid ${alpha("#7fd0ff", 0.15)}`,
          color: "#7fd0ff",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: alpha("#fff", 0.4), fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}
        >
          {label}
        </Typography>
        <Typography sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const ScheduleBookingTemplate: React.FC<ScheduleBookingTemplateProps> = ({
  details,
  visible,
}) => {
  if (!visible) return null;

  const now = new Date();
  const scheduledDate =
    details.date ||
    now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const scheduledTime =
    details.time ||
    now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          border: `1px solid ${alpha("#7fd0ff", 0.12)}`,
          background: "linear-gradient(145deg, rgba(6,14,26,0.98) 0%, rgba(10,22,40,0.98) 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, rgba(127,208,255,0.07) 0%, rgba(71,33,135,0.12) 100%)",
            borderBottom: `1px solid ${alpha("#7fd0ff", 0.1)}`,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <motion.div
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7fd0ff, #472187)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarMonthIcon sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
          </motion.div>
          <Box>
            <Typography sx={{ fontWeight: 800, color: "#fff", fontSize: "1rem", lineHeight: 1.2 }}>
              Booking Confirmed
            </Typography>
            <Typography variant="caption" sx={{ color: alpha("#7fd0ff", 0.7), fontSize: "0.72rem" }}>
              AksharSync Consultation Session
            </Typography>
          </Box>

          {/* Animated pulse badge */}
          <Box sx={{ ml: "auto" }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  bgcolor: alpha("#28c840", 0.12),
                  border: `1px solid ${alpha("#28c840", 0.3)}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#28c840", boxShadow: "0 0 6px #28c840" }} />
                <Typography variant="caption" sx={{ color: "#28c840", fontWeight: 700, fontSize: "0.65rem" }}>
                  Confirmed
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Details Body */}
        <Box sx={{ p: 3 }}>
          <Stack divider={<Divider sx={{ borderColor: alpha("#ffffff", 0.05) }} />}>
            <DetailRow icon={<PersonIcon sx={{ fontSize: 18 }} />} label="Client Name" value={details.name || "—"} delay={0.1} />
            <DetailRow icon={<EmailOutlinedIcon sx={{ fontSize: 18 }} />} label="Email" value={details.email || "—"} delay={0.15} />
            <DetailRow icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />} label="Date" value={scheduledDate} delay={0.2} />
            <DetailRow icon={<AccessTimeIcon sx={{ fontSize: 18 }} />} label="Time" value={scheduledTime} delay={0.25} />
            <DetailRow icon={<VideocamIcon sx={{ fontSize: 18 }} />} label="Format" value={details.meetingType || "Google Meet (30 min)"} delay={0.3} />
            {details.website && (
              <DetailRow icon={<LanguageIcon sx={{ fontSize: 18 }} />} label="Website" value={details.website} delay={0.35} />
            )}
          </Stack>

          {/* Notes / What to expect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: "12px",
                bgcolor: alpha("#472187", 0.08),
                border: `1px solid ${alpha("#472187", 0.18)}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: alpha("#a78bfa", 0.9), fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.65rem" }}
              >
                📋 What to Expect
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: alpha("#fff", 0.6), mt: 1, lineHeight: 1.7, fontSize: "0.78rem" }}
              >
                {details.notes ||
                  "Our team will analyze your email funnel before the call. Come prepared with your current metrics — open rates, click rates, and revenue benchmarks. We'll map out a 90-day retention roadmap together."}
              </Typography>
            </Box>
          </motion.div>

          {/* Calendar add row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              {["📅 Add to Google Calendar", "🍎 Add to Apple Calendar", "📆 Download .ics"].map(
                (btn, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 1.5,
                      py: 0.8,
                      borderRadius: "8px",
                      border: `1px solid ${alpha("#7fd0ff", 0.15)}`,
                      bgcolor: alpha("#7fd0ff", 0.04),
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": { bgcolor: alpha("#7fd0ff", 0.1) },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: alpha("#7fd0ff", 0.8), fontSize: "0.68rem" }}>
                      {btn}
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ScheduleBookingTemplate;
