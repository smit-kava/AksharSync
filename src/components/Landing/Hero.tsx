import { useState, useEffect } from "react";
import {
  Box, Container, Typography, Button, Avatar,
  AvatarGroup, alpha, Fade
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { keyframes } from "@mui/system";

// ─── Animations ────────────────────────────────────────────────────────────────
const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
`;
const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;
const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const tickerScroll = keyframes`
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const ping = keyframes`
  0%   { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2.2); opacity: 0; }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const avatars = [
  { bg: "#1a3a5c", initials: "PS", color: "#7fd0ff" },
  { bg: "#2d1b5e", initials: "RM", color: "#a78bfa" },
  { bg: "#0d3b2e", initials: "AK", color: "#34d399" },
  { bg: "#3b1a1a", initials: "JD", color: "#f87171" },
  { bg: "#3b2a0d", initials: "MK", color: "#fbbf24" },
  { bg: "#1a2a3b", initials: "RV", color: "#60a5fa" },
];

const channels = [
  { label: "Email", pct: 82, color: "#7fd0ff" },
  { label: "SMS", pct: 67, color: "#a78bfa" },
  { label: "WhatsApp", pct: 91, color: "#34d399" },
];

const liveEvents = [
  { icon: "✉️", msg: "Flow triggered → Welcome Series", time: "just now", color: "#7fd0ff" },
  { icon: "💬", msg: "SMS sent → Cart Recovery #4821", time: "2s ago", color: "#a78bfa" },
  { icon: "📲", msg: "WhatsApp delivered → Order #9923", time: "5s ago", color: "#34d399" },
  { icon: "🎯", msg: "Segment synced → 12,400 contacts", time: "9s ago", color: "#fbbf24" },
  { icon: "✉️", msg: "Campaign launched → Black Friday", time: "14s ago", color: "#7fd0ff" },
  { icon: "📲", msg: "WhatsApp reply → Promo redeemed", time: "18s ago", color: "#34d399" },
];

const statCards = [
  { label: "Revenue Attributed", value: "$2.4M", delta: "+34%", color: "#34d399" },
  { label: "Avg Open Rate", value: "61.2%", delta: "+12%", color: "#7fd0ff" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function LiveTicker() {
  return (
    <Box sx={{ overflow: "hidden", height: 140, position: "relative" }}>
      <Box
        sx={{
          animation: `${tickerScroll} 8s linear infinite`,
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {[...liveEvents, ...liveEvents].map((ev, i) => (
          <Box
            key={i}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              py: 0.8, px: 1.2, mb: 0.6,
              borderRadius: "8px",
              background: alpha(ev.color, 0.06),
              border: `0.5px solid ${alpha(ev.color, 0.15)}`,
            }}
          >
            <Box sx={{ fontSize: "0.8rem" }}>{ev.icon}</Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.7rem", color: alpha("#fff", 0.8), lineHeight: 1.2 }}>
                {ev.msg}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.6rem", color: alpha("#fff", 0.3), whiteSpace: "nowrap" }}>
              {ev.time}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Fade masks */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 24, background: "linear-gradient(to bottom, #0d1f38, transparent)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 24, background: "linear-gradient(to top, #0d1f38, transparent)", pointerEvents: "none" }} />
    </Box>
  );
}

function ChannelBars({ animate }: { animate: boolean }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
      {channels.map((ch, i) => (
        <Box key={i}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.4 }}>
            <Typography sx={{ fontSize: "0.68rem", color: alpha("#fff", 0.55), fontWeight: 600, letterSpacing: "0.04em" }}>
              {ch.label}
            </Typography>
            <Typography sx={{ fontSize: "0.68rem", color: ch.color, fontWeight: 700 }}>
              {ch.pct}%
            </Typography>
          </Box>
          <Box sx={{ height: 5, borderRadius: 3, background: alpha("#fff", 0.07), overflow: "hidden" }}>
            <Box
              sx={{
                height: "100%",
                borderRadius: 3,
                background: `linear-gradient(90deg, ${ch.color}, ${alpha(ch.color, 0.5)})`,
                width: animate ? `${ch.pct}%` : "0%",
                transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.18}s`,
                boxShadow: `0 0 8px ${alpha(ch.color, 0.6)}`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function PulseDot({ color }: { color: string }) {
  return (
    <Box sx={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
      <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, animation: `${ping} 1.8s ease-out infinite` }} />
      <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
    </Box>
  );
}

// ─── Main Hero Visual Panel ────────────────────────────────────────────────────
function HeroVisualPanel({ visible }: { visible: boolean }) {
  const [barsReady, setBarsReady] = useState(false);
  useEffect(() => {
    if (visible) setTimeout(() => setBarsReady(true), 600);
  }, [visible]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        animation: visible ? `${slideInRight} 0.9s cubic-bezier(0.4,0,0.2,1) 0.4s both` : "none",
      }}
    >
      {/* Outer glow */}
      <Box sx={{
        position: "absolute", inset: -40,
        background: "radial-gradient(ellipse at center, rgba(127,208,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Main Card */}
      <Box
        sx={{
          borderRadius: "20px",
          border: "0.5px solid rgba(127,208,255,0.15)",
          background: "linear-gradient(145deg, rgba(13,31,56,0.95), rgba(8,16,32,0.98))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(127,208,255,0.08)",
          overflow: "hidden",
          animation: `${floatY} 5s ease-in-out infinite`,
        }}
      >
        {/* Card top bar */}
        <Box sx={{ px: 2, py: 1.2, borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
              <Box key={i} sx={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
          </Box>
          <Typography sx={{ fontSize: "0.65rem", color: alpha("#fff", 0.35), flex: 1, textAlign: "center", fontFamily: "monospace", letterSpacing: "0.05em" }}>
            akshar·sync — live dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PulseDot color="#34d399" />
            <Typography sx={{ fontSize: "0.6rem", color: "#34d399", fontWeight: 600 }}>LIVE</Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Stat Cards Row */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            {statCards.map((s, i) => (
              <Box key={i} sx={{
                p: 1.5, borderRadius: "12px",
                background: alpha(s.color, 0.07),
                border: `0.5px solid ${alpha(s.color, 0.2)}`,
              }}>
                <Typography sx={{ fontSize: "0.6rem", color: alpha("#fff", 0.45), mb: 0.4, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontSize: "0.65rem", color: s.color, fontWeight: 700, mt: 0.3 }}>
                  {s.delta} this month
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Channel Performance */}
          <Box sx={{
            p: 1.5, borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
          }}>
            <Typography sx={{ fontSize: "0.62rem", color: alpha("#fff", 0.4), mb: 1.2, letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600 }}>
              Channel Deliverability
            </Typography>
            <ChannelBars animate={barsReady} />
          </Box>

          {/* Live Event Feed */}
          <Box sx={{
            p: 1.5, borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
          }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: "0.62rem", color: alpha("#fff", 0.4), letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600 }}>
                Automation Events
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PulseDot color="#7fd0ff" />
                <Typography sx={{ fontSize: "0.58rem", color: alpha("#fff", 0.3) }}>streaming</Typography>
              </Box>
            </Box>
            <LiveTicker />
          </Box>

          {/* Bottom: Flow status chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {[
              { label: "12 Active Flows", color: "#34d399" },
              { label: "4 A/B Tests", color: "#fbbf24" },
              { label: "3 CRMs Synced", color: "#7fd0ff" },
            ].map((chip, i) => (
              <Box key={i} sx={{
                display: "flex", alignItems: "center", gap: 0.6,
                px: 1.2, py: 0.5, borderRadius: "20px",
                background: alpha(chip.color, 0.1),
                border: `0.5px solid ${alpha(chip.color, 0.25)}`,
              }}>
                <PulseDot color={chip.color} />
                <Typography sx={{ fontSize: "0.62rem", color: chip.color, fontWeight: 600 }}>
                  {chip.label}
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>
      </Box>

      {/* Floating badge: Klaviyo */}
      <Box sx={{
        position: "absolute", top: -18, right: -18,
        px: 1.4, py: 0.8, borderRadius: "12px",
        background: "rgba(10,22,42,0.95)",
        border: "0.5px solid rgba(127,208,255,0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", gap: 0.8,
        animation: `${floatY} 4s ease-in-out infinite 0.5s`,
      }}>
        <Typography sx={{ fontSize: "1rem" }}>🎯</Typography>
        <Box>
          <Typography sx={{ fontSize: "0.62rem", color: "#fbbf24", fontWeight: 700, lineHeight: 1 }}>Klaviyo</Typography>
          <Typography sx={{ fontSize: "0.58rem", color: alpha("#fff", 0.4) }}>Connected</Typography>
        </Box>
      </Box>

      {/* Floating badge: WhatsApp */}
      <Box sx={{
        position: "absolute", bottom: 40, left: -24,
        px: 1.4, py: 0.8, borderRadius: "12px",
        background: "rgba(10,22,42,0.95)",
        border: "0.5px solid rgba(52,211,153,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", gap: 0.8,
        animation: `${floatY} 4.5s ease-in-out infinite 1s`,
      }}>
        <Typography sx={{ fontSize: "1rem" }}>📲</Typography>
        <Box>
          <Typography sx={{ fontSize: "0.62rem", color: "#34d399", fontWeight: 700, lineHeight: 1 }}>WhatsApp</Typography>
          <Typography sx={{ fontSize: "0.58rem", color: alpha("#fff", 0.4) }}>91% delivered</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(145deg, #060e1a 0%, #0b1e35 40%, #1a0a3a 100%)",
        pt: { xs: 12, md: 0 },
      }}
    >
      {/* BG Grid */}
      <Box sx={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(127,208,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,208,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        pointerEvents: "none",
      }} />

      {/* Ambient orbs */}
      <Box sx={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)", top: "-15%", right: "-5%", animation: `${pulseGlow} 4s infinite`, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, transparent 65%)", bottom: "-10%", left: "-8%", animation: `${pulseGlow} 4s infinite`, animationDelay: "1.5s", pointerEvents: "none" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 6, lg: 8 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ── LEFT: Text content ── */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3.5, maxWidth: { md: 560 } }}>
            <Fade in={heroVisible} timeout={800}>
              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 0.8,
                px: 1.6, py: 0.7, borderRadius: "20px",
                border: "0.5px solid rgba(127,208,255,0.2)",
                background: "rgba(127,208,255,0.06)",
                width: "fit-content",
              }}>
                <AutoAwesomeIcon sx={{ fontSize: "0.85rem", color: "#7fd0ff" }} />
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#7fd0ff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Scaling D2C Growth
                </Typography>
              </Box>
            </Fade>

            <Fade in={heroVisible} timeout={1000}>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.6rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fff" }}>
                Scaling D2C Brands{" "}
                <br />
                <Box component="span" sx={{ background: "linear-gradient(90deg, #7fd0ff, #a78bfa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Through Data-Driven
                </Box>
                <br />
                Communication.
              </Typography>
            </Fade>

            <Fade in={heroVisible} timeout={1200}>
              <Typography sx={{ fontWeight: 400, color: alpha("#fff", 0.6), lineHeight: 1.7, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                We build automated revenue engines across{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 700 }}>Email, SMS, WhatsApp,</Box>{" "}
                using{" "}
                <Box component="span" sx={{ color: "#fff", fontWeight: 600 }}>12 years of technical architecture experience</Box>.
                Expert support for leading ESP, CRM, and CMS platforms.
              </Typography>
            </Fade>

            <Fade in={heroVisible} timeout={1400}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#fff", color: "#060e1a", px: 3.5, py: 1.6, borderRadius: "12px", fontWeight: 800, textTransform: "none", fontSize: "0.95rem", "&:hover": { bgcolor: "#e8f4ff", transform: "translateY(-2px)" }, transition: "all 0.2s" }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: alpha("#fff", 0.2), px: 3.5, py: 1.6, borderRadius: "12px", fontWeight: 600, textTransform: "none", fontSize: "0.95rem", "&:hover": { borderColor: "#fff", bgcolor: alpha("#fff", 0.05), transform: "translateY(-2px)" }, transition: "all 0.2s" }}
                >
                  Learn More
                </Button>
              </Box>
            </Fade>

            <Fade in={heroVisible} timeout={1600}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 1 }}>
                <AvatarGroup max={6} sx={{ "& .MuiAvatar-root": { width: 34, height: 34, border: "2px solid #060e1a" } }}>
                  {avatars.map((a, i) => (
                    <Avatar key={i} sx={{ bgcolor: a.bg, color: a.color, fontSize: "0.65rem", fontWeight: 800 }}>{a.initials}</Avatar>
                  ))}
                </AvatarGroup>
                <Typography variant="body2" sx={{ color: alpha("#fff", 0.45), fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.06em" }}>
                  TRUSTED BY{" "}
                  <Box component="span" sx={{ background: "linear-gradient(90deg, #7fd0ff, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>
                    350+ GLOBAL BRANDS
                  </Box>
                </Typography>
              </Box>
            </Fade>
          </Box>

          {/* ── RIGHT: Visual Panel ── */}
          <Box sx={{ flexShrink: 0, display: { xs: "none", md: "block" }, width: { md: 380, lg: 440 } }}>
            <HeroVisualPanel visible={heroVisible} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}