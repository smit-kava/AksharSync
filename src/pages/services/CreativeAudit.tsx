import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CreativeIcon } from "../../components/icons";

export default function CreativeAudit() {
  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={4}>
            {/* Header section */}
            <Box>
              <Box sx={{ 
                display: "inline-flex", alignItems: "center", gap: 1.5, 
                px: 2, py: 1, borderRadius: "12px", 
                bgcolor: alpha("#a78bfa", 0.1), border: "1px solid", borderColor: alpha("#a78bfa", 0.2),
                mb: 3
              }}>
                <CreativeIcon sx={{ color: "#a78bfa", fontSize: 24 }} />
                <Typography sx={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Service Module 02
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                Template & Creative <span style={{ color: "#a78bfa" }}>Review</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 700, lineHeight: 1.8 }}>
                We evaluate your retention assets for mobile responsiveness, conversion-focused design, and brand consistency to ensure peak performance across all devices.
              </Typography>
            </Box>

            {/* Main Content Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, gap: 6, mt: 4 }}>
              <Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Visual & Strategic Audit</Typography>
                  <Stack spacing={3}>
                    {[
                      { title: "Mobile Responsiveness", desc: "Checking layout rendering across 50+ devices and email clients." },
                      { title: "Conversion Architecture", desc: "Evaluating CTA placement, hierarchy, and scan-ability." },
                      { title: "Modular Template Quality", desc: "Reviewing the technical efficiency and reusability of your code." },
                      { title: "Design Performance", desc: "Analyzing load times and image-to-text ratios for deliverability." },
                      { title: "Brand Consistency", desc: "Ensuring visual alignment between your website and retention channels." }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
                        <CheckCircleIcon sx={{ color: "#a78bfa", mt: 0.5 }} />
                        <Box>
                          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{item.title}</Typography>
                          <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem" }}>{item.desc}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
              <Stack spacing={3}>
                <Stack spacing={3}>
                  <Box sx={{ p: 4, borderRadius: "24px", background: "linear-gradient(135deg, #1a103a 0%, #060e1a 100%)", border: "1px solid rgba(167,139,250,0.15)" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Creative Strategy</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", mb: 3 }}>
                      Transform your retention assets into high-converting machines that look premium and function flawlessly across the ecosystem.
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ bgcolor: "#a78bfa", color: "#fff", py: 1.5, fontWeight: 800, "&:hover": { bgcolor: alpha("#a78bfa", 0.8) } }}
                    >
                      Book Creative Audit
                    </Button>
                  </Box>
                  <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Typography sx={{ color: alpha("#fff", 0.3), fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, mb: 1 }}>Analysis Scope</Typography>
                    <Typography sx={{ fontWeight: 700 }}>Full Asset Catalog Review</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
