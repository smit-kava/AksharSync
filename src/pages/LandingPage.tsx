import { Box, styled } from "@mui/material";
import Hero from "../components/Landing/Hero";

import { ClientReviews } from "../components";
import CTA from "../components/Landing/CTA";
import Services from "../components/Landing/Services";
import WhyUs from "../components/Landing/WhyUs";
import Culture from "../components/Landing/Culture";

const PageWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflowX: "hidden",
  fontFamily: theme.typography.fontFamily,
}));

export default function LandingPage() {
  return (
    <PageWrapper>
      <Hero />
      <Services />
      <WhyUs />
      <Culture />
      <ClientReviews />
      <CTA />
    </PageWrapper>
  );
}