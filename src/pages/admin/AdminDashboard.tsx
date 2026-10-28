// ============================================================
// src/pages/admin/AdminDashboard.tsx
// Superadmin Blog Management Dashboard
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

import {
  fetchAdminBlogs,
  deleteBlog,
  clearAdminAuth,
  getStoredAdminUser,
  getSessionRemainingText,
} from "../../services/blogApi";
import type { BlogArticle, BlogStats } from "../../services/blogApi";
import { ROUTE_PATHS } from "../../routes/paths";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const adminUser = getStoredAdminUser();
  const [sessionText, setSessionText] = useState(getSessionRemainingText());

  useEffect(() => {
    const sessionTimer = setInterval(() => {
      setSessionText(getSessionRemainingText());
    }, 60000);
    return () => clearInterval(sessionTimer);
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBlogs();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadBlogs]);

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
            maxWidth: "1440px",
            mx: "auto",
          }}
        >
          {/* Logo & Portal title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(90deg, #ffffff 0%, #7fd0ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AksharSync
            </Typography>
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

          {/* User profile & Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.BLOGS}
              target="_blank"
              startIcon={<LanguageIcon />}
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.85rem",
                textTransform: "none",
                "&:hover": { color: "#7fd0ff" },
              }}
            >
              View Public Blog
            </Button>

            <Chip
              label={adminUser?.username || "Superadmin"}
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

      {/* ── MAIN DASHBOARD CONTENT ─────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Title & Add Blog Action */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
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
              Blog Management
            </Typography>
            <Typography
              sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}
            >
              Publish, edit, and organize dynamic articles across the AksharSync
              website.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={loadBlogs}
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
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #0D3B66 100%)",
                  boxShadow: "0 12px 30px rgba(127, 208, 255, 0.3)",
                },
              }}
            >
              Create New Article
            </Button>
          </Box>
        </Box>

        {/* ── 4 STAT METRIC CARDS ───────────────────────────── */}
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

        {/* ── SEARCH & FILTER CONTROLS ─────────────────────── */}
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
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: 2,
              mb: 2.5,
            }}
          >
            {/* Search Input */}
            <TextField
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
                minWidth: { xs: "100%", md: 380 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(6, 14, 26, 0.7)",
                  borderRadius: 2,
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(127, 208, 255, 0.4)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#7fd0ff" },
                },
              }}
            />

            {/* Filter Tabs */}
            <Tabs
              value={statusFilter}
              onChange={(_, val) => setStatusFilter(val)}
              sx={{
                minHeight: "auto",
                "& .MuiTabs-indicator": { backgroundColor: "#7fd0ff" },
                "& .MuiTab-root": {
                  color: "rgba(255, 255, 255, 0.6)",
                  minHeight: "auto",
                  py: 1,
                  px: 2,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  fontWeight: 600,
                  "&.Mui-selected": { color: "#7fd0ff" },
                },
              }}
            >
              <Tab value="all" label="All Articles" />
              <Tab value="published" label="Published" />
              <Tab value="draft" label="Drafts" />
            </Tabs>
          </Box>

          {/* ── ARTICLES TABLE ─────────────────────────────────── */}
          {loading ? (
            <Box
              sx={{
                py: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "#7fd0ff" }} />
            </Box>
          ) : blogs.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <ArticleIcon
                sx={{
                  fontSize: 48,
                  color: "rgba(255, 255, 255, 0.2)",
                  mb: 1.5,
                }}
              />
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                No articles found
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "0.875rem",
                  mb: 2.5,
                }}
              >
                {search
                  ? `No matching results for "${search}". Try adjusting your query.`
                  : "Get started by creating your very first dynamic article."}
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to={ROUTE_PATHS.ADMIN_BLOG_CREATE}
                startIcon={<AddIcon />}
                size="small"
                sx={{
                  background:
                    "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                  textTransform: "none",
                }}
              >
                Create Article
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        py: 1.5,
                      },
                    }}
                  >
                    <TableCell>Article</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Views</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((b) => (
                    <TableRow
                      key={b.id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            "rgba(255, 255, 255, 0.02) !important",
                        },
                        "& td": {
                          borderColor: "rgba(255, 255, 255, 0.06)",
                          py: 2,
                        },
                      }}
                    >
                      {/* Title & Slug */}
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
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
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                lineHeight: 1.3,
                                mb: 0.3,
                              }}
                            >
                              {b.title}
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgba(255, 255, 255, 0.45)",
                                fontSize: "0.78rem",
                                fontFamily: "monospace",
                              }}
                            >
                              /blog/{b.slug}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* Category */}
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

                      {/* Status */}
                      <TableCell>
                        <Chip
                          label={
                            b.status === "published" ? "Published" : "Draft"
                          }
                          size="small"
                          sx={{
                            backgroundColor:
                              b.status === "published"
                                ? "rgba(52, 211, 153, 0.15)"
                                : "rgba(251, 191, 36, 0.15)",
                            color:
                              b.status === "published" ? "#34d399" : "#fbbf24",
                            border: `1px solid ${
                              b.status === "published"
                                ? "rgba(52, 211, 153, 0.3)"
                                : "rgba(251, 191, 36, 0.3)"
                            }`,
                            fontWeight: 700,
                            fontSize: "0.75rem",
                          }}
                        />
                      </TableCell>

                      {/* Views */}
                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.85)",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {(b.views || 0).toLocaleString()}
                        </Typography>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {b.published_at
                            ? new Date(b.published_at).toLocaleDateString()
                            : "—"}
                        </Typography>
                      </TableCell>

                      {/* Action buttons */}
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Tooltip title="View live page">
                            <IconButton
                              component={RouterLink}
                              to={`/blog/${b.slug}`}
                              target="_blank"
                              size="small"
                              sx={{
                                color: "rgba(255, 255, 255, 0.6)",
                                "&:hover": {
                                  color: "#7fd0ff",
                                  backgroundColor: "rgba(127, 208, 255, 0.1)",
                                },
                              }}
                            >
                              <OpenInNewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit article">
                            <IconButton
                              component={RouterLink}
                              to={`/admin/blogs/edit/${b.id}`}
                              size="small"
                              sx={{
                                color: "rgba(255, 255, 255, 0.6)",
                                "&:hover": {
                                  color: "#a78bfa",
                                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                                },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete article">
                            <IconButton
                              onClick={() => setDeleteId(b.id)}
                              size="small"
                              sx={{
                                color: "rgba(255, 255, 255, 0.6)",
                                "&:hover": {
                                  color: "#f87171",
                                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                                },
                              }}
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
      </Container>

      {/* ── DELETE CONFIRMATION DIALOG ─────────────────────── */}
      <Dialog
        open={deleteId !== null}
        onClose={() => !deleting && setDeleteId(null)}
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
