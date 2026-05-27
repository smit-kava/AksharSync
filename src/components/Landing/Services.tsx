import { useRef, useState, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  alpha,
  Fade,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";
import { useInView as useInViewShared, GradientText } from "./Shared";
import { ROUTE_PATHS } from "../../routes/paths";
import { motion, useInView } from "framer-motion";
import { LifecycleIcon, ArchitectureIcon, CreativeIcon, MessagingIcon } from "../icons";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

// ─── Service data ──────────────────────────────────────────────────────────────

const services = [
  {
    rotate: -18,
    icon: <LifecycleIcon sx={{ fontSize: "2rem" }} />,
    id: ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT,
    title: "Lifecycle Flow Review",
    sub: "Journey Audit",
    desc: "Complete review of behavioral journeys and automated sequences to identify conversion gaps.",
    accent: "#7fd0ff",
    label: "01",
    clickable: true,
  },
  {
    rotate: -9,
    icon: <CreativeIcon sx={{ fontSize: "2rem" }} />,
    id: ROUTE_PATHS.SERVICE_CREATIVE_AUDIT,
    title: "Template & Creative",
    sub: "Visual Audit",
    desc: "Evaluating design performance, mobile responsiveness, and brand consistency across all assets.",
    accent: "#a78bfa",
    label: "02",
    clickable: true,
  },
  {
    rotate: 0,
    icon: <ArchitectureIcon sx={{ fontSize: "2rem" }} />,
    id: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT,
    title: "Deliverability Review",
    sub: "Inbox Health",
    desc: "Technical audit of SPF, DKIM, DMARC, and sender reputation for maximum inbox placement.",
    accent: "#34d399",
    label: "03",
    clickable: true,
  },
  {
    rotate: 9,
    icon: <SyncProblemIcon sx={{ fontSize: "2rem" }} />,
    id: ROUTE_PATHS.SERVICE_REVENUE_AUDIT,
    title: "Revenue Opportunity",
    sub: "Growth Discovery",
    desc: "Data-driven analysis to uncover missed repeat purchase opportunities and hidden revenue.",
    accent: "#fbbf24",
    label: "04",
    clickable: true,
  },
  {
    rotate: 18,
    icon: <MessagingIcon sx={{ fontSize: "2rem" }} />,
    id: ROUTE_PATHS.SERVICE_SMS,
    title: "Omnichannel Review",
    sub: "Multi-Platform",
    desc: "Audit of SMS, WhatsApp, Push, RCS, Direct Mail, and Instagram DM automation systems.",
    accent: "#f472b6",
    label: "05",
    clickable: true,
  },
];

// ─── Card inner — fluid, no fixed height content ───────────────────────────────

function CardInner({ svc, cardWidth }: { svc: (typeof services)[0]; cardWidth: number }) {
  // All sizes derived from cardWidth so nothing ever overflows
  const isNarrow = cardWidth < 200;
  const isMid = cardWidth < 240;

  const iconBoxSize = isNarrow ? 36 : isMid ? 44 : 60;
  const titleSize = isNarrow ? "0.9rem" : isMid ? "1rem" : "1.45rem";
  const descSize = isNarrow ? "0.72rem" : isMid ? "0.8rem" : "0.9rem";
  const stepSize = isNarrow ? "0.55rem" : "0.65rem";
  const padding = isNarrow ? "14px 12px 44px" : isMid ? "18px 16px 48px" : "28px 24px 52px";
  const ctaHeight = isNarrow ? 36 : isMid ? 42 : 48;
  const ctaFontSize = isNarrow ? "0.65rem" : "0.78rem";
  const iconFontSize = isNarrow ? "1.1rem" : isMid ? "1.5rem" : "2.4rem";
  const watermarkSize = isNarrow ? "3.5rem" : isMid ? "4.5rem" : "7rem";
  const accentBarW = isNarrow ? 24 : isMid ? 32 : 44;

  return (
    <Box
      component={svc.clickable ? RouterLink : "div"}
      to={svc.clickable ? svc.id : undefined}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        background: "linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: isNarrow ? "16px" : isMid ? "22px" : "28px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
        padding,
        cursor: svc.clickable ? "pointer" : "default",
        transition: "border-color 0.35s, box-shadow 0.35s",
        "&:hover": {
          borderColor: alpha(svc.accent, 0.55),
          boxShadow: `0 32px 80px ${alpha(svc.accent, 0.25)}, inset 0 1px 0 rgba(255,255,255,0.1)`,
        },
      }}
    >
      {/* Glow blob */}
      <Box sx={{
        position: "absolute", top: -60, right: -60,
        width: 260, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${alpha(svc.accent, 0.28)} 0%, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      {/* Watermark */}
      <Typography sx={{
        position: "absolute", bottom: ctaHeight + 8, right: 18,
        fontSize: watermarkSize,
        fontWeight: 950, lineHeight: 1,
        color: alpha("#fff", 0.025),
        userSelect: "none", letterSpacing: "-0.05em", pointerEvents: "none",
      }}>
        {svc.label}
      </Typography>

      {/* Icon */}
      <Box sx={{
        width: iconBoxSize, height: iconBoxSize,
        borderRadius: isNarrow ? "10px" : "14px",
        background: alpha(svc.accent, 0.12),
        border: `1.5px solid ${alpha(svc.accent, 0.3)}`,
        color: svc.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        mb: isNarrow ? 1 : isMid ? 1.5 : 3,
        filter: `drop-shadow(0 0 8px ${alpha(svc.accent, 0.4)})`,
        position: "relative", zIndex: 1, flexShrink: 0,
        "& .MuiSvgIcon-root": { fontSize: iconFontSize },
      }}>
        {svc.icon}
      </Box>

      {/* Step label */}
      <Typography sx={{
        fontSize: stepSize, fontWeight: 800, letterSpacing: "0.15em",
        color: svc.accent, textTransform: "uppercase",
        mb: isNarrow ? 0.5 : 1,
        lineHeight: 1.3,
        // allow wrap on very narrow cards
        wordBreak: "break-word",
      }}>
        {svc.label} — {svc.sub}
      </Typography>

      {/* Accent bar */}
      <Box sx={{
        width: accentBarW, height: 3, borderRadius: "99px",
        background: `linear-gradient(90deg, ${svc.accent}, ${alpha(svc.accent, 0.2)})`,
        mb: isNarrow ? 1 : isMid ? 1.5 : 2.5, position: "relative", zIndex: 1,
      }} />

      {/* Title */}
      <Typography sx={{
        fontWeight: 900, fontSize: titleSize,
        letterSpacing: "-0.02em", lineHeight: 1.25,
        mb: isNarrow ? 0.8 : isMid ? 1.2 : 2, color: "#fff",
        position: "relative", zIndex: 1,
        // never truncate title — let it wrap
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}>
        {svc.title}
      </Typography>

      {/* Description — clamp lines based on card width */}
      <Typography sx={{
        fontSize: descSize,
        color: alpha("#fff", 0.5),
        lineHeight: isNarrow ? 1.6 : 1.8,
        position: "relative", zIndex: 1,
        flex: 1,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: isNarrow ? 3 : isMid ? 4 : 5,
      }}>
        {svc.desc}
      </Typography>

      {/* CTA bar — always pinned to bottom */}
      <Box sx={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: ctaHeight,
        background: "rgba(255,255,255,0.03)",
        borderTop: `1px solid ${alpha(svc.accent, 0.12)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 0.5, color: svc.accent,
        fontSize: ctaFontSize, fontWeight: 700, letterSpacing: "0.04em",
        transition: "background 0.3s",
        "&:hover": { background: svc.clickable ? alpha(svc.accent, 0.08) : "transparent" },
      }}>
        <span>{svc.clickable ? "Discover more" : `Audit Focus ${svc.label}`}</span>
        {svc.clickable && <ArrowForwardIcon sx={{ fontSize: isNarrow ? "0.7rem" : "0.85rem" }} />}
      </Box>
    </Box>
  );
}

// ─── Desktop fan deck — fully responsive ──────────────────────────────────────

function DesktopFanDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState({
    cardWidth: 220,
    cardHeight: 320,
    spreads: [0, 0, 0, 0, 0] as number[],
  });

  const isInView = useInView(deckRef, {
    amount: 0.2,
    margin: "0% 0% -40% 0%",
    once: true,
  });

  const recalc = useCallback(() => {
    if (!containerRef.current) return;
    const W = containerRef.current.offsetWidth;

    // ── Card width: divide container into 5 columns with 12px gutters ──
    // totalCardWidth * 5 + 12 * 4 = W  →  cardW = (W - 48) / 5
    const cardW = Math.max(160, Math.floor((W - 48) / 5));
    // Height: fixed ratio 1.55 so content has room
    const cardH = Math.round(cardW * 1.55);
    // Gap between card centres = cardW + gutter
    const step = cardW + 12;

    const spreads = services.map((_, i) => (i - 2) * step);

    setLayout({ cardWidth: cardW, cardHeight: cardH, spreads });
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <Box ref={containerRef} sx={{ width: "100%", position: "relative" }}>
      <Box
        ref={deckRef}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height = card height + breathing room for hover scale
          height: layout.cardHeight + 48,
          width: "100%",
        }}
      >
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            style={{ position: "absolute", zIndex: i + 1 }}
            animate={{
              x: isInView ? layout.spreads[i] : 0,
              rotate: isInView ? 0 : svc.rotate,
              zIndex: isInView ? i + 1 : services.length - Math.abs(i - 2),
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 22,
              mass: 1.1,
              delay: isInView ? i * 0.07 : (services.length - 1 - i) * 0.04,
            }}
            whileHover={isInView ? { scale: 1.035, zIndex: 10 } : {}}
          >
            <Box sx={{ width: layout.cardWidth, height: layout.cardHeight }}>
              <CardInner svc={svc} cardWidth={layout.cardWidth} />
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

// ─── Mobile blur-peek carousel ────────────────────────────────────────────────

function MobileServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(services.length - 1, idx)));
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(activeIndex + (diff > 0 ? 1 : -1));
  };
  const onMouseDown = (e: React.MouseEvent) => { isDragging.current = true; dragStartX.current = dragCurrentX.current = e.clientX; };
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging.current) dragCurrentX.current = e.clientX; };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 40) goTo(activeIndex + (diff > 0 ? 1 : -1));
  };

  return (
    <Box sx={{ width: "100%", position: "relative", userSelect: "none" }}>
      <Box
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove}
        onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        sx={{ position: "relative", width: "100%", height: { xs: 400, sm: 430 }, overflow: "hidden" }}
      >
        {services.map((svc, i) => {
          const offset = i - activeIndex;
          const isActive = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;
          return (
            <Box key={svc.title} sx={{
              position: "absolute", top: 0, left: "11%", width: "78%", height: "100%",
              transform: `translateX(${offset * 78}%)`,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), filter 0.45s ease, opacity 0.45s ease",
              filter: isActive ? "blur(0px)" : isAdjacent ? "blur(3px)" : "blur(7px)",
              opacity: isActive ? 1 : isAdjacent ? 0.42 : 0,
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 2 : isAdjacent ? 1 : 0,
            }}>
              <CardInner svc={svc} cardWidth={300} />
            </Box>
          );
        })}

        {/* Left arrow */}
        <IconButton onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous service"
          sx={{
            position: "absolute", left: 0, top: 0, width: "11%", height: "100%", borderRadius: 0, zIndex: 10,
            color: "#fff", "&:hover": { background: "rgba(255,255,255,0.04)" },
            "&.Mui-disabled": { color: alpha("#fff", 0.12) }
          }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: "50%",
            border: `1px solid ${alpha("#fff", activeIndex === 0 ? 0.07 : 0.22)}`,
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <ChevronLeftIcon sx={{ fontSize: "1rem" }} />
          </Box>
        </IconButton>

        {/* Right arrow */}
        <IconButton onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === services.length - 1} aria-label="Next service"
          sx={{
            position: "absolute", right: 0, top: 0, width: "11%", height: "100%", borderRadius: 0, zIndex: 10,
            color: "#fff", "&:hover": { background: "rgba(255,255,255,0.04)" },
            "&.Mui-disabled": { color: alpha("#fff", 0.12) }
          }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: "50%",
            border: `1px solid ${alpha("#fff", activeIndex === services.length - 1 ? 0.07 : 0.22)}`,
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <ChevronRightIcon sx={{ fontSize: "1rem" }} />
          </Box>
        </IconButton>
      </Box>

      {/* Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "6px", mt: 2.5 }}>
        {services.map((svc, i) => (
          <Box key={i} onClick={() => goTo(i)} role="button" aria-label={`Go to service ${i + 1}`}
            sx={{
              width: i === activeIndex ? 22 : 6, height: 6, borderRadius: "99px",
              background: i === activeIndex ? svc.accent : alpha("#fff", 0.18), cursor: "pointer",
              transition: "all 0.35s ease",
              boxShadow: i === activeIndex ? `0 0 10px ${alpha(svc.accent, 0.7)}` : "none"
            }} />
        ))}
      </Box>

      <Typography sx={{
        textAlign: "center", mt: 1.5, fontSize: "0.6rem",
        letterSpacing: "0.14em", textTransform: "uppercase", color: alpha("#fff", 0.2)
      }}>
        {activeIndex + 1} / {services.length}
      </Typography>
    </Box>
  );
}

// ─── Responsive wrapper ────────────────────────────────────────────────────────

function ServiceDeck() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? <MobileServiceCarousel /> : <DesktopFanDeck />;
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function Services() {
  const [servicesRef, servicesInView] = useInViewShared(0.1);

  return (
    <Box
      ref={servicesRef}
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #060e1a 0%, #0b1a32 50%, #060e1a 100%)",
        "&::before": {
          content: '""', position: "absolute", inset: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 55%, rgba(127,208,255,0.07) 0%, transparent 50%),
            radial-gradient(circle at 90% 45%, rgba(52,211,153,0.07) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(167,139,250,0.05) 0%, transparent 40%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 }, px: { xs: 2, md: 0 } }}>
          <Fade in={servicesInView} timeout={500}>
            <Box>
              <Typography variant="h2" sx={{
                fontWeight: 900,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3.2rem" },
                letterSpacing: "-0.03em", lineHeight: 1.1,
              }}>
                The science of <GradientText>Synchronization.</GradientText>
              </Typography>
              <Typography sx={{
                color: alpha("#fff", 0.4), mt: 2, maxWidth: 640, mx: "auto",
                fontSize: { xs: "0.9rem", md: "1rem" }, lineHeight: 1.7, px: { xs: 1, md: 0 },
              }}>
                We engineer the strategic ecosystem that powers your brand's growth.
                Our audits deep-dive into your data to build high-performance revenue engines.
              </Typography>
            </Box>
          </Fade>
        </Box>

        {/* Scroll hint desktop */}
        <Fade in={servicesInView} timeout={900}>
          <Typography sx={{
            textAlign: "center", fontSize: "0.65rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 3,
            display: { xs: "none", md: "block" },
          }}>
            ↓ scroll to reveal services
          </Typography>
        </Fade>

        <ServiceDeck />
      </Container>
    </Box>
  );
}