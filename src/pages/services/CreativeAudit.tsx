import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ExtensionIcon from "@mui/icons-material/Extension";
import PreviewIcon from "@mui/icons-material/Preview";
import SpeedIcon from "@mui/icons-material/Speed";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const THEME_COLOR = "#c084fc"; // Purple-400

export default function CreativeAudit() {
  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={10}>

            {/* 1. Header Section */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
              <Box>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1.5,
                  px: 2, py: 1, borderRadius: "12px",
                  bgcolor: alpha(THEME_COLOR, 0.1), border: "1px solid", borderColor: alpha(THEME_COLOR, 0.2),
                  mb: 4
                }}>
                  <AnalyticsIcon sx={{ color: THEME_COLOR, fontSize: 24 }} />
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Service Module
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                  Retention Asset <span style={{ color: THEME_COLOR }}>Evaluation</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.2rem", lineHeight: 1.6, mb: 5, maxWidth: 600 }}>
                  Your retention assets—emails, SMS, push notifications, and automation templates—are the touchpoints that drive customer lifetime value. We comprehensively audit them to ensure maximum performance, engagement, and conversions.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: THEME_COLOR, color: "#060e1a", py: 1.5, px: 4,
                    fontWeight: 800, fontSize: "1rem", borderRadius: "12px",
                    "&:hover": { bgcolor: alpha(THEME_COLOR, 0.8) }
                  }}
                >
                  Request an Audit
                </Button>
              </Box>

              {/* Right Side Graphic (Audit Dashboard Concept) */}
              <Box sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)", zIndex: 0 }} />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <Box sx={{
                    p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03),
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 20px 40px -10px ${alpha(THEME_COLOR, 0.15)}`
                  }}>
                    <Stack spacing={4}>
                      {[
                        { label: "Design Performance", score: "92/100", color: "#4ade80", progress: "92%" },
                        { label: "Mobile Responsiveness", score: "88/100", color: "#facc15", progress: "88%" },
                        { label: "Rendering Issues", score: "Action Required", color: "#f87171", progress: "45%" }
                      ].map((item, i) => (
                        <Box key={i} sx={{ pb: 2, borderBottom: i !== 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography sx={{ fontWeight: 700, color: alpha("#fff", 0.8), fontSize: "0.95rem" }}>{item.label}</Typography>
                            <Typography sx={{ fontWeight: 900, color: item.color, fontSize: "0.9rem" }}>{item.score}</Typography>
                          </Box>
                          <Box sx={{ height: 6, borderRadius: 3, bgcolor: alpha("#fff", 0.1), overflow: "hidden" }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: item.progress }}
                              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                              style={{ height: "100%", borderRadius: 3, backgroundColor: item.color }}
                            />
                          </Box>
                        </Box>
                      ))}
                      <Box sx={{ mt: 2, p: 2, borderRadius: "12px", bgcolor: alpha(THEME_COLOR, 0.1), border: `1px solid ${alpha(THEME_COLOR, 0.2)}` }}>
                        <Typography sx={{ color: THEME_COLOR, fontSize: "0.85rem", fontWeight: 800, mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Audit Insight</Typography>
                        <Typography sx={{ color: alpha("#fff", 0.7), fontSize: "0.9rem", lineHeight: 1.5 }}>
                          Resolving Outlook rendering issues on your welcome series will recover an estimated 12% in lost click-throughs.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* 2. Evaluation Criteria Grid */}
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, textAlign: "center", fontSize: { xs: "2rem", md: "3rem" } }}>
                Evaluation <span style={{ color: THEME_COLOR }}>Criteria</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", textAlign: "center", mb: 8, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}>
                We leave no stone unturned. Our comprehensive audit checks every aspect of your retention assets to ensure they are built for conversion.
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
                {[
                  { title: "Mobile Responsiveness", icon: <SmartphoneIcon />, desc: "Focus on how designs perform on mobile devices, readability, layout adaptability, and touch-friendly interactions.", example: "If buttons are too small to tap on iOS devices, conversions drop. We ensure minimum tap targets of 44x44px." },
                  { title: "Conversion-Focused Structure", icon: <AccountTreeIcon />, desc: "Evaluate whether content follows a logical flow that leads users toward action (clear messaging, hierarchy, intent-driven layout).", example: "Users scan in an 'F' pattern. We restructure layouts to place key value propositions directly in their eyeline." },
                  { title: "CTA Clarity", icon: <TouchAppIcon />, desc: "Check if call-to-action buttons are clear, visible, and focused on a single primary action.", example: "Competing CTAs confuse users. We isolate the primary action and use contrasting colors to make it unmissable." },
                  { title: "Modular Template Quality", icon: <ExtensionIcon />, desc: "Assess if templates are built using reusable components that allow easy updates and consistency.", example: "Hardcoded emails break easily. We verify your templates use modular blocks for reliable, code-free edits." },
                  { title: "Rendering Issues", icon: <PreviewIcon />, desc: "Analyze how emails and templates render across different platforms like Gmail, Outlook, and mobile apps.", example: "Outlook often breaks rounded buttons and background images. We provide fallback VML code to fix this globally." },
                  { title: "Design Performance", icon: <SpeedIcon />, desc: "Evaluate loading speed, image optimization, visual hierarchy, and impact on user engagement.", example: "Heavy GIFs cause emails to clip in Gmail. We optimize asset weight to stay well under the critical 102KB limit." },
                  { title: "Brand Consistency", icon: <ColorLensIcon />, desc: "Ensure alignment with brand guidelines such as colors, typography, tone, and messaging.", example: "Inconsistent fonts break trust. We verify web-safe fallbacks align perfectly with your primary brand identity." }
                ].map((item, i) => (
                  <Box key={i} sx={{
                    p: 4, borderRadius: "20px", bgcolor: alpha("#fff", 0.02),
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.3s ease",
                    display: "flex", flexDirection: "column",
                    gridColumn: i === 6 ? { xs: "1", sm: "1 / -1", md: "2" } : "auto", // Center the last item perfectly
                    "&:hover": { transform: "translateY(-5px)", borderColor: alpha(THEME_COLOR, 0.4), bgcolor: alpha("#fff", 0.04), boxShadow: `0 10px 30px -10px ${alpha(THEME_COLOR, 0.1)}` }
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                      <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: alpha(THEME_COLOR, 0.1), color: THEME_COLOR }}>
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>{item.title}</Typography>
                    </Box>
                    <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.95rem", lineHeight: 1.6, mb: 4, flex: 1 }}>
                      {item.desc}
                    </Typography>
                    <Box sx={{ p: 2.5, borderRadius: "12px", bgcolor: "rgba(0,0,0,0.3)", borderLeft: `3px solid ${THEME_COLOR}` }}>
                      <Typography sx={{ color: THEME_COLOR, fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, mb: 1, letterSpacing: "0.05em" }}>Real-World Scenario</Typography>
                      <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.5 }}>"{item.example}"</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
