import CampaignIcon from "@mui/icons-material/Campaign";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

// ─── Data ────────────────────────────────────────────────────────────────────

interface SubService {
  label: string;
  to: string;
}

interface MainService {
  label: string;
  to: string;
  sub: SubService[];
}

const mainServices: MainService[] = [
  {
    label: "Lifecycle & Automation",
    to: ROUTE_PATHS.SERVICES,
    sub: [
      { label: "Email flows",               to: ROUTE_PATHS.SERVICE_EMAIL_FLOWS },
      { label: "Customer journeys",          to: ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS },
      { label: "Multi-channel automation",   to: ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION },
    ],
  },
  {
    label: "Technical Architecture",
    to: ROUTE_PATHS.SERVICES,
    sub: [
      { label: "ESP Migration & Integration",    to: ROUTE_PATHS.SERVICE_ESP_MIGRATION },
      { label: "CRM Data Sync",                  to: ROUTE_PATHS.SERVICE_CRM_DATA_SYNC },
      { label: "Deliverability Audits",          to: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS },
      { label: "Liquid & Ampscript Templating", to: ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT },
    ],
  },
  {
    label: "Creative Production",
    to: ROUTE_PATHS.SERVICES,
    sub: [
      { label: "Modular Template Production",    to: ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES },
      { label: "UX/UI Design",                   to: ROUTE_PATHS.SERVICE_UX_UI_DESIGN },
      { label: "White Label Solutions",          to: ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS },
    ],
  },
];

interface NavItem {
  label: string;
  to: string;
  hasServices?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home",      to: ROUTE_PATHS.HOME },
  { label: "Solutions", to: ROUTE_PATHS.SOLUTIONS },
  { label: "Services",  to: ROUTE_PATHS.SERVICES, hasServices: true },
  { label: "About Us",  to: ROUTE_PATHS.ABOUT },
  { label: "Why?",      to: ROUTE_PATHS.WHY },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const linkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#ffffff" : "rgba(255,255,255,0.85)",
  textDecoration: "none",
  fontWeight: isActive ? 600 : 500,
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "1rem",
  transition: "color 0.2s",
});

const popoverPaperSx = {
  bgcolor: "#0D3B66",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 2,
  // overflow: "hidden", // Removed to allow nested popovers as side-popovers
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Header() {
  // Mobile drawer
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  // Level-1: Services popover
  const [showServices, setShowServices] = useState(false);
  const servicesTimeout = useRef<number | null>(null);

  // Level-2: sub-service popover
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const subTimeout = useRef<number | null>(null);

  // ── Level-1 handlers ──
  const onServicesEnter = () => {
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current);
    setShowServices(true);
  };
  const onServicesLeave = () => {
    servicesTimeout.current = window.setTimeout(() => {
      setShowServices(false);
      setActiveMain(null);
    }, 180);
  };

  // ── Level-2 handlers ──
  const onMainEnter = (label: string) => {
    if (subTimeout.current) window.clearTimeout(subTimeout.current);
    // Keep level-1 alive when moving into level-2
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current);
    setActiveMain(label);
  };
  const onMainLeave = () => {
    subTimeout.current = window.setTimeout(() => setActiveMain(null), 180);
  };

  const closeAll = () => {
    setShowServices(false);
    setActiveMain(null);
  };

  return (
    <>
      {/* ════════ AppBar ════════ */}
      <AppBar
        position="sticky"
        color="primary"
        elevation={0}
        sx={{
          backgroundColor: "#0D3B66",
          background: "linear-gradient(90deg, #0D3B66 0%, #472187 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 80 }}>

            {/* ── Logo ── */}
            <Stack
              component={Link}
              to={ROUTE_PATHS.HOME}
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", color: "inherit", textDecoration: "none", mr: 4 }}
            >
              <CampaignIcon sx={{ color: "#fdd835", fontSize: 28 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "white", whiteSpace: "nowrap", letterSpacing: "-0.5px" }}
              >
                AksharSync
              </Typography>
            </Stack>

            {/* ── Desktop nav ── */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {navItems.map((item) =>
                item.hasServices ? (
                  /* ── Services trigger ── */
                  <Box
                    key={item.label}
                    sx={{ position: "relative" }}
                    onMouseEnter={onServicesEnter}
                    onMouseLeave={onServicesLeave}
                  >
                    <NavLink style={linkStyles} to={item.to}>
                      {item.label}
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 18,
                          opacity: 0.75,
                          transition: "transform 0.2s",
                          transform: showServices ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </NavLink>

                    {/* ── Level-1 popover: main categories ── */}
                    <Fade in={showServices}>
                      <Paper
                        elevation={12}
                        sx={{
                          ...popoverPaperSx,
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          minWidth: 240,
                        }}
                      >
                        <List disablePadding sx={{ p: 1 }}>
                          {mainServices.map((main) => (
                            <Box
                              key={main.label}
                              sx={{ position: "relative" }}
                              onMouseEnter={() => onMainEnter(main.label)}
                              onMouseLeave={onMainLeave}
                            >
                              <ListItemButton
                                sx={{
                                  borderRadius: 1,
                                  mb: 0.5,
                                  justifyContent: "space-between",
                                  "&:hover": { bgcolor: "rgba(127,208,255,0.12)" },
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
                                      {main.label}
                                    </Typography>
                                  }
                                />
                                <KeyboardArrowRightIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }} />
                              </ListItemButton>

                              {/* ── Level-2 popover: sub-services ── */}
                              <Fade in={activeMain === main.label}>
                                <Paper
                                  elevation={16}
                                  sx={{
                                    ...popoverPaperSx,
                                    position: "absolute",
                                    top: 0,
                                    left: "calc(100% + 4px)",
                                    minWidth: 220,
                                    zIndex: 10,
                                    overflow: "hidden",
                                    pointerEvents: activeMain === main.label ? "auto" : "none",
                                  }}
                                  onMouseEnter={() => onMainEnter(main.label)}
                                  onMouseLeave={onMainLeave}
                                >
                                  <List disablePadding sx={{ p: 1 }}>
                                    {main.sub.map((sub) => (
                                      <ListItemButton
                                        key={sub.to}
                                        component={Link}
                                        to={sub.to}
                                        onClick={closeAll}
                                        sx={{
                                          borderRadius: 1,
                                          mb: 0.5,
                                          "&:hover": { bgcolor: "rgba(127,208,255,0.12)" },
                                        }}
                                      >
                                        <ListItemText
                                          primary={
                                            <Typography sx={{ fontSize: "0.86rem", fontWeight: 400, color: "rgba(255,255,255,0.88)" }}>
                                              {sub.label}
                                            </Typography>
                                          }
                                        />
                                      </ListItemButton>
                                    ))}
                                  </List>
                                </Paper>
                              </Fade>
                            </Box>
                          ))}
                        </List>
                      </Paper>
                    </Fade>
                  </Box>
                ) : (
                  /* ── Regular nav item ── */
                  <NavLink key={item.label} style={linkStyles} to={item.to}>
                    {item.label}
                  </NavLink>
                )
              )}
            </Stack>

            {/* ── Contact Us ── */}
            <Button
              variant="contained"
              startIcon={<LocalPhoneOutlinedIcon />}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                bgcolor: "white",
                color: "#0f2c4d",
                fontWeight: 700,
                borderRadius: "8px",
                px: 2.5,
                ml: 3,
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: "#e3f2fd" },
              }}
            >
              Contact Us
            </Button>

            {/* ── Mobile hamburger ── */}
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "white" }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ════════ Mobile Drawer ════════ */}
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        sx={{ "& .MuiDrawer-paper": { width: 280, bgcolor: "#0f2c4d", color: "white" } }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
            <CampaignIcon sx={{ color: "#fdd835" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
              AksharSync
            </Typography>
          </Stack>

          <List disablePadding>
            {navItems.map((item) =>
              item.hasServices ? (
                <Box key={item.label}>
                  <ListItemButton
                    onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                    sx={{ borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
                          {item.label}
                        </Typography>
                      }
                    />
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 18,
                        color: "rgba(255,255,255,0.6)",
                        transition: "transform 0.2s",
                        transform: mobileOpen === item.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </ListItemButton>

                  <Collapse in={mobileOpen === item.label} timeout="auto" unmountOnExit>
                    {mainServices.map((main) => (
                      <Box key={main.label} sx={{ pl: 2 }}>
                        <ListItemButton
                          onClick={() => setMobileOpen(mobileOpen === main.label ? item.label : main.label)}
                          sx={{ borderRadius: 1, mb: 0.25 }}
                        >
                          <ListItemText
                            primary={
                              <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                                {main.label}
                              </Typography>
                            }
                          />
                          <KeyboardArrowDownIcon
                            sx={{
                              fontSize: 16,
                              color: "rgba(255,255,255,0.5)",
                              transition: "transform 0.2s",
                              transform: mobileOpen === main.label ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </ListItemButton>

                        <Collapse in={mobileOpen === main.label} timeout="auto" unmountOnExit>
                          <List disablePadding sx={{ pl: 2, mb: 1 }}>
                            {main.sub.map((sub) => (
                              <ListItemButton
                                key={sub.to}
                                component={Link}
                                to={sub.to}
                                onClick={() => setOpenMenu(false)}
                                sx={{ borderRadius: 1, mb: 0.25 }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>
                                      {sub.label}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </Box>
              ) : (
                <ListItemButton
                  key={item.label}
                  component={Link}
                  to={item.to}
                  onClick={() => setOpenMenu(false)}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
