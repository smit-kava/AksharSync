import CampaignIcon from "@mui/icons-material/Campaign";
import CodeIcon from "@mui/icons-material/Code";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

const serviceItems = [
  { label: "Digital Strategy", to: ROUTE_PATHS.SERVICE_DIGITAL_STRATEGY, icon: <TrendingUpIcon fontSize="small" /> },
  { label: "SEO Optimization", to: ROUTE_PATHS.SERVICE_SEO, icon: <SearchIcon fontSize="small" /> },
  { label: "Content Creation", to: ROUTE_PATHS.SERVICE_CONTENT, icon: <CreateIcon fontSize="small" /> },
  { label: "Web Development", to: ROUTE_PATHS.SERVICE_WEB_DEV, icon: <CodeIcon fontSize="small" /> },
];

const navItems = [
  { label: "Home",      to: ROUTE_PATHS.HOME,      children: undefined as typeof serviceItems | undefined },
  { label: "Solutions", to: ROUTE_PATHS.SOLUTIONS,  children: undefined as typeof serviceItems | undefined },
  { label: "Services",  to: ROUTE_PATHS.SERVICES,   children: serviceItems },
  { label: "About Us",  to: ROUTE_PATHS.ABOUT,      children: undefined as typeof serviceItems | undefined },
  { label: "Why?",      to: ROUTE_PATHS.WHY,        children: undefined as typeof serviceItems | undefined },
];

const linkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#7fd0ff" : "rgba(255,255,255,0.92)",
  textDecoration: "none",
  fontWeight: isActive ? 600 : 500,
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "1rem",
  transition: "color 0.2s",
});

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* ════════ AppBar ════════ */}
      <AppBar
        position="sticky"
        color="primary"
        elevation={0}
        sx={{
          backgroundColor: "#0f2c4d",
          background: "linear-gradient(90deg, #0f2c4d 0%, #123457 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 80 }}>

            {/* ── Logo (far left) ── */}
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

            {/* ── Desktop nav (center) ── */}
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
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ position: "relative" }}
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  <NavLink style={linkStyles} to={item.to}>
                    {item.label}
                    {item.children && (
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 18,
                          opacity: 0.75,
                          transition: "transform 0.2s",
                          transform: activeMenu === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    )}
                  </NavLink>

                  {/* Hover dropdown */}
                  {item.children && (
                    <Fade in={activeMenu === item.label}>
                      <Paper
                        elevation={12}
                        sx={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          minWidth: 230,
                          bgcolor: "#0f2c4d",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                        }}
                      >
                        <List disablePadding sx={{ p: 1 }}>
                          {item.children.map((sub) => (
                            <ListItemButton
                              key={sub.to}
                              component={Link}
                              to={sub.to}
                              onClick={() => setActiveMenu(null)}
                              sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                "&:hover": {
                                  bgcolor: "rgba(127,208,255,0.12)",
                                  "& .MuiListItemIcon-root": { color: "#7fd0ff" },
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36, color: "rgba(255,255,255,0.65)", transition: "color 0.2s" }}>
                                {sub.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
                                    {sub.label}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Paper>
                    </Fade>
                  )}
                </Box>
              ))}
            </Stack>

            {/* ── Contact Us (far right) ── */}
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
        sx={{ "& .MuiDrawer-paper": { width: 270, bgcolor: "#0f2c4d", color: "white" } }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
            <CampaignIcon sx={{ color: "#fdd835" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
              AksharSync
            </Typography>
          </Stack>

          <List disablePadding>
            {navItems.map((item) => (
              <Box key={item.label}>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={() => !item.children && setOpenMenu(false)}
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

                {item.children && (
                  <List component="div" disablePadding sx={{ pl: 2, mb: 1 }}>
                    {item.children.map((sub) => (
                      <ListItemButton
                        key={sub.to}
                        component={Link}
                        to={sub.to}
                        onClick={() => setOpenMenu(false)}
                        sx={{ borderRadius: 1, mb: 0.25 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: "#7fd0ff" }}>
                          {sub.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
                              {sub.label}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
