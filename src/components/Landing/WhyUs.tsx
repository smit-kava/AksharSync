import { Box, Container, Typography, alpha, styled } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroChip, GradientText } from "./Shared";

gsap.registerPlugin(ScrollTrigger);

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
  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.05),
    transform: "translateX(10px)",
    borderColor: "rgba(127,208,255,0.3)",
  },
}));

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const featureListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left side text on scroll
      if (leftColRef.current && sectionRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Animate feature list items with stagger
      if (featureListRef.current && sectionRef.current) {
        const rows = featureListRef.current.querySelectorAll(".why-feature-row");
        gsap.fromTo(
          rows,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="why-us"
      sx={{
        py: { xs: 10, md: 15 },
        position: "relative",
        background:
          "linear-gradient(135deg, rgba(6, 14, 26, 0.92) 0%, rgba(13, 31, 56, 0.4) 100%)",
        borderTop: `1px solid ${alpha("#fff", 0.06)}`,
        borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(127,208,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 6, md: 10 },
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text Copy ── */}
          <Box
            ref={leftColRef}
            sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <HeroChip sx={{ alignSelf: "flex-start" }}>
                Why This Audit Matters
              </HeroChip>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                Most Brands Don’t Have a Traffic Problem — <br />
                <GradientText>They Have a Retention Problem.</GradientText>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.65),
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                }}
              >
                If your welcome flows are weak, your abandoned cart recovery is
                underperforming, or your customer journey stops after the first
                purchase, you are losing revenue every day.
                <br />
                <br />
                Most businesses focus only on acquisition. The real profit
                comes from retention. Our audit helps you uncover:
              </Typography>
            </Box>
          </Box>

          {/* ── RIGHT: Feature Rows ── */}
          <Box
            ref={featureListRef}
            sx={{ flex: { xs: "0 0 100%", md: "1 1 calc(50% - 40px)" } }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              {features.map((f) => (
                <FeatureRow key={f} className="why-feature-row">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: "rgba(52, 211, 153, 0.12)",
                      border: "1px solid rgba(52, 211, 153, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleOutlinedIcon
                      sx={{ color: "#34d399", fontSize: "1.05rem" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: alpha("#fff", 0.85),
                      fontSize: "0.95rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {f}
                  </Typography>
                </FeatureRow>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
