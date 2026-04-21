import AutorenewIcon from "@mui/icons-material/Autorenew";
import BrushIcon from "@mui/icons-material/Brush";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EastIcon from "@mui/icons-material/East";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

/* ─────────────────────────── data ─────────────────────────── */

const services = [
  {
    icon: <AutorenewIcon sx={{ fontSize: 36 }} />,
    title: "Lifecycle & Automation",
    desc: "Email automation, journey mapping, and multi-channel workflows that nurture leads and drive conversions.",
    color: "#7fd0ff",
    bg: "rgba(127,208,255,0.08)",
    to: ROUTE_PATHS.SERVICE_EMAIL_FLOWS,
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 36 }} />,
    title: "Technical Architecture",
    desc: "ESP migration, CRM sync, deliverability audits, and advanced templating for a robust technical foundation.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    to: ROUTE_PATHS.SERVICE_ESP_MIGRATION,
  },
  {
    icon: <BrushIcon sx={{ fontSize: 36 }} />,
    title: "Creative Production",
    desc: "Modular templates, UX/UI design, and white-label solutions that elevate your brand's visual impact.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    to: ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES,
  },
];

const stats = [
  { value: "350+", label: "Clients Served" },
  { value: "98%", label: "Client Retention" },
  { value: "12×", label: "Average ROI" },
  { value: "8+", label: "Years Experience" },
];

const features = [
  "Dedicated account manager for every project",
  "Weekly performance reports & insights",
  "Agile execution with 48-hour turnaround",
  "Multi-channel synced campaigns",
  "Real-time analytics dashboard",
  "On-demand strategy consultations",
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CEO, BrightLeaf Organics",
    avatar: "PS",
    text: "AksharSync transformed our online presence completely. Our organic traffic tripled within 3 months — results we never thought possible.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Founder, TechBridge Solutions",
    avatar: "RM",
    text: "The team's strategic approach and flawless execution set them apart. Our ROI has been consistently 10x since partnering with them.",
    rating: 5,
  },
  {
    name: "Ananya Kapoor",
    role: "Marketing Head, StyleCraft",
    avatar: "AK",
    text: "From content to campaigns — everything is perfectly synced. It feels like having a world-class marketing team in-house.",
    rating: 5,
  },
];

/* ─────────────────────────── component ────────────────────── */

export default function LandingPage() {
  return (
    <Box>
      {/* ══════ HERO ══════ */}
      <Box
        sx={{
          minHeight: "92vh",
          background: "linear-gradient(135deg, #06101e 0%, #0D3B66 45%, #472187 100%)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blobs */}
        <Box sx={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          top: -100, right: -120,
          background: "radial-gradient(circle, rgba(71,33,135,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <Box sx={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          bottom: -80, left: -80,
          background: "radial-gradient(circle, rgba(13,59,102,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="md" sx={{ py: { xs: 10, md: 6 }, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Stack spacing={4} sx={{ alignItems: "center" }}>
            {/* <Chip
              label="🚀 Trusted Agency Backbone"
              sx={{
                width: "fit-content",
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "0.85rem",
              }}
            /> */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.1,
                  fontSize: { xs: "2.6rem", md: "4.5rem" },
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                Scaling D2C Brands Through <br />
                <Box component="span" sx={{
                  background: "linear-gradient(90deg, #ffffff 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Data-Driven Communication.
                </Box>
              </Typography>
            </Box>
            <Typography sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              maxWidth: 800,
              lineHeight: 1.6,
              fontWeight: 400,
            }}>
              We build automated revenue engines across Email, SMS, and WhatsApp using 12 years of technical architecture experience. Expert support for leading ESP and CRM platforms.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component={Link}
                to={ROUTE_PATHS.SERVICES}
                variant="contained"
                size="large"
                endIcon={<EastIcon />}
                sx={{
                  bgcolor: "white", color: "#0D3B66",
                  fontWeight: 800, fontSize: "1rem",
                  px: 4, py: 1.6, borderRadius: "10px", textTransform: "none",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  "&:hover": { bgcolor: "#f0f0f0", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" },
                }}
              >
                Explore Services
              </Button>
              <Button
                component={Link}
                to={ROUTE_PATHS.ABOUT}
                variant="outlined"
                size="large"
                sx={{
                  color: "white", borderColor: "rgba(255,255,255,0.4)",
                  fontSize: "1rem", px: 4, py: 1.6,
                  borderRadius: "10px", textTransform: "none",
                  "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                About Us
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ══════ STATS BAND ══════ */}
      <Box sx={{ bgcolor: "#0f2c4d", py: 5, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {stats.map((s) => (
              <Grid key={s.label} size={{ xs: 6, md: 3 }}>
                <Box sx={{ textAlign: "center", py: 1 }}>
                  <Typography sx={{
                    fontSize: { xs: "2rem", md: "2.8rem" }, fontWeight: 900,
                    background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontWeight: 500, mt: 0.5 }}>
                    {s.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════ SERVICES ══════ */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Our Services" sx={{ bgcolor: "rgba(15,44,77,0.08)", color: "#0f2c4d", fontWeight: 600, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#0d2137", mb: 2, fontSize: { xs: "2rem", md: "2.8rem" } }}>
              Everything Your Digital
              <Box component="span" sx={{ color: "#123457" }}> Presence Needs</Box>
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "1.1rem", maxWidth: 520, mx: "auto" }}>
              Three powerful service pillars, perfectly synced into one seamless strategy for your growth.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {services.map((svc) => (
              <Grid key={svc.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={Link}
                  to={svc.to}
                  sx={{
                    height: "100%", borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    textDecoration: "none",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "all 0.3s ease",
                    display: "block",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                      borderColor: svc.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box sx={{
                      width: 64, height: 64, borderRadius: 2.5,
                      bgcolor: svc.bg, color: svc.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      mb: 2.5,
                    }}>
                      {svc.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#0d2137", mb: 1 }}>
                      {svc.title}
                    </Typography>
                    <Typography sx={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.7 }}>
                      {svc.desc}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 2.5, color: svc.color }}>
                      <Typography sx={{ fontSize: "0.88rem", fontWeight: 600 }}>Learn more</Typography>
                      <EastIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════ WHY US ══════ */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(135deg, #0d2137 0%, #123457 100%)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Chip label="Why Choose Us" sx={{ width: "fit-content", bgcolor: "rgba(127,208,255,0.12)", color: "#7fd0ff", fontWeight: 600 }} />
                <Typography variant="h3" sx={{ fontWeight: 900, color: "white", fontSize: { xs: "2rem", md: "2.6rem" } }}>
                  One Agency. <br />
                  <Box component="span" sx={{ color: "#7fd0ff" }}>Total Sync.</Box>
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  Unlike fragmented agencies, we align every channel — SEO, content, ads,
                  and dev — into a single synchronized strategy so nothing is ever out of step.
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                {features.map((f) => (
                  <Box key={f} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <CheckCircleOutlinedIcon sx={{ color: "#34d399", mt: 0.3, flexShrink: 0 }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem" }}>{f}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══════ TESTIMONIALS ══════ */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Client Stories" sx={{ bgcolor: "rgba(15,44,77,0.08)", color: "#0f2c4d", fontWeight: 600, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#0d2137", fontSize: { xs: "2rem", md: "2.6rem" } }}>
              Real Results. Real Words.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid key={t.name} size={{ xs: 12, md: 4 }}>
                <Card sx={{
                  height: "100%", borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", gap: 0.3, mb: 2 }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon key={i} sx={{ color: "#fbbf24", fontSize: 18 }} />
                      ))}
                    </Box>
                    <FormatQuoteIcon sx={{ color: "#0f2c4d", opacity: 0.15, fontSize: 48, mb: 1 }} />
                    <Typography sx={{ color: "#334155", lineHeight: 1.75, fontSize: "0.97rem", mb: 3 }}>
                      {t.text}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "#0f2c4d", color: "#7fd0ff", fontWeight: 700, width: 44, height: 44 }}>
                        {t.avatar}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#0d2137", fontSize: "0.95rem" }}>{t.name}</Typography>
                        <Typography sx={{ color: "#64748b", fontSize: "0.82rem" }}>{t.role}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════ CTA BANNER ══════ */}
      <Box sx={{
        py: { xs: 8, md: 10 },
        background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
        textAlign: "center",
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#0d2137", mb: 2, fontSize: { xs: "2rem", md: "2.8rem" } }}>
            Ready to Sync Your Growth?
          </Typography>
          <Typography sx={{ color: "rgba(13,33,55,0.75)", fontSize: "1.15rem", mb: 5 }}>
            Let's build something powerful together. Start with a free strategy call.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
            <Button
              component={Link}
              to={ROUTE_PATHS.SERVICES}
              variant="contained"
              size="large"
              endIcon={<EastIcon />}
              sx={{
                bgcolor: "#0d2137", color: "white",
                fontWeight: 800, fontSize: "1.05rem",
                px: 5, py: 1.8, borderRadius: "10px", textTransform: "none",
                boxShadow: "0 8px 32px rgba(13,33,55,0.35)",
                "&:hover": { bgcolor: "#0f2c4d" },
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to={ROUTE_PATHS.ABOUT}
              variant="outlined"
              size="large"
              sx={{
                color: "#0d2137", borderColor: "rgba(13,33,55,0.4)",
                fontWeight: 700, fontSize: "1.05rem",
                px: 5, py: 1.8, borderRadius: "10px", textTransform: "none",
                "&:hover": { borderColor: "#0d2137", bgcolor: "rgba(13,33,55,0.06)" },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}