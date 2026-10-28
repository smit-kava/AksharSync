// ============================================================
// src/components/CustomerSignInModal.tsx
// Intelligent customer sign-in popup with GSAP entrance,
// 5-second auto-minimize to top-right corner, and docked widget
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Alert,
  CircularProgress,
  Chip,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import {
  customerSignIn,
  getStoredCustomer,
  clearStoredCustomer,
} from "../services/customerApi";
import type { Customer, CustomerFormData } from "../services/customerApi";
import { ROUTE_PATHS } from "../routes/paths";

interface CustomerSignInModalProps {
  open: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  "Lifecycle Flow Review",
  "Deliverability & Technical Setup",
  "ESP Migration & CRM Sync",
  "UX/UI & Modular Templates",
  "Multi-Channel Orchestration (SMS/Push)",
  "General Inquiry & Consultation",
];

const AUTO_MINIMIZE_SECONDS = 5;

export const CustomerSignInModal: React.FC<CustomerSignInModalProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(() =>
    getStoredCustomer(),
  );

  // Starts open immediately so visitors see it on localhost and live site
  const [modalOpen, setModalOpen] = useState(true);
  const [isDocked, setIsDocked] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [interests, setInterests] = useState(INTEREST_OPTIONS[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 5-Second Timer & Countdown
  const [timeLeft, setTimeLeft] = useState(AUTO_MINIMIZE_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // GSAP animation refs
  const dialogPaperRef = useRef<HTMLDivElement | null>(null);
  const dockedWidgetRef = useRef<HTMLDivElement | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  // When external "open" prop becomes true (e.g. user clicks "Sign In" in Header)
  useEffect(() => {
    if (open) {
      setModalOpen(true);
      setIsDocked(false);
      setTimeLeft(AUTO_MINIMIZE_SECONDS);
      setIsPaused(false);
      setHasInteracted(true); // Don't auto-minimize if user clicked directly
    }
  }, [open]);

  // Load active customer from storage
  useEffect(() => {
    const stored = getStoredCustomer();
    if (stored) {
      setActiveCustomer(stored);
      setName(stored.name);
      setEmail(stored.email);
      setPhone(stored.phone || "");
      setCompany(stored.company || "");
    }
  }, [modalOpen]);

  // ── 5-Second Auto-Minimize Countdown ─────────────────────────
  useEffect(() => {
    if (!modalOpen || isDocked || isPaused || hasInteracted || activeCustomer) {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      return;
    }

    countdownIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!);
          minimizeToTopRight();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [modalOpen, isDocked, isPaused, hasInteracted, activeCustomer]);

  // ── GSAP Entrance Animation on Modal Open ────────────────────
  useEffect(() => {
    if (modalOpen && !isDocked) {
      const timer = setTimeout(() => {
        const el =
          document.getElementById("customer-signin-paper") ||
          dialogPaperRef.current;
        if (el) {
          gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 35 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "back.out(1.4)",
            },
          );
        }
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [modalOpen, isDocked]);

  // ── GSAP Minimize to Top-Right Action ────────────────────────
  const minimizeToTopRight = () => {
    const paper =
      document.getElementById("customer-signin-paper") ||
      dialogPaperRef.current;
    if (paper) {
      const rect = paper.getBoundingClientRect();
      const targetX = window.innerWidth - rect.right + rect.width / 2 - 80;
      const targetY = -rect.top + 70;

      gsap.to(paper, {
        x: targetX,
        y: targetY,
        scale: 0.15,
        opacity: 0,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(paper, { clearProps: "all" });
          setModalOpen(false);
          setIsDocked(true);
          onClose();

          setTimeout(() => {
            const docked =
              document.getElementById("customer-docked-capsule") ||
              dockedWidgetRef.current;
            if (docked) {
              gsap.fromTo(
                docked,
                { scale: 0.35, opacity: 0, x: 50 },
                {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  duration: 0.45,
                  ease: "back.out(1.6)",
                },
              );
            }
          }, 30);
        },
      });
    } else {
      setModalOpen(false);
      setIsDocked(true);
      onClose();
    }
  };

  // ── GSAP Expand from Top-Right Action ────────────────────────
  const expandFromTopRight = () => {
    const docked =
      document.getElementById("customer-docked-capsule") ||
      dockedWidgetRef.current;
    if (docked) {
      gsap.to(docked, {
        scale: 0.5,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setIsDocked(false);
          setModalOpen(true);
          setHasInteracted(true); // Reopened manually, don't auto-minimize
        },
      });
    } else {
      setIsDocked(false);
      setModalOpen(true);
      setHasInteracted(true);
    }
  };

  const handleFormFocus = () => {
    setIsPaused(true);
    setHasInteracted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setHasInteracted(true);

    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const payload: CustomerFormData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        interests,
      };

      const result = await customerSignIn(payload);
      setActiveCustomer(result.customer);
      setSuccessMessage(result.message);

      setTimeout(() => {
        minimizeToTopRight();
      }, 1800);
    } catch (err: any) {
      setError(err.message || "Failed to submit details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    clearStoredCustomer();
    setActiveCustomer(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSuccessMessage("You have been signed out.");
  };

  const handleGoToAdmin = () => {
    minimizeToTopRight();
    navigate(ROUTE_PATHS.ADMIN_LOGIN);
  };

  return (
    <>
      {/* ── TOP-RIGHT DOCKED PERSISTENT WIDGET ─────────────── */}
      {isDocked && (
        <Box
          id="customer-docked-capsule"
          ref={dockedWidgetRef}
          onClick={expandFromTopRight}
          sx={{
            position: "fixed",
            top: { xs: 80, sm: 84 },
            right: { xs: 16, sm: 24 },
            zIndex: 1350,
            cursor: "pointer",
            backgroundColor: "rgba(6, 14, 26, 0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1.5px solid rgba(127, 208, 255, 0.35)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(127, 208, 255, 0.2)",
            borderRadius: "999px",
            px: 2,
            py: 0.85,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            transition: "all 0.25s ease",
            "&:hover": {
              borderColor: "#7fd0ff",
              backgroundColor: "rgba(8, 20, 38, 0.98)",
              boxShadow: "0 12px 36px rgba(127, 208, 255, 0.35)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {/* Pulsing indicator */}
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: activeCustomer ? "#34d399" : "#7fd0ff",
              boxShadow: activeCustomer
                ? "0 0 10px #34d399"
                : "0 0 10px #7fd0ff",
              animation: "pulseGlow 2s infinite",
              "@keyframes pulseGlow": {
                "0%": { transform: "scale(0.95)", opacity: 0.8 },
                "50%": { transform: "scale(1.2)", opacity: 1 },
                "100%": { transform: "scale(0.95)", opacity: 0.8 },
              },
            }}
          />

          <PersonIcon sx={{ fontSize: 16, color: "#7fd0ff" }} />

          <Typography
            sx={{
              color: "#fff",
              fontSize: "0.825rem",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            {activeCustomer
              ? activeCustomer.name.split(" ")[0]
              : "Sign In / Connect"}
          </Typography>

          <Chip
            label="Open"
            size="small"
            sx={{
              height: 20,
              fontSize: "0.7rem",
              fontWeight: 700,
              backgroundColor: "rgba(127, 208, 255, 0.15)",
              color: "#7fd0ff",
            }}
          />
        </Box>
      )}

      {/* ── FULL SIGN-IN MODAL ─────────────────────────────── */}
      <Dialog
        open={modalOpen && !isDocked}
        onClose={minimizeToTopRight}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            id: "customer-signin-paper",
            ref: dialogPaperRef,
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => {
              if (!hasInteracted) setIsPaused(false);
            },
            sx: {
              background:
                "linear-gradient(135deg, rgba(8, 17, 33, 0.96) 0%, rgba(13, 27, 54, 0.94) 100%)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(127, 208, 255, 0.25)",
              borderRadius: 4,
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 50px rgba(127, 208, 255, 0.12)",
              color: "#fff",
              overflow: "hidden",
              transformOrigin: "center center",
            },
          },
        }}
      >
        {/* Specular accent bar */}
        <Box
          sx={{
            height: 4,
            background: "linear-gradient(90deg, #7fd0ff, #a78bfa, #472187)",
          }}
        />

        {/* 5-Second Countdown progress indicator */}
        {!hasInteracted && !activeCustomer && (
          <Box
            sx={{
              px: 3,
              pt: 1.5,
              pb: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {isPaused
                  ? "Timer paused (typing)"
                  : `Minimizing to top-right in ${timeLeft}s...`}
              </Typography>
              <Tooltip
                title={isPaused ? "Resume countdown" : "Pause countdown"}
              >
                <IconButton
                  size="small"
                  onClick={() => setIsPaused(!isPaused)}
                  sx={{ color: "rgba(255, 255, 255, 0.5)", p: 0.5 }}
                >
                  {isPaused ? (
                    <PlayArrowIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <PauseIcon sx={{ fontSize: 14 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Chip
              label="Click top-right later"
              size="small"
              sx={{
                height: 18,
                fontSize: "0.68rem",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            />
          </Box>
        )}

        {!hasInteracted && !activeCustomer && !isPaused && (
          <LinearProgress
            variant="determinate"
            value={(timeLeft / AUTO_MINIMIZE_SECONDS) * 100}
            sx={{
              height: 2,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #7fd0ff, #34d399)",
              },
            }}
          />
        )}

        <DialogContent sx={{ p: { xs: 3, sm: 4.5 }, position: "relative" }}>
          {/* Minimize / Close Button (Animates to top-right via GSAP) */}
          <Tooltip title="Minimize to top right">
            <IconButton
              onClick={minimizeToTopRight}
              size="small"
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "rgba(255, 255, 255, 0.6)",
                "&:hover": {
                  color: "#7fd0ff",
                  backgroundColor: "rgba(127, 208, 255, 0.1)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Modal Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, rgba(127, 208, 255, 0.15) 0%, rgba(71, 33, 135, 0.25) 100%)",
                border: "1px solid rgba(127, 208, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1.5,
                color: "#7fd0ff",
              }}
            >
              <PersonIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.4rem", sm: "1.65rem" },
                letterSpacing: "-0.02em",
                background: "linear-gradient(180deg, #FFFFFF 0%, #7fd0ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {activeCustomer ? "Customer Profile" : "Connect with AksharSync"}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.65)",
                mt: 0.5,
                fontSize: "0.875rem",
              }}
            >
              {activeCustomer
                ? "You are active as a verified visitor on our portal."
                : "Sign in to access custom lifecycle audits, project roadmaps & consultations."}
            </Typography>
          </Box>

          {/* Status Alerts */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                color: "#fca5a5",
              }}
            >
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert
              icon={<CheckCircleIcon fontSize="inherit" />}
              severity="success"
              sx={{
                mb: 2.5,
                backgroundColor: "rgba(52, 211, 153, 0.15)",
                color: "#34d399",
              }}
            >
              {successMessage}
            </Alert>
          )}

          {/* If Active Customer is Signed In */}
          {activeCustomer && !successMessage ? (
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                backgroundColor: "rgba(6, 14, 26, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}
                  >
                    {activeCustomer.name}
                  </Typography>
                  <Typography sx={{ color: "#7fd0ff", fontSize: "0.85rem" }}>
                    {activeCustomer.email}
                  </Typography>
                </Box>
                <Chip
                  label={`${activeCustomer.visits_count} visits`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(127, 208, 255, 0.15)",
                    color: "#7fd0ff",
                    fontWeight: 600,
                  }}
                />
              </Box>

              {activeCustomer.company && (
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.8rem",
                    mt: 0.5,
                  }}
                >
                  Company: {activeCustomer.company}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 1.5, mt: 2.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={handleSignOut}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    textTransform: "none",
                    "&:hover": { borderColor: "#f87171", color: "#f87171" },
                  }}
                >
                  Sign Out
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={minimizeToTopRight}
                  sx={{
                    background:
                      "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Continue Browsing
                </Button>
              </Box>
            </Box>
          ) : (
            /* Sign-In / Connect Form */
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.85)",
                      mb: 0.5,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Full Name *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. Firest Name"
                    value={name}
                    onFocus={handleFormFocus}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleFormFocus();
                    }}
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(6, 14, 26, 0.7)",
                        borderRadius: 2,
                        color: "#fff",
                        fontSize: "0.9rem",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.15)",
                        },
                        "&:hover fieldset": { borderColor: "#7fd0ff" },
                        "&.Mui-focused fieldset": { borderColor: "#7fd0ff" },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.85)",
                      mb: 0.5,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Email Address *
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    size="small"
                    placeholder="name@company.com"
                    value={email}
                    onFocus={handleFormFocus}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleFormFocus();
                    }}
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(6, 14, 26, 0.7)",
                        borderRadius: 2,
                        color: "#fff",
                        fontSize: "0.9rem",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.15)",
                        },
                        "&:hover fieldset": { borderColor: "#7fd0ff" },
                        "&.Mui-focused fieldset": { borderColor: "#7fd0ff" },
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.85)",
                        mb: 0.5,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Company / Organization
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Acme Corp"
                      value={company}
                      onFocus={handleFormFocus}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        handleFormFocus();
                      }}
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(6, 14, 26, 0.7)",
                          borderRadius: 2,
                          color: "#fff",
                          fontSize: "0.9rem",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.15)",
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.85)",
                        mb: 0.5,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onFocus={handleFormFocus}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        handleFormFocus();
                      }}
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(6, 14, 26, 0.7)",
                          borderRadius: 2,
                          color: "#fff",
                          fontSize: "0.9rem",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.15)",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.85)",
                      mb: 0.5,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Primary Need / Interest
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={interests}
                    onFocus={handleFormFocus}
                    onChange={(e) => {
                      setInterests(e.target.value);
                      handleFormFocus();
                    }}
                    disabled={loading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(6, 14, 26, 0.7)",
                        borderRadius: 2,
                        color: "#fff",
                        fontSize: "0.9rem",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.15)",
                        },
                      },
                      "& .MuiSelect-icon": { color: "#7fd0ff" },
                    }}
                  >
                    {INTEREST_OPTIONS.map((opt) => (
                      <MenuItem
                        key={opt}
                        value={opt}
                        sx={{ fontSize: "0.875rem" }}
                      >
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <SparklesIcon />
                    )
                  }
                  sx={{
                    mt: 1,
                    py: 1.2,
                    background:
                      "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                    borderRadius: 2.5,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(127, 208, 255, 0.25)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #a78bfa 0%, #381a6c 100%)",
                    },
                  }}
                >
                  {loading ? "Signing in..." : "Sign In as Customer"}
                </Button>
              </Box>
            </form>
          )}

          {/* Direct Admin Login Bridge */}
          <Box
            sx={{
              mt: 3,
              pt: 2.5,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AdminPanelSettingsOutlinedIcon
                sx={{ fontSize: 20, color: "rgba(255, 255, 255, 0.5)" }}
              />
              <Typography
                sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.825rem" }}
              >
                Are you an Administrator?
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={handleGoToAdmin}
              sx={{
                color: "#7fd0ff",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.825rem",
                "&:hover": { color: "#a78bfa", backgroundColor: "transparent" },
              }}
            >
              Admin Portal →
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
