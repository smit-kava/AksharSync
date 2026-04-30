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
                  Template & Creative <span style={{ color: THEME_COLOR }}>Review</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.2rem", lineHeight: 1.6, mb: 5, maxWidth: 600 }}>
                  Our Template & Creative Review evaluates your email templates, SMS designs, and marketing creatives to ensure they drive maximum performance, user engagement, and visual consistency across all touchpoints.
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

              {/* Right Side Graphic (Template Wireframes) */}
              <Box sx={{ position: "relative", display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center", height: 400 }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)", zIndex: 0 }} />
                
                {/* Main Email Template */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", zIndex: 2, width: 260 }}
                >
                  <Box sx={{ 
                    p: 2, borderRadius: "16px", bgcolor: "#fff", 
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    display: "flex", flexDirection: "column", gap: 1.5
                  }}>
                    {/* Header */}
                    <Box sx={{ width: "100%", height: 80, bgcolor: alpha(THEME_COLOR, 0.1), borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ColorLensIcon sx={{ color: THEME_COLOR, opacity: 0.5, fontSize: 32 }} />
                    </Box>
                    {/* Title lines */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 1, alignItems: "center" }}>
                      <Box sx={{ width: "60%", height: 10, bgcolor: "#e5e7eb", borderRadius: 4 }} />
                      <Box sx={{ width: "40%", height: 8, bgcolor: "#f3f4f6", borderRadius: 4 }} />
                    </Box>
                    {/* Content */}
                    <Box sx={{ width: "100%", height: 60, bgcolor: "#f9fafb", borderRadius: "8px", border: "1px dashed #e5e7eb" }} />
                    {/* CTA */}
                    <Box sx={{ alignSelf: "center", width: "50%", height: 32, bgcolor: THEME_COLOR, borderRadius: "16px", mt: 1 }} />
                  </Box>
                </motion.div>

                {/* Back SMS Template */}
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [-5, -5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ position: "absolute", zIndex: 1, left: -20, top: 40, width: 160 }}
                >
                  <Box sx={{ 
                    p: 2, borderRadius: "24px", bgcolor: alpha("#fff", 0.05), border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
                    display: "flex", flexDirection: "column", gap: 2, height: 280
                  }}>
                    {/* SMS Bubble */}
                    <Box sx={{ alignSelf: "flex-start", bgcolor: "rgba(255,255,255,0.1)", p: 1.5, borderRadius: "12px 12px 12px 2px", width: "80%" }}>
                       <Box sx={{ width: "100%", height: 4, bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2, mb: 1 }} />
                       <Box sx={{ width: "70%", height: 4, bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                    </Box>
                    {/* SMS Bubble Response */}
                    <Box sx={{ alignSelf: "flex-end", bgcolor: THEME_COLOR, p: 1.5, borderRadius: "12px 12px 2px 12px", width: "70%" }}>
                       <Box sx={{ width: "100%", height: 4, bgcolor: "rgba(255,255,255,0.6)", borderRadius: 2, mb: 1 }} />
                       <Box sx={{ width: "50%", height: 4, bgcolor: "rgba(255,255,255,0.6)", borderRadius: 2 }} />
                    </Box>
                    {/* Image Attachment */}
                    <Box sx={{ alignSelf: "flex-start", bgcolor: "rgba(255,255,255,0.05)", borderRadius: "8px", width: "80%", height: 80, border: "1px dashed rgba(255,255,255,0.2)" }} />
                  </Box>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], x: [5, -5, 5] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  style={{ position: "absolute", zIndex: 3, right: 0, top: 40 }}
                >
                  <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: alpha("#fff", 0.05), border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", color: "#4ade80", display: "flex", alignItems: "center", gap: 1 }}>
                    <SpeedIcon fontSize="small" /> <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>Optimized</Typography>
                  </Box>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ position: "absolute", zIndex: 3, right: -10, bottom: 60 }}
                >
                  <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: alpha(THEME_COLOR, 0.2), border: `1px solid ${alpha(THEME_COLOR, 0.4)}`, backdropFilter: "blur(10px)", color: THEME_COLOR, display: "flex", alignItems: "center", gap: 1 }}>
                    <ExtensionIcon fontSize="small" /> <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>Modular</Typography>
                  </Box>
                </motion.div>
                
              </Box>
            </Box>

            {/* 2. Before & After Showcase */}
            <Box sx={{ py: 2 }}>
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
                  The Impact of a <span style={{ color: THEME_COLOR }}>Template Audit</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                  See how we transform underperforming creative assets into high-converting, mobile-optimized experiences.
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 8, md: 6 } }}>
                
                {/* BEFORE TEMPLATE */}
                <Box>
                  <Typography sx={{ color: "#f87171", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", mb: 3, display: "flex", alignItems: "center", gap: 1.5, justifyContent: "center" }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#f87171", boxShadow: "0 0 10px #f87171" }} /> Before: Unoptimized
                  </Typography>
                  <Box sx={{ 
                    p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.02), 
                    border: "1px dashed rgba(248,113,113,0.3)", position: "relative",
                    height: 450, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                  }}>
                    {/* Simulated Bad Email */}
                    <Box sx={{ width: "75%", height: "90%", bgcolor: "#e5e7eb", borderRadius: "4px", p: 2, display: "flex", flexDirection: "column", opacity: 0.8, boxShadow: "0 4px 10px rgba(0,0,0,0.3)", overflow: "hidden" }}>
                      <Box sx={{ width: "100%", height: 120, bgcolor: "#d1d5db", mb: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700 }}>Image Header (Slow Load)</Typography>
                      </Box>
                      <Typography sx={{ color: "#4b5563", fontSize: "0.85rem", mb: 1, textAlign: "left", fontWeight: 700 }}>Dear Customer,</Typography>
                      <Box sx={{ width: "100%", height: 6, bgcolor: "#9ca3af", mb: 1, borderRadius: 3 }} />
                      <Box sx={{ width: "90%", height: 6, bgcolor: "#9ca3af", mb: 1, borderRadius: 3 }} />
                      <Box sx={{ width: "95%", height: 6, bgcolor: "#9ca3af", mb: 1, borderRadius: 3 }} />
                      <Box sx={{ width: "80%", height: 6, bgcolor: "#9ca3af", mb: 3, borderRadius: 3 }} />
                      <Box sx={{ alignSelf: "flex-start", bgcolor: "#9ca3af", color: "#fff", px: 2, py: 0.5, fontSize: "0.7rem", borderRadius: "2px", fontWeight: 700 }}>Click here</Box>
                    </Box>
                    
                    {/* Annotations */}
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 60, right: -20, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(248,113,113,0.15)", border: "1px solid #f87171", color: "#f87171", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        All-image design
                      </Box>
                    </motion.div>
                    <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: 120, left: -20, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(248,113,113,0.15)", border: "1px solid #f87171", color: "#f87171", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        Hard to read text
                      </Box>
                    </motion.div>
                    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: 40, right: -10, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(248,113,113,0.15)", border: "1px solid #f87171", color: "#f87171", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        Weak, tiny CTA
                      </Box>
                    </motion.div>
                  </Box>
                </Box>

                {/* AFTER TEMPLATE */}
                <Box>
                  <Typography sx={{ color: "#4ade80", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", mb: 3, display: "flex", alignItems: "center", gap: 1.5, justifyContent: "center" }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#4ade80", boxShadow: "0 0 10px #4ade80" }} /> After: Optimized
                  </Typography>
                  <Box sx={{ 
                    p: 4, borderRadius: "24px", bgcolor: alpha(THEME_COLOR, 0.05), 
                    border: `1px solid ${alpha(THEME_COLOR, 0.3)}`, position: "relative",
                    height: 450, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 20px 40px -10px ${alpha(THEME_COLOR, 0.15)}`
                  }}>
                    {/* Simulated Good Email */}
                    <Box sx={{ width: "75%", height: "90%", bgcolor: "#fff", borderRadius: "12px", p: 3, display: "flex", flexDirection: "column", boxShadow: "0 15px 35px rgba(0,0,0,0.4)", overflow: "hidden", position: "relative", zIndex: 1 }}>
                      <Typography sx={{ color: THEME_COLOR, fontSize: "1rem", fontWeight: 900, mb: 3, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>Brand Logo</Typography>
                      <Typography sx={{ color: "#111827", fontSize: "1.4rem", fontWeight: 900, mb: 1, textAlign: "center", lineHeight: 1.2 }}>Exclusive Offer</Typography>
                      <Typography sx={{ color: "#4b5563", fontSize: "0.85rem", mb: 4, textAlign: "center", lineHeight: 1.5 }}>A clear, concise message that gets straight to the point using live text.</Typography>
                      
                      <Box sx={{ mt: "auto", alignSelf: "center", bgcolor: THEME_COLOR, color: "#fff", px: 4, py: 1.5, fontSize: "0.9rem", fontWeight: 800, borderRadius: "24px", width: "100%", textAlign: "center", boxShadow: `0 8px 15px ${alpha(THEME_COLOR, 0.3)}` }}>
                        Shop the Sale
                      </Box>
                    </Box>
                    
                    {/* Annotations */}
                    <motion.div animate={{ y: [3, -3, 3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 60, left: -20, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        Live text headers
                      </Box>
                    </motion.div>
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 200, right: -20, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        Modular structure
                      </Box>
                    </motion.div>
                    <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: 60, right: -20, zIndex: 2 }}>
                      <Box sx={{ display: { xs: "none", sm: "block" }, bgcolor: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", color: "#4ade80", px: 2, py: 1, borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700, backdropFilter: "blur(5px)" }}>
                        Bulletproof CTA
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 3. Evaluation Criteria Grid */}
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, textAlign: "center", fontSize: { xs: "2rem", md: "3rem" } }}>
                Evaluation <span style={{ color: THEME_COLOR }}>Criteria</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", textAlign: "center", mb: 8, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}>
                We leave no stone unturned. Our comprehensive audit checks every aspect of your retention assets to ensure they are built for conversion.
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
                {[
                  { title: "Mobile Responsiveness", icon: <SmartphoneIcon />, desc: "We check layout adaptability across devices, ensuring readability and touch-friendly design for every user.", example: "If buttons are too small to tap on iOS devices, conversions drop. We ensure minimum tap targets of 44x44px." },
                  { title: "Conversion-Focused Structure", icon: <AccountTreeIcon />, desc: "We evaluate content flow and hierarchy to ensure your messaging naturally leads to user action.", example: "Users scan in an 'F' pattern. We restructure layouts to place key value propositions directly in their eyeline." },
                  { title: "CTA Clarity", icon: <TouchAppIcon />, desc: "We check the visibility and wording of call-to-actions, focusing on driving a single, clear user action.", example: "Competing CTAs confuse users. We isolate the primary action and use contrasting colors to make it unmissable." },
                  { title: "Modular Template Quality", icon: <ExtensionIcon />, desc: "We assess reusable components and flexibility to ensure easy updates and high scalability for your team.", example: "Hardcoded emails break easily. We verify your templates use modular blocks for reliable, code-free edits." },
                  { title: "Rendering Issues", icon: <PreviewIcon />, desc: "We analyze performance across email clients (Gmail, Outlook, mobile) to identify layout breaks and inconsistencies.", example: "Outlook often breaks rounded buttons and background images. We provide fallback VML code to fix this globally." },
                  { title: "Design Performance", icon: <SpeedIcon />, desc: "We evaluate loading speed, image optimization, and visual hierarchy to ensure the design supports maximum engagement.", example: "Heavy GIFs cause emails to clip in Gmail. We optimize asset weight to stay well under the critical 102KB limit." },
                  { title: "Brand Consistency", icon: <ColorLensIcon />, desc: "We check alignment with brand colors, typography, tone, and messaging to ensure a uniform experience.", example: "Inconsistent fonts break trust. We verify web-safe fallbacks align perfectly with your primary brand identity." }
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
