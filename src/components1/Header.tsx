import CampaignIcon from "@mui/icons-material/Campaign";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
  Fade,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

const serviceItems = [
  { label: "Digital Strategy", to: ROUTE_PATHS.SERVICE_DIGITAL_STRATEGY, icon: <TrendingUpIcon fontSize="small" /> },
  { label: "SEO Optimization", to: ROUTE_PATHS.SERVICE_SEO, icon: <SearchIcon fontSize="small" /> },
  { label: "Content Creation", to: ROUTE_PATHS.SERVICE_CONTENT, icon: <CreateIcon fontSize="small" /> },
  { label: "Web Development", to: ROUTE_PATHS.SERVICE_WEB_DEV, icon: <CodeIcon fontSize="small" /> },
];

const navItems = [
  { label: "Solutions", to: ROUTE_PATHS.SOLUTIONS },
  {
    label: "Services",
    to: ROUTE_PATHS.SERVICES,
    children: serviceItems
  },
  { label: "About Us", to: ROUTE_PATHS.ABOUT },
  { label: "Why?", to: ROUTE_PATHS.WHY },
];

const linkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#7fd0ff" : "rgba(255,255,255,0.92)",
  textDecoration: "none",
  fontWeight: isActive ? 600 : 500,
  display: "flex",
  alignItems: "center",
  gap: "4px",
  transition: "all 0.2s ease-in-out",
  padding: "8px 0",
});

export function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: scrolled
            ? "linear-gradient(135deg, rgba(10,25,47,0.85) 0%, rgba(15,44,77,0.85) 100%)"
            : "linear-gradient(135deg, rgba(10,25,47,0.45) 0%, rgba(15,44,77,0.45) 100%)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(8px)",
          borderBottom: scrolled
            ? "1px solid rgba(127,208,255,0.15)"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.35s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, minHeight: 72, justifyContent: "space-between" }}>
            <Stack
              component={Link}
              to={ROUTE_PATHS.HOME}
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flexGrow: 1, color: "inherit", textDecoration: "none" }}
            >
              <Box
                sx={{
                  bgcolor: "#fdd835",
                  borderRadius: "8px",
                  p: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(253, 216, 53, 0.4)",
                }}
              >
                <CampaignIcon sx={{ color: "#0a192f" }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5, color: "white" }}>
                Akshar<span style={{ color: "#7fd0ff" }}>Sync</span>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" }, height: "100%", alignItems: "center" }}>
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ position: "relative" }}
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  <NavLink style={linkStyles} to={item.to}>
                    {item.label}
                    {item.children && <KeyboardArrowDownIcon sx={{ fontSize: 18, opacity: 0.7 }} />}
                  </NavLink>

                  {item.children && (
                    <Fade in={activeMenu === item.label}>
                      <Paper
                        elevation={24}
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          mt: 1,
                          minWidth: 240,
                          bgcolor: "#0f2c4d",
                          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                        }}
                      >
                        <List sx={{ p: 1 }}>
                          {item.children.map((subItem) => (
                            <ListItemButton
                              key={subItem.to}
                              component={Link}
                              to={subItem.to}
                              onClick={() => setActiveMenu(null)}
                              sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                "&:hover": {
                                  bgcolor: "rgba(127, 208, 255, 0.1)",
                                  "& .MuiListItemIcon-root": { color: "#7fd0ff" },
                                  "& .MuiListItemText-primary": { color: "#7fd0ff" },
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 36, color: "rgba(255,255,255,0.7)" }}>
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      fontWeight: 500,
                                      color: "rgba(255,255,255,0.9)",
                                    }}
                                  >
                                    {subItem.label}
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

            <Button
              variant="contained"
              startIcon={<LocalPhoneOutlinedIcon />}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                bgcolor: "white",
                color: "#0a192f",
                fontWeight: 700,
                borderRadius: "10px",
                px: 3,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "#7fd0ff", color: "#0a192f" },
              }}
            >
              Contact Us
            </Button>

            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "white" }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 4, p: 1 }}>
            <Box
              sx={{
                bgcolor: "#fdd835",
                borderRadius: "8px",
                p: 0.5,
                display: "flex",
              }}
            >
              <CampaignIcon sx={{ color: "#0a192f" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Akshar<span style={{ color: "#7fd0ff" }}>Sync</span>
            </Typography>
          </Stack>
          <List>
            {navItems.map((item) => (
              <Box key={item.label}>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={() => !item.children && setOpenDrawer(false)}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
                {item.children && (
                  <List component="div" disablePadding sx={{ pl: 2 }}>
                    {item.children.map((subItem) => (
                      <ListItemButton
                        key={subItem.to}
                        component={Link}
                        to={subItem.to}
                        onClick={() => setOpenDrawer(false)}
                        sx={{ borderRadius: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: "#7fd0ff" }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontSize: "0.85rem" }}>
                              {subItem.label}
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
