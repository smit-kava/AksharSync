// ============================================================
// src/pages/admin/AdminDashboard.tsx
// Superadmin Blog & Customer Traffic Management Dashboard
// ============================================================

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArticleIcon from "@mui/icons-material/Article";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DevicesIcon from "@mui/icons-material/Devices";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  fetchAdminBlogs,
  deleteBlog,
  clearAdminAuth,
  getStoredAdminUser,
  getSessionRemainingText,
} from "../../services/blogApi";
import type { BlogArticle, BlogStats } from "../../services/blogApi";
import {
  fetchCustomerAnalytics,
} from "../../services/customerApi";
import type { AnalyticsData } from "../../services/customerApi";
import { ROUTE_PATHS } from "../../routes/paths";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const adminUser = getStoredAdminUser();
  const [sessionText, setSessionText] = useState(getSessionRemainingText());

  // ── Main Dashboard Tab: 'blogs' | 'analytics' ─────────────────
  const [mainTab, setMainTab] = useState<"blogs" | "analytics">("blogs");

  useEffect(() => {
    const sessionTimer = setInterval(() => {
      setSessionText(getSessionRemainingText());
    }, 60000);
    return () => clearInterval(sessionTimer);
  }, []);

  // ── Blogs State ──────────────────────────────────────────────
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    total: 0,
    published: 0,
    drafts: 0,
    total_views: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");

  // ── Customer & Traffic Analytics State ───────────────────────
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    stats: { total_visits: 0, unique_visitors: 0, today_visits: 0, total_customers: 0 },
    customers: [],
    recent_visitors: [],
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  // Delete modal state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Snackbar notification
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAdminBlogs({
        search: search.trim() || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      setBlogs(res.blogs);
      setStats(res.stats);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to load blogs.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const data = await fetchCustomerAnalytics(customerSearch.trim() || undefined);
      setAnalytics(data);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to load customer analytics.",
        severity: "error",
      });
    } finally {
      setAnalyticsLoading(false);
    }
  }, [customerSearch]);

  useEffect(() => {
    if (mainTab === "blogs") {
      const timer = setTimeout(() => {
        loadBlogs();
      }, 250);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        loadAnalytics();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [mainTab, loadBlogs, loadAnalytics]);

  const handleSignOut = () => {
    clearAdminAuth();
    navigate(ROUTE_PATHS.ADMIN_LOGIN);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteBlog(deleteId);
      setSnackbar({
        open: true,
        message: "Blog article successfully removed.",
        severity: "success",
      });
      setDeleteId(null);
      loadBlogs();
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || "Failed to delete blog.",
        severity: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({
      open: true,
      message: `${label} copied to clipboard!`,
      severity: "success",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#060e1a",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── TOP NAV BAR ────────────────────────────────────── */}
      <Box
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(8, 17, 33, 0.9)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          py: 1.5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          {/* Brand + Dashboard title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={RouterLink}
              to={ROUTE_PATHS.HOME}
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Anta', sans-serif",
                  fontSize: "1.35rem",
                  color: "#ffffff",
                  fontWeight: 700,
                  "& span": { color: "#7fd0ff" },
                }}
              >
                Akshar<span>Sync</span>
              </Typography>
            </Box>
            <Chip
              label="Superadmin"
              size="small"
              sx={{
                backgroundColor: "rgba(127, 208, 255, 0.12)",
                color: "#7fd0ff",
                border: "1px solid rgba(127, 208, 255, 0.3)",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          </Box>

          {/* Navigation Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.BLOGS}
              target="_blank"
              size="small"
              startIcon={<LanguageIcon />}
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.85rem",
                textTransform: "none",
                "&:hover": { color: "#7fd0ff" },
              }}
            >
              View Public Website
            </Button>

            <Chip
              label={adminUser?.username || "superadmin"}
              variant="outlined"
              sx={{
                color: "#a78bfa",
                borderColor: "rgba(167, 139, 250, 0.3)",
                fontSize: "0.8rem",
                display: { xs: "none", sm: "inline-flex" },
              }}
            />

            <Chip
              icon={
                <AccessTimeIcon
                  sx={{
                    fontSize: "14px !important",
                    color: "#7fd0ff !important",
                  }}
                />
              }
              label={`Session: ${sessionText}`}
              size="small"
              sx={{
                backgroundColor: "rgba(127, 208, 255, 0.08)",
                color: "#7fd0ff",
                border: "1px solid rgba(127, 208, 255, 0.2)",
                fontSize: "0.78rem",
                fontWeight: 600,
                display: { xs: "none", md: "inline-flex" },
              }}
            />

            <Tooltip title="Sign Out">
              <IconButton
                onClick={handleSignOut}
                size="small"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    color: "#f87171",
                    borderColor: "rgba(239, 68, 68, 0.4)",
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* ── MAIN DASHBOARD CONTAINER ─────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Top Header & Tab Switcher */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: "-0.02em", mb: 0.5 }}
            >
              {mainTab === "blogs" ? "Blog Article Management" : "Customer & Traffic Analytics"}
            </Typography>
            <Typography
              sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}
            >
              {mainTab === "blogs"
                ? "Publish, edit, and organize dynamic articles across the AksharSync website."
                : "Monitor live visitors, website page views, and registered customer leads in real time."}
            </Typography>
          </Box>

          {/* Action Row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={mainTab === "blogs" ? loadBlogs : loadAnalytics}
              startIcon={<RefreshIcon />}
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                textTransform: "none",
                "&:hover": { borderColor: "#7fd0ff", color: "#7fd0ff" },
              }}
            >
              Refresh
            </Button>

            {mainTab === "blogs" && (
              <Button
                variant="contained"
                component={RouterLink}
                to={ROUTE_PATHS.ADMIN_BLOG_CREATE}
                startIcon={<AddIcon />}
                sx={{
                  background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "none",
                  px: 2.5,
                  boxShadow: "0 8px 24px rgba(71, 33, 135, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #a78bfa 0%, #0D3B66 100%)",
                    boxShadow: "0 12px 30px rgba(127, 208, 255, 0.3)",
                  },
                }}
              >
                Create New Article
              </Button>
            )}
          </Box>
        </Box>

        {/* ── TABS: Blogs vs Customer Traffic ────────────────── */}
        <Box sx={{ mb: 4, borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <Tabs
            value={mainTab}
            onChange={(_, val) => setMainTab(val)}
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                minHeight: 48,
                "&.Mui-selected": { color: "#7fd0ff", fontWeight: 700 },
              },
              "& .MuiTabs-indicator": { backgroundColor: "#7fd0ff", height: 3 },
            }}
          >
            <Tab
              value="blogs"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ArticleIcon sx={{ fontSize: 18 }} />
                  <span>Blog Articles</span>
                  <Chip
                    label={stats.total}
                    size="small"
                    sx={{ backgroundColor: "rgba(127, 208, 255, 0.15)", color: "#7fd0ff", fontSize: "0.75rem", height: 20 }}
                  />
                </Box>
              }
            />
            <Tab
              value="analytics"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PeopleAltIcon sx={{ fontSize: 18 }} />
                  <span>Customers & Traffic</span>
                  <Chip
                    label={analytics.stats.total_customers}
                    size="small"
                    sx={{ backgroundColor: "rgba(167, 139, 250, 0.15)", color: "#a78bfa", fontSize: "0.75rem", height: 20 }}
                  />
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* ═════════════════════════════════════════════════════ */}
        {/* TAB 1: BLOG ARTICLES MANAGEMENT                     */}
        {/* ═════════════════════════════════════════════════════ */}
        {mainTab === "blogs" && (
          <>
            {/* 4 STAT METRIC CARDS */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2.5,
                mb: 4,
              }}
            >
              {[
                {
                  label: "Total Articles",
                  value: stats.total,
                  icon: <ArticleIcon sx={{ fontSize: 26, color: "#7fd0ff" }} />,
                  accent: "rgba(127, 208, 255, 0.1)",
                },
                {
                  label: "Published",
                  value: stats.published,
                  icon: <CheckCircleIcon sx={{ fontSize: 26, color: "#34d399" }} />,
                  accent: "rgba(52, 211, 153, 0.1)",
                },
                {
                  label: "Drafts",
                  value: stats.drafts,
                  icon: <EditNoteIcon sx={{ fontSize: 26, color: "#fbbf24" }} />,
                  accent: "rgba(251, 191, 36, 0.1)",
                },
                {
                  label: "Total Views",
                  value: stats.total_views.toLocaleString(),
                  icon: <VisibilityIcon sx={{ fontSize: 26, color: "#a78bfa" }} />,
                  accent: "rgba(167, 139, 250, 0.1)",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    borderRadius: 3,
                    p: 2.5,
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      borderColor: "rgba(127, 208, 255, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.65)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        backgroundColor: item.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                  >
                    {item.value}
                  </Typography>
                </Card>
              ))}
            </Box>

            {/* SEARCH & STATUS FILTER */}
            <Card
              sx={{
                backgroundColor: "rgba(8, 17, 33, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 3.5,
                p: { xs: 2, sm: 3 },
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by article title, category, or tag..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    maxWidth: { xs: "100%", md: 450 },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(6, 14, 26, 0.7)",
                      borderRadius: 2.5,
                      color: "#ffffff",
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                      "&:hover fieldset": { borderColor: "rgba(127, 208, 255, 0.4)" },
                      "&.Mui-focused fieldset": { borderColor: "#7fd0ff" },
                    },
                  }}
                />

                <Tabs
                  value={statusFilter}
                  onChange={(_, val) => setStatusFilter(val)}
                  sx={{
                    minHeight: "auto",
                    "& .MuiTab-root": {
                      color: "rgba(255, 255, 255, 0.6)",
                      textTransform: "none",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      minHeight: "auto",
                      py: 1,
                      px: 2,
                      "&.Mui-selected": { color: "#7fd0ff", fontWeight: 700 },
                    },
                    "& .MuiTabs-indicator": { backgroundColor: "#7fd0ff" },
                  }}
                >
                  <Tab label="All Articles" value="all" />
                  <Tab label="Published" value="published" />
                  <Tab label="Drafts" value="draft" />
                </Tabs>
              </Box>
            </Card>

            {/* ARTICLES TABLE */}
            <Card
              sx={{
                backgroundColor: "rgba(8, 17, 33, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 12 }}>
                  <CircularProgress size={44} sx={{ color: "#7fd0ff" }} />
                </Box>
              ) : blogs.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 12, px: 3 }}>
                  <ArticleIcon sx={{ fontSize: 48, color: "rgba(255, 255, 255, 0.2)", mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#ffffff", mb: 0.5 }}>
                    No articles found
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem", mb: 2.5 }}>
                    {search ? "Try adjusting your search query." : "Get started by creating your very first dynamic article."}
                  </Typography>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={ROUTE_PATHS.ADMIN_BLOG_CREATE}
                    startIcon={<AddIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                    }}
                  >
                    Create Article
                  </Button>
                </Box>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>ARTICLE</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>CATEGORY</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>STATUS</TableCell>
                        <TableCell align="center" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>VIEWS</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>DATE</TableCell>
                        <TableCell align="right" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700, fontSize: "0.78rem" }}>ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogs.map((b) => (
                        <TableRow
                          key={b.id}
                          hover
                          sx={{
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.02) !important" },
                            "& td": { borderColor: "rgba(255, 255, 255, 0.06)", py: 2 },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              {b.cover_image && (
                                <Box
                                  component="img"
                                  src={b.cover_image}
                                  alt={b.title}
                                  sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                  }}
                                />
                              )}
                              <Box sx={{ maxWidth: 360 }}>
                                <Typography sx={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.3, mb: 0.3 }}>
                                  {b.title}
                                </Typography>
                                <Typography sx={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.78rem", fontFamily: "monospace" }}>
                                  /blog/{b.slug}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={b.category}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(127, 208, 255, 0.08)",
                                color: "#7fd0ff",
                                border: "1px solid rgba(127, 208, 255, 0.2)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={b.status === "published" ? "Published" : "Draft"}
                              size="small"
                              sx={{
                                backgroundColor: b.status === "published" ? "rgba(52, 211, 153, 0.15)" : "rgba(251, 191, 36, 0.15)",
                                color: b.status === "published" ? "#34d399" : "#fbbf24",
                                border: `1px solid ${b.status === "published" ? "rgba(52, 211, 153, 0.3)" : "rgba(251, 191, 36, 0.3)"}`,
                                fontWeight: 700,
                                fontSize: "0.75rem",
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.85)", fontWeight: 600, fontSize: "0.9rem" }}>
                              {(b.views || 0).toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.85rem" }}>
                              {b.published_at ? new Date(b.published_at).toLocaleDateString() : "—"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                              <Tooltip title="View live page">
                                <IconButton
                                  component={RouterLink}
                                  to={`/blog/${b.slug}`}
                                  target="_blank"
                                  size="small"
                                  sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#7fd0ff", backgroundColor: "rgba(127, 208, 255, 0.1)" } }}
                                >
                                  <OpenInNewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit article">
                                <IconButton
                                  component={RouterLink}
                                  to={`/admin/blogs/edit/${b.id}`}
                                  size="small"
                                  sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#fbbf24", backgroundColor: "rgba(251, 191, 36, 0.1)" } }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete article">
                                <IconButton
                                  onClick={() => setDeleteId(b.id)}
                                  size="small"
                                  sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#f87171", backgroundColor: "rgba(239, 68, 68, 0.1)" } }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </>
        )}

        {/* ═════════════════════════════════════════════════════ */}
        {/* TAB 2: CUSTOMERS & TRAFFIC ANALYTICS                */}
        {/* ═════════════════════════════════════════════════════ */}
        {mainTab === "analytics" && (
          <>
            {/* 4 STAT METRIC CARDS */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2.5,
                mb: 4,
              }}
            >
              {[
                {
                  label: "Total Page Visits",
                  value: analytics.stats.total_visits.toLocaleString(),
                  icon: <TrendingUpIcon sx={{ fontSize: 26, color: "#7fd0ff" }} />,
                  accent: "rgba(127, 208, 255, 0.1)",
                },
                {
                  label: "Unique Visitors",
                  value: analytics.stats.unique_visitors.toLocaleString(),
                  icon: <DevicesIcon sx={{ fontSize: 26, color: "#34d399" }} />,
                  accent: "rgba(52, 211, 153, 0.1)",
                },
                {
                  label: "Registered Customers",
                  value: analytics.stats.total_customers.toLocaleString(),
                  icon: <PeopleAltIcon sx={{ fontSize: 26, color: "#a78bfa" }} />,
                  accent: "rgba(167, 139, 250, 0.1)",
                },
                {
                  label: "Visits Today",
                  value: analytics.stats.today_visits.toLocaleString(),
                  icon: <AccessTimeIcon sx={{ fontSize: 26, color: "#fbbf24" }} />,
                  accent: "rgba(251, 191, 36, 0.1)",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    borderRadius: 3,
                    p: 2.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "0.875rem", fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        backgroundColor: item.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {item.value}
                  </Typography>
                </Card>
              ))}
            </Box>

            {/* CUSTOMER DIRECTORY */}
            <Card
              sx={{
                backgroundColor: "rgba(8, 17, 33, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 4,
                overflow: "hidden",
                mb: 4,
              }}
            >
              <Box sx={{ p: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Customer Leads & Accounts ({analytics.customers.length})
                  </Typography>
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                    Visitors who signed in or connected through the website popup
                  </Typography>
                </Box>
                <TextField
                  size="small"
                  placeholder="Search customer by name, email, company..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    width: { xs: "100%", sm: 340 },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(6, 14, 26, 0.7)",
                      borderRadius: 2.5,
                      color: "#fff",
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                    },
                  }}
                />
              </Box>

              {analyticsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress size={36} sx={{ color: "#7fd0ff" }} />
                </Box>
              ) : analytics.customers.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8, color: "rgba(255, 255, 255, 0.5)" }}>
                  <PeopleAltIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography>No customers registered yet.</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                      <TableRow>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>CUSTOMER</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>COMPANY & PHONE</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>INTEREST</TableCell>
                        <TableCell align="center" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>VISITS</TableCell>
                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>LAST ACTIVE</TableCell>
                        <TableCell align="right" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analytics.customers.map((c) => (
                        <TableRow key={c.id} hover sx={{ "& td": { borderColor: "rgba(255, 255, 255, 0.06)", py: 1.8 } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(127, 208, 255, 0.15)",
                                  color: "#7fd0ff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                }}
                              >
                                {c.name.charAt(0).toUpperCase()}
                              </Box>
                              <Box>
                                <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>
                                  {c.name}
                                </Typography>
                                <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.8rem" }}>
                                  {c.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: "#fff", fontSize: "0.85rem" }}>
                              {c.company || "—"}
                            </Typography>
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.78rem" }}>
                              {c.phone || "No phone"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={c.interests || "General"}
                              size="small"
                              sx={{ backgroundColor: "rgba(167, 139, 250, 0.12)", color: "#a78bfa", fontSize: "0.75rem" }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={`${c.visits_count} visits`}
                              size="small"
                              sx={{ backgroundColor: "rgba(52, 211, 153, 0.12)", color: "#34d399", fontWeight: 700, fontSize: "0.75rem" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.82rem" }}>
                              {new Date(c.last_active).toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Copy Email">
                              <IconButton size="small" onClick={() => handleCopy(c.email, "Email")} sx={{ color: "rgba(255, 255, 255, 0.6)", "&:hover": { color: "#7fd0ff" } }}>
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>

            {/* LIVE REAL-TIME VISITOR LOGS */}
            <Card
              sx={{
                backgroundColor: "rgba(8, 17, 33, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  Live Visitor Activity Stream (Recent 25 Visits)
                </Typography>
                <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>
                  Real-time page views across your public pages
                </Typography>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                    <TableRow>
                      <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>PAGE URL</TableCell>
                      <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>DEVICE</TableCell>
                      <TableCell sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>IP ADDRESS</TableCell>
                      <TableCell align="right" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 700 }}>VISITED AT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.recent_visitors.map((log) => (
                      <TableRow key={log.id} sx={{ "& td": { borderColor: "rgba(255, 255, 255, 0.05)", py: 1.2 } }}>
                        <TableCell>
                          <Typography sx={{ color: "#7fd0ff", fontFamily: "monospace", fontSize: "0.85rem" }}>
                            {log.page_url}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={log.device_type}
                            size="small"
                            sx={{
                              fontSize: "0.72rem",
                              textTransform: "capitalize",
                              backgroundColor: log.device_type === "mobile" ? "rgba(244, 114, 182, 0.15)" : "rgba(127, 208, 255, 0.15)",
                              color: log.device_type === "mobile" ? "#f472b6" : "#7fd0ff",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontFamily: "monospace", fontSize: "0.8rem" }}>
                            {log.ip_address}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.8rem" }}>
                            {new Date(log.visited_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </>
        )}
      </Container>

      {/* ── DELETE ARTICLE CONFIRMATION MODAL ──────────────── */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#081121",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 3,
              color: "#fff",
              p: 1,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#fca5a5" }}>
          Delete Article?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Are you sure you want to delete this blog post? This action will
            permanently remove it from both the superadmin dashboard and the
            public website.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{ color: "rgba(255, 255, 255, 0.6)", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleting}
            variant="contained"
            color="error"
            sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
          >
            {deleting ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            backgroundColor:
              snackbar.severity === "success"
                ? "rgba(52, 211, 153, 0.95)"
                : "rgba(239, 68, 68, 0.95)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
