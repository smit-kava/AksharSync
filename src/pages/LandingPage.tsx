import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  styled,
  alpha,
  keyframes,
  Fade,
  Zoom,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ─── Animations ─────────────────────────────────────────────────────────────

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

// ─── Data ────────────────────────────────────────────────────────────────────

const avatars = [
  { bg: "#1a3a5c", initials: "PS", color: "#7fd0ff" },
  { bg: "#2d1b5e", initials: "RM", color: "#a78bfa" },
  { bg: "#0d3b2e", initials: "AK", color: "#34d399" },
  { bg: "#3b1a1a", initials: "JD", color: "#f87171" },
  { bg: "#3b2a0d", initials: "MK", color: "#fbbf24" },
  { bg: "#1a2a3b", initials: "RV", color: "#60a5fa" },
];

const stats = [
  { value: "350+", label: "Clients Served" },
  { value: "98%", label: "Client Retention" },
  { value: "12×", label: "Average ROI" },
  { value: "8+", label: "Years Experience" },
];

const services = [
  {
    icon: "⟳",
    title: "Lifecycle & Automation",
    desc: "Email automation, journey mapping, and multi-channel workflows that nurture leads and drive conversions.",
    accent: "#7fd0ff",
  },
  {
    icon: "⚙",
    title: "Technical Architecture",
    desc: "ESP migration, CRM sync, deliverability audits, and advanced templating for a robust technical foundation.",
    accent: "#a78bfa",
  },
  {
    icon: "✦",
    title: "Creative Production",
    desc: "Modular templates, UX/UI design, and white-label solutions that elevate your brand's visual impact.",
    accent: "#34d399",
  },
];

const features = [
  "Dedicated account manager for every project",
  "Weekly performance reports & insights",
  "Agile execution with 48-hour turnaround",
  "Multi-channel synced campaigns",
  "Real-time analytics dashboard",
  "On-demand strategy consultations",
];

// ─── Styled Components ───────────────────────────────────────────────────────

const PageWrapper = styled(Box)(({ theme }) => ({
  background: "#060e1a",
  color: theme.palette.common.white,
  overflowX: "hidden",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}));

const HeroChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: alpha("#7fd0ff", 0.1),
  color: "#7fd0ff",
  border: `1px solid ${alpha("#7fd0ff", 0.2)}`,
  borderRadius: "100px",
  padding: "6px 16px",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
}));

const ServiceCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accent" && prop !== "hovered",
})<{ accent: string; hovered: boolean }>(({ theme, accent, hovered }) => ({
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

const FeatureRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
  borderRadius: "16px",
  transition: "all 0.2s ease",
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.04),
    transform: "translateX(8px)",
  },
}));

const GradientText = styled(Box)(() => ({
  background: "linear-gradient(90deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline-block",
}));

// ─── Custom Hook ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function LandingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [, statsInView] = useInView(0.1);
  const [servicesRef, servicesInView] = useInView(0.1);
  const [whyRef, whyInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.2);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageWrapper>
      {/* ── HERO SECTION ── */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(145deg, #060e1a 0%, #0b1e35 40%, #1a0a3a 100%)",
          pt: { xs: 12, md: 0 },
        }}
      >
        {/* BG Grid Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(127,208,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,208,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        {/* Ambient Glow Orbs */}
        <Box
          sx={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)",
            top: "-15%",
            right: "-10%",
            animation: `${pulseGlow} 4s infinite`,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, transparent 65%)",
            bottom: "-10%",
            left: "-8%",
            animation: `${pulseGlow} 4s infinite`,
            animationDelay: "1.5s",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 840 }}>
            <Fade in={heroVisible} timeout={800}>
              <Box>
                <HeroChip>
                  <AutoAwesomeIcon sx={{ fontSize: "0.9rem" }} />
                  Scaling D2C Growth
                </HeroChip>
              </Box>
            </Fade>

            <Fade in={heroVisible} timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", sm: "4.5rem", md: "5.5rem" },
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                }}
              >
                Scaling D2C Brands{" "}
                <br />
                <GradientText>Through Data-Driven</GradientText>
                <br />
                Communication.
              </Typography>
            </Fade>

            <Fade in={heroVisible} timeout={1200}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  color: alpha("#fff", 0.6),
                  lineHeight: 1.7,
                  maxWidth: 680,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                We build automated revenue engines across{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 700 }}>
                  Email, SMS, and WhatsApp
                </Box>{" "}
                using{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>
                  12 years of technical architecture experience
                </Box>
                . Expert support for leading ESP and CRM platforms.
              </Typography>
            </Fade>

            <Fade in={heroVisible} timeout={1400}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: "#fff",
                    color: "#060e1a",
                    px: 4, py: 2,
                    borderRadius: "14px",
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#e8f4ff", transform: "translateY(-2px)" },
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: alpha("#fff", 0.2),
                    px: 4, py: 2,
                    borderRadius: "14px",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.05), transform: "translateY(-2px)" },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Fade>

            <Fade in={heroVisible} timeout={1600}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 2 }}>
                <AvatarGroup max={6} sx={{ "& .MuiAvatar-root": { width: 36, height: 36, border: "2px solid #060e1a" } }}>
                  {avatars.map((a, i) => (
                    <Avatar key={i} sx={{ bgcolor: a.bg, color: a.color, fontSize: "0.7rem", fontWeight: 800 }}>{a.initials}</Avatar>
                  ))}
                </AvatarGroup>
                <Typography variant="body2" sx={{ color: alpha("#fff", 0.5), fontWeight: 600 }}>
                  TRUSTED BY <GradientText sx={{ ml: 0.5 }}>350+ GLOBAL BRANDS</GradientText>
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      <Box ref={servicesRef} sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "center", mb: 8 }}>
            <Fade in={servicesInView} timeout={600}>
              <Box>
                <HeroChip sx={{ mb: 2 }}>Our Services</HeroChip>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "3.5rem" } }}>
                  The Science of <GradientText>Conversion.</GradientText>
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
                  <ServiceCard
                    accent={svc.accent}
                    hovered={hoveredCard === i}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
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
                  </ServiceCard>
                </Fade>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── WHY US SECTION ── */}
      <Box
        ref={whyRef}
        sx={{
          py: 15,
          background: "linear-gradient(135deg, rgba(6, 14, 26, 0.4) 0%, rgba(13, 59, 102, 0.2) 100%)",
          borderTop: `1px solid ${alpha("#fff", 0.06)}`,
          borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
              <Fade in={whyInView} timeout={800}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <HeroChip sx={{ alignSelf: "flex-start" }}>Why Choose Us</HeroChip>
                  <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "3rem" } }}>
                    One Agency. <br />
                    <GradientText>Total Synchronization.</GradientText>
                  </Typography>
                  <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", lineHeight: 1.8 }}>
                    We stop the fragmentation. Our team aligns every communication channel
                    into a single, high-performing revenue engine.
                  </Typography>
                </Box>
              </Fade>
            </Box>
            <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {features.map((f, i) => (
                  <Fade in={whyInView} timeout={600 + i * 150} key={f}>
                    <FeatureRow>
                      <CheckCircleOutlinedIcon sx={{ color: "#34d399", fontSize: "1.4rem" }} />
                      <Typography sx={{ fontWeight: 600, color: alpha("#fff", 0.8) }}>{f}</Typography>
                    </FeatureRow>
                  </Fade>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── CTA BANNER ── */}
      <Box ref={ctaRef} sx={{ py: 15 }}>
        <Container maxWidth="md">
          <Zoom in={ctaInView} timeout={800}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
                borderRadius: "32px",
                p: { xs: 6, md: 10 },
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(127,208,255,0.25)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              <Typography variant="h2" sx={{ color: "#060e1a", fontWeight: 900, mb: 2, fontSize: { xs: "2.2rem", md: "3.5rem" }, lineHeight: 1.1 }}>
                Ready to Sync Your Growth?
              </Typography>
              <Typography variant="h6" sx={{ color: alpha("#060e1a", 0.7), mb: 6, fontWeight: 600, maxWidth: 500, mx: "auto" }}>
                Let's build something powerful together. Start with a free strategy call.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#060e1a",
                    color: "#fff",
                    px: 6, py: 2,
                    borderRadius: "14px",
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#0d2137", transform: "translateY(-4px)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started Free →
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#060e1a",
                    borderColor: alpha("#060e1a", 0.3),
                    px: 6, py: 2,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { borderColor: "#060e1a", bgcolor: alpha("#060e1a", 0.08), transform: "translateY(-4px)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Zoom>
        </Container>
      </Box>
    </PageWrapper>
  );
}