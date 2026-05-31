import { useRef } from "react";
import { Box, Container, Typography, alpha, Stack, Button, Chip, IconButton } from "@mui/material";
import { FAQComponent } from "../../components";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SpeedIcon from "@mui/icons-material/Speed";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InsightsIcon from "@mui/icons-material/Insights";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CodeIcon from "@mui/icons-material/Code";
import AndroidIcon from "@mui/icons-material/Android";
import CloudIcon from "@mui/icons-material/Cloud";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import SecurityIcon from "@mui/icons-material/Security";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import { appDevSubServices } from "../../data/devServicesData";

const THEME = "#a78bfa";

const subIcons = [AndroidIcon, DeveloperModeIcon, CloudIcon, NotificationsActiveIcon, TroubleshootIcon, InsightsIcon, SecurityIcon];

const techStack = [
  { label: "Kotlin / Android", color: "#a78bfa" },
  { label: "React Native", color: "#61dafb" },
  { label: "Firebase", color: "#fbbf24" },
  { label: "Node.js", color: "#339933" },
  { label: "PostgreSQL", color: "#3b82f6" },
];

export default function AppDevelopmentService() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Stack spacing={10}>

            {/* ── Hero ── */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
              <Box>
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, px: 2, py: 1, borderRadius: "12px", bgcolor: alpha(THEME, 0.1), border: `1px solid ${alpha(THEME, 0.2)}`, mb: 4 }}>
                  <PhoneIphoneIcon sx={{ color: THEME, fontSize: 20 }} />
                  <Typography sx={{ color: THEME, fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Core Development Service</Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.05, mb: 3 }}>
                  App Development <span style={{ color: THEME }}>Solutions</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.55), fontSize: "1.1rem", lineHeight: 1.75, mb: 5, maxWidth: 560 }}>
                  We engineer iOS and Android applications designed for retention and revenue. From native Swift and Kotlin to scalable React Native architectures.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ bgcolor: THEME, color: "#060e1a", py: 1.5, px: 4, fontWeight: 800, fontSize: "1rem", borderRadius: "12px", "&:hover": { bgcolor: alpha(THEME, 0.85) } }}>
                    Discuss Your App
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ borderColor: alpha(THEME, 0.5), color: THEME, py: 1.5, px: 4, fontWeight: 700, borderRadius: "12px", "&:hover": { borderColor: THEME, bgcolor: alpha(THEME, 0.05) } }}>
                    View Case Studies
                  </Button>
                </Stack>
              </Box>
              <Box sx={{ display: { xs: "none", md: "block" }, position: "relative" }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "130%", height: "130%", background: `radial-gradient(circle, ${alpha(THEME, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
                  <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -10px ${alpha(THEME, 0.18)}` }}>
                    <Stack spacing={3}>
                      {[{ label: "Crash-free Sessions", value: "99.8%", w: "98%" }, { label: "App Store Avg.", value: "4.8 ★", w: "96%" }, { label: "Retention Lift", value: "+34%", w: "75%" }].map((s, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: alpha(THEME, 0.1) }}>
                            <SpeedIcon sx={{ color: THEME, fontSize: 18 }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                              <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.82rem" }}>{s.label}</Typography>
                              <Typography sx={{ color: THEME, fontWeight: 800, fontSize: "0.82rem" }}>{s.value}</Typography>
                            </Box>
                            <Box sx={{ height: 6, borderRadius: 4, bgcolor: alpha("#fff", 0.08), overflow: "hidden" }}>
                              <motion.div initial={{ width: 0 }} animate={{ width: s.w }} transition={{ duration: 1.5, delay: i * 0.25 }} style={{ height: "100%", borderRadius: 4, backgroundColor: THEME }} />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* ── Sub-Services Horizontal Scroll ── */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box>
                  <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.6rem" }, mb: 1 }}>
                    Our <span style={{ color: THEME }}>App Services</span>
                  </Typography>
                  <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.95rem" }}>
                    Click any service to explore in detail
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" } }}>
                  <IconButton onClick={() => scroll("left")} sx={{ bgcolor: alpha("#fff", 0.05), color: alpha("#fff", 0.6), border: "1px solid rgba(255,255,255,0.1)", "&:hover": { bgcolor: alpha(THEME, 0.12), color: THEME, borderColor: alpha(THEME, 0.3) } }}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton onClick={() => scroll("right")} sx={{ bgcolor: alpha("#fff", 0.05), color: alpha("#fff", 0.6), border: "1px solid rgba(255,255,255,0.1)", "&:hover": { bgcolor: alpha(THEME, 0.12), color: THEME, borderColor: alpha(THEME, 0.3) } }}>
                    <ChevronRightIcon />
                  </IconButton>
                </Stack>
              </Box>

              {/* Scroll container */}
              <Box sx={{ position: "relative" }}>
                {/* Left fade */}
                <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(90deg, #060e1a, transparent)", zIndex: 2, pointerEvents: "none" }} />
                {/* Right fade */}
                <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(270deg, #060e1a, transparent)", zIndex: 2, pointerEvents: "none" }} />

                <Box ref={scrollRef} sx={{ display: "flex", gap: 2.5, overflowX: "auto", pb: 2, scrollSnapType: "x mandatory", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
                  {appDevSubServices.map((svc, i) => {
                    const Icon = subIcons[i] || CodeIcon;
                    const to = `/services/app-development-solutions/${svc.slug}`;
                    return (
                      <Box key={svc.slug} component={RouterLink} to={to}
                        sx={{ flexShrink: 0, width: { xs: 280, sm: 310 }, scrollSnapAlign: "start", textDecoration: "none", display: "flex", flexDirection: "column", p: 3, borderRadius: "20px", bgcolor: alpha("#fff", 0.02), border: `1px solid ${alpha("#fff", 0.07)}`, cursor: "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden",
                          "&:hover": { transform: "translateY(-6px)", bgcolor: alpha(svc.accent, 0.05), borderColor: alpha(svc.accent, 0.35), boxShadow: `0 16px 40px ${alpha(svc.accent, 0.15)}` } }}>
                        {/* Glow */}
                        <Box sx={{ position: "absolute", top: -40, right: -40, width: 160, height: 140, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(svc.accent, 0.2)} 0%, transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />
                        {/* Label */}
                        <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.15em", color: svc.accent, textTransform: "uppercase", mb: 2 }}>{svc.label}</Typography>
                        {/* Icon */}
                        <Box sx={{ width: 48, height: 48, borderRadius: "14px", bgcolor: alpha(svc.accent, 0.12), border: `1px solid ${alpha(svc.accent, 0.25)}`, display: "flex", alignItems: "center", justifyContent: "center", color: svc.accent, mb: 2.5, filter: `drop-shadow(0 0 8px ${alpha(svc.accent, 0.35)})` }}>
                          <Icon sx={{ fontSize: "1.4rem" }} />
                        </Box>
                        {/* Title */}
                        <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: "#fff", mb: 1, lineHeight: 1.3 }}>{svc.title}</Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: svc.accent, fontWeight: 600, mb: 1.5 }}>{svc.tagline}</Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: alpha("#fff", 0.4), lineHeight: 1.6, flex: 1, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>{svc.description}</Typography>
                        {/* Features chips */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2.5, mb: 2 }}>
                          {svc.features.slice(0, 3).map((f, fi) => (
                            <Chip key={fi} label={f} size="small" sx={{ fontSize: "0.65rem", fontWeight: 600, bgcolor: alpha(svc.accent, 0.08), color: svc.accent, border: `1px solid ${alpha(svc.accent, 0.18)}`, height: 22 }} />
                          ))}
                        </Box>
                        {/* CTA */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: svc.accent, fontSize: "0.78rem", fontWeight: 700, pt: 2, borderTop: `1px solid ${alpha(svc.accent, 0.12)}` }}>
                          <span>Explore service</span>
                          <ArrowForwardIcon sx={{ fontSize: "0.85rem" }} />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* ── Tech Stack ── */}
            <Box sx={{ p: { xs: 4, md: 5 }, borderRadius: "24px", bgcolor: alpha("#fff", 0.02), border: "1px solid rgba(255,255,255,0.05)" }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>
                Our <span style={{ color: THEME }}>Technology Stack</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.45), mb: 4, fontSize: "0.95rem" }}>Modern frameworks for performant, scalable mobile applications.</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {techStack.map((t, i) => (
                  <Chip key={i} label={t.label} sx={{ color: t.color, fontWeight: 700, fontSize: "0.88rem", bgcolor: alpha(t.color, 0.08), border: `1px solid ${alpha(t.color, 0.25)}`, px: 1, py: 2.5, "&:hover": { bgcolor: alpha(t.color, 0.15) } }} />
                ))}
              </Box>
            </Box>

            {/* ── Benefits ── */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 6, alignItems: "center" }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                  Apps engineered for <span style={{ color: THEME }}>growth & retention</span>
                </Typography>
                <Stack spacing={2.5}>
                  {[
                    { title: "Flawless Performance", desc: "Silky smooth 60fps animations and immediate interaction feedback." },
                    { title: "Offline Capabilities", desc: "Seamless UX even when users lose network connectivity." },
                    { title: "Push Notification Architecture", desc: "Built-in systems to re-engage users at the right moments." },
                    { title: "App Store Optimization Ready", desc: "Structures that make your app easier to discover organically." },
                  ].map((b, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 2 }}>
                      <CheckCircleIcon sx={{ color: THEME, mt: 0.3, flexShrink: 0 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.4, fontSize: "1rem" }}>{b.title}</Typography>
                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem" }}>{b.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ p: 4, borderRadius: "24px", background: `linear-gradient(135deg, ${alpha(THEME, 0.12)} 0%, ${alpha("#060e1a", 1)} 100%)`, border: `1px solid ${alpha(THEME, 0.2)}`, boxShadow: `0 20px 40px -10px ${alpha(THEME, 0.15)}` }}>
                <Typography sx={{ color: THEME, fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.1em", mb: 2 }}>Platform Stability</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: "3.5rem" }}>99.8%</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 4 }}>Crash-free session average</Typography>
                <Stack spacing={1.5}>
                  {[{ label: "Average App Rating", value: "4.8 ★" }, { label: "Launch Timeline", value: "8–16 Weeks" }, { label: "Maintenance", value: "24/7 Monitoring" }].map((r, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", pb: i < 2 ? 1.5 : 0 }}>
                      <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.9rem" }}>{r.label}</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* ── Why Us ── */}
            <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: "24px", bgcolor: alpha("#fff", 0.02), border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6, alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  Why Partner With <span style={{ color: THEME }}>AksharSync</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "1rem", mb: 4, lineHeight: 1.7 }}>
                  We don't just write code. We act as your technical co-founders, guiding product strategy, UX, and monetization.
                </Typography>
                <Stack spacing={2.5}>
                  {[
                    { icon: <VerifiedUserIcon />, title: "End-to-end Delivery", desc: "From concept and wireframes to App Store submission and marketing." },
                    { icon: <DataUsageIcon />, title: "Analytics Baked In", desc: "Every button press and screen view tracked from day one." },
                    { icon: <InsightsIcon />, title: "Focus on LTV", desc: "Features designed specifically to increase user lifetime value." },
                    { icon: <TrendingUpIcon />, title: "Scalable Architecture", desc: "Backends built to handle millions of active users." },
                  ].map((it, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ color: THEME, mt: 0.2, flexShrink: 0 }}>{it.icon}</Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>{it.title}</Typography>
                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.88rem" }}>{it.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ flex: 1, width: "100%" }}>
                <Box sx={{ p: 4, borderRadius: "20px", background: `linear-gradient(135deg, ${alpha(THEME, 0.15)} 0%, ${alpha("#060e1a", 1)} 100%)`, border: `1px solid ${alpha(THEME, 0.3)}`, textAlign: "center" }}>
                  <PhoneIphoneIcon sx={{ color: THEME, fontSize: 44, mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Ready to build your next app?</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.5), mb: 4, lineHeight: 1.6 }}>Start with a free discovery call to map your product roadmap.</Typography>
                  <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ bgcolor: THEME, color: "#060e1a", py: 1.5, fontWeight: 800, borderRadius: "12px", "&:hover": { bgcolor: alpha(THEME, 0.85) } }}>
                    Discuss Your Vision
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ── FAQ ── */}
            <FAQComponent subtitle="Common questions about our app development services." items={[
              { question: "Should I build Native or Cross-Platform?", answer: "We recommend Cross-Platform (React Native) for 80% of apps as it saves time and budget. Native (Swift/Kotlin) is best for high-performance games or apps relying heavily on specific device hardware." },
              { question: "Do you handle App Store submission?", answer: "Yes, we handle the entire process including developer account setup, provisioning profiles, metadata optimization (ASO), and the review process." },
              { question: "How much does a custom app cost?", answer: "It varies significantly based on complexity. A simple MVP might start at $15k, while a complex marketplace could exceed $80k. We provide detailed fixed-price quotes after discovery." },
              { question: "Do you provide backend development too?", answer: "Yes, we build secure, scalable backends using Node.js, Python, or Go, hosted on AWS or Google Cloud, fully integrated with your app." },
              { question: "Who owns the code?", answer: "You do. Upon project completion and final payment, full intellectual property and source code rights are transferred to you." },
            ]} />

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
