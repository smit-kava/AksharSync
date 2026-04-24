import { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ROUTE_PATHS } from "../routes/paths";
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

// ─── Icon lookup map (string key → component) ─────────────────────────────────
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

// ─── Data Types ─────────────────────────────────────────────────────────────
interface SubService {
  label: string;
  to: string;
  icon: string; // IconName key from the icon library
}

interface ServiceCategory {
  label: string;
  icon: React.ReactNode;
  accent: string;
  desc: string;
  sub: SubService[];
}

interface NavItem {
  label: string;
  to: string;
  anchor?: string;
  hasServices?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const mainServices: ServiceCategory[] = [
  {
    label: "Lifecycle & Automation",
    icon: <LifecycleIcon />,
    accent: "#7fd0ff",
    desc: "Behavioral journeys that maximize LTV",
    sub: [
      { label: "Email Automation Management", to: ROUTE_PATHS.SERVICE_EMAIL_FLOWS, icon: "email" },
      { label: "Cross-Platform Journey Mapping", to: ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS, icon: "journey" },
      { label: "Multi-Channel Workflows", to: ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION, icon: "multichannel" },
    ],
  },
  {
    label: "Technical Architecture",
    icon: <ArchitectureIcon />,
    accent: "#a78bfa",
    desc: "Robust technical infrastructure & sync",
    sub: [
      { label: "ESP Migration & Integration", to: ROUTE_PATHS.SERVICE_ESP_MIGRATION, icon: "espMigration" },
      { label: "CRM Data Sync", to: ROUTE_PATHS.SERVICE_CRM_DATA_SYNC, icon: "crmSync" },
      { label: "Deliverability Audits", to: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS, icon: "deliverability" },
      { label: "Liquid & Ampscript Templating", to: ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT, icon: "templating" },
    ],
  },
  {
    label: "Creative Production",
    icon: <CreativeIcon />,
    accent: "#34d399",
    desc: "Web & digital systems designed for growth",
    sub: [
      { label: "Modular Template Production", to: ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES, icon: "modularTemplate" },
      { label: "UX/UI Design", to: ROUTE_PATHS.SERVICE_UX_UI_DESIGN, icon: "uxUi" },
      { label: "White Label Solutions", to: ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS, icon: "whiteLabel" },
    ],
  },
  {
    label: "Messaging & Engagement",
    icon: <MessagingIcon />,
    accent: "#f472b6",
    desc: "Direct-to-customer messaging across every channel",
    sub: [
      { label: "SMS Service", to: ROUTE_PATHS.SERVICE_SMS, icon: "sms" },
      { label: "Push Notifications", to: ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS, icon: "pushNotification" },
      { label: "WhatsApp Marketing", to: ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING, icon: "whatsapp" },
      { label: "RCS Marketing", to: ROUTE_PATHS.SERVICE_RCS_MARKETING, icon: "rcs" },
      { label: "Instagram DM Automation", to: ROUTE_PATHS.SERVICE_INSTAGRAM_DM, icon: "instagramDm" },
    ],
  },
];

const navItems: NavItem[] = [
  { label: "Home", to: ROUTE_PATHS.HOME },
  { label: "Services", to: ROUTE_PATHS.SERVICES, anchor: "services", hasServices: true },
  { label: "About Us", to: ROUTE_PATHS.ABOUT },
  { label: "Why?", to: ROUTE_PATHS.WHY, anchor: "why-us" },
];

// ─── Styled Components ───────────────────────────────────────────────────────

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
  background: scrolled
    ? alpha("#06101e", 0.45)
    : alpha("#06101e", 0.15),
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${alpha("#fff", 0.15)}`,
  borderTop: scrolled ? undefined : "none",
  borderLeft: scrolled ? undefined : "none",
  borderRight: scrolled ? undefined : "none",
  transition: theme.transitions.create(["all"], {
    easing: theme.transitions.easing.easeInOut,
    duration: 400,
  }),
  boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)" : "none",
  color: theme.palette.text.primary,
}));

const MegaMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  position: "absolute",
  top: "100%",
  left: "40px",
  right: "40px",
  paddingTop: "12px",
  zIndex: 999,
  opacity: open ? 1 : 0,
  transform: open ? "translateY(0)" : "translateY(-10px)",
  pointerEvents: open ? "auto" : "none",
  transition: theme.transitions.create(["opacity", "transform"], {
    easing: theme.transitions.easing.easeOut,
    duration: 300,
  }),
}));

// ─── Component ─────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(mainServices[0].label);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const megaTimeout = useRef<number | null>(null);

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
      setHoveredService(mainServices[0].label);
    }, 180);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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

  const activeService = mainServices.find((s) => s.label === hoveredService) || mainServices[0];

  return (
    <>
      <RootHeader position="fixed" scrolled={scrolled} className="akshar-header-root">
        <PillContainer scrolled={scrolled}>
          {/* Logo */}
          <Box
            onClick={() => handleNavClick({ label: "Home", to: ROUTE_PATHS.HOME })}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              "&:hover .logo-icon": {
                transform: "rotate(-10deg) scale(1.1)",
                borderColor: "primary.light",
              },
            }}
          >
            <Box
              className="logo-icon"
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0D3B66 0%, #472187 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "common.white",
                border: "1px solid",
                borderColor: alpha("#fff", 0.2),
                transition: "all 0.3s ease",
              }}
            >
              A
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Anta', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 400,
                color: "common.white",
                letterSpacing: "-0.02em",
                "& span": { color: "#7fd0ff" },
              }}
            >
              Akshar<span>Sync</span>
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavClick(item)}
                onMouseEnter={item.hasServices ? handleOpenMega : undefined}
                onMouseLeave={item.hasServices ? handleCloseMega : undefined}
                endIcon={
                  item.hasServices ? (
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: "1rem !important",
                        transition: "transform 0.2s",
                        transform: megaOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                  ) : undefined
                }
                sx={{
                  color: alpha("#fff", 0.7),
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  minWidth: "auto",
                  "&:hover": {
                    color: "#fff",
                    background: alpha("#fff", 0.06),
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* CTA & Toggle */}
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }} component="div">
            <Button
              component={RouterLink as any}
              to={ROUTE_PATHS.ABOUT}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                borderRadius: "999px",
                bgcolor: alpha("#fff", 0.05),
                color: "common.white",
                border: "1px solid",
                borderColor: alpha("#fff", 0.2),
                px: 3.5,
                height: 42,
                fontSize: "0.92rem",
                fontWeight: 700,
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: alpha("#fff", 0.1),
                  borderColor: alpha("#fff", 0.4),
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 24px rgba(255,255,255,0.1)",
                },
              }}
            >
              Contact us
            </Button>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { md: "none" },
                color: "common.white",
                "& .ham-line": {
                  width: 22,
                  height: 2,
                  bgcolor: "common.white",
                  mb: 0.6,
                  borderRadius: 1,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </PillContainer>

        {/* Mega Menu */}
        <MegaMenu open={megaOpen} onMouseEnter={handleOpenMega} onMouseLeave={handleCloseMega}>
          <Box
            sx={{
              maxWidth: "1240px",
              margin: "0 auto",
              bgcolor: alpha("#060e1a", 0.96),
              backdropFilter: "blur(24px)",
              border: "1px solid",
              borderColor: alpha("#fff", 0.08),
              borderRadius: "28px",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
            }}
          >
            <Box sx={{ bgcolor: alpha("#fff", 0.02), p: 2.5, borderRight: "1px solid", borderColor: alpha("#fff", 0.06) }}>
              <Stack spacing={0.5}>
                {mainServices.map((svc) => {
                  const isActive = hoveredService === svc.label;
                  return (
                    <Box
                      key={svc.label}
                      onClick={() => setHoveredService(svc.label)}
                      onMouseEnter={() => setHoveredService(svc.label)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 1.5,
                        py: 1.25,
                        borderRadius: "14px",
                        cursor: "pointer",
                        position: "relative",
                        bgcolor: isActive ? alpha(svc.accent, 0.08) : "transparent",
                        border: "1px solid",
                        borderColor: isActive ? alpha(svc.accent, 0.2) : "transparent",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: alpha(svc.accent, 0.06),
                          borderColor: alpha(svc.accent, 0.15),
                        },
                      }}
                    >
                      {/* Icon bubble */}
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            bgcolor: alpha(svc.accent, isActive ? 0.2 : 0.1),
                            color: svc.accent,
                            transition: "background 0.2s",
                          }}
                        >
                          {/* svc.icon is a ReactNode, we can clone it to add fontSize if needed, 
                              but the default for SvgIcon is fine here. */}
                          {svc.icon}
                        </Box>

                      {/* Label */}
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "#fff" : alpha("#fff", 0.6),
                          lineHeight: 1.3,
                          transition: "color 0.2s",
                        }}
                      >
                        {svc.label}
                      </Typography>

                      {/* Active indicator */}
                      {isActive && (
                        <Box
                          sx={{
                            ml: "auto",
                            width: 4,
                            height: 4,
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

            <Box sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    mb: 0.5,
                  }}
                >
                  {activeService.label}
                </Typography>
                <Typography
                  sx={{
                    color: alpha("#fff", 0.38),
                    fontSize: "0.8rem",
                  }}
                >
                  {activeService.desc}
                </Typography>
              </Box>

              {/* Sub-services grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                }}
              >
                {activeService.sub.map((sub) => {
                  const IconComp = iconComponentMap[sub.icon];
                  return (
                    <Box
                      key={sub.to}
                      component={RouterLink}
                      to={sub.to}
                      onClick={() => setMegaOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        p: 1.25,
                        borderRadius: "12px",
                        textDecoration: "none",
                        color: alpha("#fff", 0.6),
                        border: "1px solid transparent",
                        transition: "all 0.18s ease",
                        "&:hover": {
                          color: "#fff",
                          bgcolor: alpha(activeService.accent, 0.06),
                          borderColor: alpha(activeService.accent, 0.18),
                          transform: "translateX(3px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "8px",
                          bgcolor: alpha(activeService.accent, 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: activeService.accent,
                        }}
                      >
                        {IconComp ? <IconComp sx={{ fontSize: 16 }} /> : null}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          lineHeight: 1.3,
                          color: "inherit",
                        }}
                      >
                        {sub.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </MegaMenu>
      </RootHeader>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              bgcolor: "#060e1a",
              backdropFilter: "blur(40px)",
              p: 4,
            },
          }
        }}
      >
        <Stack spacing={4} component="div">
          <Stack
            direction="row"
            component="div"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box
              onClick={() => handleNavClick({ label: "Home", to: ROUTE_PATHS.HOME })}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0D3B66 0%, #472187 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "common.white",
                }}
              >
                A
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Anta', sans-serif",
                  fontSize: "1.35rem",
                  color: "common.white",
                  "& span": { color: "#7fd0ff" },
                }}
              >
                Akshar<span>Sync</span>
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "common.white" }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <List sx={{ p: 0 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
                {item.hasServices ? (
                  <>
                    <ListItemButton
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      sx={{
                        py: 2,
                        color: "common.white",
                        borderBottom: "1px solid",
                        borderColor: alpha("#fff", 0.1),
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiListItemText-primary": { fontSize: "1.1rem", fontWeight: 700 }
                        }}
                      />
                      <KeyboardArrowDownIcon
                        sx={{ transform: mobileExpanded === item.label ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                    <Collapse in={mobileExpanded === item.label}>
                      <List sx={{ pl: 2, mt: 1 }}>
                        {mainServices.map((svc) => (
                          <Box key={svc.label} sx={{ mb: 2 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: svc.accent,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 1,
                                px: 2,
                              }}
                            >
                              {svc.label}
                            </Typography>
                            {svc.sub.map((sub) => (
                              <ListItemButton
                                key={sub.to}
                                onClick={() => {
                                  setMobileOpen(false);
                                  navigate(sub.to);
                                }}
                                sx={{ borderRadius: 1 }}
                              >
                                <ListItemText
                                  primary={sub.label}
                                  sx={{
                                    "& .MuiListItemText-primary": { fontSize: "0.9rem", color: alpha("#fff", 0.6) }
                                  }}
                                />
                              </ListItemButton>
                            ))}
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => handleNavClick(item)}
                    sx={{
                      py: 2,
                      color: "common.white",
                      borderBottom: "1px solid",
                      borderColor: alpha("#fff", 0.1),
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{
                        "& .MuiListItemText-primary": { fontSize: "1.1rem", fontWeight: 700 }
                      }}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>
    </>
  );
}