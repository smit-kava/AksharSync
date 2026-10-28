// ============================================================
// src/pages/BlogDetailPage.tsx
// Public Dynamic Blog Article Detail Page
// ============================================================

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { ExpertCTA } from "../components";
import { ROUTE_PATHS } from "../routes/paths";
import { fetchBlogBySlug, type BlogArticle } from "../services/blogApi";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<BlogArticle | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Copy link snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    setLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchBlogBySlug(slug)
      .then((res) => {
        if (!isMounted) return;
        setBlog(res.blog);
        setRelatedBlogs(res.related);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Article not found");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Extract Table of Contents from markdown headings
  const tocItems: TocItem[] = useMemo(() => {
    if (!blog?.content) return [];
    const lines = blog.content.split("\n");
    const items: TocItem[] = [];

    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-");
        items.push({ id, text, level: 2 });
      } else if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-");
        items.push({ id, text, level: 3 });
      }
    });

    return items;
  }, [blog?.content]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbarOpen(true);
  };

  const handleShareTwitter = () => {
    if (!blog) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `Check out "${blog.title}" by @AksharSync:`,
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
    );
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          backgroundColor: "#060e1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#7fd0ff" }} />
        <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
          Loading Article...
        </Typography>
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          backgroundColor: "#060e1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#fff", mb: 2 }}>
          Article Not Found
        </Typography>
        <Typography
          sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 4, maxWidth: 500 }}
        >
          The article you are looking for does not exist or may have been
          un-published.
        </Typography>
        <Button
          component={RouterLink}
          to={ROUTE_PATHS.BLOGS}
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Back to All Articles
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#060e1a",
        minHeight: "100vh",
        color: "#ffffff",
        pt: { xs: 12, md: 15 },
        pb: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient glows */}
      <Box
        sx={{
          position: "absolute",
          top: "2%",
          left: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(127, 208, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* ── BREADCRUMBS ── */}
        <Breadcrumbs
          sx={{
            mb: 4,
            "& .MuiBreadcrumbs-separator": {
              color: "rgba(255, 255, 255, 0.3)",
            },
            "& a, & p": { fontSize: "0.875rem" },
          }}
        >
          <Link
            component={RouterLink}
            to={ROUTE_PATHS.HOME}
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              "&:hover": { color: "#7fd0ff" },
            }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to={ROUTE_PATHS.BLOGS}
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              "&:hover": { color: "#7fd0ff" },
            }}
          >
            Blog
          </Link>
          <Typography sx={{ color: "#7fd0ff", fontWeight: 600 }}>
            {blog.category}
          </Typography>
        </Breadcrumbs>

        {/* ── ARTICLE HEADER ── */}
        <Box sx={{ mb: 4, maxWidth: "900px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2.5,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={blog.category}
              sx={{
                backgroundColor: "rgba(127, 208, 255, 0.15)",
                color: "#7fd0ff",
                fontWeight: 700,
                border: "1px solid rgba(127, 208, 255, 0.3)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.85rem",
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 16 }} />
              {new Date(blog.published_at).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.85rem",
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              {blog.read_time}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.85rem",
              }}
            >
              <VisibilityIcon sx={{ fontSize: 16 }} />
              {blog.views} views
            </Box>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.6rem" },
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              mb: 3,
              background: "linear-gradient(180deg, #FFFFFF 0%, #e0e7ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {blog.title}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            {blog.excerpt}
          </Typography>

          {/* Author Badge & Share toolbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              pt: 3,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={blog.author_avatar}
                alt={blog.author_name}
                sx={{
                  width: 48,
                  height: 48,
                  border: "2px solid rgba(127, 208, 255, 0.4)",
                }}
              />
              <Box>
                <Typography
                  sx={{ color: "#fff", fontWeight: 700, fontSize: "0.98rem" }}
                >
                  {blog.author_name}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.82rem",
                  }}
                >
                  AksharSync Engineering Specialist
                </Typography>
              </Box>
            </Box>

            {/* Social Share Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "0.85rem",
                  mr: 1,
                  display: { xs: "none", sm: "inline" },
                }}
              >
                Share:
              </Typography>
              <Tooltip title="Share on Twitter / X">
                <IconButton
                  onClick={handleShareTwitter}
                  size="small"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": { color: "#7fd0ff", borderColor: "#7fd0ff" },
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share on LinkedIn">
                <IconButton
                  onClick={handleShareLinkedIn}
                  size="small"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": { color: "#0a66c2", borderColor: "#0a66c2" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy Link">
                <IconButton
                  onClick={handleCopyLink}
                  size="small"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": { color: "#34d399", borderColor: "#34d399" },
                  }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* ── COVER IMAGE HERO ── */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            mb: 8,
            boxShadow:
              "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(127, 208, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxHeight: "520px",
          }}
        >
          <Box
            component="img"
            src={blog.cover_image}
            alt={blog.title}
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "520px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* ── 2-COLUMN ARTICLE LAYOUT (TOC SIDEBAR + MAIN CONTENT) ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" },
            gap: 6,
            alignItems: "start",
          }}
        >
          {/* LEFT SIDEBAR: STICKY TABLE OF CONTENTS & AUDIT PROMPT */}
          <Box
            sx={{
              position: { lg: "sticky" },
              top: 100,
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              gap: 3,
            }}
          >
            {tocItems.length > 0 && (
              <Card
                sx={{
                  backgroundColor: "rgba(8, 17, 33, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 3,
                  p: 2.5,
                }}
              >
                <Typography
                  sx={{
                    color: "#7fd0ff",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <BookmarkBorderIcon sx={{ fontSize: 16 }} /> Table of Contents
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
                >
                  {tocItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`#${item.id}`}
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: item.level === 3 ? "0.8rem" : "0.86rem",
                        pl: item.level === 3 ? 2 : 0,
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        lineHeight: 1.4,
                        "&:hover": { color: "#7fd0ff" },
                      }}
                    >
                      {item.text}
                    </Link>
                  ))}
                </Box>
              </Card>
            )}

            {/* Retention Audit Lead Magnet Mini Card */}
            <Card
              sx={{
                background:
                  "linear-gradient(135deg, rgba(71, 33, 135, 0.25) 0%, rgba(13, 59, 102, 0.35) 100%)",
                border: "1px solid rgba(127, 208, 255, 0.25)",
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  mb: 1,
                }}
              >
                Scale Your Email Revenue
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.82rem",
                  lineHeight: 1.5,
                  mb: 2,
                }}
              >
                Get our engineers to audit your Klaviyo deliverability &
                lifecycle flows.
              </Typography>
              <Button
                component={RouterLink}
                to={ROUTE_PATHS.RETENTION_AUDIT_BOOKING}
                fullWidth
                size="small"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "none",
                }}
              >
                Book Free Audit
              </Button>
            </Card>
          </Box>

          {/* MAIN ARTICLE CONTENT */}
          <Box
            sx={{
              maxWidth: "800px",
              "& h2": {
                color: "#ffffff",
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
                mt: 5,
                mb: 2,
                scrollMarginTop: 110,
              },
              "& h3": {
                color: "#7fd0ff",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 700,
                mt: 4,
                mb: 1.5,
                scrollMarginTop: 110,
              },
              "& p": {
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                lineHeight: 1.85,
                mb: 3,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 3,
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: { xs: "1rem", md: "1.08rem" },
                lineHeight: 1.8,
                "& li": { mb: 1 },
              },
              "& code": {
                backgroundColor: "rgba(127, 208, 255, 0.1)",
                color: "#7fd0ff",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontFamily: "Consolas, Monaco, monospace",
                fontSize: "0.95em",
              },
              "& pre": {
                backgroundColor: "#030811",
                border: "1px solid rgba(127, 208, 255, 0.2)",
                borderRadius: 3,
                p: 3,
                overflowX: "auto",
                my: 3,
                "& code": {
                  backgroundColor: "transparent",
                  p: 0,
                  color: "#e0e7ff",
                },
              },
              "& blockquote": {
                borderLeft: "4px solid #7fd0ff",
                backgroundColor: "rgba(127, 208, 255, 0.05)",
                borderRadius: "0 12px 12px 0",
                p: 2.5,
                my: 3.5,
                fontStyle: "italic",
                color: "rgba(255, 255, 255, 0.9)",
                "& p": { mb: 0 },
              },
            }}
          >
            {blog.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("## ")) {
                const text = block.replace("## ", "").trim();
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-");
                return (
                  <h2 key={idx} id={id}>
                    {text}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                const text = block.replace("### ", "").trim();
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/[\s_-]+/g, "-");
                return (
                  <h3 key={idx} id={id}>
                    {text}
                  </h3>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote key={idx}>{block.replace("> ", "")}</blockquote>
                );
              }
              if (block.startsWith("```")) {
                const codeContent = block.replace(/```[a-z]*\n?/g, "").trim();
                return (
                  <pre key={idx}>
                    <code>{codeContent}</code>
                  </pre>
                );
              }
              return <p key={idx}>{block}</p>;
            })}

            {/* Tags footer */}
            {blog.tags && (
              <Box
                sx={{
                  mt: 6,
                  pt: 4,
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.85rem",
                    mb: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Related Tags:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {blog.tags.split(",").map((tag, i) => (
                    <Chip
                      key={i}
                      label={`# ${tag.trim()}`}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "rgba(255, 255, 255, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "0.8rem",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Author Profile Bio Box */}
            <Card
              sx={{
                mt: 6,
                backgroundColor: "rgba(8, 17, 33, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(127, 208, 255, 0.2)",
                borderRadius: 3.5,
                p: 3.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Avatar
                  src={blog.author_avatar}
                  alt={blog.author_name}
                  sx={{
                    width: 64,
                    height: 64,
                    border: "2px solid rgba(127, 208, 255, 0.5)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      mb: 0.5,
                    }}
                  >
                    {blog.author_name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Retention & lifecycle engineer at AksharSync. Helping DTC
                    and high-growth brands architect high-converting flows and
                    bulletproof deliverability.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>

        {/* ── RELATED ARTICLES ── */}
        {relatedBlogs.length > 0 && (
          <Box
            sx={{
              mt: 12,
              pt: 8,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 4,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Related Articles
              </Typography>
              <Button
                component={RouterLink}
                to={ROUTE_PATHS.BLOGS}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: "#7fd0ff",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                All Articles
              </Button>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3.5,
              }}
            >
              {relatedBlogs.map((rel) => (
                <Card
                  key={rel.id}
                  component={RouterLink}
                  to={`/blog/${rel.slug}`}
                  sx={{
                    backgroundColor: "rgba(8, 17, 33, 0.65)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 3,
                    overflow: "hidden",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "rgba(127, 208, 255, 0.4)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={rel.cover_image}
                    alt={rel.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      p: 2.5,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        lineHeight: 1.35,
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {rel.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                      }}
                    >
                      {rel.excerpt}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#7fd0ff",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        mt: "auto",
                      }}
                    >
                      Read More →
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* ── CONVERSION CTA ── */}
        <Box sx={{ mt: 10 }}>
          <ExpertCTA />
        </Box>
      </Container>

      {/* Copy link snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{
            backgroundColor: "rgba(52, 211, 153, 0.95)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Article link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogDetailPage;
