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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
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
      { label: "WhatsApp Retention Systems", to: ROUTE_PATHS.SERVICE_WHATSAPP_MARKETING, icon: "whatsapp" },
      { label: "Push Notifications", to: ROUTE_PATHS.SERVICE_PUSH_NOTIFICATIONS, icon: "pushNotification" },
      { label: "RCS Messaging", to: ROUTE_PATHS.SERVICE_RCS_MARKETING, icon: "rcs" },
      { label: "Direct Mail Opportunities", to: ROUTE_PATHS.SERVICE_SMS, icon: "sms" },
      { label: "Instagram DM Automation", to: ROUTE_PATHS.SERVICE_INSTAGRAM_DM, icon: "instagramDm" },
    ],
  },
];

const navItems: NavItem[] = [
  { label: "Home", to: ROUTE_PATHS.HOME },
  { label: "Services", to: ROUTE_PATHS.SERVICES, anchor: "services", hasServices: true },
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
  background: scrolled ? alpha("#06101e", 0.45) : alpha("#06101e", 0.15),
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
  borderBlockEnd: 'aliceblue',
  boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)" : "none",
  color: theme.palette.text.primary,

}));

const MegaMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  paddingTop: "8px",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  opacity: open ? 1 : 0,
  transform: open ? "translateY(0)" : "translateY(-10px)",
  pointerEvents: open ? "auto" : "none",
  transition: theme.transitions.create(["opacity", "transform"], {
    easing: theme.transitions.easing.easeOut,
    duration: 300,
  }),
}));

// ─── Component ────────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  // null = compact cards view; service label = sub-services expanded
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const megaTimeout = useRef<number | null>(null);
  const collapseTimeout = useRef<number | null>(null);

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
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
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

  const activeSubService = mainServices.find((s) => s.label === expandedService);

  return (
    <>
      <RootHeader position="fixed" scrolled={scrolled}>
        <PillContainer scrolled={scrolled}>
          {/* Logo */}
          <Box
            onClick={() => handleNavClick({ label: "Home", to: ROUTE_PATHS.HOME })}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              "&:hover .logo-icon": { transform: "rotate(-10deg) scale(1.1)" },
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
                border: "1px solid rgba(255,255,255,0.2)",
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
                  "&:hover": { color: "#fff", background: alpha("#fff", 0.06) },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* CTA & Toggle */}
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.ABOUT}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                borderRadius: "999px",
                bgcolor: alpha("#fff", 0.05),
                color: "common.white",
                border: "1px solid rgba(255,255,255,0.2)",
                px: 3,
                marginLeft: '10px',
                height: 40,
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: alpha("#fff", 0.1), borderColor: alpha("#fff", 0.4) },
              }}
            >
              Contact us
            </Button>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" }, color: "common.white" }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </PillContainer>

        {/* ── Mega Menu ── */}
        <MegaMenu open={megaOpen} onMouseEnter={handleOpenMega} onMouseLeave={handleCloseMega}>
          <Box
            sx={{
              width: "fit-content",
              margin: "0",
              bgcolor: "rgba(6, 14, 26, 0.98)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* ── LEFT: 5 compact service cards ── */}
            <Box sx={{ width: "340px", minWidth: "340px", p: 1.5, flexShrink: 0 }}>
              <Stack spacing={0.25}>
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
                        py: 1,
                        borderRadius: "10px",
                        cursor: "pointer",
                        textDecoration: "none",
                        bgcolor: isExpanded ? alpha(svc.accent, 0.08) : "transparent",
                        border: "1px solid",
                        borderColor: isExpanded ? alpha(svc.accent, 0.3) : "transparent",
                        transition: "all 0.18s ease",
                        "&:hover": {
                          bgcolor: alpha(svc.accent, 0.07),
                          borderColor: alpha(svc.accent, 0.2),
                        },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "9px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: alpha(svc.accent, isExpanded ? 0.22 : 0.1),
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
                            color: isExpanded ? "#fff" : alpha("#fff", 0.7),
                            lineHeight: 1.2,
                            transition: "color 0.18s",
                          }}
                        >
                          {svc.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.71rem",
                            color: alpha("#fff", 0.28),
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
                            color: isExpanded ? svc.accent : alpha("#fff", 0.18),
                            flexShrink: 0,
                            transition: "color 0.18s, transform 0.18s",
                            transform: isExpanded ? "translateX(2px)" : "none",
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

            {/* ── RIGHT: Sub-services panel (slides in) ── */}
            <Box
              onMouseLeave={handleSubPanelLeave}
              sx={{
                width: expandedService ? "360px" : "0px",
                overflow: "hidden",
                flexShrink: 0,
                transition: "width 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
                borderLeft: expandedService
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid transparent",
              }}
            >
              {activeSubService && (
                <Box
                  sx={{
                    width: "360px",
                    p: 3,
                    opacity: expandedService ? 1 : 0,
                    transition: "opacity 0.22s ease 0.1s",
                  }}
                >
                  {/* Sub-panel header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(activeSubService.accent, 0.18),
                        color: activeSubService.accent,
                      }}
                    >
                      {activeSubService.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: activeSubService.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Channels
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: alpha("#fff", 0.35) }}>
                        {activeSubService.sub.length} options available
                      </Typography>
                    </Box>
                  </Box>

                  {/* Sub-service links */}
                  <Stack spacing={0.75}>
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
                            gap: 1.75,
                            px: 1.5,
                            py: 1.25,
                            borderRadius: "12px",
                            textDecoration: "none",
                            color: alpha("#fff", 0.65),
                            border: "1px solid transparent",
                            transition: "all 0.18s ease",
                            // staggered entrance
                            opacity: expandedService ? 1 : 0,
                            transform: expandedService ? "translateX(0)" : "translateX(-8px)",
                            transitionDelay: expandedService ? `${i * 35 + 120}ms` : "0ms",
                            "&:hover": {
                              color: "#fff",
                              bgcolor: alpha(activeSubService.accent, 0.07),
                              borderColor: alpha(activeSubService.accent, 0.18),
                              transform: "translateX(3px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "9px",
                              flexShrink: 0,
                              bgcolor: alpha(activeSubService.accent, 0.1),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: activeSubService.accent,
                              border: `1px solid ${alpha(activeSubService.accent, 0.18)}`,
                            }}
                          >
                            {IconComp && <IconComp sx={{ fontSize: 16 }} />}
                          </Box>
                          <Typography sx={{ fontSize: "0.83rem", fontWeight: 600 }}>
                            {sub.label}
                          </Typography>
                          <KeyboardArrowRightIcon
                            sx={{
                              ml: "auto",
                              fontSize: "0.9rem",
                              color: alpha("#fff", 0.15),
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
                      mt: 3,
                      pt: 2.5,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
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
                        opacity: 0.7,
                        "&:hover": { opacity: 1 },
                        transition: "opacity 0.2s",
                      }}
                    >
                      View all services
                      <KeyboardArrowRightIcon sx={{ fontSize: "1rem" }} />
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </MegaMenu>
      </RootHeader>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{ paper: { sx: { width: 320, bgcolor: "#060e1a", p: 4 } } }}
      >
        <Stack spacing={4}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "linear-gradient(135deg, #0D3B66 0%, #472187 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: "0.8rem",
                }}
              >
                A
              </Box>
              <Typography variant="h6" sx={{ color: "#fff", fontFamily: "'Anta', sans-serif" }}>
                Akshar<span style={{ color: "#7fd0ff" }}>Sync</span>
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
                {item.hasServices ? (
                  <>
                    <ListItemButton
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      sx={{ py: 2, color: "#fff" }}
                    >
                      <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
                      <KeyboardArrowDownIcon
                        sx={{ transform: mobileExpanded === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                      />
                    </ListItemButton>
                    <Collapse in={mobileExpanded === item.label}>
                      <List sx={{ pl: 2 }}>
                        {mainServices.map((svc) => (
                          <Box key={svc.label} sx={{ mb: 2 }}>
                            <Typography
                              variant="caption"
                              onClick={() => { if (svc.to) { setMobileOpen(false); navigate(svc.to); } }}
                              sx={{ color: svc.accent, fontWeight: 700, textTransform: "uppercase", px: 2, cursor: svc.to ? "pointer" : "default" }}
                            >
                              {svc.label}
                            </Typography>
                            {svc.sub.length > 0 ? (
                              svc.sub.map((sub) => (
                                <ListItemButton
                                  key={sub.label}
                                  onClick={() => { setMobileOpen(false); navigate(sub.to); }}
                                >
                                  <ListItemText
                                    primary={sub.label}
                                    slotProps={{ primary: { style: { fontSize: "0.9rem", color: alpha("#fff", 0.6) } } }}
                                  />
                                </ListItemButton>
                              ))
                            ) : (
                              svc.to && (
                                <ListItemButton onClick={() => { setMobileOpen(false); navigate(svc.to!); }}>
                                  <ListItemText
                                    primary="View Details"
                                    slotProps={{ primary: { style: { fontSize: "0.85rem", color: alpha("#fff", 0.4), fontStyle: "italic" } } }}
                                  />
                                </ListItemButton>
                              )
                            )}
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton onClick={() => handleNavClick(item)} sx={{ py: 2, color: "#fff" }}>
                    <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 700 } } }} />
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