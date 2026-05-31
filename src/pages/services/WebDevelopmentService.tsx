import { useRef } from "react";
import { Box, Container, Typography, alpha, Stack, Button, Chip, IconButton } from "@mui/material";
import { FAQComponent } from "../../components";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LanguageIcon from "@mui/icons-material/Language";
import SpeedIcon from "@mui/icons-material/Speed";
import ApiIcon from "@mui/icons-material/Api";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InsightsIcon from "@mui/icons-material/Insights";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import { webDevSubServices } from "../../data/devServicesData";

const THEME = "#60a5fa";

const subIcons = [BrushIcon, StorefrontIcon, RocketLaunchIcon, IntegrationInstructionsIcon, SpeedIcon, ApiIcon, DevicesIcon, SecurityIcon];

const techStack = [
  { label: "React / Next.js", color: "#61dafb" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Shopify", color: "#95bf47" },
  { label: "WooCommerce", color: "#96588a" },
  { label: "Node.js", color: "#339933" },
  { label: "GraphQL", color: "#e535ab" },
  { label: "Tailwind CSS", color: "#38bdf8" },
  { label: "Vercel / AWS", color: "#f472b6" },
];

export default function WebDevelopmentService() {
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
                  <LanguageIcon sx={{ color: THEME, fontSize: 20 }} />
                  <Typography sx={{ color: THEME, fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Core Development Service</Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.05, mb: 3 }}>
                  Web Development <span style={{ color: THEME }}>Solutions</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.55), fontSize: "1.1rem", lineHeight: 1.75, mb: 5, maxWidth: 560 }}>
                  From pixel-perfect marketing sites to enterprise e-commerce platforms — we design and engineer web experiences that perform, convert, and scale.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ bgcolor: THEME, color: "#060e1a", py: 1.5, px: 4, fontWeight: 800, fontSize: "1rem", borderRadius: "12px", "&:hover": { bgcolor: alpha(THEME, 0.85) } }}>
                    Start a Project
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ borderColor: alpha(THEME, 0.5), color: THEME, py: 1.5, px: 4, fontWeight: 700, borderRadius: "12px", "&:hover": { borderColor: THEME, bgcolor: alpha(THEME, 0.05) } }}>
                    View Pricing
                  </Button>
                </Stack>
              </Box>
              <Box sx={{ display: { xs: "none", md: "block" }, position: "relative" }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "130%", height: "130%", background: `radial-gradient(circle, ${alpha(THEME, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
                  <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", boxShadow: `0 20px 40px -10px ${alpha(THEME, 0.18)}` }}>
                    <Stack spacing={3}>
                      {[{ label: "Avg. Page Load", value: "< 1.8s", w: "92%" }, { label: "Lighthouse Score", value: "98/100", w: "98%" }, { label: "Conversion Lift", value: "+40%", w: "80%" }].map((s, i) => (
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
                    Our <span style={{ color: THEME }}>Web Services</span>
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
                  {webDevSubServices.map((svc, i) => {
                    const Icon = subIcons[i] || CodeIcon;
                    const to = `/services/web-development-solutions/${svc.slug}`;
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
              <Typography sx={{ color: alpha("#fff", 0.45), mb: 4, fontSize: "0.95rem" }}>Battle-tested tools that power world-class digital experiences.</Typography>
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
                  The impact of a <span style={{ color: THEME }}>world-class website</span>
                </Typography>
                <Stack spacing={2.5}>
                  {[
                    { title: "Higher Conversion Rates", desc: "Strategically designed user flows guide visitors from curiosity to checkout." },
                    { title: "Faster Load Times", desc: "Sub-2s pages indexed better by Google and converting at 40% higher rates." },
                    { title: "Scalable Architecture", desc: "Systems built to handle 10x traffic spikes without downtime." },
                    { title: "Stronger Brand Trust", desc: "Professional, polished design signals credibility and drives purchase confidence." },
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
                <Typography sx={{ color: THEME, fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.1em", mb: 2 }}>Typical Results</Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: "3.5rem" }}>+40%</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 4 }}>Average Conversion Lift in 90 Days</Typography>
                <Stack spacing={1.5}>
                  {[{ label: "Delivery Timeline", value: "3–8 Weeks" }, { label: "Avg. Lighthouse Score", value: "95–100" }, { label: "Platform Support", value: "Shopify, Next.js, WP" }].map((r, i) => (
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
                  We combine deep technical expertise with marketing-first thinking — every line of code is written to serve a business outcome.
                </Typography>
                <Stack spacing={2.5}>
                  {[
                    { icon: <VerifiedUserIcon />, title: "Full-Stack Expertise", desc: "Frontend, backend, cloud infrastructure, and CRO — all under one roof." },
                    { icon: <DataUsageIcon />, title: "Data-Driven Decisions", desc: "Every design and architecture choice validated through analytics." },
                    { icon: <InsightsIcon />, title: "Growth-First Mindset", desc: "We build for conversion, retention, and scalability." },
                    { icon: <TrendingUpIcon />, title: "Proven Track Record", desc: "Hundreds of projects delivered across e-commerce, SaaS, and service businesses." },
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
                  <CodeIcon sx={{ color: THEME, fontSize: 44, mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Ready to build something remarkable?</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.5), mb: 4, lineHeight: 1.6 }}>Start with a free discovery call to map your project scope.</Typography>
                  <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIcon />} onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{ bgcolor: THEME, color: "#060e1a", py: 1.5, fontWeight: 800, borderRadius: "12px", "&:hover": { bgcolor: alpha(THEME, 0.85) } }}>
                    Start Your Project
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ── FAQ ── */}
            <FAQComponent subtitle="Common questions about our web development services." items={[
              { question: "How long does it take to build a website?", answer: "A typical marketing page takes 2–4 weeks. A full e-commerce store takes 4–8 weeks depending on scope and integrations." },
              { question: "Do you build on Shopify or custom platforms?", answer: "Both. We specialise in Shopify (including headless), WooCommerce, and fully custom Next.js applications." },
              { question: "Will my website be optimised for SEO?", answer: "Yes — SEO is baked in from day one: semantic HTML, structured data, Core Web Vitals, and sitemap generation." },
              { question: "Can you redesign my existing website?", answer: "Absolutely. We start with a full audit of your current site's performance, UX issues, and conversion bottlenecks." },
              { question: "Do you offer ongoing support after launch?", answer: "Yes — monthly retainer packages covering maintenance, monitoring, and CRO testing to keep your site growing." },
            ]} />

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
