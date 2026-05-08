import { useRef } from "react";
import { Box, Container, Typography, alpha, Fade, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { useInView as useInViewShared, GradientText } from "./Shared";
import { ROUTE_PATHS } from "../../routes/paths";
import { motion, useInView } from "framer-motion";

import { LifecycleIcon, ArchitectureIcon, CreativeIcon, MessagingIcon } from "../icons";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

// ─── Service data ──────────────────────────────────────────────────────────────

const services = [
  {
    rotate: -20,
    spreadX: -700,
    icon: <LifecycleIcon sx={{ fontSize: "2.4rem" }} />,
    id: ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT,
    title: "Lifecycle Flow Review",
    sub: "Journey Audit",
    desc: "Complete review of behavioral journeys and automated sequences to identify conversion gaps.",
    accent: "#7fd0ff",
    label: "01",
    clickable: true,
  },
  {
    rotate: -10,
    spreadX: -350,
    icon: <CreativeIcon sx={{ fontSize: "2.4rem" }} />,
    id: ROUTE_PATHS.SERVICE_CREATIVE_AUDIT,
    title: "Template & Creative",
    sub: "Visual Audit",
    desc: "Evaluating design performance, mobile responsiveness, and brand consistency across all assets.",
    accent: "#a78bfa",
    label: "02",
    clickable: true,
  },
  {
    rotate: 0,
    spreadX: 0,
    icon: <ArchitectureIcon sx={{ fontSize: "2.4rem" }} />,
    id: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT,
    title: "Deliverability Review",
    sub: "Inbox Health",
    desc: "Technical audit of SPF, DKIM, DMARC, and sender reputation for maximum inbox placement.",
    accent: "#34d399",
    label: "03",
    clickable: true,
  },
  {
    rotate: 10,
    spreadX: 350,
    icon: <SyncProblemIcon sx={{ fontSize: "2.4rem" }} />,
    id: ROUTE_PATHS.SERVICE_REVENUE_AUDIT,
    title: "Revenue Opportunity",
    sub: "Growth Discovery",
    desc: "Data-driven analysis to uncover missed repeat purchase opportunities and hidden revenue.",
    accent: "#fbbf24",
    label: "04",
    clickable: true,
  },
  {
    rotate: 20,
    spreadX: 700,
    icon: <MessagingIcon sx={{ fontSize: "2.4rem" }} />,
    id: ROUTE_PATHS.SERVICE_SMS,
    title: "Omnichannel Review",
    sub: "Multi-Platform",
    desc: "Audit of SMS, WhatsApp, Push, RCS, Direct Mail, and Instagram DM automation systems.",
    accent: "#f472b6",
    label: "05",
    clickable: true,
  },
];

// ─── Shared card visuals ───────────────────────────────────────────────────────

function CardInner({ svc }: { svc: (typeof services)[0] }) {
  return (
    <Box
      component={svc.clickable ? RouterLink : "div"}
      to={svc.clickable ? svc.id : undefined}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "28px",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
        p: 3.5,
        pb: "48px",
        cursor: svc.clickable ? "pointer" : "default",
        transition: "border-color 0.4s, box-shadow 0.4s",
        "&:hover": {
          borderColor: alpha(svc.accent, 0.55),
          boxShadow: `0 40px 100px ${alpha(svc.accent, 0.28)}, inset 0 1px 0 rgba(255,255,255,0.1)`,
        },
      }}
    >
      {/* Glow blob */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 260,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(svc.accent, 0.28)} 0%, transparent 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Watermark number */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 60,
          right: 24,
          fontSize: "7rem",
          fontWeight: 950,
          lineHeight: 1,
          color: alpha("#fff", 0.025),
          userSelect: "none",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
        }}
      >
        {svc.label}
      </Typography>

      {/* Icon bubble */}
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "18px",
          background: alpha(svc.accent, 0.12),
          border: `1.5px solid ${alpha(svc.accent, 0.3)}`,
          color: svc.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          filter: `drop-shadow(0 0 12px ${alpha(svc.accent, 0.4)})`,
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        {svc.icon}
      </Box>

      {/* Step label */}
      <Typography
        sx={{
          fontSize: "0.65rem",
          fontWeight: 800,
          letterSpacing: "0.18em",
          color: svc.accent,
          textTransform: "uppercase",
          mb: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {svc.label} — {svc.sub}
      </Typography>

      {/* Accent bar */}
      <Box
        sx={{
          width: 44,
          height: 3,
          borderRadius: "99px",
          background: `linear-gradient(90deg, ${svc.accent}, ${alpha(svc.accent, 0.2)})`,
          mb: 2.5,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          fontSize: { xs: "1.25rem", md: "1.45rem" },
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          mb: 2,
          color: "#fff",
          position: "relative",
          zIndex: 1,
        }}
      >
        {svc.title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: alpha("#fff", 0.5),
          lineHeight: 1.8,
          position: "relative",
          zIndex: 1,
          flex: 1,
        }}
      >
        {svc.desc}
      </Typography>

      {/* Bottom CTA bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "rgba(255,255,255,0.03)",
          borderTop: `1px solid ${alpha(svc.accent, 0.12)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: svc.accent,
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          transition: "background 0.3s",
          "&:hover": {
            background: svc.clickable ? alpha(svc.accent, 0.08) : "transparent",
          },
        }}
      >
        <span>{svc.clickable ? "Discover more" : `Audit Focus ${svc.label}`}</span>
        {svc.clickable && <ArrowForwardIcon sx={{ fontSize: "0.85rem" }} />}
      </Box>
    </Box>
  );
}

// ─── Mobile: vertical list ─────────────────────────────────────────────────────

function MobileServiceList() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      {services.map((svc, i) => (
        <motion.div
          key={svc.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Box sx={{ width: "100%", height: 420 }}>
            <CardInner svc={svc} />
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

// ─── Desktop: fan deck — scroll-triggered ─────────────────────────────────────

function DesktopFanDeck() {
  const deckRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(deckRef, {
    amount: 0.3,
    margin: "0% 0% -50% 0%",
    once: true,
  });

  return (
    <Box
      ref={deckRef}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 420,
        width: "100%",
      }}
    >
      {services.map((svc, i) => (
        <motion.div
          key={svc.title}
          style={{ position: "absolute", zIndex: i + 1 }}
          animate={{
            x: isInView ? svc.spreadX : 0,
            rotate: isInView ? 0 : svc.rotate,
            zIndex: isInView ? i + 1 : services.length - Math.abs(i - 1),
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 24,
            mass: 1.1,
            delay: isInView ? i * 0.06 : (services.length - 1 - i) * 0.04,
          }}
          whileHover={isInView ? { scale: 1.04, zIndex: 10 } : {}}
        >
          <Box sx={{ width: 310, height: 410 }}>
            <CardInner svc={svc} />
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

// ─── Responsive wrapper ────────────────────────────────────────────────────────

function ServiceDeck() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <MobileServiceList /> : <DesktopFanDeck />;
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function Services() {
  const [servicesRef, servicesInView] = useInViewShared(0.1);

  return (
    <Box
      ref={servicesRef}
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #060e1a 0%, #0b1a32 50%, #060e1a 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 55%, rgba(127,208,255,0.07) 0%, transparent 50%),
            radial-gradient(circle at 90% 45%, rgba(52,211,153,0.07) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(167,139,250,0.05) 0%, transparent 40%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            textAlign: "center",
            mb: { xs: 5, md: 8 },
          }}
        >
          <Fade in={servicesInView} timeout={500}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3.2rem" },
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                The science of{" "}
                <GradientText>Synchronization.</GradientText>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.4),
                  mt: 2,
                  maxWidth: 640,
                  mx: "auto",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.7,
                  px: { xs: 1, md: 0 },
                }}
              >
                We engineer the strategic ecosystem that powers your brand's growth.
                Our audits deep-dive into your data to build high-performance revenue engines.
              </Typography>
            </Box>
          </Fade>
        </Box>

        {/* Scroll hint — desktop only */}
        <Fade in={servicesInView} timeout={900}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: alpha("#fff", 0.2),
              mb: 3,
              display: { xs: "none", md: "block" },
            }}
          >
            ↓ scroll to reveal services
          </Typography>
        </Fade>

        {/* Responsive deck */}
        <ServiceDeck />
      </Container>
    </Box>
  );
}
