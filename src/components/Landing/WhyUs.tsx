import { Box, Container, Typography, alpha, Fade, styled } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useInView, HeroChip, GradientText } from "./Shared";

const features = [
  "Dedicated account manager for every project",
  "Weekly performance reports & insights",
  "Agile execution with 48-hour turnaround",
  "Multi-channel synced campaigns",
  "Real-time analytics dashboard",
  "On-demand strategy consultations",
];

const FeatureRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
  borderRadius: "16px",
  transition: "all 0.2s ease",
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.04),
    transform: "translateX(8px)",
  },
}));

export default function WhyUs() {
  const [whyRef, whyInView] = useInView(0.1);

  return (
    <Box
      ref={whyRef}
      id="why-us"
      sx={{
        py: 15,
        background: "linear-gradient(135deg, rgba(6, 14, 26, 0.4) 0%, rgba(13, 59, 102, 0.2) 100%)",
        borderTop: `1px solid ${alpha("#fff", 0.06)}`,
        borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
            <Fade in={whyInView} timeout={800}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <HeroChip sx={{ alignSelf: "flex-start" }}>Why Choose Us</HeroChip>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "3rem" } }}>
                  One Agency. <br />
                  <GradientText>Total Synchronization.</GradientText>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", lineHeight: 1.8 }}>
                  We stop the fragmentation. Our team aligns every communication channel
                  into a single, high-performing revenue engine.
                </Typography>
              </Box>
            </Fade>
          </Box>
          <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {features.map((f, i) => (
                <Fade in={whyInView} timeout={600 + i * 150} key={f}>
                  <FeatureRow>
                    <CheckCircleOutlinedIcon sx={{ color: "#34d399", fontSize: "1.4rem" }} />
                    <Typography sx={{ fontWeight: 600, color: alpha("#fff", 0.8) }}>{f}</Typography>
                  </FeatureRow>
                </Fade>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
