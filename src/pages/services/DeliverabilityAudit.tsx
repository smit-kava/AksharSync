import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ArchitectureIcon } from "../../components/icons";

export default function DeliverabilityAudit() {
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
                bgcolor: alpha("#34d399", 0.1), border: "1px solid", borderColor: alpha("#34d399", 0.2),
                mb: 3
              }}>
                <ArchitectureIcon sx={{ color: "#34d399", fontSize: 24 }} />
                <Typography sx={{ color: "#34d399", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Service Module 03
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                Deliverability <span style={{ color: "#34d399" }}>Review</span>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 700, lineHeight: 1.8 }}>
                Technical audit of your inbox health, sender reputation, and technical infrastructure to ensure your messages bypass the spam folder and reach your customers.
              </Typography>
            </Box>

            {/* Main Content Grid */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, gap: 6, mt: 4 }}>
              <Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Technical Verification</Typography>
                  <Stack spacing={3}>
                    {[
                      { title: "Authentication Audit", desc: "Checking SPF, DKIM, and DMARC configurations for errors." },
                      { title: "Sender Reputation", desc: "Analyzing IP and domain health across global blacklists." },
                      { title: "List Hygiene & Logic", desc: "Evaluating suppression logic and inactive management." },
                      { title: "Inbox Placement Testing", desc: "Seed list analysis for Gmail, Yahoo, Outlook, and others." },
                      { title: "Engagement Signals", desc: "Reviewing positive engagement metrics that boost reputation." }
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
                        <CheckCircleIcon sx={{ color: "#34d399", mt: 0.5 }} />
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
                <Box sx={{ p: 4, borderRadius: "24px", background: "linear-gradient(135deg, #0d3b2e 0%, #060e1a 100%)", border: "1px solid rgba(52,211,153,0.15)" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Technical Safeguard</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", mb: 3 }}>
                    Don't let technical errors kill your revenue. We provide a full technical fix list to protect your sender reputation.
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: "#34d399", color: "#060e1a", py: 1.5, fontWeight: 800, "&:hover": { bgcolor: alpha("#34d399", 0.8) } }}
                  >
                    Book Technical Audit
                  </Button>
                </Box>
                <Box sx={{ p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03), border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Typography sx={{ color: alpha("#fff", 0.3), fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, mb: 1 }}>Deliverability Health</Typography>
                  <Typography sx={{ fontWeight: 700 }}>Full ESP Diagnostic</Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
