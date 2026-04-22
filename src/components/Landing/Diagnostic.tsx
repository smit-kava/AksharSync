import { useRef, useState, useCallback, useEffect } from "react";
import { Box, Container, Typography, alpha } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { HeroChip } from "./Shared";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const auditPoints = [
  {
    icon: <SyncProblemIcon />,
    title: "Data Sync Integrity",
    desc: "Ensuring your Website, CRM, and Email tools are perfectly synced with zero data loss or mismatch.",
    details:
      "Verification of customer profiles, purchase history, and behavioral triggers across the stack.",
    accent: "#7fd0ff",
    num: "01",
  },
  {
    icon: <AutoFixHighIcon />,
    title: "Flow Logic Audit",
    desc: "Deep-dive into your existing automations to identify broken steps or logical gaps in customer journeys.",
    details:
      "Testing welcome series, post-purchase flows, and abandonment reminders for maximum impact.",
    accent: "#a78bfa",
    num: "02",
  },
  {
    icon: <MarkEmailReadIcon />,
    title: "Technical Deliverability",
    desc: "Comprehensive SPF, DKIM, and DMARC verification to ensure your emails hit the inbox, not spam.",
    details:
      "Sender reputation protection and authentication settings for high-volume email architectures.",
    accent: "#34d399",
    num: "03",
  },
  {
    icon: <AnalyticsIcon />,
    title: "Stack Efficiency",
    desc: "Optimizing your marketing stack to eliminate redundancy and reduce unnecessary tool costs.",
    details:
      "Tool consolidation strategy to move from 5 inefficient tools to 2 optimised powerhouses.",
    accent: "#fbbf24",
    num: "04",
  },
];

const N = auditPoints.length;

// ─── Left collapsed card tab ──────────────────────────────────────────────────

function CollapsedTab({
  point,
  isActive,
  onClick,
  entryDelay,
}: {
  point: (typeof auditPoints)[0];
  isActive: boolean;
  onClick: () => void;
  entryDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: entryDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Box
        onClick={onClick}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2.5,
          borderRadius: "18px",
          cursor: "pointer",
          border: `1px solid ${isActive ? alpha(point.accent, 0.45) : alpha("#fff", 0.06)}`,
          background: isActive
            ? `linear-gradient(135deg, ${alpha(point.accent, 0.1)} 0%, ${alpha("#fff", 0.025)} 100%)`
            : alpha("#fff", 0.02),
          boxShadow: isActive
            ? `0 8px 32px ${alpha(point.accent, 0.18)}, inset 0 1px 0 ${alpha("#fff", 0.05)}`
            : "none",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          "&:hover": {
            background: isActive
              ? `linear-gradient(135deg, ${alpha(point.accent, 0.13)} 0%, ${alpha("#fff", 0.03)} 100%)`
              : alpha("#fff", 0.04),
            borderColor: isActive ? alpha(point.accent, 0.55) : alpha("#fff", 0.12),
          },
        }}
      >
        {/* Active indicator stripe */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: "20%",
            width: "3px",
            height: "60%",
            borderRadius: "0 4px 4px 0",
            background: point.accent,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Icon bubble */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: alpha(point.accent, isActive ? 0.18 : 0.08),
            border: `1px solid ${alpha(point.accent, isActive ? 0.35 : 0.15)}`,
            color: point.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            "& svg": { fontSize: "1.3rem" },
          }}
        >
          {point.icon}
        </Box>

        {/* Text */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: isActive ? point.accent : alpha("#fff", 0.3),
              textTransform: "uppercase",
              mb: 0.3,
              transition: "color 0.3s ease",
            }}
          >
            {point.num}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.82rem", md: "0.9rem" },
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#fff" : alpha("#fff", 0.45),
              transition: "color 0.3s ease, font-weight 0.2s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {point.title}
          </Typography>
        </Box>

        {/* Right chevron (active) */}
        <Box
          sx={{
            ml: "auto",
            width: 6,
            height: 6,
            borderRight: `2px solid ${point.accent}`,
            borderTop: `2px solid ${point.accent}`,
            transform: "rotate(45deg)",
            opacity: isActive ? 1 : 0,
            flexShrink: 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </Box>
    </motion.div>
  );
}

// ─── Right expanded detail card ───────────────────────────────────────────────

const detailVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 40 : -40,
    scale: 0.96,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -40 : 40,
    scale: 0.96,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as const },
  }),
};

function DetailCard({ point }: { point: (typeof auditPoints)[0] }) {
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "28px",
        p: { xs: 4, md: 5.5 },
        background: `linear-gradient(145deg,
          ${alpha(point.accent, 0.13)} 0%,
          ${alpha("#060e1a", 0.93)} 65%)`,
        border: `1px solid ${alpha(point.accent, 0.35)}`,
        boxShadow: `0 28px 80px ${alpha(point.accent, 0.22)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Glow blob */}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(point.accent, 0.3)} 0%, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Watermark */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 16,
          right: 30,
          fontSize: "7rem",
          fontWeight: 950,
          lineHeight: 1,
          color: alpha("#fff", 0.028),
          userSelect: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {point.num}
      </Typography>

      {/* Icon */}
      <Box
        sx={{
          width: 76,
          height: 76,
          borderRadius: "22px",
          background: alpha(point.accent, 0.14),
          border: `1.5px solid ${alpha(point.accent, 0.32)}`,
          color: point.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4.5,
          "& svg": { fontSize: "2.2rem" },
        }}
      >
        {point.icon}
      </Box>

      {/* Accent bar */}
      <Box
        sx={{
          width: 44,
          height: 3,
          borderRadius: "99px",
          background: `linear-gradient(90deg, ${point.accent}, ${alpha(point.accent, 0.25)})`,
          mb: 3.5,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          fontSize: { xs: "1.7rem", md: "2.2rem" },
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          mb: 2.5,
        }}
      >
        {point.title}
      </Typography>

      <Typography
        sx={{
          color: alpha("#fff", 0.7),
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          lineHeight: 1.8,
          mb: 4,
        }}
      >
        {point.desc}
      </Typography>

      <Box
        sx={{
          p: 2.5,
          borderRadius: "14px",
          background: alpha("#000", 0.22),
          border: `1px solid ${alpha(point.accent, 0.1)}`,
        }}
      >
        <Typography
          sx={{
            color: alpha("#fff", 0.38),
            fontSize: "0.85rem",
            lineHeight: 1.75,
            fontStyle: "italic",
          }}
        >
          {point.details}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <Box ref={ref} sx={{ mb: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <HeroChip sx={{ mb: 3 }}>Phase 01: Diagnostic</HeroChip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "2.2rem", md: "3.5rem" },
            letterSpacing: "-0.025em",
            lineHeight: 1.06,
            mb: 3,
          }}
        >
          Multi-Platform{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            Audit.
          </Box>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Typography
          sx={{
            color: alpha("#fff", 0.46),
            fontSize: { xs: "0.92rem", md: "1.1rem" },
            maxWidth: 580,
            lineHeight: 1.88,
          }}
        >
          Before we build, we diagnose. We treat your marketing system like a
          high-performance engine — identifying every leak and misfire before
          starting the synchronisation process.
        </Typography>
      </motion.div>
    </Box>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Diagnostic() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeRef = useRef(active);
  activeRef.current = active;
  const wheelLock = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= N) return;
    setDirection(next > activeRef.current ? 1 : -1);
    setActive(next);
  }, []);

  // ── Wheel / touch / keyboard capture on the whole section ─────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const cur = activeRef.current;
      // Let page scroll at the boundaries
      if (e.deltaY < 0 && cur === 0) return;
      if (e.deltaY > 0 && cur === N - 1) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 650);
      if (e.deltaY > 0) go(cur + 1);
      else go(cur - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;
      if (Math.abs(delta) < 40) return;
      const cur = activeRef.current;
      if (delta > 0 && cur < N - 1) { e.preventDefault(); go(cur + 1); }
      if (delta < 0 && cur > 0) { e.preventDefault(); go(cur - 1); }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  const point = auditPoints[active];

  return (
    <Box
      ref={sectionRef}
      id="diagnostic"
      sx={{
        py: { xs: 10, md: 16 },
        position: "relative",
        background: "linear-gradient(180deg, #060e1a 0%, #0a1c33 50%, #060e1a 100%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 50%, rgba(127,208,255,0.05) 0%, transparent 45%),
            radial-gradient(circle at 90% 50%, rgba(167,139,250,0.05) 0%, transparent 45%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* ── Section heading (full width, top) ─────────────────────────── */}
        <Header />

        {/* ── Two-column: left tabs + right detail ──────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
            gap: { xs: 4, md: 5 },
            alignItems: "start",
          }}
        >
          {/* ── LEFT: collapsed card tabs (all visible, small) ─────────── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // Sticky so tabs stay visible while the right side is in view
              position: { md: "sticky" },
              top: { md: "calc(50vh - 160px)" },
            }}
          >
            {auditPoints.map((p, i) => (
              <CollapsedTab
                key={p.title}
                point={p}
                isActive={active === i}
                onClick={() => go(i)}
                entryDelay={i * 0.08}
              />
            ))}

            {/* Progress counter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                pl: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: point.accent,
                  letterSpacing: "0.08em",
                  transition: "color 0.3s ease",
                }}
              >
                {String(active + 1).padStart(2, "0")}
              </Typography>
              <Box sx={{ flex: 1, height: "1.5px", background: alpha("#fff", 0.07), borderRadius: 99 }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${((active + 1) / N) * 100}%`,
                    background: point.accent,
                    borderRadius: 99,
                    transition: "width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: "0.72rem", color: alpha("#fff", 0.22), letterSpacing: "0.06em" }}>
                {String(N).padStart(2, "0")}
              </Typography>
            </Box>

            {/* Scroll hint */}
            <Typography
              sx={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: alpha("#fff", 0.2),
                pl: 1,
                display: { xs: "none", md: "block" },
              }}
            >
              ↕ scroll to cycle
            </Typography>
          </Box>

          {/* ── RIGHT: full expanded detail ──────────────────────────────── */}
          <Box
            sx={{
              position: "relative",
              height: { xs: "80vw", md: "480px", lg: "520px" },
              minHeight: 360,
              maxHeight: 600,
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={detailVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: "absolute",
                  inset: 0,
                  willChange: "transform, opacity",
                }}
              >
                <DetailCard point={point} />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}