// ============================================================
// src/components/CustomerPortalFloatingButton.tsx
// Floating Liquid Glass Icon Button in bottom-left corner with
// interactive morphing rotation animation on open and close.
// ============================================================

import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { getStoredCustomer } from "../services/customerApi";
import type { Customer } from "../services/customerApi";

// ─── Liquid Glass Constants (AksharSync palette) ──────────────────────────────
const GLASS_BG =
  "linear-gradient(145deg, rgba(127, 208, 255, 0.22) 0%, rgba(6, 16, 30, 0.65) 50%, rgba(127, 208, 255, 0.08) 100%)";

const GLASS_BG_OPEN =
  "linear-gradient(145deg, rgba(239, 68, 68, 0.20) 0%, rgba(16, 10, 24, 0.70) 50%, rgba(167, 139, 250, 0.15) 100%)";

const GLASS_BG_HOVER =
  "linear-gradient(145deg, rgba(127, 208, 255, 0.35) 0%, rgba(6, 16, 30, 0.50) 50%, rgba(167, 139, 250, 0.20) 100%)";

const GLASS_BG_HOVER_OPEN =
  "linear-gradient(145deg, rgba(239, 68, 68, 0.30) 0%, rgba(20, 10, 28, 0.60) 50%, rgba(167, 139, 250, 0.25) 100%)";

const GLASS_SHADOW = [
  "0 8px 32px rgba(0, 0, 0, 0.55)",
  "0 4px 16px rgba(127, 208, 255, 0.25)",
  "inset 0 1.5px 2px rgba(127, 208, 255, 0.45)",
  "inset 0 -1.5px 2px rgba(0, 0, 0, 0.35)",
].join(", ");

const GLASS_SHADOW_OPEN = [
  "0 8px 32px rgba(239, 68, 68, 0.28)",
  "0 4px 16px rgba(0, 0, 0, 0.55)",
  "inset 0 1.5px 2px rgba(248, 113, 113, 0.45)",
  "inset 0 -1.5px 2px rgba(0, 0, 0, 0.35)",
].join(", ");

const GLASS_SHADOW_HOVER = [
  "0 12px 40px rgba(0, 0, 0, 0.65)",
  "0 6px 24px rgba(127, 208, 255, 0.45)",
  "inset 0 1.5px 2px rgba(127, 208, 255, 0.65)",
  "inset 0 -1.5px 2px rgba(0, 0, 0, 0.25)",
].join(", ");

export const CustomerPortalFloatingButton: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(() =>
    getStoredCustomer(),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const syncCustomer = () => {
      setCustomer(getStoredCustomer());
    };
    window.addEventListener("akshar_customer_change", syncCustomer);
    return () => {
      window.removeEventListener("akshar_customer_change", syncCustomer);
    };
  }, []);

  useEffect(() => {
    const handleState = (e: any) => {
      if (e.detail && typeof e.detail.open === "boolean") {
        setIsModalOpen(e.detail.open);
      }
    };
    window.addEventListener("akshar_customer_modal_state", handleState);
    return () => {
      window.removeEventListener("akshar_customer_modal_state", handleState);
    };
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("akshar_open_signin_modal"));
  };

  const tooltipText = isModalOpen
    ? "Close Customer Portal"
    : customer
      ? `Signed in as ${customer.name} — Click to open account`
      : "Open Customer Portal";

  return (
    <Tooltip title={tooltipText} arrow placement="right">
      <IconButton
        onClick={handleClick}
        aria-label={isModalOpen ? "Close Customer Portal" : "Open Customer Portal"}
        sx={{
          position: "fixed",
          bottom: { xs: 76, sm: 28 },
          left: { xs: 16, sm: 28 },
          zIndex: 1200,
          width: { xs: 46, sm: 50 },
          height: { xs: 46, sm: 50 },
          borderRadius: "50%",
          background: isModalOpen ? GLASS_BG_OPEN : GLASS_BG,
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          border: "1px solid",
          borderColor: isModalOpen
            ? "rgba(248, 113, 113, 0.45)"
            : "rgba(127, 208, 255, 0.28)",
          borderTop: isModalOpen
            ? "1.5px solid rgba(248, 113, 113, 0.75)"
            : "1.5px solid rgba(127, 208, 255, 0.60)",
          borderBottom: "1px solid rgba(6, 16, 30, 0.70)",
          boxShadow: isModalOpen ? GLASS_SHADOW_OPEN : GLASS_SHADOW,
          color: isModalOpen
            ? "#fca5a5"
            : customer
              ? "#34d399"
              : "#7fd0ff",
          transition:
            "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.25s ease",
          "&:hover": {
            background: isModalOpen ? GLASS_BG_HOVER_OPEN : GLASS_BG_HOVER,
            boxShadow: GLASS_SHADOW_HOVER,
            borderColor: isModalOpen
              ? "rgba(248, 113, 113, 0.75)"
              : "rgba(127, 208, 255, 0.55)",
            color: isModalOpen ? "#ffffff" : "#ffffff",
            transform: "scale(1.10) translateY(-2px)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {/* Specular Glint Reflection Sweep */}
        <Box
          sx={{
            position: "absolute",
            top: 2,
            left: "20%",
            right: "20%",
            height: "35%",
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Rotating Animated Icon Container */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isModalOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isModalOpen ? (
            <CloseIcon
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.45rem" },
                filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))",
              }}
            />
          ) : (
            <PersonIcon
              sx={{
                fontSize: { xs: "1.35rem", sm: "1.5rem" },
                filter: customer
                  ? "drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))"
                  : "drop-shadow(0 0 6px rgba(127, 208, 255, 0.5))",
              }}
            />
          )}
        </Box>

        {/* Status indicator dot (hidden while close is shown) */}
        {!isModalOpen && (
          <Box
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: customer ? "#34d399" : "#7fd0ff",
              boxShadow: customer
                ? "0 0 8px #34d399, 0 0 14px rgba(52, 211, 153, 0.6)"
                : "0 0 8px #7fd0ff, 0 0 14px rgba(127, 208, 255, 0.6)",
              border: "1.5px solid rgba(6, 14, 26, 0.9)",
              transition: "all 0.25s ease",
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
