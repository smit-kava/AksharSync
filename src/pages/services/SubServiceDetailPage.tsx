import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha, Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FAQComponent } from "../../components";
import type { DevSubService } from "../../data/devServicesData";
import { appDevSubServices, webDevSubServices } from "../../data/devServicesData";
import { ROUTE_PATHS } from "../../routes/paths";

interface Props { category: "web" | "app"; }

export default function SubServiceDetailPage({ category }: Props) {
  const { subSlug } = useParams<{ subSlug: string }>();
  const navigate = useNavigate();
  const pool = category === "web" ? webDevSubServices : appDevSubServices;
  const svc: DevSubService | undefined = pool.find((s) => s.slug === subSlug);
  const parentPath = category === "web" ? ROUTE_PATHS.SERVICE_WEB_DEVELOPMENT : ROUTE_PATHS.SERVICE_APP_DEVELOPMENT;
  const parentLabel = category === "web" ? "Web Development" : "App Development";

  if (!svc) return <Navigate to={parentPath} replace />;

  const C = svc.accent;

  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Stack spacing={8}>

            {/* Back */}
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(parentPath)}
              sx={{ width: "fit-content", color: alpha("#fff", 0.4), "&:hover": { color: "#fff", bgcolor: alpha("#fff", 0.05) } }}>
              Back to {parentLabel}
            </Button>

            {/* Hero */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
              <Box>
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2, py: 1, borderRadius: "12px", bgcolor: alpha(C, 0.1), border: `1px solid ${alpha(C, 0.2)}`, mb: 3 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: C }} />
                  <Typography sx={{ color: C, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {svc.label} — {parentLabel}
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 900, lineHeight: 1.05, mb: 2 }}>
                  {svc.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span style={{ color: C }}>{svc.title.split(" ").slice(-1)}</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.55), fontSize: "1.15rem", fontWeight: 600, mb: 2 }}>{svc.tagline}</Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1rem", lineHeight: 1.75, mb: 5, maxWidth: 560 }}>{svc.description}</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ bgcolor: C, color: "#060e1a", py: 1.5, px: 4, fontWeight: 800, fontSize: "1rem", borderRadius: "12px", "&:hover": { bgcolor: alpha(C, 0.85) } }}>
                    Get Started
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ borderColor: alpha(C, 0.5), color: C, py: 1.5, px: 4, fontWeight: 700, borderRadius: "12px", "&:hover": { borderColor: C, bgcolor: alpha(C, 0.05) } }}>
                    Free Consultation
                  </Button>
                </Stack>
              </Box>

              {/* Stats card */}
              <Box sx={{ display: { xs: "none", md: "block" }, position: "relative" }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "130%", height: "130%", background: `radial-gradient(circle, ${alpha(C, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
                  <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -10px ${alpha(C, 0.2)}` }}>
                    <Stack spacing={3}>
                      {svc.stats.map((s, i) => (
                        <Box key={i} sx={{ p: 2.5, borderRadius: "16px", bgcolor: alpha(C, 0.07), border: `1px solid ${alpha(C, 0.15)}` }}>
                          <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5 }}>{s.label}</Typography>
                          <Typography sx={{ color: C, fontWeight: 900, fontSize: "2.5rem", lineHeight: 1 }}>{s.value}</Typography>
                        </Box>
                      ))}
                      <Box sx={{ pt: 2, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#34d399" }} />
                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.78rem" }}>Results from AksharSync engagements</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* Features */}
            <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: "24px", background: `linear-gradient(135deg, ${alpha(C, 0.06)} 0%, rgba(255,255,255,0.01) 100%)`, border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
              <Box sx={{ position: "absolute", top: 0, right: 0, width: 250, height: 250, background: `radial-gradient(circle, ${alpha(C, 0.12)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                What's <span style={{ color: C }}>Included</span>
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
                {svc.features.map((f, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, borderRadius: "12px", bgcolor: alpha("#fff", 0.02), border: `1px solid ${alpha("#fff", 0.05)}`, transition: "all 0.25s", "&:hover": { bgcolor: alpha(C, 0.05), borderColor: alpha(C, 0.2) } }}>
                    <CheckCircleIcon sx={{ color: C, fontSize: 18, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: alpha("#fff", 0.8) }}>{f}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Process */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
                How We <span style={{ color: C }}>Deliver</span>
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 3, position: "relative" }}>
                <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", top: "40px", left: "12%", right: "12%", height: "2px", background: `linear-gradient(90deg, transparent, ${alpha(C, 0.5)}, transparent)` }} />
                {svc.process.map((p, i) => (
                  <Box key={i} sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: "50%", bgcolor: "#060e1a", border: `2px solid ${C}`, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2.5, boxShadow: `0 0 20px ${alpha(C, 0.25)}` }}>
                      <Typography sx={{ fontWeight: 900, fontSize: "1.4rem", color: C }}>{p.step}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", mb: 1 }}>{p.title}</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.88rem", lineHeight: 1.6, px: 1 }}>{p.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* CTA */}
            <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: "24px", background: `linear-gradient(135deg, ${alpha(C, 0.12)} 0%, ${alpha("#060e1a", 1)} 100%)`, border: `1px solid ${alpha(C, 0.25)}`, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", gap: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Ready to get started with <span style={{ color: C }}>{svc.title}?</span></Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1rem" }}>Book a free discovery call — no commitment, no pressure.</Typography>
              </Box>
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                sx={{ bgcolor: C, color: "#060e1a", py: 1.75, px: 5, fontWeight: 800, fontSize: "1.05rem", borderRadius: "14px", flexShrink: 0, "&:hover": { bgcolor: alpha(C, 0.85) } }}>
                Book Discovery Call
              </Button>
            </Box>

            {/* FAQ */}
            <FAQComponent subtitle={`Common questions about our ${svc.title} service.`} items={svc.faq} />

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
