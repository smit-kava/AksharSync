import { Box, styled } from "@mui/material";
import Hero from "../components/Landing/Hero";
import TechStack from "../components/Landing/TechStack";

import Services from "../components/Landing/Services";
import CTA from "../components/Landing/CTA";
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

      {/* ── TECH STACK ── */}
      <TechStack />

      {/* ── STRATEGIC SERVICES (Section I) ── */}
      <Services />

      {/* ── PLATFORM ECOSYSTEM (Section II) ── */}
      <WhyUs />

      {/* ── CTA BANNER ── */}
      <CTA />
    </PageWrapper>
  );
}