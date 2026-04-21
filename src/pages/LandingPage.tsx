import { useState, useEffect, useRef } from "react";

const avatars = [
  { bg: "#1a3a5c", initials: "PS", color: "#7fd0ff" },
  { bg: "#2d1b5e", initials: "RM", color: "#a78bfa" },
  { bg: "#0d3b2e", initials: "AK", color: "#34d399" },
  { bg: "#3b1a1a", initials: "JD", color: "#f87171" },
  { bg: "#3b2a0d", initials: "MK", color: "#fbbf24" },
  { bg: "#1a2a3b", initials: "RV", color: "#60a5fa" },
];

// (Removed unused stats array)

const services = [
  {
    icon: "⟳",
    title: "Lifecycle & Automation",
    desc: "Email automation, journey mapping, and multi-channel workflows that nurture leads and drive conversions.",
    accent: "#7fd0ff",
    glow: "rgba(127,208,255,0.12)",
  },
  {
    icon: "⚙",
    title: "Technical Architecture",
    desc: "ESP migration, CRM sync, deliverability audits, and advanced templating for a robust technical foundation.",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.12)",
  },
  {
    icon: "✦",
    title: "Creative Production",
    desc: "Modular templates, UX/UI design, and white-label solutions that elevate your brand's visual impact.",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.12)",
  },
];

const features = [
  "Dedicated account manager for every project",
  "Weekly performance reports & insights",
  "Agile execution with 48-hour turnaround",
  "Multi-channel synced campaigns",
  "Real-time analytics dashboard",
  "On-demand strategy consultations",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// (Removed unused AnimatedNumber component)

export default function HeroSection() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  useInView(); // Original statsRef was here, but unused
  const [servicesRef, servicesInView] = useInView(0.1);
  const [whyRef, whyInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.2);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay = 0, visible = heroVisible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

// (Removed unused fadeIn function)

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#060e1a", color: "white", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-btn-primary {
          background: white; color: #0d2137;
          padding: 14px 32px; border-radius: 12px;
          font-weight: 800; font-size: 1rem;
          border: none; cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit;
        }
        .hero-btn-primary:hover { background: #e8f4ff; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(127,208,255,0.25); }

        .hero-btn-secondary {
          background: transparent; color: rgba(255,255,255,0.85);
          padding: 14px 32px; border-radius: 12px;
          font-weight: 600; font-size: 1rem;
          border: 1.5px solid rgba(255,255,255,0.25); cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit;
        }
        .hero-btn-secondary:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); transform: translateY(-2px); }

        .service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .service-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-8px);
        }

        .feature-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }
        .feature-row:hover { background: rgba(255,255,255,0.04); }

        .cta-btn-dark {
          background: #060e1a; color: white;
          padding: 16px 40px; border-radius: 12px;
          font-weight: 800; font-size: 1.05rem;
          border: none; cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit;
        }
        .cta-btn-dark:hover { background: #0d2137; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(6,14,26,0.4); }

        .cta-btn-outline {
          background: transparent; color: #0d2137;
          padding: 16px 40px; border-radius: 12px;
          font-weight: 700; font-size: 1.05rem;
          border: 1.5px solid rgba(13,33,55,0.35); cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit;
        }
        .cta-btn-outline:hover { border-color: #0d2137; background: rgba(13,33,55,0.07); transform: translateY(-2px); }

        .avatar-ring { border: 2px solid #060e1a; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800%); }
        }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .float-anim-delay { animation: float 6s ease-in-out infinite 2s; }
        .float-anim-slow { animation: float 9s ease-in-out infinite 1s; }
        .glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

        .stat-card {
          text-align: center; padding: 20px 12px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .stat-card:last-child { border-right: none; }

        .chip {
          display: inline-block;
          background: rgba(127,208,255,0.1);
          color: #7fd0ff;
          border: 1px solid rgba(127,208,255,0.2);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(145deg, #060e1a 0%, #0b1e35 40%, #1a0a3a 100%)",
      }}>
        {/* BG Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(127,208,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(127,208,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Orbs */}
        <div className="glow-pulse" style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          top: "-15%", right: "-10%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div className="glow-pulse" style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          bottom: "-10%", left: "-8%",
          background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          animationDelay: "1.5s",
        }} />

        {/* Floating accent dots */}
        <div className="float-anim" style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#7fd0ff", top: "20%", right: "15%", opacity: 0.6 }} />
        <div className="float-anim-delay" style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "#a78bfa", top: "60%", right: "8%", opacity: 0.5 }} />
        <div className="float-anim-slow" style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "#34d399", top: "35%", left: "5%", opacity: 0.5 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px", position: "relative", zIndex: 1, width: "100%" }}>
          {/* Chip */}
          <div style={{ ...fadeUp(0), marginBottom: 28 }}>
            <span className="chip">✦ The Email Marketing Experts</span>
          </div>

          {/* Headline */}
          <div style={{ ...fadeUp(120), maxWidth: 820, marginBottom: 24 }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "white",
            }}>
              Scaling D2C Brands{" "}
              <br />
              <span style={{
                background: "linear-gradient(90deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Through Data-Driven
              </span>
              <br />
              Communication.
            </h1>
          </div>

          {/* Sub */}
          <div style={{ ...fadeUp(240), maxWidth: 580, marginBottom: 44 }}>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontWeight: 400 }}>
              We build automated revenue engines across{" "}
              <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>Email, SMS, and WhatsApp</span>
              {" "}using 12 years of technical architecture experience. Expert support for leading ESP and CRM platforms.
            </p>
          </div>

          {/* Avatars + social proof */}
          <div style={{ ...fadeUp(360), display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {avatars.map((a, i) => (
                <div key={i} className="avatar-ring" style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: a.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", fontWeight: 700, color: a.color,
                  marginLeft: i === 0 ? 0 : -10,
                  position: "relative", zIndex: avatars.length - i,
                }}>
                  {a.initials}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: "0.85rem" }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                Trusted by <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>350+ D2C brands</span>
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ ...fadeUp(460), display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="hero-btn-primary">
              Get Your Free Consultation
              <span style={{ fontSize: "1.1rem" }}>→</span>
            </button>
            <button className="hero-btn-secondary">
              Explore Services
              <span style={{ fontSize: "1rem", opacity: 0.7 }}>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS BAND ── */}
      {/* <div ref={statsRef} style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="stat-card" style={{ ...fadeIn(i * 120, statsInView), padding: "40px 20px" }}>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "2.6rem", fontWeight: 800,
                  background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  marginBottom: 6,
                }}>
                  <AnimatedNumber
                    target={parseFloat(s.value)}
                    suffix={s.value.replace(/[0-9.]/g, "")}
                    inView={statsInView}
                  />
                </div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* ── SERVICES ── */}
      <div ref={servicesRef} style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ ...fadeUp(0, servicesInView), textAlign: "center", marginBottom: 64 }}>
          <span className="chip" style={{ marginBottom: 20, display: "inline-block" }}>Our Services</span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 800, lineHeight: 1.15,
            color: "white", marginBottom: 16,
          }}>
            Everything Your Digital{" "}
            <span style={{ color: "#7fd0ff" }}>Presence Needs</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto" }}>
            Three powerful service pillars, perfectly synced into one seamless strategy for your growth.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="service-card"
              style={{
                ...fadeUp(i * 120, servicesInView),
                borderColor: hoveredCard === i ? svc.accent + "44" : "rgba(255,255,255,0.08)",
                boxShadow: hoveredCard === i ? `0 24px 60px ${svc.glow}` : "none",
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: svc.glow,
                border: `1px solid ${svc.accent}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", color: svc.accent,
                marginBottom: 24,
                transition: "transform 0.3s ease",
                transform: hoveredCard === i ? "scale(1.1)" : "scale(1)",
              }}>
                {svc.icon}
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: 12 }}>
                {svc.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: 24 }}>
                {svc.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: svc.accent, fontSize: "0.88rem", fontWeight: 600 }}>
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY US ── */}
      <div ref={whyRef} style={{
        background: "linear-gradient(135deg, rgba(13,33,55,0.8) 0%, rgba(30,10,60,0.7) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "100px 40px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={fadeUp(0, whyInView)}>
            <span className="chip" style={{ marginBottom: 24, display: "inline-block" }}>Why Choose Us</span>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800, lineHeight: 1.15,
              color: "white", marginBottom: 20,
            }}>
              One Agency.<br />
              <span style={{ color: "#7fd0ff" }}>Total Sync.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Unlike fragmented agencies, we align every channel — SEO, content, ads,
              and dev — into a single synchronized strategy so nothing is ever out of step.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {features.map((f, i) => (
              <div key={f} className="feature-row" style={fadeUp(i * 80, whyInView)}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(52,211,153,0.15)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "0.7rem", color: "#34d399",
                }}>
                  ✓
                </div>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.97rem" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div ref={ctaRef} style={{ padding: "100px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={fadeUp(0, ctaInView)}>
            <div style={{
              display: "inline-block",
              padding: "80px 60px",
              background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 50%, #34d399 100%)",
              borderRadius: 32,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Scan line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "30%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 800, color: "#060e1a",
                marginBottom: 14, lineHeight: 1.15,
              }}>
                Ready to Sync Your Growth?
              </h2>
              <p style={{ color: "rgba(6,14,26,0.65)", fontSize: "1.1rem", marginBottom: 36 }}>
                Let's build something powerful together. Start with a free strategy call.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="cta-btn-dark">
                  Get Started Free →
                </button>
                <button className="cta-btn-outline">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}