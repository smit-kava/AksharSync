import { Box, styled } from "@mui/material";
import Hero from "../components/Landing/Hero";
import TechStack from "../components/Landing/TechStack";
import Diagnostic from "../components/Landing/Diagnostic";
import Services from "../components/Landing/Services";
import WhyUs from "../components/Landing/WhyUs";
import CTA from "../components/Landing/CTA";

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

      {/* ── DIAGNOSTIC SECTION (Phase 01) ── */}
      <Diagnostic />

      <TechStack />

      {/* ── STRATEGIC SERVICES (Section I) ── */}
      <Services />

      {/* ── PLATFORM ECOSYSTEM (Section II) ── */}


      {/* ── WHY US SECTION ── */}
      <WhyUs />

      {/* ── CTA BANNER ── */}
      <CTA />
    </PageWrapper>
  );
}