/**
 * CustomCursor
 *
 * Replaces native OS cursors with brand-themed SVG cursors.
 * Uses raw SVG strings embedded directly as data URIs (no encodeURIComponent
 * double-encoding bug). Colors are written with %23 for # directly.
 *
 * Cursors:
 *  • Arrow   → Windows-style, #7fd0ff fill with dark outline
 *  • Pointer → Gradient hand (#7fd0ff → #a78bfa) for links/buttons
 *  • Text    → Blue I-beam for editable content
 */

// ─── Raw data URIs (# already written as %23) ─────────────────────────────────

/** Windows-style arrow — hotspot (2, 2) */
const ARROW = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M4 2 L4 19 L8 14 L12 21 L14.5 20 L10.5 13 L17 13 Z' fill='%237fd0ff' stroke='%23060e1a' stroke-width='1.5' stroke-linejoin='round' stroke-linecap='round'/></svg>`;

/** Gradient hand pointer — hotspot (8, 2) */
const POINTER = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='28' viewBox='0 0 22 28'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%237fd0ff'/><stop offset='100%25' stop-color='%23a78bfa'/></linearGradient></defs><rect x='7.5' y='1' width='3.5' height='13' rx='1.75' fill='url(%23g)' stroke='%23060e1a' stroke-width='1'/><rect x='11' y='5' width='3' height='11' rx='1.5' fill='url(%23g)' stroke='%23060e1a' stroke-width='1'/><rect x='4.5' y='7' width='3' height='9' rx='1.5' fill='url(%23g)' stroke='%23060e1a' stroke-width='1'/><rect x='14' y='8' width='2.8' height='8' rx='1.4' fill='url(%23g)' stroke='%23060e1a' stroke-width='1'/><path d='M4.5 14 Q3.5 20 5.5 23 L17 23 Q19 20 18 14 Z' fill='url(%23g)' stroke='%23060e1a' stroke-width='1'/></svg>`;

/** I-beam — hotspot (6, 11) */
const TEXT = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='13' height='22' viewBox='0 0 13 22'><line x1='6.5' y1='0' x2='6.5' y2='22' stroke='%237fd0ff' stroke-width='1.5' stroke-linecap='round'/><line x1='2' y1='0' x2='11' y2='0' stroke='%237fd0ff' stroke-width='1.5' stroke-linecap='round'/><line x1='2' y1='22' x2='11' y2='22' stroke='%237fd0ff' stroke-width='1.5' stroke-linecap='round'/></svg>`;

// ─── Component ────────────────────────────────────────────────────────────────
const CustomCursor = () => (
  <style>{`
    /* ── Default arrow ─────────────────────────────────────────────────── */
    *, *::before, *::after {
      cursor: url("${ARROW}") 2 2, auto !important;
    }

    /* ── Pointer hand ──────────────────────────────────────────────────── */
    a, button,
    [role="button"],
    [tabindex]:not([tabindex="-1"]),
    label[for],
    select,
    summary {
      cursor: url("${POINTER}") 8 2, pointer !important;
    }

    /* ── Text I-beam ───────────────────────────────────────────────────── */
    input, textarea, [contenteditable] {
      cursor: url("${TEXT}") 6 11, text !important;
    }

    /* ── Restore native on touch / mobile ──────────────────────────────── */
    @media (max-width: 768px) {
      *, *::before, *::after,
      a, button, [role="button"], input, textarea {
        cursor: auto !important;
      }
    }
  `}</style>
);

export default CustomCursor;
