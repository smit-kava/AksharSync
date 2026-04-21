import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FooterLinkGroup, FooterNewsletter, FooterSocialLinks } from "./footer/index";

const serviceLinks = [
  { label: "Email Marketing", to: "/services" },
  { label: "Email Audit", to: "/services" },
  { label: "Email Deliverability", to: "/services" },
  { label: "Klaviyo Agency", to: "/solutions" },
  { label: "SMS Service", to: "/services" },
  { label: "Push Notifications", to: "/services" },
  { label: "WhatsApp Marketing", to: "/services" },
  { label: "RCS Marketing", to: "/services" },
];

const learnMoreLinks = [
  { label: "Career", to: "/about" },
  { label: "FAQs", to: "/why" },
  { label: "Partners", to: "/solutions" },
  { label: "Trainings", to: "/services" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/about" },
  { label: "Terms of Service", to: "/services" },
  { label: "Cookie Policy", to: "/why" },
];

export function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8 }}>
      <Box sx={{ bgcolor: "#2495d3", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                <Button
                  variant="outlined"
                  sx={{
                    width: "fit-content",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.8)",
                    px: 3.5,
                    py: 1.15,
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  Join Our Facebook Community
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <FooterLinkGroup title="Services" links={serviceLinks} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FooterLinkGroup title="Learn More" links={learnMoreLinks} />
            </Grid>

            <Grid size={{ xs: 12, md: 3.5 }}>
              <Stack spacing={2.5}>
                <FooterNewsletter />
                <FooterSocialLinks />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#f8f6f1", py: 2 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography sx={{ color: "#5a6473", fontSize: "0.95rem" }}>
              {new Date().getFullYear()} AksharSync
            </Typography>
            <Stack direction="row" spacing={2.5} sx={{ flexWrap: "wrap", justifyContent: "center" }}>
              {legalLinks.map((link) => (
                <Typography
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  sx={{ color: "#2d3b4d", textDecoration: "none", fontSize: "0.95rem" }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
