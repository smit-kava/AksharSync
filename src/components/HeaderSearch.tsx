import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CodeIcon from "@mui/icons-material/Code";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Box, Typography, alpha, keyframes, styled } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SearchItem {
  label: string;
  desc: string;
  to: string;
  category: string;
  accent: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_SEARCH_ITEMS: SearchItem[] = [
  // Main Services (mirrors header mega-menu top-level)
  { label: "Lifecycle Flow Review", desc: "Behavioral journey audit to identify automation gaps", to: ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT, category: "Main Services", accent: "#7fd0ff", icon: <AssessmentOutlinedIcon /> },
  { label: "Template & Creative Review", desc: "Design performance and brand consistency evaluation", to: ROUTE_PATHS.SERVICE_CREATIVE_AUDIT, category: "Main Services", accent: "#a78bfa", icon: <BrushOutlinedIcon /> },
  { label: "Deliverability Review", desc: "Technical inbox health and reputation audit", to: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT, category: "Main Services", accent: "#34d399", icon: <InboxOutlinedIcon /> },
  { label: "Revenue Opportunity Analysis", desc: "Data-driven discovery of hidden repeat revenue", to: ROUTE_PATHS.SERVICE_REVENUE_AUDIT, category: "Main Services", accent: "#fbbf24", icon: <TrendingUpOutlinedIcon /> },
  { label: "Omnichannel Retention Review", desc: "Multi-platform reach across all messaging channels", to: ROUTE_PATHS.SERVICE_SMS, category: "Main Services", accent: "#f472b6", icon: <HubOutlinedIcon /> },
  { label: "Web Development", desc: "Custom digital presence and e-commerce solutions", to: ROUTE_PATHS.SERVICE_WEB_DEVELOPMENT ?? "/services/web-development-solutions", category: "Main Services", accent: "#38bdf8", icon: <CodeIcon /> },
  { label: "App Development", desc: "Native and cross-platform mobile apps", to: ROUTE_PATHS.SERVICE_APP_DEVELOPMENT ?? "/services/app-development-solutions", category: "Main Services", accent: "#fb923c", icon: <PhoneIphoneIcon /> },
  // Omnichannel Retention — Sub-Services
  { label: "SMS Automation", desc: "Full-service SMS campaign strategy & execution", to: ROUTE_PATHS.SERVICE_SMS, category: "Omnichannel Retention", accent: "#f472b6", icon: <SmsOutlinedIcon /> },
  { label: "WhatsApp Retention Systems", desc: "Connect with 2B+ users via branded WhatsApp campaigns", to: ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING, category: "Omnichannel Retention", accent: "#f472b6", icon: <WhatsAppIcon /> },
  { label: "Push Notifications", desc: "Hyper-personalized push notifications that drive conversions", to: ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS, category: "Omnichannel Retention", accent: "#f472b6", icon: <NotificationsOutlinedIcon /> },
  { label: "RCS Marketing", desc: "Rich Communication Services — the next evolution of SMS", to: ROUTE_PATHS.SERVICE_RCS_MARKETING, category: "Omnichannel Retention", accent: "#f472b6", icon: <SignalCellularAltOutlinedIcon /> },
  { label: "Instagram DM Automation", desc: "Turn Instagram into a revenue channel with automated DM flows", to: ROUTE_PATHS.SERVICE_INSTAGRAM_DM, category: "Omnichannel Retention", accent: "#f472b6", icon: <InstagramIcon /> },
  // Quick Links
  { label: "Customer Reviews", desc: "See what our clients say about AksharSync", to: ROUTE_PATHS.WRITE_REVIEW, category: "Quick Links", accent: "#fbbf24", icon: <StarOutlineRoundedIcon /> },
  { label: "Contact Us", desc: "Get in touch with our retention marketing experts", to: ROUTE_PATHS.CONTACT, category: "Quick Links", accent: "#7fd0ff", icon: <HeadsetMicOutlinedIcon /> },
  { label: "Book a Retention Audit", desc: "Schedule your free retention growth audit today", to: ROUTE_PATHS.RETENTION_AUDIT_BOOKING, category: "Quick Links", accent: "#34d399", icon: <CalendarMonthOutlinedIcon /> },
];

// ─── Category metadata ────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { accent: string }> = {
  "Main Services": { accent: "#7fd0ff" },
  "Omnichannel Retention": { accent: "#f472b6" },
  "Quick Links": { accent: "#fbbf24" },
};

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const slideUp = keyframes`
  from{opacity:0;transform:translateY(20px) scale(0.97)}
  to{opacity:1;transform:translateY(0) scale(1)}`;
const shimmer = keyframes`0%{transform:translateX(-100%)}100%{transform:translateX(100%)}`;

// ─── Liquid Glass pill trigger ────────────────────────────────────────────────
export const LiquidPill = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 14px 6px 10px",
  borderRadius: "999px",
  border: "1px solid rgba(127,208,255,0.22)",
  borderTop: "1.5px solid rgba(127,208,255,0.38)",
  background: "linear-gradient(145deg,rgba(127,208,255,0.10) 0%,rgba(6,14,26,0.65) 60%,rgba(127,208,255,0.05) 100%)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.35),0 1px 6px rgba(127,208,255,0.12),inset 0 1px 1px rgba(127,208,255,0.20),inset 0 -1px 1px rgba(0,0,0,0.25)",
  cursor: "pointer",
  color: "rgba(255,255,255,0.55)",
  outline: "none",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    color: "rgba(255,255,255,0.88)",
    borderColor: "rgba(127,208,255,0.42)",
    boxShadow: "0 6px 24px rgba(0,0,0,0.45),0 2px 10px rgba(127,208,255,0.22),inset 0 1px 1px rgba(127,208,255,0.30)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg,transparent,rgba(127,208,255,0.06),transparent)",
    transform: "translateX(-100%)",
  },
  "&:hover::before": { animation: `${shimmer} 0.9s ease` },
});

const KbdBadge = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  padding: "2px 7px",
  borderRadius: "6px",
  background: "rgba(127,208,255,0.08)",
  border: "1px solid rgba(127,208,255,0.18)",
  fontSize: "0.67rem",
  fontWeight: 700,
  color: "rgba(255,255,255,0.35)",
  lineHeight: 1.5,
  letterSpacing: "0.02em",
});

// ─── Overlay & dialog ─────────────────────────────────────────────────────────
const Overlay = styled(Box)({
  position: "fixed",
  inset: 0,
  zIndex: 2000,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "72px",
  background: "rgba(3,8,18,0.78)",
  backdropFilter: "blur(12px) saturate(160%)",
  WebkitBackdropFilter: "blur(12px) saturate(160%)",
  animation: `${fadeIn} 0.16s ease`,
});

const DialogBox = styled(Box)({
  width: "100%",
  maxWidth: "660px",
  borderRadius: "22px",
  overflow: "hidden",
  background: "linear-gradient(160deg,rgba(127,208,255,0.07) 0%,rgba(5,12,24,0.97) 35%,rgba(8,18,38,0.99) 100%)",
  backdropFilter: "blur(48px) saturate(200%)",
  WebkitBackdropFilter: "blur(48px) saturate(200%)",
  border: "1px solid rgba(127,208,255,0.14)",
  borderTop: "1.5px solid rgba(127,208,255,0.30)",
  boxShadow: "0 40px 100px rgba(0,0,0,0.8),0 6px 28px rgba(127,208,255,0.10),inset 0 1px 1px rgba(127,208,255,0.14)",
  animation: `${slideUp} 0.24s cubic-bezier(0.16,1,0.3,1)`,
  margin: "0 16px",
});

// ─── Highlight helper ─────────────────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return (
    <>
      {text.split(re).map((p, i) =>
        re.test(p) ? (
          <Box key={i} component="mark" sx={{ bgcolor: "rgba(127,208,255,0.22)", color: "#7fd0ff", borderRadius: "3px", px: "2px" }}>
            {p}
          </Box>
        ) : p
      )}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.trim() === ""
    ? ALL_SEARCH_ITEMS.filter(item => item.category !== "Quick Links")
    : ALL_SEARCH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatList = Object.values(grouped).flat();

  const openDialog = useCallback(() => {
    setOpen(true); setQuery(""); setActiveIdx(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false); setQuery(""); setActiveIdx(0);
  }, []);

  const handleNavigate = useCallback((to: string) => {
    closeDialog(); navigate(to);
  }, [closeDialog, navigate]);

  // Ctrl+K / Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); open ? closeDialog() : openDialog(); }
      if (e.key === "Escape" && open) closeDialog();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, openDialog, closeDialog]);

  // Arrow navigation
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, flatList.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      else if (e.key === "Enter" && flatList[activeIdx]) handleNavigate(flatList[activeIdx].to);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, activeIdx, flatList, handleNavigate]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${activeIdx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  return (
    <>
      {/* ── Mobile: icon-only button (xs → md) ── */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Box
          component="button"
          id="header-search-mobile"
          onClick={openDialog}
          aria-label="Search"
          sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(127,208,255,0.22)",
            borderTop: "1.5px solid rgba(127,208,255,0.38)",
            background: "linear-gradient(145deg,rgba(127,208,255,0.10) 0%,rgba(6,14,26,0.65) 60%,rgba(127,208,255,0.05) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35),inset 0 1px 1px rgba(127,208,255,0.20)",
            cursor: "pointer", color: "#7fd0ff", outline: "none", flexShrink: 0,
            transition: "all 0.22s ease",
            "&:hover": {
              borderColor: "rgba(127,208,255,0.42)",
              background: "linear-gradient(145deg,rgba(127,208,255,0.16) 0%,rgba(6,14,26,0.75) 60%,rgba(127,208,255,0.08) 100%)",
            },
          }}
        >
          <SearchIcon sx={{ fontSize: "1.05rem" }} />
        </Box>
      </Box>

      {/* ── Desktop: full pill (md+) ── */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <LiquidPill id="header-search-trigger" onClick={openDialog} aria-label="Search services" title="Search (Ctrl+K)">
          <SearchIcon sx={{ fontSize: "0.95rem", color: "#7fd0ff", flexShrink: 0 }} />
          <Box component="span" sx={{ fontSize: "0.78rem", whiteSpace: "nowrap", fontWeight: 500, letterSpacing: "0.01em" }}>
            Search services…
          </Box>
          <KbdBadge>Ctrl + K</KbdBadge>
        </LiquidPill>
      </Box>

      {/* ── Command Palette Dialog ── */}
      {open && (
        <Overlay onClick={closeDialog}>
          <DialogBox onClick={e => e.stopPropagation()}>

            {/* ── Search Input Bar ── */}
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              px: 2.5, py: 2,
              borderBottom: "1px solid rgba(127,208,255,0.09)",
              background: "rgba(127,208,255,0.03)",
            }}>
              <SearchIcon sx={{ color: "#7fd0ff", fontSize: "1.25rem", flexShrink: 0 }} />
              <Box
                component="input"
                ref={inputRef}
                value={query}
                onChange={e => setQuery((e.target as HTMLInputElement).value)}
                placeholder="Search services & sub-services…"
                sx={{
                  flex: 1, bgcolor: "transparent", border: "none", outline: "none",
                  color: "#fff", fontSize: "1.05rem", fontWeight: 500,
                  caretColor: "#7fd0ff",
                  "&::placeholder": { color: "rgba(255,255,255,0.28)", fontWeight: 400 },
                }}
              />
              {query && (
                <Box
                  component="button"
                  onClick={() => setQuery("")}
                  sx={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 22, height: 22, borderRadius: "6px",
                    border: "1px solid rgba(127,208,255,0.12)",
                    bgcolor: "rgba(127,208,255,0.07)", color: "rgba(255,255,255,0.4)",
                    cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
                    "&:hover": { bgcolor: "rgba(127,208,255,0.15)", color: "#fff" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: "0.75rem" }} />
                </Box>
              )}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <KbdBadge>Esc</KbdBadge>
              </Box>
            </Box>

            {/* ── Results List ── */}
            <Box
              ref={listRef}
              sx={{
                maxHeight: "430px", overflowY: "auto",
                py: 1,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(127,208,255,0.12) transparent",
                "&::-webkit-scrollbar": { width: "3px" },
                "&::-webkit-scrollbar-thumb": { background: "rgba(127,208,255,0.12)", borderRadius: "99px" },
              }}
            >
              {flatList.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <SearchIcon sx={{ fontSize: "2.2rem", color: "rgba(127,208,255,0.2)", mb: 1.5 }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.88rem", fontWeight: 500 }}>
                    No results for "{query}"
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.15)", fontSize: "0.75rem", mt: 0.5 }}>
                    Try searching email, SMS, whatsapp, audit…
                  </Typography>
                </Box>
              ) : (
                Object.entries(grouped).map(([category, items]) => {
                  const meta = CATEGORY_META[category] ?? { accent: "#7fd0ff" };
                  return (
                    <Box key={category} sx={{ mb: 1 }}>
                      {/* Category header */}
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 1,
                        px: 3, py: 0.75,
                      }}>
                        <Box sx={{
                          width: 18, height: 1.5, borderRadius: "99px",
                          bgcolor: meta.accent, opacity: 0.5, flexShrink: 0,
                        }} />
                        <Typography sx={{
                          fontSize: "0.67rem", fontWeight: 800,
                          textTransform: "uppercase", letterSpacing: "0.1em",
                          color: meta.accent, opacity: 0.65,
                        }}>
                          {category}
                        </Typography>
                        <Typography sx={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.15)", ml: "auto" }}>
                          {items.length}
                        </Typography>
                      </Box>

                      {/* Service rows */}
                      <Box sx={{ px: 1.5 }}>
                        {items.map(item => {
                          const globalIdx = flatList.indexOf(item);
                          const isActive = globalIdx === activeIdx;
                          return (
                            <Box
                              key={item.label}
                              data-idx={globalIdx}
                              onClick={() => handleNavigate(item.to)}
                              onMouseEnter={() => setActiveIdx(globalIdx)}
                              sx={{
                                display: "flex", alignItems: "center", gap: 1.75,
                                px: 1.5, py: 1.1, borderRadius: "12px",
                                cursor: "pointer",
                                border: "1px solid",
                                borderColor: isActive ? alpha(item.accent, 0.3) : "transparent",
                                background: isActive
                                  ? `linear-gradient(135deg, ${alpha(item.accent, 0.10)} 0%, ${alpha(item.accent, 0.04)} 100%)`
                                  : "transparent",
                                transition: "all 0.13s ease",
                                position: "relative",
                                overflow: "hidden",
                                "&::before": isActive ? {
                                  content: '""', position: "absolute",
                                  left: 0, top: "20%", bottom: "20%", width: "2px",
                                  borderRadius: "99px", bgcolor: item.accent,
                                } : {},
                              }}
                            >
                              {/* Colored Icon Box */}
                              <Box sx={{
                                width: 36, height: 36, borderRadius: "10px",
                                flexShrink: 0, display: "flex",
                                alignItems: "center", justifyContent: "center",
                                background: isActive
                                  ? `linear-gradient(135deg, ${alpha(item.accent, 0.30)} 0%, ${alpha(item.accent, 0.14)} 100%)`
                                  : `linear-gradient(135deg, ${alpha(item.accent, 0.14)} 0%, ${alpha(item.accent, 0.06)} 100%)`,
                                border: `1px solid ${alpha(item.accent, isActive ? 0.35 : 0.18)}`,
                                color: item.accent,
                                boxShadow: isActive ? `0 0 12px ${alpha(item.accent, 0.25)}` : "none",
                                transition: "all 0.13s ease",
                                "& svg": { fontSize: "1rem" },
                              }}>
                                {item.icon}
                              </Box>

                              {/* Text */}
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography sx={{
                                  fontSize: "0.875rem", fontWeight: isActive ? 700 : 600,
                                  color: isActive ? "#fff" : "rgba(255,255,255,0.78)",
                                  lineHeight: 1.25, transition: "color 0.13s",
                                }}>
                                  <Highlight text={item.label} query={query} />
                                </Typography>
                                <Typography sx={{
                                  fontSize: "0.72rem", color: "rgba(255,255,255,0.32)",
                                  mt: 0.25, lineHeight: 1.3,
                                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                }}>
                                  <Highlight text={item.desc} query={query} />
                                </Typography>
                              </Box>

                              {/* Arrow */}
                              <ArrowForwardIcon sx={{
                                fontSize: "0.85rem", flexShrink: 0,
                                color: isActive ? item.accent : "rgba(255,255,255,0.1)",
                                transform: isActive ? "translateX(2px)" : "none",
                                transition: "all 0.13s ease",
                              }} />
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>

            {/* ── Footer ── */}
            <Box sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              px: 2.5, py: 1.25,
              borderTop: "1px solid rgba(127,208,255,0.06)",
              background: "rgba(127,208,255,0.02)",
            }}>
              {/* Desktop: keyboard hints */}
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
                {[["↑↓", "navigate"], ["↵", "open"], ["Esc", "close"]].map(([k, l]) => (
                  <Box key={k} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <KbdBadge>{k}</KbdBadge>
                    <Typography sx={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.2)" }}>{l}</Typography>
                  </Box>
                ))}
              </Box>
              {/* Mobile: tap hint */}
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.75 }}>
                <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "rgba(127,208,255,0.1)", border: "1px solid rgba(127,208,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TouchAppIcon sx={{ fontSize: "0.8rem", color: "#7fd0ff" }} />
                </Box>
                <Typography sx={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.2)" }}>Tap a result to open</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box component="span" sx={{ color: "#7fd0ff", opacity: 0.5 }}>✦</Box>
                {flatList.length} service{flatList.length !== 1 ? "s" : ""}
              </Typography>
            </Box>

          </DialogBox>
        </Overlay>
      )}
    </>
  );
}
