import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import { marketingTheme } from "../../theme";
import RevenueTopologySVG from "./RevenueTopologySVG";

// ─── Theme tokens ────────────────────────────────────────────────
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
  border: "rgba(255,255,255,0.07)",
  font: marketingTheme.typography.fontFamily || '"Plus Jakarta Sans", sans-serif',
} as const;

// ─── Data ────────────────────────────────────────────────────────
const AUDIENCE = ["Shopify Brands", "DTC Ecommerce", "Agencies", "Klaviyo Users", "Growth Teams"] as const;

const CASE_STUDIES = [
  {
    brand: "Floral DTC",
    tag: "Email · Klaviyo",
    result: "+38% repeat revenue",
    metric: "38%",
    color: T.primary,
    icon: "email",
  },
  {
    brand: "Fashion Retail",
    tag: "SMS · Attentive",
    result: "2.1x flow conversion",
    metric: "2.1×",
    color: T.purple,
    icon: "sms",
  },
  {
    brand: "Supplements Brand",
    tag: "WhatsApp · CRM",
    result: "91% deliverability",
    metric: "91%",
    color: T.green,
    icon: "whatsapp",
  },
];

const FEED = [
  { dot: T.primary, text: "22% Email revenue leak identified", time: "just now" },
  { dot: T.purple, text: "SMS Flow: +14% CTR recovered", time: "2s ago" },
  { dot: T.green, text: "WhatsApp CRM: 12k contacts synced", time: "5s ago" },
  { dot: T.amber, text: "Klaviyo Audit: 4 missing flows found", time: "9s ago" },
  { dot: T.primary, text: "Push Strategy: +8% retention gain", time: "14s ago" },
  { dot: T.purple, text: "RCS Pilot: 3.4× higher ROI", time: "18s ago" },
];

// ─── Animated counter ────────────────────────────────────────────
interface CounterProps { target: number; prefix?: string; suffix?: string; decimals?: number }
function AnimatedCounter({ target, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(ease * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ─── Live feed ticker ────────────────────────────────────────────
function LiveFeedTicker() {
  const [items, setItems] = useState([...FEED]);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setTick(n => n + 1);
      setItems(prev => { const n = [...prev]; n.unshift(n.pop()!); return n; });
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {items.slice(0, 4).map((item, i) => (
        <div
          key={`${item.text}-${tick}-${i}`}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 10px", borderRadius: 9,
            background: i === 0 ? "rgba(127,208,255,0.05)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${i === 0 ? "rgba(127,208,255,0.14)" : "rgba(255,255,255,0.04)"}`,
            animation: i === 0 ? "feedSlide 0.35s ease" : "none",
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.dot, flexShrink: 0, boxShadow: `0 0 4px ${item.dot}` }} />
          <span style={{ fontSize: 11.5, color: i === 0 ? T.white : T.muted, flex: 1 }}>{item.text}</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Case Study Card ─────────────────────────────────────────────
interface CaseStudyCardProps {
  brand: string; tag: string; result: string; metric: string; color: string; delay: number;
}
function CaseStudyCard({ brand, tag, result, metric, color, delay }: CaseStudyCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, minWidth: 0,
        background: hover ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hover ? color + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16, padding: "18px 16px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hover ? "translateY(-3px)" : "none",
        animation: `fadeUp 0.7s ${delay}ms ease both`,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 800, color, marginBottom: 4, fontFamily: T.font }}>{metric}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.white, marginBottom: 4 }}>{brand}</div>
      <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 8 }}>{result}</div>
      <div style={{ display: "inline-block", padding: "3px 9px", borderRadius: 99, fontSize: 10.5, fontWeight: 600, background: `${color}15`, color, border: `1px solid ${color}30` }}>{tag}</div>
    </div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────
export default function HeroSection() {
  const [audienceIdx, setAudienceIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setAudienceIdx(i => (i + 1) % AUDIENCE.length), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        fontFamily: T.font,
        background: T.bg,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: T.white,
        display: "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes feedSlide { from{opacity:0;transform:translateY(-7px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes audienceIn{ 0%{opacity:0;transform:translateY(9px)} 10%,88%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-9px)} }
        @keyframes pulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.85)} }
        @keyframes gridPan   { from{background-position:0 0} to{background-position:40px 40px} }
        
        .hero-pill-audience { animation: audienceIn 1.9s ease-in-out; }
        
        .shimmer-text {
          background: linear-gradient(120deg, #7fd0ff 0%, #a78bfa 40%, #7fd0ff 80%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #7fd0ff, #a78bfa);
          color: #060e1a;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 14px rgba(127, 208, 255, 0.2);
        }
        
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(127, 208, 255, 0.35);
        }
        
        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          border-radius: 12px;
          cursor: pointer;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .cta-ghost:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.12fr 0.88fr;
            gap: 60px;
          }
        }
        
        .case-studies-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        @media (min-width: 768px) {
          .case-studies-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }
      `}</style>

      {/* Animated grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(127,208,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(127,208,255,0.025) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridPan 8s linear infinite",
      }} />

      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", left: "-8%", width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(71,33,135,0.16) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "10%", right: "-12%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,59,102,0.22) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "35%", width: 480, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, transparent 65%)" }} />
      </div>

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%", margin: "0 auto", padding: "80px 24px 80px" }}>

        {/* ── Two-column grid ── */}
        <div className="hero-grid">

          {/* LEFT — copy block & stats & live feed */}
          <div>
            {/* Top badge */}
            <div style={{ display: "flex", animation: "fadeUp 0.5s ease both", marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(127,208,255,0.05)", border: "1px solid rgba(127,208,255,0.12)" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, boxShadow: `0 0 5px ${T.green}`, animation: "pulseDot 2s ease infinite" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: T.primary, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trusted by 350+ Global Brands</span>
              </div>
            </div>

            {/* Headline */}
            <div style={{ animation: "fadeUp 0.65s 0.08s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <h1 style={{ fontSize: "clamp(38px, 4.2vw, 56px)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 16px", letterSpacing: "-0.025em" }}>
                Discover hidden{" "}
                <span className="shimmer-text">revenue</span>
                {" "}opportunities
              </h1>
              <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                across Lifecycle Channels.
              </p>
            </div>

            {/* Body */}
            <div style={{ margin: "24px 0 28px", animation: "fadeUp 0.65s 0.16s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <p style={{ fontSize: 14.5, color: T.muted, lineHeight: 1.8, margin: 0 }}>
                AksharSync identifies retention gaps and unlocks repeat revenue through strategic audits. We review what's leaking revenue and what should be fixed first.
              </p>
            </div>

            {/* Rotating audience */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, animation: "fadeUp 0.65s 0.24s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Designed for</span>
              <span
                key={audienceIdx}
                className="hero-pill-audience"
                style={{
                  display: "inline-block", padding: "4px 13px", borderRadius: 99,
                  background: "rgba(127,208,255,0.09)", border: "1px solid rgba(127,208,255,0.22)",
                  color: T.primary, fontSize: 12.5, fontWeight: 700,
                }}
              >
                {AUDIENCE[audienceIdx]}
              </span>
              <div style={{ display: "flex", gap: 3 }}>
                {AUDIENCE.map((_, i) => (
                  <div key={i} style={{ width: i === audienceIdx ? 14 : 4, height: 4, borderRadius: 99, background: i === audienceIdx ? T.primary : "rgba(255,255,255,0.14)", transition: "all 0.35s ease" }} />
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 38, animation: "fadeUp 0.65s 0.32s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <button className="cta-primary" onClick={() => navigate(ROUTE_PATHS.RETENTION_AUDIT_BOOKING)}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M7.5 1L9.5 5.5L14.5 6.5L11 10L11.5 14.5L7.5 12.5L3.5 14.5L4 10L0.5 6.5L5.5 5.5L7.5 1Z" fill="currentColor" />
                </svg>
                Get Free Audit
              </button>
              <button className="cta-ghost" onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}>
                View Case Studies
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Stat chips */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", animation: "fadeUp 0.65s 0.42s ease both", opacity: 0, animationFillMode: "forwards" }}>
              {[
                { label: "Revenue Attributed", value: 2.4, prefix: "$", suffix: "M", decimals: 1, color: T.primary },
                { label: "Avg Open Rate", value: 61.2, suffix: "%", decimals: 1, color: T.purple },
                { label: "Active Flows", value: 12, color: T.green },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, borderRadius: 13, padding: "12px 15px", flex: "1 1 80px" }}>
                  <div style={{ fontSize: 10.5, color: T.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                  <div style={{ fontSize: 21, fontWeight: 800, color: s.color }}>
                    <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </div>
                </div>
              ))}
            </div>

            {/* Live feed */}
            <div style={{ marginTop: 26, animation: "fadeUp 0.65s 0.52s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, animation: "pulseDot 1.6s ease infinite", boxShadow: `0 0 5px ${T.green}` }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Live Audit Stream</span>
              </div>
              <LiveFeedTicker />
            </div>
          </div>

          {/* RIGHT — SVG visual only */}
          <div style={{ animation: "fadeUp 0.8s 0.28s ease both", opacity: 0, animationFillMode: "forwards", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <RevenueTopologySVG />

            {/* Bottom tags */}
            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
              {["12 Active Flows", "4 A/B Tests", "3 CRMs Synced"].map(chip => (
                <span key={chip} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: "rgba(127,208,255,0.07)", border: "1px solid rgba(127,208,255,0.14)", color: T.primary }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Case Studies ── */}
        <div id="case-studies" style={{ marginTop: 80 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, animation: "fadeUp 0.65s 0.6s ease both", opacity: 0, animationFillMode: "forwards" }}>
            <div>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>Case Studies</p>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>Real brands. Real results.</h2>
            </div>
            <button className="cta-ghost" style={{ fontSize: 13, padding: "9px 18px" }} onClick={() => navigate(ROUTE_PATHS.SERVICES)}>
              All Case Studies
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="case-studies-grid">
            {CASE_STUDIES.map((cs, i) => (
              <CaseStudyCard key={cs.brand} {...cs} delay={620 + i * 80} />
            ))}
          </div>
        </div>

        {/* ── Brand strip ── */}
        <div style={{ marginTop: 64, textAlign: "center", animation: "fadeUp 0.65s 0.9s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 16 }}>Integrated with</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px 40px", flexWrap: "wrap" }}>
            {["Klaviyo", "Shopify", "Omnisend", "Attentive", "Postscript", "Drip"].map(b => (
              <span key={b} style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}