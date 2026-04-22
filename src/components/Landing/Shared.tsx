import { useState, useEffect, useRef } from "react";
import { Box, styled, alpha, keyframes } from "@mui/material";

export const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

export const HeroChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: alpha("#7fd0ff", 0.1),
  color: "#7fd0ff",
  border: `1px solid ${alpha("#7fd0ff", 0.2)}`,
  borderRadius: "100px",
  padding: "6px 16px",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
}));

export const GradientText = styled(Box)(() => ({
  background: "linear-gradient(90deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline-block",
}));

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}
