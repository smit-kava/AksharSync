// ============================================================
// src/pages/BlogListingPage.tsx
// Public Blog Listing Page for AksharSync
// ============================================================

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  InputAdornment,
  Pagination,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { ExpertCTA } from "../components";
import {
  BLOG_CATEGORIES,
  fetchBlogs,
  type BlogArticle,
} from "../services/blogApi";

export const BlogListingPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Load articles
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      fetchBlogs({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        search: searchQuery.trim() || undefined,
        page,
        limit: 9,
      })
        .then((res) => {
          if (!isMounted) return;
          setBlogs(res.blogs);
          setTotal(res.total);
          setTotalPages(res.totalPages);
        })
        .catch((err) => {
          console.error("Error fetching blogs:", err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery, page]);

  // Featured article (first published article on page 1 when no search query is active)
  const featuredArticle = useMemo(() => {
    if (
      page === 1 &&
      !searchQuery.trim() &&
      selectedCategory === "All" &&
      blogs.length > 0
    ) {
      return blogs[0];
    }
    return null;
  }, [blogs, page, searchQuery, selectedCategory]);

  // Grid articles (excluding featured if displayed)
  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return blogs.slice(1);
    }
    return blogs;
  }, [blogs, featuredArticle]);

  return (
    <Box
      sx={{
        backgroundColor: "#060e1a",
        minHeight: "100vh",
        color: "#ffffff",
        pt: { xs: 12, md: 16 },
        pb: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient radial glows */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(127, 208, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "5%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(71, 33, 135, 0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* ── HERO HEADER ── */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "840px",
            mx: "auto",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: "50px",
              backgroundColor: "rgba(127, 208, 255, 0.08)",
              border: "1px solid rgba(127, 208, 255, 0.25)",
              mb: 3,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16, color: "#7fd0ff" }} />
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#7fd0ff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              AksharSync Engineering & Strategy Journal{total > 0 ? ` • ${total} Articles` : ""}
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              mb: 2.5,
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #7fd0ff 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Insights, Architectures & Playbooks in Retention
          </Typography>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Explore deep dives into Klaviyo automation, email deliverability
            algorithms, modular HTML systems, and lifecycle revenue growth.
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: "600px", mx: "auto" }}>
            <TextField
              fullWidth
              placeholder="Search articles by keyword, ESP, or strategy..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#7fd0ff" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(8, 17, 33, 0.8)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  color: "#fff",
                  border: "1px solid rgba(127, 208, 255, 0.25)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                  "&:hover fieldset": {
                    borderColor: "rgba(127, 208, 255, 0.6)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7fd0ff",
                    borderWidth: "1.5px",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* ── CATEGORY PILLS ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "center" },
            gap: 1.2,
            mb: { xs: 5, md: 7 },
            overflowX: "auto",
            pb: 1,
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {["All", ...BLOG_CATEGORIES].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Chip
                key={category}
                label={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
                clickable
                sx={{
                  px: 1.5,
                  py: 2.2,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  transition: "all 0.25s ease",
                  backgroundColor: isActive
                    ? "rgba(127, 208, 255, 0.18)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#7fd0ff" : "rgba(255, 255, 255, 0.7)",
                  border: `1px solid ${
                    isActive
                      ? "rgba(127, 208, 255, 0.5)"
                      : "rgba(255, 255, 255, 0.08)"
                  }`,
                  boxShadow: isActive
                    ? "0 0 15px rgba(127, 208, 255, 0.2)"
                    : "none",
                  "&:hover": {
                    backgroundColor: "rgba(127, 208, 255, 0.12)",
                    color: "#ffffff",
                    borderColor: "rgba(127, 208, 255, 0.35)",
                  },
                }}
              />
            );
          })}
        </Box>

        {/* ── FEATURED SPOTLIGHT ARTICLE ── */}
        {featuredArticle && !loading && (
          <Box sx={{ mb: 7 }}>
            <Typography
              sx={{
                color: "#7fd0ff",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ✦ Featured Article
            </Typography>

            <Card
              component={RouterLink}
              to={`/blog/${featuredArticle.slug}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1.1fr 1fr" },
                backgroundColor: "rgba(8, 17, 33, 0.65)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(127, 208, 255, 0.25)",
                borderRadius: 4,
                overflow: "hidden",
                textDecoration: "none",
                transition: "all 0.35s ease",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(127, 208, 255, 0.6)",
                  boxShadow: "0 25px 60px rgba(127, 208, 255, 0.15)",
                  "& .featured-img": {
                    transform: "scale(1.03)",
                  },
                },
              }}
            >
              {/* Media image container */}
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  minHeight: { xs: 260, lg: "100%" },
                }}
              >
                <CardMedia
                  component="img"
                  image={featuredArticle.cover_image}
                  alt={featuredArticle.title}
                  className="featured-img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(8, 17, 33, 0.8) 100%)",
                  }}
                />
              </Box>

              {/* Text content */}
              <CardContent
                sx={{
                  p: { xs: 3, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Chip
                    label={featuredArticle.category}
                    size="small"
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
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 15 }} />
                    {featuredArticle.read_time}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 15 }} />
                    {featuredArticle.views} views
                  </Box>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.6rem", md: "2.2rem" },
                    lineHeight: 1.25,
                    color: "#ffffff",
                    mb: 2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {featuredArticle.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "0.95rem", md: "1.05rem" },
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {featuredArticle.excerpt}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                    pt: 2,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      src={featuredArticle.author_avatar}
                      alt={featuredArticle.author_name}
                      sx={{
                        width: 38,
                        height: 38,
                        border: "1px solid rgba(127, 208, 255, 0.4)",
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                        }}
                      >
                        {featuredArticle.author_name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255, 255, 255, 0.45)",
                          fontSize: "0.78rem",
                        }}
                      >
                        {new Date(
                          featuredArticle.published_at,
                        ).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: "#7fd0ff",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    Read Article
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* ── GRID OF ARTICLES ── */}
        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Box key={i} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Skeleton
                  variant="rectangular"
                  height={220}
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                />
                <Box
                  sx={{ p: 2.5, backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                >
                  <Skeleton
                    width="40%"
                    height={24}
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", mb: 1 }}
                  />
                  <Skeleton
                    width="90%"
                    height={32}
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", mb: 1 }}
                  />
                  <Skeleton
                    width="100%"
                    height={50}
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : gridArticles.length === 0 && !featuredArticle ? (
          <Box
            sx={{
              py: 12,
              textAlign: "center",
              backgroundColor: "rgba(8, 17, 33, 0.4)",
              borderRadius: 4,
              border: "1px dashed rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              No Articles Found
            </Typography>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", mb: 3 }}>
              We could not find any articles matching your search or selected
              category.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              sx={{
                color: "#7fd0ff",
                borderColor: "#7fd0ff",
                textTransform: "none",
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {gridArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <Card
                  component={RouterLink}
                  to={`/blog/${article.slug}`}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(8, 17, 33, 0.65)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 3.5,
                    overflow: "hidden",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "rgba(127, 208, 255, 0.45)",
                      boxShadow: "0 20px 45px rgba(127, 208, 255, 0.12)",
                      "& .card-img": { transform: "scale(1.05)" },
                      "& .read-btn": {
                        color: "#ffffff",
                        transform: "translateX(4px)",
                      },
                    },
                  }}
                >
                  {/* Card Image */}
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      height: 210,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={article.cover_image}
                      alt={article.title}
                      className="card-img"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.45s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                      }}
                    >
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(6, 14, 26, 0.85)",
                          backdropFilter: "blur(10px)",
                          color: "#7fd0ff",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          border: "1px solid rgba(127, 208, 255, 0.3)",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Card Body */}
                  <CardContent
                    sx={{
                      p: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "0.78rem",
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        {article.read_time}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "0.78rem",
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: 14 }} />
                        {article.views} views
                      </Box>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        lineHeight: 1.35,
                        color: "#ffffff",
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.65)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        mb: 3,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.excerpt}
                    </Typography>

                    {/* Author & Read Link */}
                    <Box
                      sx={{
                        mt: "auto",
                        pt: 2,
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          src={article.author_avatar}
                          alt={article.author_name}
                          sx={{
                            width: 30,
                            height: 30,
                            border: "1px solid rgba(127, 208, 255, 0.3)",
                          }}
                        />
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          {article.author_name}
                        </Typography>
                      </Box>

                      <Box
                        className="read-btn"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "#7fd0ff",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          transition: "all 0.25s ease",
                        }}
                      >
                        Read <ArrowForwardIcon sx={{ fontSize: 15 }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => {
                setPage(value);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": { backgroundColor: "rgba(127, 208, 255, 0.1)" },
                  "&.Mui-selected": {
                    backgroundColor: "#7fd0ff",
                    color: "#060e1a",
                    fontWeight: 700,
                  },
                },
              }}
            />
          </Box>
        )}

        {/* ── CTA BANNER ── */}
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <ExpertCTA />
        </Box>
      </Container>
    </Box>
  );
};

export default BlogListingPage;
