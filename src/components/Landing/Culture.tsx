import { Box, Container, Typography, Button, alpha } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROUTE_PATHS } from "../../routes/paths";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const highlights = [
  {
    initials: "SK",
    label: "Founder & Architect",
    gradient: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
  },
  {
    initials: "ST",
    label: "CRM Strategists",
    gradient: "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)",
  },
  {
    initials: "DQ",
    label: "Dev & QA Squad",
    gradient: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
  },
  {
    initials: "CS",
    label: "Client Success",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7fd0ff 100%)",
  },
];

const stats = [
  { value: "10+", label: "Years of expertise" },
  { value: "5+", label: "Global regions" },
  { value: "350+", label: "Brands served" },
  { value: "100%", label: "White-label ready" },
];

export default function Culture() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const cardColRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Organic Ambient Orbs Floating
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 25,
          y: -20,
          scale: 1.1,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -25,
          y: 20,
          scale: 1.12,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // 2. Scroll Trigger for Text Content
      if (textColRef.current && sectionRef.current) {
        gsap.fromTo(
          textColRef.current.children,
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

      // 3. Scroll Trigger for Team Cards & Stats
      if (cardColRef.current && sectionRef.current) {
        gsap.fromTo(
          cardColRef.current,
          { opacity: 0, x: 45, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );

        // Continuous subtle float on the right card
        gsap.to(cardColRef.current, {
          y: -8,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#060e1a",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ambient orbs */}
      <Box
        ref={orb1Ref}
        sx={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,208,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        ref={orb2Ref}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 6, lg: 10 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
          }}
        >
          {/* ── LEFT: Text Copy ── */}
          <Box ref={textColRef} sx={{ flex: 1 }}>
            {/* Badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7fd0ff",
                }}
              >
                AksharSync Culture
              </Typography>
            </Box>

            {/* Decorative line */}
            <Box
              sx={{
                width: 54,
                height: 3,
                borderRadius: "2px",
                background:
                  "linear-gradient(90deg, #7fd0ff, #a78bfa, transparent)",
                mb: 3.5,
              }}
            />

            {/* Heading */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#fff",
                mb: 3,
              }}
            >
              A global team built{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                around your growth
              </Box>
            </Typography>

            {/* Body copy */}
            <Typography
              sx={{
                color: alpha("#fff", 0.65),
                fontSize: "1rem",
                lineHeight: 1.85,
                mb: 2.5,
              }}
            >
              The AksharSync team is an international group of professionals
              spread across the globe. Our diverse backgrounds bring unique
              ideas and fresh perspectives — contributing to industry-leading
              retention innovation.
            </Typography>
            <Typography
              sx={{
                color: alpha("#fff", 0.45),
                fontSize: "0.95rem",
                lineHeight: 1.85,
                mb: 4.5,
              }}
            >
              Despite our differences, we're a tight-knit group with
              extraordinary communication. We work together to go the extra
              mile for every client — every send, every flow, every campaign.
            </Typography>

            {/* CTA */}
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.ABOUT}
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: "12px",
                bgcolor: "rgba(127,208,255,0.1)",
                color: "#7fd0ff",
                border: "1px solid rgba(127,208,255,0.28)",
                backdropFilter: "blur(12px)",
                px: 3.5,
                py: 1.4,
                fontSize: "0.92rem",
                fontWeight: 700,
                textTransform: "none",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "rgba(127,208,255,0.2)",
                  borderColor: "#7fd0ff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(127,208,255,0.25)",
                },
              }}
            >
              Learn More About Us
            </Button>
          </Box>

          {/* ── RIGHT: Who's Behind Card & Stats ── */}
          <Box
            ref={cardColRef}
            sx={{ flexShrink: 0, width: { xs: "100%", md: 430 } }}
          >
            {/* Team card */}
            <Box
              sx={{
                borderRadius: "24px",
                border: "1px solid rgba(127,208,255,0.18)",
                borderTop: "1.5px solid rgba(127,208,255,0.35)",
                background:
                  "linear-gradient(145deg, rgba(13,31,56,0.85), rgba(8,16,32,0.92))",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                p: 3.5,
                mb: 2,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7fd0ff",
                  mb: 2.5,
                }}
              >
                Who's behind AksharSync
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1.5,
                }}
              >
                {highlights.map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "all 0.25s",
                      "&:hover": {
                        background: "rgba(127,208,255,0.08)",
                        borderColor: "rgba(127,208,255,0.3)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        background: h.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#060e1a",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {h.initials}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: alpha("#fff", 0.75),
                        lineHeight: 1.3,
                      }}
                    >
                      {h.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Stats row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1.2,
              }}
            >
              {stats.map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    textAlign: "center",
                    p: 1.5,
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(127,208,255,0.12)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#7fd0ff",
                      background: "rgba(127,208,255,0.06)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(135deg, #7fd0ff, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.58rem",
                      color: alpha("#fff", 0.4),
                      mt: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
