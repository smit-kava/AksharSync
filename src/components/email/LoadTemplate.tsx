import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmailIcon from "@mui/icons-material/Email";
import {
  alpha,
  Box,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export type TemplateType = "consultation" | "schedule" | "newsletter";

interface Template {
  id: TemplateType;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  preview: string[];
}

const TEMPLATES: Template[] = [
  {
    id: "consultation",
    title: "Consultation Request",
    description: "Sent when a user books a discovery call. Includes confirmation details and next steps.",
    icon: <EmailIcon sx={{ fontSize: 22 }} />,
    tag: "Auto-send",
    tagColor: "#28c840",
    preview: ["Hi {{name}},", "Your call is confirmed.", "We'll reach you at {{email}}"],
  },
  {
    id: "schedule",
    title: "Schedule Confirmation",
    description: "Detailed scheduling email with calendar link, time-slot info, and preparation guide.",
    icon: <CalendarMonthIcon sx={{ fontSize: 22 }} />,
    tag: "Scheduled",
    tagColor: "#7fd0ff",
    preview: ["Hi {{name}},", "Your session: {{date}} at {{time}}.", "Add to calendar →"],
  },
  {
    id: "newsletter",
    title: "Campaign Blast",
    description: "Promotional email for retention campaigns, re-engagement, or product announcements.",
    icon: <CampaignIcon sx={{ fontSize: 22 }} />,
    tag: "Broadcast",
    tagColor: "#a78bfa",
    preview: ["🚀 Big news for {{company}}!", "Here's what's new...", "Read more →"],
  },
];

interface LoadTemplateProps {
  selected: TemplateType | null;
  onSelect: (id: TemplateType) => void;
}

const LoadTemplate: React.FC<LoadTemplateProps> = ({ selected, onSelect }) => {
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: alpha("#7fd0ff", 0.7),
          letterSpacing: "0.12em",
          fontSize: "0.68rem",
          mb: 2,
          display: "block",
        }}
      >
        Choose a template
      </Typography>

      <Grid container spacing={2}>
        {TEMPLATES.map((tpl, index) => {
          const isSelected = selected === tpl.id;
          return (
            <Grid size={{ xs: 12 }} key={tpl.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Box
                  onClick={() => onSelect(tpl.id)}
                  sx={{
                    p: 2.5,
                    borderRadius: "14px",
                    cursor: "pointer",
                    background: isSelected
                      ? `linear-gradient(135deg, ${alpha("#7fd0ff", 0.08)}, ${alpha("#472187", 0.1)})`
                      : alpha("#ffffff", 0.02),
                    border: `1px solid ${isSelected ? alpha("#7fd0ff", 0.35) : alpha("#ffffff", 0.07)}`,
                    transition: "all 0.25s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      border: `1px solid ${alpha("#7fd0ff", 0.2)}`,
                      bgcolor: alpha("#ffffff", 0.04),
                    },
                  }}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                      }}
                    >

                    </motion.div>
                  )}

                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(tpl.tagColor, 0.1),
                        border: `1px solid ${alpha(tpl.tagColor, 0.2)}`,
                        color: tpl.tagColor,
                        flexShrink: 0,
                      }}
                    >
                      {tpl.icon}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem" }}>
                          {tpl.title}
                        </Typography>
                        <Chip
                          label={tpl.tag}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            bgcolor: alpha(tpl.tagColor, 0.12),
                            color: tpl.tagColor,
                            border: `1px solid ${alpha(tpl.tagColor, 0.25)}`,
                            "& .MuiChip-label": { px: 0.8 },
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: alpha("#fff", 0.45), display: "block", mb: 1.5, lineHeight: 1.5 }}>
                        {tpl.description}
                      </Typography>

                      {/* Inline preview */}
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "8px",
                          bgcolor: alpha("#000", 0.2),
                          border: `1px solid ${alpha("#ffffff", 0.05)}`,
                          fontFamily: "monospace",
                        }}
                      >
                        {tpl.preview.map((line, li) => (
                          <Typography
                            key={li}
                            variant="caption"
                            sx={{
                              display: "block",
                              color: li === 0 ? alpha("#fff", 0.7) : alpha("#fff", 0.35),
                              fontSize: "0.68rem",
                              lineHeight: 1.8,
                            }}
                          >
                            {line}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LoadTemplate;
