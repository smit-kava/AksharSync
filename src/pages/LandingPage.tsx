import { Box, styled } from "@mui/material";
import Hero from "../components/Landing/Hero";

import { ClientReviews } from "../components";
import CTA from "../components/Landing/CTA";
import Services from "../components/Landing/Services";
import WhyUs from "../components/Landing/WhyUs";

const PageWrapper = styled(Box)(({ theme }) => ({
  background: "#060e1a",
  color: theme.palette.common.white,
  overflowX: "hidden",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}));

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* ── HERO SECTION ── */}
      <Hero />

      {/* ── STRATEGIC SERVICES (Section I) ── */}
      <Services />

      {/* ── PLATFORM ECOSYSTEM (Section II) ── */}
      <WhyUs />

      {/* ── CLIENT REVIEWS ── */}
      <ClientReviews />

      {/* ── CTA BANNER ── */}
      <CTA />
    </PageWrapper>
  );
}