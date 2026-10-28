import { Button, IconButton, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { ROUTE_PATHS } from "../routes/paths";

// ─── Liquid Glass Constants (AksharSync palette) ──────────────────────────────
// Brand accent : #7fd0ff (sky blue)  |  Base navy : #06101e

/** Resting: dark navy glass with a brand-blue top specular sweep. */
const GLASS_BG =
  "linear-gradient(145deg, rgba(127,208,255,0.16) 0%, rgba(6,16,30,0.50) 55%, rgba(127,208,255,0.06) 100%)";

/** Hover: brighter blue tint, purple shimmer bleeds in. */
const GLASS_BG_HOVER =
  "linear-gradient(145deg, rgba(127,208,255,0.26) 0%, rgba(6,16,30,0.40) 55%, rgba(167,139,250,0.12) 100%)";

/** Active (pressed): glass compresses and dims. */
const GLASS_BG_ACTIVE =
  "linear-gradient(145deg, rgba(127,208,255,0.07) 0%, rgba(6,16,30,0.65) 100%)";

/** Resting shadows: blue ambient glow + inner highlights. */
const GLASS_SHADOW = [
  "0 4px 20px rgba(127,208,255,0.18)",
  "0 2px 8px  rgba(0,0,0,0.40)",
  "inset 0 1px 1px rgba(127,208,255,0.30)",
  "inset 0 -1px 1px rgba(0,0,0,0.22)",
].join(", ");

/** Hover shadows: glow intensifies. */
const GLASS_SHADOW_HOVER = [
  "0 6px 28px rgba(127,208,255,0.32)",
  "0 3px 12px rgba(0,0,0,0.45)",
  "inset 0 1px 1px rgba(127,208,255,0.45)",
  "inset 0 -1px 1px rgba(0,0,0,0.18)",
].join(", ");

export interface LiquidGlassContactButtonProps {
  iconOnly?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * LiquidGlassContactButton
 *
 * Shows full "Contact us ↗" pill when at top, or sleek circular contact icon
 * when iconOnly is true (after scrolling).
 */
export function LiquidGlassContactButton({ iconOnly = false }: LiquidGlassContactButtonProps) {
  if (iconOnly) {
    return (
      <Tooltip title="Contact Us" arrow>
        <IconButton
          component={RouterLink}
          to={ROUTE_PATHS.CONTACT}
          aria-label="Contact Us"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "50%",
            background: GLASS_BG,
            backdropFilter: "blur(20px) saturate(200%)",
            WebkitBackdropFilter: "blur(20px) saturate(200%)",
            border: "1px solid rgba(127,208,255,0.22)",
            borderTop: "1.5px solid rgba(127,208,255,0.45)",
            borderBottom: "1px solid rgba(6,16,30,0.55)",
            boxShadow: GLASS_SHADOW,
            color: "#7fd0ff",
            transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
            "&:hover": {
              background: GLASS_BG_HOVER,
              boxShadow: GLASS_SHADOW_HOVER,
              borderColor: "rgba(127,208,255,0.45)",
              color: "#fff",
              transform: "scale(1.08)",
            },
            "&:active": {
              background: GLASS_BG_ACTIVE,
              transform: "scale(0.95)",
            },
          }}
        >
          <HeadsetMicIcon sx={{ fontSize: "1.15rem" }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      component={RouterLink}
      to={ROUTE_PATHS.CONTACT}
      endIcon={
        <ArrowOutwardIcon
          sx={{
            fontSize: "0.95rem !important",
            transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      }
      sx={{
        display: { xs: "none", sm: "inline-flex" },
        borderRadius: "999px",
        px: 2.5,
        height: 40,
        gap: 0.25,
        whiteSpace: "nowrap",
        flexShrink: 0,
        fontSize: "0.85rem",
        fontWeight: 700,
        textTransform: "none",
        letterSpacing: "0.01em",
        color: "#7fd0ff",
        background: GLASS_BG,
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        border: "1px solid rgba(127,208,255,0.22)",
        borderTop: "1.5px solid rgba(127,208,255,0.45)",
        borderBottom: "1px solid rgba(6,16,30,0.55)",
        boxShadow: GLASS_SHADOW,
        transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "&:hover": {
          background: GLASS_BG_HOVER,
          boxShadow: GLASS_SHADOW_HOVER,
          borderColor: "rgba(127,208,255,0.42)",
          color: "#fff",
          transform: "scale(1.04)",
          "& .MuiButton-endIcon svg": {
            transform: "rotate(45deg) scale(1.1)",
          },
        },
        "&:active": {
          background: GLASS_BG_ACTIVE,
          boxShadow: "0 2px 10px rgba(127,208,255,0.12), 0 1px 4px rgba(0,0,0,0.5)",
          transform: "scale(0.97)",
        },
      }}
    >
      Contact us
    </Button>
  );
}
