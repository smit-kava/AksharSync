import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  alpha,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import gsap from "gsap";
import { ROUTE_PATHS } from "../../routes/paths";
import {
  ChatIcon,
  EmailIcon,
  PushNotificationIcon,
  RcsIcon,
  TargetIcon,
  WhatsAppIcon,
} from "../icons";

// ─── Keyframe Fallbacks for looping elements ──────────────────────────────────
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
  {
    icon: <EmailIcon sx={{ fontSize: 16 }} />,
    msg: "Audit finding: 22% Email revenue leak",
    time: "just now",
    color: "#7fd0ff",
  },
  {
    icon: <ChatIcon sx={{ fontSize: 16 }} />,
    msg: "SMS Flow Optimization: +14% CTR",
    time: "2s ago",
    color: "#a78bfa",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 16 }} />,
    msg: "WhatsApp CRM Sync: 12k contacts",
    time: "5s ago",
    color: "#34d399",
  },
  {
    icon: <TargetIcon sx={{ fontSize: 16 }} />,
    msg: "Klaviyo Audit: 4 missing flows",
    time: "9s ago",
    color: "#fbbf24",
  },
  {
    icon: <PushNotificationIcon sx={{ fontSize: 16 }} />,
    msg: "Push Strategy: +8% retention",
    time: "14s ago",
    color: "#7fd0ff",
  },
  {
    icon: <RcsIcon sx={{ fontSize: 16 }} />,
    msg: "RCS Pilot: 3.4x higher ROI",
    time: "18s ago",
    color: "#34d399",
  },
];

const statCards = [
  { label: "Revenue Attributed", value: "$2.4M", delta: "+34%", color: "#34d399" },
  { label: "Avg Open Rate", value: "61.2%", delta: "+12%", color: "#7fd0ff" },
];

const designedForTags = [
  {
    label: "Shopify Brands",
    dotColor: "#34d399",
    gradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.22) 0%, rgba(6, 14, 26, 0.75) 100%)",
    borderColor: "rgba(52, 211, 153, 0.42)",
    borderTopColor: "rgba(52, 211, 153, 0.75)",
    textColor: "#a7f3d0",
    glow: "rgba(52, 211, 153, 0.3)",
    hoverBg: "linear-gradient(135deg, rgba(52, 211, 153, 0.35) 0%, rgba(8, 22, 40, 0.9) 100%)",
  },
  {
    label: "DTC Ecommerce",
    dotColor: "#7fd0ff",
    gradient: "linear-gradient(135deg, rgba(127, 208, 255, 0.22) 0%, rgba(6, 14, 26, 0.75) 100%)",
    borderColor: "rgba(127, 208, 255, 0.42)",
    borderTopColor: "rgba(127, 208, 255, 0.75)",
    textColor: "#bfdbfe",
    glow: "rgba(127, 208, 255, 0.3)",
    hoverBg: "linear-gradient(135deg, rgba(127, 208, 255, 0.35) 0%, rgba(8, 22, 40, 0.9) 100%)",
  },
  {
    label: "Agencies",
    dotColor: "#a78bfa",
    gradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.22) 0%, rgba(6, 14, 26, 0.75) 100%)",
    borderColor: "rgba(167, 139, 250, 0.42)",
    borderTopColor: "rgba(167, 139, 250, 0.75)",
    textColor: "#ddd6fe",
    glow: "rgba(167, 139, 250, 0.3)",
    hoverBg: "linear-gradient(135deg, rgba(167, 139, 250, 0.35) 0%, rgba(8, 22, 40, 0.9) 100%)",
  },
  {
    label: "Klaviyo Users",
    dotColor: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251, 191, 36, 0.22) 0%, rgba(244, 114, 182, 0.14) 60%, rgba(6, 14, 26, 0.75) 100%)",
    borderColor: "rgba(251, 191, 36, 0.42)",
    borderTopColor: "rgba(251, 191, 36, 0.75)",
    textColor: "#fef08a",
    glow: "rgba(251, 191, 36, 0.28)",
    hoverBg: "linear-gradient(135deg, rgba(251, 191, 36, 0.35) 0%, rgba(244, 114, 182, 0.24) 100%)",
  },
  {
    label: "Growth Teams",
    dotColor: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.18) 60%, rgba(6, 14, 26, 0.75) 100%)",
    borderColor: "rgba(56, 189, 248, 0.42)",
    borderTopColor: "rgba(56, 189, 248, 0.75)",
    textColor: "#bae6fd",
    glow: "rgba(56, 189, 248, 0.3)",
    hoverBg: "linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0.26) 100%)",
  },
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
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              py: 0.8,
              px: 1.2,
              mb: 0.6,
              borderRadius: "8px",
              background: alpha(ev.color, 0.06),
              border: `1px solid ${alpha(ev.color, 0.12)}`,
            }}
          >
            <Box sx={{ color: ev.color, display: "flex", alignItems: "center" }}>
              {ev.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: alpha("#fff", 0.8),
                  lineHeight: 1.2,
                }}
              >
                {ev.msg}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.6rem",
                color: alpha("#fff", 0.3),
                whiteSpace: "nowrap",
              }}
            >
              {ev.time}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 24,
          background: "linear-gradient(to bottom, #0d1f38, transparent)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          background: "linear-gradient(to top, #0d1f38, transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

function ChannelBars({ animate }: { animate: boolean }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
      {channels.map((ch, i) => (
        <Box key={i}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.4,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.68rem",
                color: alpha("#fff", 0.55),
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {ch.label}
            </Typography>
            <Typography
              sx={{ fontSize: "0.68rem", color: ch.color, fontWeight: 700 }}
            >
              {ch.pct}%
            </Typography>
          </Box>
          <Box
            sx={{
              height: 5,
              borderRadius: 3,
              background: alpha("#fff", 0.07),
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 3,
                background: `linear-gradient(90deg, ${ch.color}, ${alpha(
                  ch.color,
                  0.5,
                )})`,
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
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: color,
          animation: `${ping} 1.8s ease-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: color,
        }}
      />
    </Box>
  );
}

// ─── Main Hero Visual Panel ────────────────────────────────────────────────────
function HeroVisualPanel({
  panelRef,
  badgeKlaviyoRef,
  badgeWhatsappRef,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  badgeKlaviyoRef: React.RefObject<HTMLDivElement | null>;
  badgeWhatsappRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      ref={panelRef}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Outer ambient glow */}
      <Box
        sx={{
          position: "absolute",
          inset: -40,
          background:
            "radial-gradient(ellipse at center, rgba(127,208,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Glass Dashboard Card */}
      <Box
        id="hero-dashboard-card"
        sx={{
          borderRadius: "20px",
          border: "1px solid rgba(127,208,255,0.20)",
          borderTop: "1.5px solid rgba(127,208,255,0.40)",
          background:
            "linear-gradient(145deg, rgba(13,31,56,0.96), rgba(8,16,32,0.98))",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.65), 0 0 40px rgba(127,208,255,0.12), inset 0 1px 1px rgba(127,208,255,0.25)",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
          "&:hover": {
            borderColor: "rgba(127,208,255,0.45)",
          },
        }}
      >
        {/* Card top bar */}
        <Box
          sx={{
            px: 2,
            py: 1.2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.85,
                }}
              />
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: alpha("#fff", 0.45),
              flex: 1,
              textAlign: "center",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
            }}
          >
            akshar·sync — live intelligence
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PulseDot color="#34d399" />
            <Typography
              sx={{ fontSize: "0.6rem", color: "#34d399", fontWeight: 700 }}
            >
              LIVE
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Stat Cards Row */}
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
          >
            {statCards.map((s, i) => (
              <Box
                key={i}
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  background: alpha(s.color, 0.08),
                  border: `1px solid ${alpha(s.color, 0.22)}`,
                  boxShadow: `0 4px 16px ${alpha(s.color, 0.08)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    color: alpha("#fff", 0.5),
                    mb: 0.4,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    color: s.color,
                    fontWeight: 700,
                    mt: 0.4,
                  }}
                >
                  Identified growth
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Channel Performance */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",
                color: alpha("#fff", 0.45),
                mb: 1.2,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Channel Deliverability
            </Typography>
            <ChannelBars animate={barsReady} />
          </Box>

          {/* Live Event Feed */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  color: alpha("#fff", 0.45),
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Automation Events
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PulseDot color="#7fd0ff" />
                <Typography
                  sx={{ fontSize: "0.58rem", color: alpha("#fff", 0.35) }}
                >
                  streaming
                </Typography>
              </Box>
            </Box>
            <LiveTicker />
          </Box>

          {/* Flow status chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {[
              { label: "12 Active Flows", color: "#34d399" },
              { label: "4 A/B Tests", color: "#fbbf24" },
              { label: "3 CRMs Synced", color: "#7fd0ff" },
            ].map((chip, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "20px",
                  background: alpha(chip.color, 0.08),
                  border: `1px solid ${alpha(chip.color, 0.25)}`,
                }}
              >
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: chip.color,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    color: chip.color,
                    fontWeight: 700,
                  }}
                >
                  {chip.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Floating badge: Klaviyo Connected */}
      <Box
        ref={badgeKlaviyoRef}
        sx={{
          position: "absolute",
          top: -18,
          right: -20,
          px: 1.8,
          py: 1,
          borderRadius: "14px",
          background: "rgba(10,22,42,0.94)",
          border: "1px solid rgba(251,191,36,0.3)",
          backdropFilter: "blur(14px)",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.55), 0 0 16px rgba(251,191,36,0.18)",
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          cursor: "default",
          transition: "transform 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px) scale(1.04)",
            borderColor: "rgba(251,191,36,0.6)",
          },
        }}
      >
        <Box sx={{ fontSize: 18 }}>⚡</Box>
        <Box>
          <Typography
            sx={{
              fontSize: "0.68rem",
              color: "#fbbf24",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Klaviyo
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", color: alpha("#fff", 0.5) }}>
            Connected
          </Typography>
        </Box>
      </Box>

      {/* Floating badge: WhatsApp */}
      <Box
        ref={badgeWhatsappRef}
        sx={{
          position: "absolute",
          bottom: 35,
          left: -28,
          px: 1.8,
          py: 1.2,
          borderRadius: "16px",
          background: "rgba(10,22,42,0.94)",
          border: "1px solid rgba(52,211,153,0.3)",
          backdropFilter: "blur(14px)",
          boxShadow:
            "0 14px 36px rgba(0,0,0,0.55), 0 0 18px rgba(52,211,153,0.18)",
          display: "flex",
          alignItems: "center",
          gap: 1.4,
          cursor: "default",
          transition: "transform 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px) scale(1.04)",
            borderColor: "rgba(52,211,153,0.6)",
          },
        }}
      >
        <WhatsAppIcon
          sx={{
            fontSize: 20,
            color: "#34d399",
            filter: "drop-shadow(0 0 6px rgba(52,211,153,0.4))",
          }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "0.68rem",
              color: "#34d399",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            WhatsApp
          </Typography>
          <Typography sx={{ fontSize: "0.6rem", color: alpha("#fff", 0.5) }}>
            91% delivered
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Main Hero Component with GSAP Animations ─────────────────────────────────
export default function Hero() {
  const heroRootRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadRef = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDivElement | null>(null);
  const visualPanelRef = useRef<HTMLDivElement | null>(null);
  const badgeKlaviyoRef = useRef<HTMLDivElement | null>(null);
  const badgeWhatsappRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ambient Background Orbs Organic GSAP Float
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 40,
          y: -30,
          scale: 1.12,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -35,
          y: 25,
          scale: 1.15,
          duration: 8.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      }

      // 2. Master Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Top mini audit badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.85, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.8)" },
          0.1
        );
      }

      // Headline Kinetic Words Reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-kinetic-word");
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 35,
            rotateX: -20,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.038,
            ease: "power4.out",
            clearProps: "transform,filter",
          },
          0.2
        );
      }

      // Subheading smooth glide
      if (subheadRef.current) {
        tl.fromTo(
          subheadRef.current,
          { opacity: 0, y: 25, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
          0.45
        );
      }

      // CTA Buttons reveal
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.5)",
          },
          0.6
        );
      }

      // Designed For tags
      if (tagsRef.current) {
        const tags = tagsRef.current.querySelectorAll(".hero-tag");
        tl.fromTo(
          tags,
          { opacity: 0, scale: 0.85, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(1.4)",
          },
          0.75
        );
      }

      // Trust by avatars
      if (trustRef.current) {
        tl.fromTo(
          trustRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.9
        );
      }

      // Visual Panel 3D entrance
      if (visualPanelRef.current) {
        tl.fromTo(
          visualPanelRef.current,
          {
            opacity: 0,
            x: 60,
            scale: 0.9,
            rotationY: -10,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.05,
            ease: "power3.out",
          },
          0.35
        );
      }

      // Floating badges pop in with bounce
      if (badgeKlaviyoRef.current) {
        tl.fromTo(
          badgeKlaviyoRef.current,
          { opacity: 0, scale: 0.4, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2)" },
          0.85
        );

        // Continuous floating tween for Klaviyo badge
        gsap.to(badgeKlaviyoRef.current, {
          y: -10,
          rotation: 1.5,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      if (badgeWhatsappRef.current) {
        tl.fromTo(
          badgeWhatsappRef.current,
          { opacity: 0, scale: 0.4, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2)" },
          0.95
        );

        // Continuous floating tween for WhatsApp badge
        gsap.to(badgeWhatsappRef.current, {
          y: 8,
          rotation: -1.5,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      // 3. Interactive Mouse Parallax on Visual Dashboard
      const heroEl = heroRootRef.current;
      const panelEl = visualPanelRef.current;
      if (heroEl && panelEl) {
        const rotXTo = gsap.quickTo(panelEl, "rotationX", { duration: 0.4, ease: "power2" });
        const rotYTo = gsap.quickTo(panelEl, "rotationY", { duration: 0.4, ease: "power2" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect();
          const xVal = (e.clientX - rect.left) / rect.width - 0.5;
          const yVal = (e.clientY - rect.top) / rect.height - 0.5;
          rotYTo(xVal * 10);
          rotXTo(-yVal * 8);
        };

        const handleMouseLeave = () => {
          rotXTo(0);
          rotYTo(0);
        };

        heroEl.addEventListener("mousemove", handleMouseMove);
        heroEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          heroEl.removeEventListener("mousemove", handleMouseMove);
          heroEl.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, heroRootRef);

    return () => ctx.revert();
  }, []);

  // Split headline text into individual kinetic words
  const line1Words = "Discover hidden revenue opportunities across".split(" ");
  const line2Words = "Lifecycle Channels.".split(" ");

  return (
    <Box
      ref={heroRootRef}
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        maxHeight: { md: "920px" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #060e1a 0%, #0b1e35 40%, #1a0a3a 100%)",
        pt: { xs: 13, md: 8 },
        pb: { xs: 9, md: 5 },
      }}
    >
      {/* Background Grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(127,208,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(127,208,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Glowing Orbs with GSAP Motion */}
      <Box
        ref={orb1Ref}
        sx={{
          position: "absolute",
          width: 650,
          height: 650,
          background:
            "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)",
          top: "-15%",
          right: "-5%",
          pointerEvents: "none",
        }}
      />
      <Box
        ref={orb2Ref}
        sx={{
          position: "absolute",
          width: 550,
          height: 550,
          background:
            "radial-gradient(circle, rgba(127,208,255,0.10) 0%, transparent 65%)",
          bottom: "-10%",
          left: "-8%",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 10, lg: 16 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ── LEFT: Text Content ── */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              maxWidth: { md: 560, lg: 620 },
            }}
          >
            {/* Top Pill Badge */}
            <Box
              ref={badgeRef}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.5,
                py: 0.65,
                borderRadius: "20px",
                border: "1px solid rgba(127,208,255,0.25)",
                background: "rgba(127,208,255,0.08)",
                backdropFilter: "blur(12px)",
                width: "fit-content",
                boxShadow: "0 0 20px rgba(127,208,255,0.15)",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: "0.85rem", color: "#7fd0ff" }} />
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "#7fd0ff",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Free Retention Growth Audit for Agencies & Brands
              </Typography>
            </Box>

            {/* GSAP Kinetic Typography Headline */}
            <Typography
              ref={headlineRef}
              variant="h1"
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.15rem", md: "2.55rem", lg: "2.8rem" },
                fontWeight: 900,
                lineHeight: 1.22,
                letterSpacing: "-0.03em",
                color: "#fff",
              }}
            >
              {line1Words.map((word, i) => (
                <Box
                  component="span"
                  key={i}
                  className="hero-kinetic-word"
                  sx={{ display: "inline-block", mr: "0.28em" }}
                >
                  {word}
                </Box>
              ))}
              <Box
                component="span"
                sx={{
                  color: "#7fd0ff",
                  textShadow: "0 0 35px rgba(127,208,255,0.45)",
                  display: "inline",
                }}
              >
                {line2Words.map((word, i) => (
                  <Box
                    component="span"
                    key={i}
                    className="hero-kinetic-word"
                    sx={{
                      display: "inline-block",
                      mr: i < line2Words.length - 1 ? "0.28em" : 0,
                      color: "#7fd0ff",
                    }}
                  >
                    {word}
                  </Box>
                ))}
              </Box>
            </Typography>

            {/* Subheading */}
            <Typography
              ref={subheadRef}
              sx={{
                fontWeight: 400,
                color: alpha("#fff", 0.65),
                lineHeight: 1.65,
                fontSize: { xs: "0.95rem", md: "1.02rem" },
              }}
            >
              AksharSync identifies retention gaps and unlocks repeat revenue
              through strategic audits. We review what’s leaking revenue and
              what should be fixed first.
            </Typography>

            {/* CTA Button Row */}
            <Box
              ref={ctaGroupRef}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                pt: 1.5,
              }}
            >
              <Button
                ref={primaryBtnRef}
                variant="contained"
                component={RouterLink}
                to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#060e1a",
                  px: 3.2,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  boxShadow:
                    "0 8px 24px rgba(255,255,255,0.2), 0 0 12px rgba(127,208,255,0.3)",
                  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    bgcolor: "#e8f4ff",
                    transform: "translateY(-3px) scale(1.02)",
                    boxShadow:
                      "0 12px 30px rgba(127,208,255,0.4), 0 0 20px rgba(127,208,255,0.5)",
                  },
                }}
              >
                Book Your Free Retention Audit
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to={ROUTE_PATHS.CONTACT}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(127,208,255,0.3)",
                  bgcolor: "rgba(127,208,255,0.05)",
                  backdropFilter: "blur(12px)",
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "#7fd0ff",
                    bgcolor: "rgba(127,208,255,0.12)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                View Case Studies
              </Button>
            </Box>

            {/* Designed For Tags */}
            <Box sx={{ mt: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                    boxShadow: "0 0 10px #7fd0ff",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #FFFFFF 0%, #7fd0ff 60%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Designed For:
                </Typography>
              </Box>
              <Box
                ref={tagsRef}
                sx={{ display: "flex", flexWrap: "wrap", gap: 1.1 }}
              >
                {designedForTags.map((tag) => (
                  <Box
                    key={tag.label}
                    className="hero-tag"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.9,
                      px: 1.5,
                      py: 0.65,
                      borderRadius: "999px",
                      background: tag.gradient,
                      border: `1px solid ${tag.borderColor}`,
                      borderTop: `1.5px solid ${tag.borderTopColor}`,
                      boxShadow: `0 4px 16px rgba(0, 0, 0, 0.35), 0 0 14px ${tag.glow}, inset 0 1px 1px rgba(255, 255, 255, 0.25)`,
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      fontSize: "0.78rem",
                      color: tag.textColor,
                      fontWeight: 700,
                      letterSpacing: "0.015em",
                      cursor: "default",
                      transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        background: tag.hoverBg,
                        borderColor: tag.dotColor,
                        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.45), 0 0 22px ${tag.dotColor}, inset 0 1px 2px rgba(255, 255, 255, 0.4)`,
                        transform: "translateY(-2px) scale(1.04)",
                        color: "#fff",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: tag.dotColor,
                        boxShadow: `0 0 8px ${tag.dotColor}`,
                        flexShrink: 0,
                      }}
                    />
                    {tag.label}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Trust Proof */}
            <Box
              ref={trustRef}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                pt: 2.5,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <AvatarGroup
                max={6}
                sx={{
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    border: "2px solid #060e1a",
                  },
                }}
              >
                {avatars.map((a, i) => (
                  <Avatar
                    key={i}
                    sx={{
                      bgcolor: a.bg,
                      color: a.color,
                      fontSize: "0.62rem",
                      fontWeight: 800,
                    }}
                  >
                    {a.initials}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#fff", 0.5),
                  fontWeight: 600,
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                }}
              >
                TRUSTED BY{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(90deg, #7fd0ff, #34d399)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                  }}
                >
                  350+ GLOBAL BRANDS
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* ── RIGHT: Visual Panel with GSAP Parallax ── */}
          <Box
            sx={{
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              width: { md: 360, lg: 430 },
            }}
          >
            <HeroVisualPanel
              panelRef={visualPanelRef}
              badgeKlaviyoRef={badgeKlaviyoRef}
              badgeWhatsappRef={badgeWhatsappRef}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}