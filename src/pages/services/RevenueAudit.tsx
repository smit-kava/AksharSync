import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

export default function RevenueAudit() {
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
                bgcolor: alpha("#fbbf24", 0.1), border: "1px solid", borderColor: alpha("#fbbf24", 0.2),
                mb: 3
              }}>
                <SyncProblemIcon sx={{ color: "#fbbf24", fontSize: 24 }} />
                <Typography sx={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Service Module 04
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                Revenue Opportunity <span style={{ color: "#fbbf24" }}>Analysis</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 700, lineHeight: 1.8 }}>
                Data-driven analysis to uncover hidden revenue opportunities, repeat purchase gaps, and segmentation inefficiencies that are limiting your brand's growth.
              </Typography>
            </Box>

            {/* Main Content Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, gap: 6, mt: 4 }}>
              <Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Opportunity Discovery</Typography>
                  <Stack spacing={3}>
                    {[
                      { title: "Repeat Purchase Gaps", desc: "Identifying timing and offer inefficiencies in post-purchase cycles." },
                      { title: "Segmentation Strategy", desc: "Analyzing high-value vs. low-value customer clusters for targeting." },
                      { title: "Offer Performance", desc: "Evaluating the financial impact of current promotional strategies." },
                      { title: "Campaign Inefficiencies", desc: "Data-led review of one-off broadcast performance vs. benchmarks." },
                      { title: "Retention Multipliers", desc: "Identifying specific actions that drive 2x-3x higher customer LTV." }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
                        <CheckCircleIcon sx={{ color: "#fbbf24", mt: 0.5 }} />
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
                <Box sx={{ p: 4, borderRadius: "24px", background: "linear-gradient(135deg, #3d2b0d 0%, #060e1a 100%)", border: "1px solid rgba(251,191,36,0.15)" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Growth Catalyst</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", mb: 3 }}>
                    We identify the "low hanging fruit" that can provide an immediate revenue lift for your brand.
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: "#fbbf24", color: "#060e1a", py: 1.5, fontWeight: 800, "&:hover": { bgcolor: alpha("#fbbf24", 0.8) } }}
                  >
                    Book Opportunity Analysis
                  </Button>
                </Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography sx={{ color: alpha("#fff", 0.3), fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, mb: 1 }}>Analysis Focus</Typography>
                  <Typography sx={{ fontWeight: 700 }}>Full Customer Data Audit</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
