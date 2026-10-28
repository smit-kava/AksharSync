import { alpha, Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTE_PATHS } from "../../routes/paths";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
          },
          {
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.4)",
          }
        );
      }
    }, ctaContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={ctaContainerRef} sx={{ py: { xs: 10, md: 16 }, position: "relative" }}>
      <Container maxWidth="md">
        <Box
          ref={cardRef}
          sx={{
            background:
              "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
            backgroundSize: "200% 200%",
            borderRadius: "32px",
            p: { xs: 5, md: 10 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 32px 80px rgba(127,208,255,0.35), 0 0 60px rgba(167,139,250,0.25)",
            animation: "ctaGradient 8s ease infinite",
            "@keyframes ctaGradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          {/* Top Specular Sheen */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "45%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              color: "#060e1a",
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Ready to Sync Your Growth?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: alpha("#060e1a", 0.75),
              mb: 5,
              fontWeight: 600,
              maxWidth: 520,
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
            }}
          >
            Let's build something powerful together. Start with a free retention
            strategy call.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
              sx={{
                bgcolor: "#060e1a",
                color: "#fff",
                px: 5,
                py: 1.8,
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  bgcolor: "#0d2137",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
                },
              }}
            >
              Get Started Free →
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to={ROUTE_PATHS.CONTACT}
              sx={{
                color: "#060e1a",
                borderColor: "rgba(6,14,26,0.35)",
                px: 5,
                py: 1.8,
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textTransform: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "#060e1a",
                  bgcolor: "rgba(6,14,26,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
