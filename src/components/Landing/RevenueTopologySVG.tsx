import { marketingTheme } from "../../theme";

const T = {
  bg: marketingTheme.palette.background.default,
  paper: marketingTheme.palette.background.paper,
  primary: marketingTheme.palette.primary.main,
  primaryDark: marketingTheme.palette.primary.dark,
  secondary: marketingTheme.palette.secondary.main,
  purple: marketingTheme.palette.primary.light,
  green: "#4ade80",
  amber: "#fbbf24",
  white: marketingTheme.palette.text.primary,
  muted: marketingTheme.palette.text.secondary,
} as const;

export default function RevenueTopologySVG() {
  return (
    <svg
      viewBox="0 0 460 420"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 460, display: "block", filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.45))" }}
      aria-label="AksharSync revenue topology diagram showing lifecycle channels converging on a central revenue core"
    >
      <defs>
        {/* Glow filters */}
        <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-purple" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Radial gradient — core */}
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.primary} stopOpacity="0.35" />
          <stop offset="50%" stopColor={T.secondary} stopOpacity="0.2" />
          <stop offset="100%" stopColor={T.bg} stopOpacity="0" />
        </radialGradient>

        {/* Arc gradients */}
        <linearGradient id="arcBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={T.primary} stopOpacity="0" />
          <stop offset="60%" stopColor={T.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={T.primary} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="arcPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={T.purple} stopOpacity="0" />
          <stop offset="60%" stopColor={T.purple} stopOpacity="0.9" />
          <stop offset="100%" stopColor={T.purple} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="arcGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={T.green} stopOpacity="0" />
          <stop offset="60%" stopColor={T.green} stopOpacity="0.9" />
          <stop offset="100%" stopColor={T.green} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="arcAmber" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={T.amber} stopOpacity="0" />
          <stop offset="60%" stopColor={T.amber} stopOpacity="0.9" />
          <stop offset="100%" stopColor={T.amber} stopOpacity="0.2" />
        </linearGradient>

        {/* Dashed ring marker */}
        <pattern id="hexDot" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.7" fill="rgba(127,208,255,0.18)" />
        </pattern>

        {/* Clip for clean edges */}
        <clipPath id="circleClip">
          <circle cx="230" cy="210" r="195" />
        </clipPath>

        {/* Animated dash offset for arcs */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
          .arc-anim-1 { stroke-dasharray: 8 120; animation: dashMove1 3s linear infinite; }
          .arc-anim-2 { stroke-dasharray: 8 100; animation: dashMove2 3.5s linear infinite 0.5s; }
          .arc-anim-3 { stroke-dasharray: 8 110; animation: dashMove3 2.8s linear infinite 1s; }
          .arc-anim-4 { stroke-dasharray: 8 130; animation: dashMove4 3.2s linear infinite 0.3s; }
          .arc-anim-5 { stroke-dasharray: 6 90;  animation: dashMove5 2.5s linear infinite 1.4s; }
          .arc-anim-6 { stroke-dasharray: 6 100; animation: dashMove6 3.8s linear infinite 0.7s; }
          @keyframes dashMove1 { to { stroke-dashoffset: -130; } }
          @keyframes dashMove2 { to { stroke-dashoffset: -110; } }
          @keyframes dashMove3 { to { stroke-dashoffset: -120; } }
          @keyframes dashMove4 { to { stroke-dashoffset: -140; } }
          @keyframes dashMove5 { to { stroke-dashoffset: -98; } }
          @keyframes dashMove6 { to { stroke-dashoffset: -108; } }
          .pulse-ring { animation: pulseRing 2.4s ease-in-out infinite; transform-origin: 230px 210px; }
          .pulse-ring-2 { animation: pulseRing 2.4s ease-in-out infinite 0.8s; transform-origin: 230px 210px; }
          .pulse-ring-3 { animation: pulseRing 2.4s ease-in-out infinite 1.6s; transform-origin: 230px 210px; }
          @keyframes pulseRing {
            0%   { r: 32; opacity: 0.6; }
            100% { r: 62; opacity: 0; }
          }
          .node-float-1 { animation: nf1 4s ease-in-out infinite; }
          .node-float-2 { animation: nf2 5s ease-in-out infinite 0.6s; }
          .node-float-3 { animation: nf3 4.5s ease-in-out infinite 1.2s; }
          .node-float-4 { animation: nf4 5.5s ease-in-out infinite 1.8s; }
          .node-float-5 { animation: nf5 4.2s ease-in-out infinite 0.4s; }
          @keyframes nf1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(2px,-6px)} }
          @keyframes nf2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-3px,-5px)} }
          @keyframes nf3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3px,5px)} }
          @keyframes nf4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-2px,6px)} }
          @keyframes nf5 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,-4px)} }
          .core-glow { animation: coreGlowAnim 3s ease-in-out infinite; transform-origin: 230px 210px; }
          @keyframes coreGlowAnim { 0%,100%{opacity:0.5} 50%{opacity:1} }
          .spin-slow { animation: spinSlow 30s linear infinite; transform-origin: 230px 210px; }
          .spin-rev  { animation: spinRev  22s linear infinite; transform-origin: 230px 210px; }
          @keyframes spinSlow { to { transform: rotate(360deg); } }
          @keyframes spinRev  { to { transform: rotate(-360deg); } }
          .label-svg { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}</style>
      </defs>

      {/* Dot field background */}
      <rect width="460" height="420" fill="url(#hexDot)" clipPath="url(#circleClip)" />

      {/* Outer structural rings */}
      <circle cx="230" cy="210" r="190" fill="none" stroke="rgba(127,208,255,0.05)" strokeWidth="1" />
      <circle cx="230" cy="210" r="150" fill="none" stroke="rgba(127,208,255,0.06)" strokeWidth="0.8" className="spin-slow" strokeDasharray="4 8" />
      <circle cx="230" cy="210" r="108" fill="none" stroke="rgba(167,139,250,0.07)" strokeWidth="0.8" className="spin-rev" strokeDasharray="3 10" />

      {/* Core glow blob */}
      <circle cx="230" cy="210" r="80" fill="url(#coreGrad)" className="core-glow" />

      {/* Pulse rings from core */}
      <circle cx="230" cy="210" r="32" fill="none" stroke={T.primary} strokeWidth="1.5" strokeOpacity="0.6" className="pulse-ring" />
      <circle cx="230" cy="210" r="32" fill="none" stroke={T.primary} strokeWidth="1" strokeOpacity="0.4" className="pulse-ring-2" />
      <circle cx="230" cy="210" r="32" fill="none" stroke={T.purple} strokeWidth="0.8" strokeOpacity="0.3" className="pulse-ring-3" />

      {/* ── DATA ARC PATHS (channel → core) ── */}
      {/* Email arc */}
      <path d="M 62 108 Q 100 60 230 210" fill="none" stroke="rgba(127,208,255,0.12)" strokeWidth="1.5" />
      <path d="M 62 108 Q 100 60 230 210" fill="none" stroke="url(#arcBlue)" strokeWidth="2" className="arc-anim-1" strokeLinecap="round" />

      {/* SMS arc */}
      <path d="M 398 108 Q 360 60 230 210" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="1.5" />
      <path d="M 398 108 Q 360 60 230 210" fill="none" stroke="url(#arcPurple)" strokeWidth="2" className="arc-anim-2" strokeLinecap="round" />

      {/* WhatsApp arc */}
      <path d="M 28 255 Q 60 220 230 210" fill="none" stroke="rgba(74,222,128,0.12)" strokeWidth="1.5" />
      <path d="M 28 255 Q 60 220 230 210" fill="none" stroke="url(#arcGreen)" strokeWidth="2" className="arc-anim-3" strokeLinecap="round" />

      {/* Push arc */}
      <path d="M 432 255 Q 400 220 230 210" fill="none" stroke="rgba(251,191,36,0.12)" strokeWidth="1.5" />
      <path d="M 432 255 Q 400 220 230 210" fill="none" stroke="url(#arcAmber)" strokeWidth="2" className="arc-anim-4" strokeLinecap="round" />

      {/* Klaviyo arc */}
      <path d="M 120 370 Q 150 340 230 210" fill="none" stroke="rgba(127,208,255,0.10)" strokeWidth="1.5" />
      <path d="M 120 370 Q 150 340 230 210" fill="none" stroke="url(#arcBlue)" strokeWidth="1.5" className="arc-anim-5" strokeLinecap="round" />

      {/* RCS arc */}
      <path d="M 340 370 Q 310 340 230 210" fill="none" stroke="rgba(167,139,250,0.10)" strokeWidth="1.5" />
      <path d="M 340 370 Q 310 340 230 210" fill="none" stroke="url(#arcPurple)" strokeWidth="1.5" className="arc-anim-6" strokeLinecap="round" />

      {/* ── CHANNEL NODES ── */}
      {/* Email — top left */}
      <g className="node-float-1" style={{ transformBox: "fill-box" }}>
        <circle cx="62" cy="108" r="28" fill="rgba(13,59,102,0.7)" stroke="rgba(127,208,255,0.35)" strokeWidth="1.2" />
        <circle cx="62" cy="108" r="16" fill="rgba(127,208,255,0.12)" />
        {/* Email icon */}
        <rect x="50" y="102" width="24" height="16" rx="3" fill="none" stroke={T.primary} strokeWidth="1.4" />
        <path d="M50 105 l12 8 12-8" fill="none" stroke={T.primary} strokeWidth="1.2" strokeLinecap="round" />
        <text x="62" y="144" textAnchor="middle" fill={T.primary} fontSize="10" fontWeight="600" className="label-svg">Email</text>
        <text x="62" y="155" textAnchor="middle" fill="rgba(127,208,255,0.5)" fontSize="8.5" className="label-svg">82% dlv</text>
      </g>

      {/* SMS — top right */}
      <g className="node-float-2" style={{ transformBox: "fill-box" }}>
        <circle cx="398" cy="108" r="28" fill="rgba(71,33,135,0.6)" stroke="rgba(167,139,250,0.35)" strokeWidth="1.2" />
        <circle cx="398" cy="108" r="16" fill="rgba(167,139,250,0.12)" />
        {/* SMS icon */}
        <rect x="386" y="100" width="24" height="18" rx="4" fill="none" stroke={T.purple} strokeWidth="1.4" />
        <circle cx="391" cy="109" r="1.5" fill={T.purple} />
        <circle cx="398" cy="109" r="1.5" fill={T.purple} />
        <circle cx="405" cy="109" r="1.5" fill={T.purple} />
        <text x="398" y="144" textAnchor="middle" fill={T.purple} fontSize="10" fontWeight="600" className="label-svg">SMS</text>
        <text x="398" y="155" textAnchor="middle" fill="rgba(167,139,250,0.5)" fontSize="8.5" className="label-svg">67% dlv</text>
      </g>

      {/* WhatsApp — mid left */}
      <g className="node-float-3" style={{ transformBox: "fill-box" }}>
        <circle cx="28" cy="255" r="26" fill="rgba(10,50,30,0.7)" stroke="rgba(74,222,128,0.35)" strokeWidth="1.2" />
        <circle cx="28" cy="255" r="15" fill="rgba(74,222,128,0.1)" />
        {/* WA icon */}
        <circle cx="28" cy="255" r="9" fill="none" stroke={T.green} strokeWidth="1.4" />
        <path d="M22 261 C22 261 21 265 23 265 C25 265 34 261 36 255 C38 249 35 244 31 244 C27 244 22 248 22 253 C22 257 25 260 25 260" fill="none" stroke={T.green} strokeWidth="1.2" strokeLinecap="round" />
        <text x="28" y="289" textAnchor="middle" fill={T.green} fontSize="9.5" fontWeight="600" className="label-svg">WhatsApp</text>
        <text x="28" y="300" textAnchor="middle" fill="rgba(74,222,128,0.5)" fontSize="8" className="label-svg">91% dlv</text>
      </g>

      {/* Push — mid right */}
      <g className="node-float-4" style={{ transformBox: "fill-box" }}>
        <circle cx="432" cy="255" r="26" fill="rgba(100,80,10,0.5)" stroke="rgba(251,191,36,0.35)" strokeWidth="1.2" />
        <circle cx="432" cy="255" r="15" fill="rgba(251,191,36,0.1)" />
        {/* Bell icon */}
        <path d="M432 246 C428 246 425 249 425 253 L425 259 L422 262 L442 262 L439 259 L439 253 C439 249 436 246 432 246 Z" fill="none" stroke={T.amber} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M429 262 C429 264 430.5 265.5 432 265.5 C433.5 265.5 435 264 435 262" fill="none" stroke={T.amber} strokeWidth="1.2" />
        <text x="432" y="289" textAnchor="middle" fill={T.amber} fontSize="9.5" fontWeight="600" className="label-svg">Push</text>
        <text x="432" y="300" textAnchor="middle" fill="rgba(251,191,36,0.5)" fontSize="8" className="label-svg">+8% ret.</text>
      </g>

      {/* Klaviyo — bottom left */}
      <g className="node-float-5" style={{ transformBox: "fill-box" }}>
        <circle cx="120" cy="370" r="24" fill="rgba(13,59,102,0.6)" stroke="rgba(127,208,255,0.28)" strokeWidth="1.1" />
        {/* K glyph */}
        <text x="120" y="376" textAnchor="middle" fill={T.primary} fontSize="16" fontWeight="800" className="label-svg">K</text>
        <text x="120" y="402" textAnchor="middle" fill={T.primary} fontSize="9" fontWeight="600" className="label-svg">Klaviyo</text>
      </g>

      {/* RCS — bottom right */}
      <g className="node-float-1" style={{ transformBox: "fill-box" }}>
        <circle cx="340" cy="370" r="24" fill="rgba(71,33,135,0.5)" stroke="rgba(167,139,250,0.28)" strokeWidth="1.1" />
        {/* Signal arc icon */}
        <path d="M334 368 Q337 362 340 368 Q343 374 346 368" fill="none" stroke={T.purple} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M330 370 Q335 358 340 370 Q345 382 350 370" fill="none" stroke={T.purple} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
        <text x="340" y="402" textAnchor="middle" fill={T.purple} fontSize="9" fontWeight="600" className="label-svg">RCS</text>
      </g>

      {/* ── CORE NODE ── */}
      <circle cx="230" cy="210" r="38" fill="rgba(8,17,33,0.9)" stroke="rgba(127,208,255,0.2)" strokeWidth="1.5" />
      <circle cx="230" cy="210" r="30" fill="rgba(13,59,102,0.3)" stroke="rgba(127,208,255,0.4)" strokeWidth="1" filter="url(#glow-blue)" />
      {/* Hexagon core shape */}
      <polygon
        points="230,185 250,197 250,222 230,234 210,222 210,197"
        fill="rgba(127,208,255,0.06)"
        stroke="rgba(127,208,255,0.35)"
        strokeWidth="1.2"
        filter="url(#glow-blue)"
      />
      {/* Dollar sign */}
      <text x="230" y="208" textAnchor="middle" fill={T.primary} fontSize="18" fontWeight="800" className="label-svg" filter="url(#glow-blue)">$</text>
      <text x="230" y="221" textAnchor="middle" fill="rgba(127,208,255,0.7)" fontSize="7.5" fontWeight="600" className="label-svg" letterSpacing="1">REVENUE</text>

      {/* ── FLOATING METRIC BADGES ── */}
      {/* Top center: $2.4M */}
      <g>
        <rect x="188" y="38" width="84" height="28" rx="8" fill="rgba(13,59,102,0.75)" stroke="rgba(127,208,255,0.25)" strokeWidth="1" />
        <text x="230" y="52" textAnchor="middle" fill={T.primary} fontSize="9" fontWeight="600" className="label-svg">Revenue Attributed</text>
        <text x="230" y="63" textAnchor="middle" fill={T.white} fontSize="10" fontWeight="700" className="label-svg">$2.4M</text>
      </g>

      {/* Right center: Open rate */}
      <g>
        <rect x="342" y="195" width="80" height="28" rx="8" fill="rgba(71,33,135,0.65)" stroke="rgba(167,139,250,0.25)" strokeWidth="1" />
        <text x="382" y="209" textAnchor="middle" fill={T.purple} fontSize="9" fontWeight="600" className="label-svg">Avg Open Rate</text>
        <text x="382" y="220" textAnchor="middle" fill={T.white} fontSize="10" fontWeight="700" className="label-svg">61.2%</text>
      </g>

      {/* Left: A/B tests */}
      <g>
        <rect x="32" y="168" width="70" height="26" rx="7" fill="rgba(8,17,33,0.8)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
        <text x="67" y="181" textAnchor="middle" fill={T.purple} fontSize="9" fontWeight="600" className="label-svg">A/B Tests</text>
        <text x="67" y="191" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" className="label-svg">4 Active</text>
      </g>

      {/* Subtle glow rings on active arcs */}
      <circle cx="230" cy="210" r="55" fill="none" stroke="rgba(127,208,255,0.04)" strokeWidth="8" />
    </svg>
  );
}
