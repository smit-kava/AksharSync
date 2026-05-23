import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LiquidGlassMenuButtonProps {
  /** Called when the button is clicked */
  onClick: () => void;
}

// ─── Theme Tokens (AksharSync palette) ────────────────────────────────────────
// Primary brand accent : #7fd0ff (sky blue)
// Secondary accent     : #a78bfa (soft purple)
// Base navy            : #06101e / #060e1a

// ─── Liquid Glass Constants ───────────────────────────────────────────────────

/**
 * Resting state: dark navy glass tinted with the brand blue.
 * Top-left corner catches a subtle blue specular sweep.
 */
const GLASS_BG =
  "linear-gradient(145deg, rgba(127,208,255,0.18) 0%, rgba(6,16,30,0.55) 50%, rgba(127,208,255,0.08) 100%)";

/** Hover: surface brightens — the blue refraction intensifies. */
const GLASS_BG_HOVER =
  "linear-gradient(145deg, rgba(127,208,255,0.28) 0%, rgba(6,16,30,0.45) 50%, rgba(167,139,250,0.15) 100%)";

/** Active (pressed): glass compresses — dims and desaturates. */
const GLASS_BG_ACTIVE =
  "linear-gradient(145deg, rgba(127,208,255,0.08) 0%, rgba(6,16,30,0.70) 100%)";

/** Resting shadows: blue ambient glow + inner top-edge highlight. */
const GLASS_SHADOW = [
  "0 4px 20px rgba(127,208,255,0.20)",   // brand blue ambient
  "0 2px 8px  rgba(0,0,0,0.45)",          // dark depth
  "inset 0 1px 1px rgba(127,208,255,0.35)", // inner top highlight
  "inset 0 -1px 1px rgba(0,0,0,0.25)",    // inner bottom shadow
].join(", ");

/** Hover shadows: glow intensifies, lifts higher. */
const GLASS_SHADOW_HOVER = [
  "0 6px 28px rgba(127,208,255,0.35)",
  "0 3px 12px rgba(0,0,0,0.50)",
  "inset 0 1px 1px rgba(127,208,255,0.50)",
  "inset 0 -1px 1px rgba(0,0,0,0.20)",
].join(", ");

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * LiquidGlassMenuButton
 *
 * Mobile-only hamburger trigger (hidden on md+) styled with Apple's
 * iOS 26 "Liquid Glass" aesthetic, fully tuned to the AksharSync
 * dark-navy / #7fd0ff brand palette:
 *
 *  - Deep navy + blue-tinted frosted glass body
 *  - Specular top-edge highlight in brand blue
 *  - Blue ambient glow shadow with inner depth layers
 *  - Spring-eased hover (scale up + brighter) & active (compress + dim)
 */
export function LiquidGlassMenuButton({ onClick }: LiquidGlassMenuButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      aria-label="Open navigation menu"
      sx={{
        // ── Visibility ───────────────────────────────────────────────────
        display: { xs: "flex", md: "none" },

        // ── Size & shape ─────────────────────────────────────────────────
        width: 44,
        height: 44,
        borderRadius: "14px",

        // ── Icon colour ──────────────────────────────────────────────────
        color: "#7fd0ff",

        // ── Liquid Glass body ────────────────────────────────────────────
        background: GLASS_BG,
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",

        // Border: bright brand-blue top specular, faded navy bottom
        border: "1px solid rgba(127,208,255,0.25)",
        borderTop: "1.5px solid rgba(127,208,255,0.50)",
        borderBottom: "1px solid rgba(6,16,30,0.60)",

        // Shadows: ambient glow + depth layers
        boxShadow: GLASS_SHADOW,

        // Spring easing — same as iOS spring curves
        transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",

        // ── States ───────────────────────────────────────────────────────
        "&:hover": {
          background: GLASS_BG_HOVER,
          boxShadow: GLASS_SHADOW_HOVER,
          borderColor: "rgba(127,208,255,0.45)",
          color: "#fff",
          transform: "scale(1.07)",
        },
        "&:active": {
          background: GLASS_BG_ACTIVE,
          boxShadow: "0 2px 10px rgba(127,208,255,0.15), 0 1px 4px rgba(0,0,0,0.5)",
          transform: "scale(0.93)",
        },
      }}
    >
      <MenuIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
}
