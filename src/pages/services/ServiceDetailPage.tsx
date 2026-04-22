import { useLocation, Navigate } from "react-router-dom";
import { Box, Container, Typography, alpha, Fade, Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Link as RouterLink } from "react-router-dom";
import { servicesData } from "../../data/servicesData";
import { HeroChip, GradientText } from "../../components/Landing/Shared";
import { ROUTE_PATHS } from "../../routes/paths";

export default function ServiceDetailPage() {
  const { pathname } = useLocation();
  const service = servicesData[pathname as keyof typeof servicesData];

  if (!service) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return (
    <Box sx={{ pt: 15, pb: 12, minHeight: "100vh", background: "#060e1a" }}>
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.SERVICES}
              startIcon={<ArrowBackIcon />}
              sx={{ 
                color: alpha("#fff", 0.5), 
                mb: 6,
                "&:hover": { color: "#fff", background: alpha("#fff", 0.05) }
              }}
            >
              Back to Services
            </Button>

            <Box sx={{ mb: 8 }}>
              <HeroChip sx={{ mb: 3 }}>{service.category}</HeroChip>
              <Typography variant="h1" sx={{ 
                fontWeight: 900, 
                fontSize: { xs: "2.5rem", md: "4rem" }, 
                mb: 3,
                letterSpacing: "-0.02em"
              }}>
                {service.title.split(" ").map((word, i) => (
                  i === 0 ? word + " " : <GradientText key={i}>{word} </GradientText>
                ))}
              </Typography>
              <Typography sx={{ 
                color: alpha("#fff", 0.6), 
                fontSize: "1.25rem", 
                maxWidth: 800,
                lineHeight: 1.6
              }}>
                {service.description}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
              gap: 4,
              mb: 10 
            }}>
              <Box sx={{ 
                p: 5, 
                borderRadius: "32px", 
                background: alpha("#fff", 0.02),
                border: `1px solid ${alpha("#fff", 0.08)}`
              }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: service.accent }}>
                  Key Capabilities
                </Typography>
                <Stack spacing={3}>
                  {service.features.map((feature, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircleOutlinedIcon sx={{ color: service.accent }} />
                      <Typography sx={{ color: alpha("#fff", 0.8), fontWeight: 500 }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ 
                p: 5, 
                borderRadius: "32px", 
                background: `linear-gradient(135deg, ${alpha(service.accent, 0.1)} 0%, transparent 100%)`,
                border: `1px solid ${alpha(service.accent, 0.2)}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3
              }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  Ready to optimize your <GradientText>platform?</GradientText>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5) }}>
                  Let's discuss how our technical expertise can drive measurable growth for your brand.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: service.accent,
                    color: "#060e1a",
                    fontWeight: 800,
                    borderRadius: "12px",
                    py: 1.5,
                    "&:hover": { bgcolor: alpha(service.accent, 0.8) }
                  }}
                >
                  Schedule Strategy Call
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
