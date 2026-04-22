import { Box, Container, Typography, alpha, Fade } from "@mui/material";
import { useInView, HeroChip } from "./Shared";

const ecosystems = [
  {
    category: "Primary ESPs",
    items: ["Klaviyo", "HubSpot", "Braze", "Mailchimp", "ActiveCampaign"],
    accent: "#7fd0ff",
  },
  {
    category: "Enterprise CRM",
    items: ["Salesforce Marketing Cloud (SFMC)", "Marketo", "Microsoft Dynamics"],
    accent: "#a78bfa",
  },
  {
    category: "Messaging APIs",
    items: ["Twilio", "Gupshup", "WATI", "Attentive", "Postscript"],
    accent: "#34d399",
  },
  {
    category: "Marketing Websites",
    items: ["Webflow", "Shopify", "Framer", "WordPress", "Wix"],
    accent: "#fbbf24",
  },
];

export default function TechStack() {
  const [techRef, techInView] = useInView(0.1);

  return (
    <Box
      ref={techRef}
      id="tech-stack"
      sx={{
        py: 12,
        borderTop: `1px solid ${alpha("#fff", 0.06)}`,
        borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
        background: alpha("#fff", 0.01),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Fade in={techInView} timeout={600}>
            <Box>
              <HeroChip sx={{ mb: 3 }}> Ecosystem & Tech Stack</HeroChip>
              <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.8rem" }, mb: 2 }}>
                Platform Ecosystem & <Box component="span" sx={{ color: "#7fd0ff" }}>Tech Stack</Box>
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.5), maxWidth: 680, mx: "auto" }}>
                Deep technical expertise across leading ESPs, CRMs, Messaging APIs, and Marketing Website platforms.
              </Typography>
            </Box>
          </Fade>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, width: "100%" }} component="div">
          {ecosystems.map((eco, i) => (
            <Box
              key={eco.category}
              component="div"
              sx={{
                flex: { xs: "0 0 100%", sm: "1 1 calc(50% - 12px)", lg: "1 1 calc(25% - 22.5px)" }
              }}
            >
              <Fade in={techInView} timeout={800 + i * 200}>
                <Box
                  sx={{
                    flex: 1,
                    p: 4,
                    borderRadius: "24px",
                    background: alpha("#fff", 0.02),
                    border: `1px solid ${alpha("#fff", 0.08)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: alpha("#fff", 0.04),
                      borderColor: alpha(eco.accent, 0.3),
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: eco.accent,
                      fontWeight: 800,
                      letterSpacing: 2,
                      mb: 2,
                      display: "block",
                    }}
                  >
                    {eco.category}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {eco.items.map((item) => (
                      <Typography
                        key={item}
                        sx={{
                          color: alpha("#fff", 0.8),
                          fontSize: "1rem",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          "&:before": {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: eco.accent,
                            opacity: 0.5,
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
