import { Box, Typography, alpha, Container, keyframes } from "@mui/material";
import RevealOnScroll from "./RevealOnScroll";

const sequentialZoom = keyframes`
  0%, 100% { transform: scale(1); background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
  5%, 20% { transform: scale(1.08); background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(127,208,255,0.2); }
  25% { transform: scale(1); background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
`;

const ProcessStep = ({ number, title, desc, isTop, color = "#0ea5e9", index }: { 
  number: string; 
  title: string; 
  desc: string; 
  isTop: boolean; 
  color?: string; 
  index: number;
}) => {
  const delay = index * 2.5;

  return (
    <Box sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      minWidth: { xs: "100%", md: 0 },
      mb: { xs: 8, md: 0 },
      zIndex: 2,
      height: 400,
      justifyContent: isTop ? "flex-start" : "flex-end",
    }}>
      <RevealOnScroll delay={index * 0.1}>
        {/* Content Card with Sequential Zoom */}
        <Box sx={{
          p: 3,
          borderRadius: "28px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          maxWidth: 260,
          transition: "all 0.4s ease",
          position: "relative",
          animation: `${sequentialZoom} 10s infinite`,
          animationDelay: `${delay}s`,
          "&:hover": {
            animationPlayState: "paused",
            transform: isTop ? "translateY(-10px) scale(1.05)" : "translateY(10px) scale(1.05)",
            background: "rgba(255,255,255,0.06)",
          }
        }}>
          <Typography sx={{ 
            fontSize: "2.2rem", 
            fontWeight: 900, 
            color: color, 
            mb: 1.5,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1
          }}>
            {number}
          </Typography>
          <Typography variant="h5" sx={{ 
            fontWeight: 800, 
            color: "#fff", 
            mb: 1.5, 
            fontSize: "1.1rem",
            lineHeight: 1.3
          }}>
            {title}
          </Typography>
          <Typography sx={{ 
            color: alpha("#fff", 0.4), 
            fontSize: "0.82rem", 
            lineHeight: 1.6 
          }}>
            {desc}
          </Typography>
        </Box>
      </RevealOnScroll>
    </Box>
  );
};

export const SMSProcessTimeline = () => {
  const steps = [
    { number: "01", title: "Marketing Strategy", desc: "Targeted SMS segmentation and customization.", isTop: true, color: "#7fd0ff" },
    { number: "02", title: "Workflows & Automations", desc: "Effective SMS automations driving sustained revenue growth.", isTop: false, color: "#a78bfa" },
    { number: "03", title: "Campaign Planning", desc: "Carefully planned SMS campaign calendars and strategies.", isTop: true, color: "#34d399" },
    { number: "04", title: "Copywriting", desc: "Expertly crafted, customer-focused SMS content.", isTop: false, color: "#fbbf24" },
    { number: "05", title: "Vendor Management", desc: "Onboarding and integrating top SMS marketing solutions.", isTop: true, color: "#0ea5e9" }
  ];

  return (
    <Box sx={{ py: { xs: 10, md: 15 }, position: "relative", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        
        <Box
          component="svg"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            top: 0,
            left: "5%",
            right: "5%",
            width: "90%",
            height: "100%",
            zIndex: 1,
            display: { xs: "none", md: "block" },
            pointerEvents: "none"
          }}
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7fd0ff" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="grad4" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          <line x1="100" y1="100" x2="300" y2="300" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
          <line x1="300" y1="300" x2="500" y2="100" stroke="url(#grad2)" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
          <line x1="500" y1="100" x2="700" y2="300" stroke="url(#grad3)" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
          <line x1="700" y1="300" x2="900" y2="100" stroke="url(#grad4)" strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />

          <circle r="5" fill="#fff" filter="drop-shadow(0 0 8px #fff)">
            <animateMotion dur="10s" repeatCount="indefinite" path="M 100 100 L 300 300 L 500 100 L 700 300 L 900 100" />
          </circle>
        </Box>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
          minHeight: 400
        }}>
          {steps.map((step, index) => (
            <ProcessStep 
              key={index}
              index={index}
              number={step.number}
              title={step.title}
              desc={step.desc}
              isTop={step.isTop}
              color={step.color}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
