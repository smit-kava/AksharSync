import { useState, useRef, useEffect } from "react";
import { HeaderSearch } from "./HeaderSearch";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Drawer,
  Typography,
  Stack,
  styled,
  alpha,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { LiquidGlassMenuButton } from "./LiquidGlassMenuButton";
import { LiquidGlassContactButton } from "./LiquidGlassContactButton";
import { CustomerSignInModal } from "./CustomerSignInModal";
import {
  getStoredCustomer,
  clearStoredCustomer,
} from "../services/customerApi";
import type { Customer } from "../services/customerApi";
import { ROUTE_PATHS } from "../routes/paths";
import logo from "../assets/Logo.svg";
import {
  LifecycleIcon,
  ArchitectureIcon,
  CreativeIcon,
  MessagingIcon,
  EmailIcon,
  JourneyIcon,
  MultiChannelIcon,
  EspMigrationIcon,
  CrmSyncIcon,
  DeliverabilityIcon,
  TemplatingIcon,
  ModularTemplateIcon,
  UxUiIcon,
  WhiteLabelIcon,
  SmsIcon,
  PushNotificationIcon,
  WhatsAppIcon,
  RcsIcon,
  InstagramDmIcon,
} from "./icons";
import type { IconProps } from "./icons";

// ─── Icon lookup map ──────────────────────────────────────────────────────────
const iconComponentMap: Record<string, React.FC<IconProps>> = {
  email: EmailIcon,
  journey: JourneyIcon,
  multichannel: MultiChannelIcon,
  espMigration: EspMigrationIcon,
  crmSync: CrmSyncIcon,
  deliverability: DeliverabilityIcon,
  templating: TemplatingIcon,
  modularTemplate: ModularTemplateIcon,
  uxUi: UxUiIcon,
  whiteLabel: WhiteLabelIcon,
  sms: SmsIcon,
  pushNotification: PushNotificationIcon,
  whatsapp: WhatsAppIcon,
  rcs: RcsIcon,
  instagramDm: InstagramDmIcon,
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubService {
  label: string;
  to: string;
  icon: string;
}

interface ServiceCategory {
  label: string;
  icon: React.ReactNode;
  accent: string;
  desc: string;
  to?: string;
  sub: SubService[];
}

interface NavItem {
  label: string;
  to: string;
  anchor?: string;
  hasServices?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const mainServices: ServiceCategory[] = [
  {
    label: "Lifecycle Flow Review",
    icon: <LifecycleIcon />,
    accent: "#7fd0ff",
    desc: "Behavioral journey audit to identify automation gaps",
    to: ROUTE_PATHS.SERVICE_LIFECYCLE_AUDIT,
    sub: [],
  },
  {
    label: "Template & Creative Review",
    icon: <CreativeIcon />,
    accent: "#a78bfa",
    desc: "Design performance and brand consistency evaluation",
    to: ROUTE_PATHS.SERVICE_CREATIVE_AUDIT,
    sub: [],
  },
  {
    label: "Deliverability Review",
    icon: <ArchitectureIcon />,
    accent: "#34d399",
    desc: "Technical inbox health and reputation audit",
    to: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDIT,
    sub: [],
  },
  {
    label: "Revenue Opportunity Analysis",
    icon: <SyncProblemIcon />,
    accent: "#fbbf24",
    desc: "Data-driven discovery of hidden repeat revenue",
    to: ROUTE_PATHS.SERVICE_REVENUE_AUDIT,
    sub: [],
  },
  {
    label: "Omnichannel Retention Review",
    icon: <MessagingIcon />,
    accent: "#f472b6",
    desc: "Multi-platform reach across all messaging channels",
    to: ROUTE_PATHS.SERVICE_SMS,
    sub: [
      { label: "SMS Automation", to: ROUTE_PATHS.SERVICE_SMS, icon: "sms" },
      {
        label: "WhatsApp Retention Systems",
        to: ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING,
        icon: "whatsapp",
      },
      {
        label: "Push Notifications",
        to: ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS,
        icon: "pushNotification",
      },
      // { label: "RCS Messaging", to: ROUTE_PATHS.SERVICE_RCS_MARKETING, icon: "rcs" },
      {
        label: "Direct Mail Opportunities",
        to: ROUTE_PATHS.SERVICE_SMS,
        icon: "sms",
      },
      {
        label: "Instagram DM Automation",
        to: ROUTE_PATHS.SERVICE_INSTAGRAM_DM,
        icon: "instagramDm",
      },
    ],
  },
];

const navItems: NavItem[] = [
  { label: "Home", to: ROUTE_PATHS.HOME },
  {
    label: "Services",
    to: ROUTE_PATHS.SERVICES,
    anchor: "services",
    hasServices: true,
  },
  { label: "Blog", to: ROUTE_PATHS.BLOGS },
  { label: "About Us", to: ROUTE_PATHS.ABOUT },
  { label: "Why AksharSync", to: ROUTE_PATHS.WHY },
];

// ─── Styled Components ────────────────────────────────────────────────────────
const RootHeader = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<{ scrolled: boolean }>(({ theme, scrolled }) => ({
  background: "transparent",
  boxShadow: "none",
  transition: theme.transitions.create(["padding", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  padding: scrolled ? "24px 40px" : "0",
  [theme.breakpoints.down("sm")]: {
    padding: scrolled ? "12px 16px" : "0",
  },
}));

const PillContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<{ scrolled: boolean }>(({ theme, scrolled }) => ({
  maxWidth: scrolled ? "1240px" : "100%",
  width: "100%",
  margin: "0 auto",
  height: "68px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: scrolled ? "0 8px 0 28px" : "0 40px",
  borderRadius: scrolled ? "999px" : "0",

  // ── Liquid Glass body ─────────────────────────────────────────────────
  background: scrolled
    ? "linear-gradient(145deg, rgba(127,208,255,0.13) 0%, rgba(6,14,26,0.72) 55%, rgba(127,208,255,0.06) 100%)"
    : "linear-gradient(180deg, rgba(127,208,255,0.07) 0%, rgba(6,14,26,0.45) 100%)",

  backdropFilter: "blur(28px) saturate(200%)",
  WebkitBackdropFilter: "blur(28px) saturate(200%)",

  // ── Liquid Glass borders ──────────────────────────────────────────────
  // Scrolled pill: full blue-tinted border with bright top specular
  // Full-width bar: only bottom border visible
  border: scrolled ? "1px solid rgba(127,208,255,0.20)" : "none",
  borderTop: scrolled ? "1.5px solid rgba(127,208,255,0.40)" : "none",
  borderBottom: scrolled
    ? "1px solid rgba(6,14,26,0.60)"
    : "1px solid rgba(127,208,255,0.10)",

  // ── Liquid Glass shadows ──────────────────────────────────────────────
  boxShadow: scrolled
    ? [
        "0 8px 32px rgba(0,0,0,0.45)",
        "0 2px 12px rgba(127,208,255,0.15)", // brand blue ambient lift
        "inset 0 1px 1px rgba(127,208,255,0.25)", // inner top highlight
        "inset 0 -1px 1px rgba(0,0,0,0.30)", // inner bottom shadow
      ].join(", ")
    : "none",

  color: theme.palette.text.primary,

  transition: theme.transitions.create(["all"], {
    easing: theme.transitions.easing.easeInOut,
    duration: 400,
  }),

  [theme.breakpoints.down("sm")]: {
    padding: scrolled ? "0 6px 0 18px" : "0 16px",
  },
}));

// ─── Component ────────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  // null = compact cards view; service label = sub-services expanded
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() =>
    getStoredCustomer(),
  );
  const location = useLocation();
  const navigate = useNavigate();

  const megaTimeout = useRef<number | null>(null);
  const collapseTimeout = useRef<number | null>(null);

  useEffect(() => {
    const updateCustomer = () => setCurrentCustomer(getStoredCustomer());
    window.addEventListener("akshar_customer_change", updateCustomer);
    return () =>
      window.removeEventListener("akshar_customer_change", updateCustomer);
  }, []);

  const handleCustomerSignOut = () => {
    clearStoredCustomer();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpenMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleCloseMega = () => {
    megaTimeout.current = window.setTimeout(() => {
      setMegaOpen(false);
      // delay collapse so it fades out gracefully
      collapseTimeout.current = window.setTimeout(() => {
        setExpandedService(null);
      }, 350);
    }, 180);
  };

  // When hovering a service card
  const handleServiceHover = (svc: ServiceCategory) => {
    if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    if (svc.sub.length > 0) {
      setExpandedService(svc.label);
    } else {
      setExpandedService(null);
    }
  };

  // When leaving the sub-panel area, collapse back
  const handleSubPanelLeave = () => {
    setExpandedService(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);
    if (item.anchor && location.pathname === ROUTE_PATHS.HOME) {
      scrollToSection(item.anchor);
    } else if (item.anchor) {
      navigate(ROUTE_PATHS.HOME);
      setTimeout(() => scrollToSection(item.anchor!), 100);
    } else {
      navigate(item.to);
    }
  };

  const activeSubService = mainServices.find(
    (s) => s.label === expandedService,
  );

  return (
    <>
      <RootHeader position="fixed" scrolled={scrolled}>
        <PillContainer scrolled={scrolled}>
          {/* Logo */}
          <Box
            onClick={() =>
              handleNavClick({ label: "Home", to: ROUTE_PATHS.HOME })
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              flexShrink: 0,
              "&:hover .logo-icon": { transform: "rotate(-10deg) scale(1.1)" },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="AksharSync Logo"
              className="logo-icon"
              sx={{
                width: scrolled ? 52 : 72,
                height: scrolled ? 52 : 72,
                objectFit: "contain",
                border: "none",
                outline: "none",
                background: "transparent",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                filter: "drop-shadow(0 0 12px rgba(127, 208, 255, 0.2))",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Anta', sans-serif",
                fontSize: scrolled ? "1.35rem" : "1.5rem",
                color: "common.white",
                letterSpacing: "-0.02em",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "font-size 0.3s ease",
                "& span": { color: "#7fd0ff" },
              }}
            >
              Akshar<span>Sync</span>
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            {navItems.map((item) => {
              if (item.hasServices) {
                return (
                  <Box
                    key={item.label}
                    sx={{ position: "relative" }}
                    onMouseEnter={handleOpenMega}
                    onMouseLeave={handleCloseMega}
                  >
                    <Button
                      onClick={() => handleNavClick(item)}
                      endIcon={
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: "1rem !important",
                            transition:
                              "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transform: megaOpen ? "rotate(180deg)" : "none",
                          }}
                        />
                      }
                      sx={{
                        color:
                          megaOpen || location.pathname === item.to
                            ? "#7fd0ff"
                            : alpha("#fff", 0.75),
                        fontSize: scrolled ? "0.85rem" : "0.9rem",
                        fontWeight:
                          megaOpen || location.pathname === item.to ? 700 : 600,
                        textTransform: "none",
                        borderRadius: "999px",
                        padding: scrolled ? "6px 14px" : "8px 18px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                        background: megaOpen
                          ? "rgba(127, 208, 255, 0.12)"
                          : "transparent",
                        "&:hover": {
                          color: "#fff",
                          background: alpha("#fff", 0.08),
                        },
                      }}
                    >
                      {item.label}
                    </Button>

                    {/* iPhone Notch Type Dropdown Menu */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: { md: "-24px", lg: "-36px" },
                        pt: "12px", // Seamless hover bridge preventing mouse-leave flicker
                        zIndex: 1400,
                        opacity: megaOpen ? 1 : 0,
                        transform: megaOpen
                          ? "translateY(0) scale(1)"
                          : "translateY(-10px) scale(0.96)",
                        pointerEvents: megaOpen ? "auto" : "none",
                        transformOrigin: "top left",
                        transition:
                          "opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {/* Dynamic Island / iPhone Notch Container */}
                      <Box
                        sx={{
                          width: "fit-content",
                          margin: "0",
                          bgcolor: "rgba(5, 10, 20, 0.97)",
                          backdropFilter: "blur(36px) saturate(220%)",
                          WebkitBackdropFilter: "blur(36px) saturate(220%)",
                          border: "1px solid rgba(127, 208, 255, 0.22)",
                          borderTop: "2.5px solid rgba(127, 208, 255, 0.65)",
                          borderRadius: "28px", // Apple Dynamic Island curved profile
                          p: "14px",
                          display: "flex",
                          flexDirection: "row",
                          boxShadow: [
                            "0 32px 80px rgba(0,0,0,0.9)",
                            "0 0 0 1px rgba(0,0,0,0.6)",
                            "0 0 36px rgba(127, 208, 255, 0.18)",
                            "inset 0 1px 1px rgba(255,255,255,0.25)",
                          ].join(", "),
                          overflow: "hidden",
                        }}
                      >
                        {/* ── LEFT: Compact service cards with iPhone Notch Dynamic Island Header ── */}
                        <Box
                          sx={{
                            width: "330px",
                            minWidth: "330px",
                            flexShrink: 0,
                          }}
                        >
                          {/* iPhone Notch Header Bar */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              px: 1.2,
                              pb: 1.4,
                              mb: 1,
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {/* Notch sensor pill */}
                              <Box
                                sx={{
                                  width: 26,
                                  height: 4.5,
                                  borderRadius: "999px",
                                  bgcolor: "rgba(255, 255, 255, 0.35)",
                                  boxShadow: "0 0 8px rgba(127, 208, 255, 0.4)",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.72rem",
                                  fontWeight: 800,
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  color: alpha("#fff", 0.8),
                                }}
                              >
                                Services Suite
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.6,
                                bgcolor: "rgba(52, 211, 153, 0.12)",
                                border: "1px solid rgba(52, 211, 153, 0.35)",
                                borderRadius: "999px",
                                px: 1.2,
                                py: 0.25,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  bgcolor: "#34d399",
                                  boxShadow: "0 0 6px #34d399",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "0.65rem",
                                  fontWeight: 700,
                                  color: "#6ee7b7",
                                  letterSpacing: "0.04em",
                                  textTransform: "uppercase",
                                }}
                              >
                                Live Audit
                              </Typography>
                            </Box>
                          </Box>

                          <Stack spacing={0.3}>
                            {mainServices.map((svc) => {
                              const isExpanded = expandedService === svc.label;
                              const hasSub = svc.sub.length > 0;

                              return (
                                <Box
                                  key={svc.label}
                                  component={svc.to ? RouterLink : "div"}
                                  to={svc.to}
                                  onMouseEnter={() => handleServiceHover(svc)}
                                  onClick={() => svc.to && setMegaOpen(false)}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    px: 1.5,
                                    py: 1.1,
                                    borderRadius: "14px",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    bgcolor: isExpanded
                                      ? alpha(svc.accent, 0.1)
                                      : "transparent",
                                    border: "1px solid",
                                    borderColor: isExpanded
                                      ? alpha(svc.accent, 0.35)
                                      : "transparent",
                                    transition: "all 0.18s ease",
                                    "&:hover": {
                                      bgcolor: alpha(svc.accent, 0.08),
                                      borderColor: alpha(svc.accent, 0.25),
                                    },
                                  }}
                                >
                                  {/* Icon */}
                                  <Box
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: "10px",
                                      flexShrink: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      bgcolor: alpha(
                                        svc.accent,
                                        isExpanded ? 0.22 : 0.1,
                                      ),
                                      color: svc.accent,
                                      transition: "background 0.18s",
                                      "& svg": { fontSize: "1rem" },
                                    }}
                                  >
                                    {svc.icon}
                                  </Box>

                                  {/* Text */}
                                  <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography
                                      sx={{
                                        fontSize: "0.82rem",
                                        fontWeight: isExpanded ? 700 : 600,
                                        color: isExpanded
                                          ? "#fff"
                                          : alpha("#fff", 0.75),
                                        lineHeight: 1.2,
                                        transition: "color 0.18s",
                                      }}
                                    >
                                      {svc.label}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "0.71rem",
                                        color: alpha("#fff", 0.35),
                                        mt: 0.2,
                                        lineHeight: 1.2,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {svc.desc}
                                    </Typography>
                                  </Box>

                                  {/* Arrow indicator for expandable */}
                                  {hasSub && (
                                    <KeyboardArrowRightIcon
                                      sx={{
                                        fontSize: "0.95rem",
                                        color: isExpanded
                                          ? svc.accent
                                          : alpha("#fff", 0.22),
                                        flexShrink: 0,
                                        transition:
                                          "color 0.18s, transform 0.18s",
                                        transform: isExpanded
                                          ? "translateX(2px)"
                                          : "none",
                                      }}
                                    />
                                  )}

                                  {/* Active dot for non-expandable */}
                                  {!hasSub && isExpanded && (
                                    <Box
                                      sx={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: "50%",
                                        bgcolor: svc.accent,
                                        flexShrink: 0,
                                      }}
                                    />
                                  )}
                                </Box>
                              );
                            })}
                          </Stack>
                        </Box>

                        {/* ── RIGHT: Sub-services panel (Dynamic Island expansion) ── */}
                        <Box
                          onMouseLeave={handleSubPanelLeave}
                          sx={{
                            width: expandedService ? "340px" : "0px",
                            overflow: "hidden",
                            flexShrink: 0,
                            transition:
                              "width 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
                            borderLeft: expandedService
                              ? "1px solid rgba(255,255,255,0.08)"
                              : "1px solid transparent",
                          }}
                        >
                          {activeSubService && (
                            <Box
                              sx={{
                                width: "340px",
                                p: 2.5,
                                opacity: expandedService ? 1 : 0,
                                transition: "opacity 0.22s ease 0.1s",
                              }}
                            >
                              {/* Sub-panel header */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  mb: 2.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: alpha(
                                      activeSubService.accent,
                                      0.18,
                                    ),
                                    color: activeSubService.accent,
                                  }}
                                >
                                  {activeSubService.icon}
                                </Box>
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "0.8rem",
                                      fontWeight: 700,
                                      color: activeSubService.accent,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.06em",
                                    }}
                                  >
                                    Channels
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.75rem",
                                      color: alpha("#fff", 0.35),
                                    }}
                                  >
                                    {activeSubService.sub.length} options
                                    available
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Sub-service links */}
                              <Stack spacing={0.65}>
                                {activeSubService.sub.map((sub, i) => {
                                  const IconComp = iconComponentMap[sub.icon];
                                  return (
                                    <Box
                                      key={sub.label}
                                      component={RouterLink}
                                      to={sub.to}
                                      onClick={() => setMegaOpen(false)}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        px: 1.5,
                                        py: 1.1,
                                        borderRadius: "12px",
                                        textDecoration: "none",
                                        color: alpha("#fff", 0.72),
                                        border: "1px solid transparent",
                                        transition: "all 0.18s ease",
                                        opacity: expandedService ? 1 : 0,
                                        transform: expandedService
                                          ? "translateX(0)"
                                          : "translateX(-8px)",
                                        transitionDelay: expandedService
                                          ? `${i * 35 + 120}ms`
                                          : "0ms",
                                        "&:hover": {
                                          color: "#fff",
                                          bgcolor: alpha(
                                            activeSubService.accent,
                                            0.08,
                                          ),
                                          borderColor: alpha(
                                            activeSubService.accent,
                                            0.2,
                                          ),
                                          transform: "translateX(3px)",
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: "9px",
                                          flexShrink: 0,
                                          bgcolor: alpha(
                                            activeSubService.accent,
                                            0.1,
                                          ),
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          color: activeSubService.accent,
                                          border: `1px solid ${alpha(activeSubService.accent, 0.18)}`,
                                        }}
                                      >
                                        {IconComp && (
                                          <IconComp sx={{ fontSize: 15 }} />
                                        )}
                                      </Box>
                                      <Typography
                                        sx={{
                                          fontSize: "0.82rem",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {sub.label}
                                      </Typography>
                                      <KeyboardArrowRightIcon
                                        sx={{
                                          ml: "auto",
                                          fontSize: "0.9rem",
                                          color: alpha("#fff", 0.18),
                                          flexShrink: 0,
                                        }}
                                      />
                                    </Box>
                                  );
                                })}
                              </Stack>

                              {/* Bottom CTA */}
                              <Box
                                sx={{
                                  mt: 2.5,
                                  pt: 2,
                                  borderTop: "1px solid rgba(255,255,255,0.06)",
                                  opacity: expandedService ? 1 : 0,
                                  transition: "opacity 0.22s ease 0.28s",
                                }}
                              >
                                <Typography
                                  component={RouterLink}
                                  to={ROUTE_PATHS.SERVICES}
                                  onClick={() => setMegaOpen(false)}
                                  sx={{
                                    fontSize: "0.78rem",
                                    color: activeSubService.accent,
                                    textDecoration: "none",
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    opacity: 0.75,
                                    "&:hover": { opacity: 1 },
                                    transition: "opacity 0.2s",
                                  }}
                                >
                                  View all services
                                  <KeyboardArrowRightIcon
                                    sx={{ fontSize: "1rem" }}
                                  />
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }

              return (
                <Button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  sx={{
                    color:
                      location.pathname === item.to
                        ? "#7fd0ff"
                        : alpha("#fff", 0.75),
                    fontSize: scrolled ? "0.85rem" : "0.9rem",
                    fontWeight: location.pathname === item.to ? 700 : 600,
                    textTransform: "none",
                    borderRadius: "999px",
                    padding: scrolled ? "6px 14px" : "8px 18px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#fff",
                      background: alpha("#fff", 0.06),
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Search + CTA row */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", marginRight: "8px", flexShrink: 0 }}
          >
            {/* Liquid Glass search bar */}
            <HeaderSearch />

            {/* Desktop: Customer Sign In / Profile button */}
            {scrolled ? (
              currentCustomer ? (
                <Tooltip
                  title={`Sign Out (${currentCustomer.name.split(" ")[0]})`}
                  arrow
                >
                  <IconButton
                    onClick={handleCustomerSignOut}
                    aria-label="Sign Out"
                    sx={{
                      display: { xs: "none", md: "inline-flex" },
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: "50%",
                      bgcolor: "rgba(239, 68, 68, 0.12)",
                      color: "#fca5a5",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      borderTop: "1.5px solid rgba(239, 68, 68, 0.6)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                      transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        bgcolor: "rgba(239, 68, 68, 0.25)",
                        borderColor: "#f87171",
                        color: "#fff",
                        transform: "scale(1.08)",
                        boxShadow: "0 6px 20px rgba(239, 68, 68, 0.35)",
                      },
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: "1.1rem" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Sign In / Customer Portal" arrow>
                  <IconButton
                    onClick={() => setCustomerModalOpen(true)}
                    aria-label="Customer Sign In"
                    sx={{
                      display: { xs: "none", md: "inline-flex" },
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: "50%",
                      bgcolor: "rgba(127, 208, 255, 0.10)",
                      color: "#7fd0ff",
                      border: "1px solid rgba(127, 208, 255, 0.25)",
                      borderTop: "1.5px solid rgba(127, 208, 255, 0.45)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      boxShadow:
                        "0 4px 16px rgba(0,0,0,0.35), 0 1px 6px rgba(127,208,255,0.15), inset 0 1px 1px rgba(127,208,255,0.25)",
                      transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      position: "relative",
                      "&:hover": {
                        bgcolor: "rgba(127, 208, 255, 0.20)",
                        borderColor: "rgba(127, 208, 255, 0.50)",
                        color: "#fff",
                        transform: "scale(1.08)",
                        boxShadow: "0 6px 24px rgba(127,208,255,0.35)",
                      },
                    }}
                  >
                    <PersonIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Tooltip>
              )
            ) : currentCustomer ? (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    borderRadius: "999px",
                    bgcolor: "rgba(52, 211, 153, 0.12)",
                    border: "1px solid rgba(52, 211, 153, 0.35)",
                    px: 1.6,
                    py: 0.55,
                    fontSize: "0.82rem",
                    color: "#a7f3d0",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#34d399",
                      boxShadow: "0 0 6px #34d399",
                    }}
                  />
                  {currentCustomer.name.split(" ")[0]}
                </Box>

                <Button
                  onClick={handleCustomerSignOut}
                  startIcon={
                    <LogoutIcon sx={{ fontSize: "0.95rem !important" }} />
                  }
                  sx={{
                    borderRadius: "999px",
                    bgcolor: "rgba(239, 68, 68, 0.10)",
                    color: "#fca5a5",
                    border: "1px solid rgba(239, 68, 68, 0.28)",
                    px: 1.8,
                    py: 0.65,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(239, 68, 68, 0.20)",
                      borderColor: "#f87171",
                      color: "#fff",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={() => setCustomerModalOpen(true)}
                startIcon={
                  <PersonIcon
                    sx={{ fontSize: "1rem !important", color: "#7fd0ff" }}
                  />
                }
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: "999px",
                  bgcolor: "rgba(127, 208, 255, 0.08)",
                  color: "#fff",
                  border: "1px solid rgba(127, 208, 255, 0.22)",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(127, 208, 255, 0.16)",
                    borderColor: "#7fd0ff",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Sign In
              </Button>
            )}

            {/* Desktop: Liquid Glass Contact button (iconOnly on scroll) */}
            <LiquidGlassContactButton iconOnly={scrolled} />

            {/* Mobile: Liquid Glass hamburger */}
            <LiquidGlassMenuButton onClick={() => setMobileOpen(true)} />
          </Stack>
        </PillContainer>
      </RootHeader>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{ paper: { sx: { width: 320, bgcolor: "#060e1a", p: 4 } } }}
      >
        <Stack spacing={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: 64,
                  height: 64,
                  objectFit: "contain",
                  flexShrink: 0,
                  border: "none",
                  outline: "none",
                  filter: "drop-shadow(0 0 15px rgba(127, 208, 255, 0.2))",
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontFamily: "'Anta', sans-serif" }}
              >
                Akshar<span style={{ color: "#7fd0ff" }}>Sync</span>
              </Typography>
            </Box>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ display: "block" }}
              >
                {item.hasServices ? (
                  <>
                    <ListItemButton
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label,
                        )
                      }
                      sx={{ py: 2, color: "#fff" }}
                    >
                      <ListItemText
                        primary={item.label}
                        slotProps={{ primary: { sx: { fontWeight: 700 } } }}
                      />
                      <KeyboardArrowDownIcon
                        sx={{
                          transform:
                            mobileExpanded === item.label
                              ? "rotate(180deg)"
                              : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </ListItemButton>
                    <Collapse in={mobileExpanded === item.label}>
                      <List sx={{ pl: 2 }}>
                        {mainServices.map((svc) => (
                          <Box key={svc.label} sx={{ mb: 2 }}>
                            <Typography
                              variant="caption"
                              onClick={() => {
                                if (svc.to) {
                                  setMobileOpen(false);
                                  navigate(svc.to);
                                }
                              }}
                              sx={{
                                color: svc.accent,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                px: 2,
                                cursor: svc.to ? "pointer" : "default",
                              }}
                            >
                              {svc.label}
                            </Typography>
                            {svc.sub.length > 0
                              ? svc.sub.map((sub) => (
                                  <ListItemButton
                                    key={sub.label}
                                    onClick={() => {
                                      setMobileOpen(false);
                                      navigate(sub.to);
                                    }}
                                  >
                                    <ListItemText
                                      primary={sub.label}
                                      slotProps={{
                                        primary: {
                                          style: {
                                            fontSize: "0.9rem",
                                            color: alpha("#fff", 0.6),
                                          },
                                        },
                                      }}
                                    />
                                  </ListItemButton>
                                ))
                              : svc.to && (
                                  <ListItemButton
                                    onClick={() => {
                                      setMobileOpen(false);
                                      navigate(svc.to!);
                                    }}
                                  >
                                    <ListItemText
                                      primary="View Details"
                                      slotProps={{
                                        primary: {
                                          style: {
                                            fontSize: "0.85rem",
                                            color: alpha("#fff", 0.4),
                                            fontStyle: "italic",
                                          },
                                        },
                                      }}
                                    />
                                  </ListItemButton>
                                )}
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => handleNavClick(item)}
                    sx={{ py: 2, color: "#fff" }}
                  >
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { sx: { fontWeight: 700 } } }}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            ))}

            {/* Mobile Sign In / Out & Admin Portal Links */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {currentCustomer ? (
                <ListItemButton
                  onClick={() => {
                    setMobileOpen(false);
                    handleCustomerSignOut();
                  }}
                  sx={{
                    py: 1.5,
                    color: "#fca5a5",
                    borderRadius: 2,
                    bgcolor: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    mb: 1,
                  }}
                >
                  <LogoutIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                  <ListItemText
                    primary={`Sign Out (${currentCustomer.name.split(" ")[0]})`}
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: "0.9rem" } },
                    }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => {
                    setMobileOpen(false);
                    setCustomerModalOpen(true);
                  }}
                  sx={{ py: 1.5, color: "#7fd0ff", borderRadius: 2 }}
                >
                  <PersonIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                  <ListItemText
                    primary="Customer Sign In"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: "0.9rem" } },
                    }}
                  />
                </ListItemButton>
              )}
              <ListItemButton
                onClick={() => {
                  setMobileOpen(false);
                  navigate(ROUTE_PATHS.ADMIN_LOGIN);
                }}
                sx={{
                  py: 1.5,
                  color: "rgba(255,255,255,0.7)",
                  borderRadius: 2,
                }}
              >
                <AdminPanelSettingsOutlinedIcon
                  sx={{ mr: 1.5, fontSize: "1.2rem" }}
                />
                <ListItemText
                  primary="Admin Portal"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: "0.9rem" } },
                  }}
                />
              </ListItemButton>
            </Box>
          </List>
        </Stack>
      </Drawer>

      {/* Customer Sign-In Modal */}
      <CustomerSignInModal
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
      />

      {/* ── Premium Split Bottom Action Bar (mobile only) ── */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          px: 2,
          py: 1.25,
          gap: 1.25,
          alignItems: "center",
          bgcolor: "rgba(4, 10, 20, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(127,208,255,0.1)",
          boxShadow:
            "0 -4px 40px rgba(0,0,0,0.5), 0 -1px 0 rgba(127,208,255,0.08)",
        }}
      >
        {/* Left CTA: Free Audit – gradient primary */}
        <Button
          component={RouterLink}
          to={ROUTE_PATHS.CONTACT}
          startIcon={<HeadsetMicIcon sx={{ fontSize: "1rem !important" }} />}
          sx={{
            flex: 1,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
            color: "#060e1a",
            py: 1.25,
            fontSize: "0.82rem",
            fontWeight: 800,
            textTransform: "none",
            letterSpacing: "0.01em",
            boxShadow: "0 4px 18px rgba(127,208,255,0.35)",
            transition: "all 0.22s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #a0daff 0%, #c4b5fd 100%)",
              boxShadow: "0 6px 28px rgba(127,208,255,0.5)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Free Audit
        </Button>

        {/* Divider */}
        <Box
          sx={{
            width: "1px",
            height: 32,
            bgcolor: "rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        />

        {/* Right CTA: Schedule Call – ghost secondary */}
        <Button
          component={RouterLink}
          to={ROUTE_PATHS.CONTACT}
          startIcon={
            <CalendarMonthOutlinedIcon sx={{ fontSize: "1rem !important" }} />
          }
          sx={{
            flex: 1,
            borderRadius: "12px",
            bgcolor: "rgba(127,208,255,0.07)",
            color: "#7fd0ff",
            border: "1px solid rgba(127,208,255,0.2)",
            py: 1.25,
            fontSize: "0.82rem",
            fontWeight: 700,
            textTransform: "none",
            letterSpacing: "0.01em",
            transition: "all 0.22s ease",
            "&:hover": {
              bgcolor: "rgba(127,208,255,0.14)",
              borderColor: "rgba(127,208,255,0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </>
  );
}
