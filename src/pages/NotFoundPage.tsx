import { Box, Container, Typography, alpha } from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { SEO } from "../components";
import { ROUTE_PATHS } from "../routes/paths";

// ─── Animations ───────────────────────────────────────────────────────────────

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50%       { transform: translateY(-14px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.08); }
`;

const scanline = keyframes`
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 0.5; }
  90%  { opacity: 0.5; }
  100% { transform: translateY(1200%); opacity: 0; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const shimmer = keyframes`
  0%   { background-position: -400% center; }
  100% { background-position:  400% center; }
`;

const orbit = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const orbitReverse = keyframes`
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
`;

// ─── 404 SVG Illustration ─────────────────────────────────────────────────────

function NotFoundSVG() {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: 260, md: 360 },
        height: { xs: 260, md: 360 },
        mx: "auto",
        animation: `${float} 6s ease-in-out infinite`,
      }}
    >
      {/* Outer orbit ring */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px dashed rgba(127,208,255,0.18)",
          animation: `${orbit} 14s linear infinite`,
        }}
      >
        {/* Dot on orbit */}
        <Box
          sx={{
            position: "absolute",
            top: -5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#7fd0ff",
            boxShadow: "0 0 14px 4px rgba(127,208,255,0.8)",
          }}
        />
      </Box>

      {/* Inner orbit ring */}
      <Box
        sx={{
          position: "absolute",
          inset: 28,
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.15)",
          animation: `${orbitReverse} 10s linear infinite`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: "#a78bfa",
            boxShadow: "0 0 10px 3px rgba(167,139,250,0.7)",
          }}
        />
      </Box>

      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: "20%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(127,208,255,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: `${pulse} 3s ease infinite`,
        }}
      />

      {/* Glass disc */}
      <Box
        sx={{
          position: "absolute",
          inset: "18%",
          borderRadius: "50%",
          background: "rgba(6,14,26,0.92)",
          border: "1px solid rgba(127,208,255,0.14)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(127,208,255,0.06), inset 0 0 30px rgba(127,208,255,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Scanline inside disc */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "12%",
              background: "linear-gradient(to bottom, transparent, rgba(50,245,245,0.15), transparent)",
              animation: `${scanline} 4s ease-in-out infinite`,
            }}
          />
        </Box>

        {/* SVG 404 illustration */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Screen / monitor frame */}
          <rect x="30" y="45" width="120" height="80" rx="8" fill="rgba(15,30,55,0.9)" stroke="rgba(127,208,255,0.3)" strokeWidth="1.5" />
          {/* Screen glare */}
          <rect x="34" y="49" width="112" height="72" rx="6" fill="rgba(127,208,255,0.02)" />
          {/* Monitor stand */}
          <rect x="80" y="125" width="20" height="12" rx="2" fill="rgba(127,208,255,0.15)" />
          <rect x="68" y="136" width="44" height="4" rx="2" fill="rgba(127,208,255,0.1)" />

          {/* "404" text on screen */}
          <text
            x="90"
            y="88"
            textAnchor="middle"
            fontSize="32"
            fontWeight="800"
            fontFamily="monospace"
            fill="url(#grad404)"
            letterSpacing="-1"
          >
            404
          </text>

          {/* Blinking cursor line below */}
          <rect x="82" y="97" width="18" height="2.5" rx="1" fill="#32f5f5" opacity="0.6" />
          <rect x="100" y="97" width="8" height="2.5" rx="1" fill="#32f5f5" />

          {/* Top bar dots */}
          <circle cx="42" cy="55" r="3" fill="rgba(248,113,113,0.7)" />
          <circle cx="52" cy="55" r="3" fill="rgba(251,191,36,0.7)" />
          <circle cx="62" cy="55" r="3" fill="rgba(52,211,153,0.7)" />
          {/* Top bar line */}
          <line x1="70" y1="55" x2="140" y2="55" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Small wifi / signal lost icon */}
          <path d="M76 72 Q90 62 104 72" stroke="rgba(127,208,255,0.2)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M81 78 Q90 71 99 78" stroke="rgba(127,208,255,0.35)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="90" cy="83" r="2" fill="rgba(127,208,255,0.6)" />
          {/* X over signal */}
          <line x1="86" y1="68" x2="94" y2="76" stroke="rgba(248,113,113,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="94" y1="68" x2="86" y2="76" stroke="rgba(248,113,113,0.6)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="grad404" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7fd0ff" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#32f5f5" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Floating sparkle dots */}
      {[
        { top: "8%", left: "12%", size: 4, color: "#7fd0ff", delay: "0s" },
        { top: "15%", right: "10%", size: 3, color: "#a78bfa", delay: "0.8s" },
        { bottom: "12%", left: "8%", size: 3, color: "#34d399", delay: "1.4s" },
        { bottom: "20%", right: "14%", size: 5, color: "#fbbf24", delay: "0.4s" },
      ].map((dot, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            bgcolor: dot.color,
            boxShadow: `0 0 8px 2px ${dot.color}`,
            top: dot.top,
            left: (dot as any).left,
            right: (dot as any).right,
            bottom: (dot as any).bottom,
            animation: `${pulse} 2.5s ease infinite`,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </Box>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#060e1a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 10 },
      }}
    >
      <SEO title="404 — Page Not Found" noIndex />

      {/* Background orbs */}
      <Box sx={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "5%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none", animation: `${pulse} 5s ease infinite` }} />
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(127,208,255,0.03) 0%, transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center", py: { xs: 10, md: 6 } }}>

        {/* SVG Illustration */}
        <NotFoundSVG />

        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.6,
            borderRadius: "999px",
            border: "1px solid rgba(248,113,113,0.2)",
            background: "rgba(248,113,113,0.05)",
            mb: 3,
            mt: 4,
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#f87171", boxShadow: "0 0 8px rgba(248,113,113,0.8)", animation: `${blink} 1.4s ease infinite` }} />
          <Typography sx={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(248,113,113,0.7)", fontWeight: 700 }}>
            Error 404 — Page Not Found
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.4rem", md: "3.4rem" },
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          Looks like you're{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 50%, #32f5f5 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${shimmer} 5s linear infinite`,
            }}
          >
            lost in sync
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: alpha("#fff", 0.4),
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            lineHeight: 1.8,
            maxWidth: 480,
            mx: "auto",
            mb: 5,
          }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </Typography>

        {/* CTA Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Box
            component="button"
            onClick={() => navigate(ROUTE_PATHS.HOME)}
            sx={{
              px: 3.5,
              py: 1.4,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
              border: "none",
              color: "#060e1a",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 30px rgba(127,208,255,0.3)",
                opacity: 0.9,
              },
            }}
          >
            ← Go Home
          </Box>

          <Box
            component="button"
            onClick={() => navigate(ROUTE_PATHS.CONTACT)}
            sx={{
              px: 3.5,
              py: 1.4,
              borderRadius: "12px",
              background: "transparent",
              border: "1px solid rgba(127,208,255,0.25)",
              color: "#7fd0ff",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "rgba(127,208,255,0.07)",
                borderColor: "rgba(127,208,255,0.5)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Contact Us →
          </Box>
        </Box>

        {/* Quick links */}
        <Box sx={{ mt: 6, display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Services", path: ROUTE_PATHS.SERVICES },
            { label: "About", path: ROUTE_PATHS.ABOUT },
            { label: "Why Us", path: ROUTE_PATHS.WHY },
            { label: "Book a Call", path: ROUTE_PATHS.RETENTION_AUDIT_BOOKING },
          ].map((link) => (
            <Box
              key={link.label}
              component="button"
              onClick={() => navigate(link.path)}
              sx={{
                background: "none",
                border: "none",
                color: alpha("#fff", 0.3),
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.2s",
                padding: 0,
                "&:hover": { color: alpha("#fff", 0.75) },
              }}
            >
              {link.label}
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}
