import { alpha, Box, Button, Container, Typography, Zoom } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import { useInView } from "./Shared";

export default function CTA() {
  const [ctaRef, ctaInView] = useInView(0.2);
  return (
    <Box ref={ctaRef} sx={{ py: 15 }}>
      <Container maxWidth="md">
        <Zoom in={ctaInView} timeout={800}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
              borderRadius: "32px",
              p: { xs: 6, md: 10 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(127,208,255,0.25)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <Typography variant="h2" sx={{ color: "#060e1a", fontWeight: 900, mb: 2, fontSize: { xs: "2.2rem", md: "3.5rem" }, lineHeight: 1.1 }}>
              Ready to Sync Your Growth?
            </Typography>
            <Typography variant="h6" sx={{ color: alpha("#060e1a", 0.7), mb: 6, fontWeight: 600, maxWidth: 500, mx: "auto" }}>
              Let's build something powerful together. Start with a free strategy call.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                component={RouterLink}
                to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
                sx={{
                  bgcolor: "#060e1a", color: "#fff",
                  px: 6, py: 2, borderRadius: "14px",
                  fontWeight: 800, textTransform: "none",
                  "&:hover": { bgcolor: "#0d2137", transform: "translateY(-4px)" },
                  transition: "all 0.3s ease",
                }}
              >
                Get Started Free →
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
                sx={{
                  color: "#060e1a", borderColor: alpha("#060e1a", 0.3),
                  px: 6, py: 2, borderRadius: "14px",
                  fontWeight: 700, textTransform: "none",
                  "&:hover": { borderColor: "#060e1a", bgcolor: alpha("#060e1a", 0.08), transform: "translateY(-4px)" },
                  transition: "all 0.3s ease",
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
}
