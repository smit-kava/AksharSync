// ============================================================
// src/components/CustomerSignInModal.tsx
// Intelligent customer sign-in popup with GSAP entrance,
// session-based one-time welcome display, and header integration
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
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
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

const SESSION_POPUP_KEY = "akshar_welcome_popup_shown";

export const CustomerSignInModal: React.FC<CustomerSignInModalProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(() =>
    getStoredCustomer(),
  );

  const [modalOpen, setModalOpen] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [interests, setInterests] = useState(INTEREST_OPTIONS[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // GSAP animation ref
  const dialogPaperRef = useRef<HTMLDivElement | null>(null);

  // ── Auto-Open for New Visitors ONLY ONCE per session ──────────
  useEffect(() => {
    // If active customer is already verified, do not auto-popup
    if (activeCustomer) return;

    // Check if already shown in this browser session (prevents showing on page changes)
    const alreadyShown = sessionStorage.getItem(SESSION_POPUP_KEY);
    if (alreadyShown) return;

    // Mark as shown immediately so page transitions will never trigger it again
    sessionStorage.setItem(SESSION_POPUP_KEY, "true");

    // Delay 2.1s so PageLoader (1.9s) cleanly exits and website is unveiled
    const timer = window.setTimeout(() => {
      setModalOpen(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  // When external "open" prop becomes true (e.g. user clicks "Sign In" in Header)
  useEffect(() => {
    if (open) {
      setModalOpen(true);
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

  // ── GSAP Entrance Animation on Modal Open ────────────────────
  useEffect(() => {
    if (modalOpen) {
      const timer = window.setTimeout(() => {
        const el =
          document.getElementById("customer-signin-paper") ||
          dialogPaperRef.current;
        if (el) {
          gsap.fromTo(
            el,
            { scale: 0.75, opacity: 0, y: 35 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "back.out(1.4)",
            },
          );
        }
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  // ── Smooth Close Action ─────────────────────────────────────
  const handleClose = () => {
    const paper =
      document.getElementById("customer-signin-paper") ||
      dialogPaperRef.current;
    if (paper) {
      gsap.to(paper, {
        scale: 0.88,
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(paper, { clearProps: "all" });
          setModalOpen(false);
          onClose();
        },
      });
    } else {
      setModalOpen(false);
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        handleClose();
      }, 1500);
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
    handleClose();
    navigate(ROUTE_PATHS.ADMIN_LOGIN);
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: 10000 }}
      slotProps={{
        paper: {
          id: "customer-signin-paper",
          ref: dialogPaperRef,
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

      <DialogContent sx={{ p: { xs: 3, sm: 4.5 }, position: "relative" }}>
        {/* Close Button */}
        <Tooltip title="Close">
          <IconButton
            onClick={handleClose}
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
            {activeCustomer ? "Account Options" : "Connect with AksharSync"}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.65)",
              mt: 0.5,
              fontSize: "0.875rem",
            }}
          >
            {activeCustomer
              ? `Currently signed in as ${activeCustomer.name}`
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

        {/* If Active Customer is Signed In: Direct Clean Sign Out */}
        {activeCustomer && !successMessage ? (
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "rgba(6, 14, 26, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography sx={{ color: "#7fd0ff", fontSize: "0.9rem", mb: 2.5 }}>
              {activeCustomer.email}
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSignOut}
                sx={{
                  color: "#fca5a5",
                  borderColor: "rgba(239, 68, 68, 0.35)",
                  borderRadius: 2,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { borderColor: "#f87171", bgcolor: "rgba(239, 68, 68, 0.12)" },
                }}
              >
                Sign Out
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleClose}
                sx={{
                  background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                  borderRadius: 2,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Close
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
                  placeholder="e.g. First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setCompany(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
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
                  onChange={(e) => setInterests(e.target.value)}
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
  );
};
