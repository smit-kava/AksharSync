// ============================================================
// src/components/CustomerSignInModal.tsx
// Intelligent customer sign-in popup with GSAP entrance,
// session-based one-time welcome display, and header integration
// ============================================================

import React, { useState, useEffect, useRef, forwardRef } from "react";
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
  Grow,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

import {
  customerSignIn,
  getStoredCustomer,
  clearStoredCustomer,
} from "../services/customerApi";
import type { Customer, CustomerFormData } from "../services/customerApi";

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

// In-memory flag ensuring the auto-popup only shows once per page load/refresh
// and NEVER re-triggers when navigating/redirecting between pages within the site
let hasShownInSession = false;

// ── Smooth Open / Close Transition ───────────────────────────
const ModalTransition = forwardRef(function ModalTransition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Grow
      ref={ref}
      {...props}
      timeout={{ enter: 380, exit: 260 }}
      style={{ transformOrigin: "center center" }}
    />
  );
});

export const CustomerSignInModal: React.FC<CustomerSignInModalProps> = ({
  open,
  onClose,
}) => {
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

  // ── Auto-Open on Initial Page Load / Refresh (never on page redirects/navigation) ──
  useEffect(() => {
    // 1. If customer is already registered or signed in, do NOT show the popup
    if (getStoredCustomer() || activeCustomer) return;

    // 2. If already shown or dismissed in this browsing session, do NOT re-trigger on page navigation
    if (hasShownInSession) return;
    hasShownInSession = true;

    // Delay 2.1s so PageLoader (1.9s) cleanly exits and website is unveiled
    const timer = window.setTimeout(() => {
      if (getStoredCustomer() || activeCustomer) return;
      setModalOpen(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, [activeCustomer]);

  // Support opening via URL hash (#connect, #signin)
  useEffect(() => {
    const handleHash = () => {
      if (
        window.location.hash === "#connect" ||
        window.location.hash === "#signin"
      ) {
        setModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
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

  // Dispatch modal state changes so floating button knows when it's open/closed
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("akshar_customer_modal_state", {
        detail: { open: modalOpen },
      }),
    );
  }, [modalOpen]);

  // ── Smooth Close Action ─────────────────────────────────────
  const handleClose = () => {
    hasShownInSession = true;
    setModalOpen(false);
    onClose();
  };

  // Toggle modal open/close on floating button click
  useEffect(() => {
    const handleTrigger = () => {
      if (modalOpen) {
        handleClose();
      } else {
        setModalOpen(true);
      }
    };
    window.addEventListener("akshar_open_signin_modal", handleTrigger);
    return () => {
      window.removeEventListener("akshar_open_signin_modal", handleTrigger);
    };
  }, [modalOpen]);

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
    hasShownInSession = false;
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSuccessMessage("You have been signed out.");
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      slots={{ transition: ModalTransition }}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: 10000 }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(2, 6, 16, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            transition: "all 0.32s cubic-bezier(0.16, 1, 0.3, 1) !important",
          },
        },
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
                  slotProps={{
                    select: {
                      MenuProps: {
                        sx: { zIndex: 12000 },
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        slotProps: {
                          paper: {
                            sx: {
                              mt: 0.8,
                              bgcolor: "#071224",
                              border: "1px solid rgba(127, 208, 255, 0.3)",
                              borderRadius: 2.5,
                              color: "#fff",
                              boxShadow:
                                "0 18px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(127, 208, 255, 0.15)",
                              maxHeight: 240,
                              "& .MuiMenuItem-root": {
                                fontSize: "0.875rem",
                                py: 1.1,
                                px: 2,
                                color: "rgba(255, 255, 255, 0.85)",
                                whiteSpace: "normal",
                                transition: "all 0.15s ease",
                                "&:hover": {
                                  bgcolor: "rgba(127, 208, 255, 0.12)",
                                  color: "#7fd0ff",
                                },
                                "&.Mui-selected": {
                                  bgcolor:
                                    "rgba(127, 208, 255, 0.22) !important",
                                  color: "#7fd0ff",
                                  fontWeight: 600,
                                  "&:hover": {
                                    bgcolor:
                                      "rgba(127, 208, 255, 0.3) !important",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  }}
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
      </DialogContent>
    </Dialog>
  );
};
