import { Box, Container, Typography, alpha, Fade, styled } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useInView, HeroChip, GradientText } from "./Shared";

const features = [
  "Missed repeat purchase opportunities",
  "Weak lifecycle flows",
  "Poor deliverability issues",
  "Low-performing email templates",
  "Segmentation gaps",
  "Underused SMS and WhatsApp opportunities",
  "Revenue leaks across the customer journey",
];

const FeatureRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1.2, 2),
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
        background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.4)} 0%, ${alpha(theme.palette.primary.dark || '#0D3B66', 0.2)} 100%)`,
        borderTop: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
        borderBottom: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.06)}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 6, md: 10 }, alignItems: "center" }}>
          <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
            <Fade in={whyRef ? whyInView : false} timeout={800}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <HeroChip sx={{ alignSelf: "flex-start" }}>Why This Audit Matters</HeroChip>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.2rem", md: "2.8rem" }, lineHeight: 1.2 }}>
                  Most Brands Don’t Have a Traffic Problem — <br />
                  <GradientText>They Have a Retention Problem.</GradientText>
                </Typography>
                <Typography sx={{ color: (theme) => alpha(theme.palette.text.primary, 0.6), fontSize: "1.05rem", lineHeight: 1.8 }}>
                  If your welcome flows are weak, your abandoned cart recovery is underperforming, or your customer journey stops after the first purchase, you are losing revenue every day.
                  <br /><br />
                  Most businesses focus only on acquisition. The real profit comes from retention. Our audit helps you uncover:
                </Typography>
              </Box>
            </Fade>
          </Box>
          <Box sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {features.map((f, i) => (
                <Fade in={whyRef ? whyInView : false} timeout={600 + i * 100} key={f}>
                  <FeatureRow>
                    <CheckCircleOutlinedIcon sx={{ color: "#34d399", fontSize: "1.2rem" }} />
                    <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.text.primary, 0.8), fontSize: "0.95rem" }}>{f}</Typography>
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
