import { useState } from "react";
import { Box, Container, Typography, alpha, Fade, styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { useInView, HeroChip, GradientText } from "./Shared";
import { ROUTE_PATHS } from "../../routes/paths";

const services = [
  {
    icon: "⟳",
    id: ROUTE_PATHS.SERVICE_EMAIL_FLOWS,
    title: "Lifecycle & Automation",
    desc: "Email Automation Management, Cross-Platform Journey Mapping, and Multi-Channel Workflows that maximize LTV.",
    accent: "#7fd0ff",
  },
  {
    icon: "⚙",
    id: ROUTE_PATHS.SERVICE_ESP_MIGRATION,
    title: "Technical Architecture",
    desc: "ESP Migration & Integration, CRM Data Sync, Deliverability Audits, and Liquid & Ampscript Templating.",
    accent: "#a78bfa",
  },
  {
    icon: "✦",
    id: ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES,
    title: "Creative Production",
    desc: "Modular Template Production, UX/UI Design, and White Label Solutions designed for scalable growth.",
    accent: "#34d399",
  },
];

const GlassCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accent" && prop !== "hovered",
})<{ accent: string; hovered: boolean; component?: any; to?: string }>(({ theme, accent, hovered }) => ({
  background: alpha(theme.palette.common.white, 0.03),
  border: `1px solid ${alpha(theme.palette.common.white, hovered ? 0.2 : 0.08)}`,
  borderRadius: "24px",
  padding: theme.spacing(4),
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: hovered ? "translateY(-8px)" : "translateY(0)",
  boxShadow: hovered ? `0 24px 64px ${alpha(accent, 0.12)}` : "none",
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.06),
  },
}));

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [servicesRef, servicesInView] = useInView(0.1);

  return (
    <Box ref={servicesRef} id="services" sx={{ py: 15 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "center", mb: 8 }}>
          <Fade in={servicesInView} timeout={600}>
            <Box>
              <HeroChip sx={{ mb: 2 }}>Strategic Services</HeroChip>
              <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "3.5rem" } }}>
                The science of <GradientText>Synchronization.</GradientText>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), mt: 2, maxWidth: 800, mx: "auto", fontSize: "1.1rem" }}>
                We don't just provide tools; we engineer the strategic ecosystem that powers your brand's growth.
                Our approach deep-dives into your customer data to build long-term revenue engines.
              </Typography>
            </Box>
          </Fade>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {services.map((svc, i) => (
            <Box
              key={svc.title}
              sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(33.333% - 32px)" } }}
            >
              <Fade in={servicesInView} timeout={800 + i * 200}>
                <GlassCard
                  component={RouterLink}
                  to={svc.id}
                  accent={svc.accent}
                  hovered={hoveredCard === i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <Box
                    sx={{
                      width: 56, height: 56,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      bgcolor: alpha(svc.accent, 0.1),
                      color: svc.accent,
                      borderRadius: "16px",
                      fontSize: "1.5rem",
                      mb: 4,
                      transition: "transform 0.3s ease",
                      transform: hoveredCard === i ? "scale(1.1) rotate(5deg)" : "none",
                    }}
                  >
                    {svc.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>{svc.title}</Typography>
                  <Typography variant="body2" sx={{ color: alpha("#fff", 0.5), lineHeight: 1.8, mb: 4 }}>
                    {svc.desc}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: svc.accent, fontWeight: 700, fontSize: "0.9rem" }}>
                    <span>Discover more</span>
                    <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
                  </Box>
                </GlassCard>
              </Fade>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
