import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LifecycleIcon } from "../../components/icons";

export default function LifecycleAudit() {
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
                bgcolor: alpha("#7fd0ff", 0.1), border: "1px solid", borderColor: alpha("#7fd0ff", 0.2),
                mb: 3
              }}>
                <LifecycleIcon sx={{ color: "#7fd0ff", fontSize: 24 }} />
                <Typography sx={{ color: "#7fd0ff", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Service Module 01
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                Lifecycle Flow <span style={{ color: "#7fd0ff" }}>Review</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 700, lineHeight: 1.8 }}>
                We deep-dive into your existing customer journeys to identify automation gaps, conversion leaks, and high-impact repeat purchase opportunities.
              </Typography>
            </Box>

            {/* Main Content Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, gap: 6, mt: 4 }}>
              <Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Audit Coverage</Typography>
                  <Stack spacing={3}>
                    {[
                      { title: "Welcome Series", desc: "First-impression optimization to maximize new subscriber conversion." },
                      { title: "Abandoned Cart & Checkout", desc: "Recovery logic audit to capture high-intent revenue leaks." },
                      { title: "Browse Abandonment", desc: "Personalized behavioral triggers based on product interest." },
                      { title: "Post-Purchase & VIP", desc: "Loyalty-building sequences to increase customer lifetime value." },
                      { title: "Winback & Reactivation", desc: "Automated systems to recapture lapsed customers effectively." }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
                        <CheckCircleIcon sx={{ color: "#7fd0ff", mt: 0.5 }} />
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
                  <Box sx={{ p: 4, borderRadius: "24px", background: "linear-gradient(135deg, #0d1b32 0%, #060e1a 100%)", border: "1px solid rgba(127,208,255,0.15)" }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Expected Outcome</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", mb: 3 }}>
                      A comprehensive strategic roadmap detailing exactly which flows to build, optimize, or pause to drive immediate revenue growth.
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ bgcolor: "#7fd0ff", color: "#060e1a", py: 1.5, fontWeight: 800, "&:hover": { bgcolor: alpha("#7fd0ff", 0.8) } }}
                    >
                      Book Free Audit
                    </Button>
                  </Box>
                  <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Typography sx={{ color: alpha("#fff", 0.3), fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, mb: 1 }}>Timing</Typography>
                    <Typography sx={{ fontWeight: 700 }}>3-5 Business Days Delivery</Typography>
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
