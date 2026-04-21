import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const serviceLinks = [
  { label: "Email Marketing", to: "/services" },
  { label: "Email Audit", to: "/services" },
  { label: "Email Deliverability", to: "/services" },
  { label: "Klaviyo Agency", to: "/solutions" },
  { label: "SMS Service", to: "/services" },
  { label: "Push Notifications", to: "/services" },
  { label: "WhatsApp Marketing", to: "/services" },
  { label: "RCS Marketing", to: "/services" },
];

const learnMoreLinks = [
  { label: "Career", to: "/about" },
  { label: "FAQs", to: "/why" },
  { label: "Partners", to: "/solutions" },
  { label: "Trainings", to: "/services" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/about" },
  { label: "Terms of Service", to: "/services" },
  { label: "Cookie Policy", to: "/why" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    to: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    to: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    to: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    to: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

// ─── Link component (swap with react-router Link) ─────────────────────────────
function A({ to, children, style, className }) {
  return <a href={to} style={style} className={className}>{children}</a>;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div>
      <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
        Newsletter
      </p>
      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 16 }}>
        Get weekly insights on email strategy, deliverability, and D2C growth.
      </p>
      {submitted ? (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderRadius: 10,
          background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
        }}>
          <span style={{ color: "#34d399", fontSize: "0.85rem", fontWeight: 600 }}>✓ You're subscribed!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px 14px", borderRadius: 9,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white", fontSize: "0.88rem",
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              outline: "none", transition: "border-color 0.2s",
              width: "100%",
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(127,208,255,0.4)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px", borderRadius: 9,
              background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
              border: "none", color: "#060e1a",
              fontSize: "0.88rem", fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              cursor: "pointer", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            Subscribe →
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .footer-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .footer-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

        .footer-link {
          display: block;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 4px 0;
          transition: color 0.2s ease, transform 0.2s ease;
          width: fit-content;
        }
        .footer-link:hover { color: rgba(255,255,255,0.9); transform: translateX(3px); }

        .footer-social-btn {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s ease;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background: rgba(127,208,255,0.1);
          border-color: rgba(127,208,255,0.25);
          color: #7fd0ff;
          transform: translateY(-2px);
        }

        .footer-fb-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 11px 22px; border-radius: 10px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
          font-size: 0.88rem; font-weight: 600;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          cursor: pointer; transition: all 0.25s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .footer-fb-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.45);
          color: white;
          transform: translateY(-1px);
        }

        .legal-link {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 500;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .legal-link:hover { color: rgba(255,255,255,0.65); }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0;
        }

        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 24px !important; }
          .footer-brand-col { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-brand-col { grid-column: auto; }
        }
      `}</style>

      <footer className="footer-root">
        {/* ── Main body ── */}
        <div style={{
          background: "linear-gradient(160deg, #06101e 0%, #0b1d35 55%, #130829 100%)",
          padding: "72px 0 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>

            {/* Grid */}
            <div className="footer-grid" style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1.2fr 1fr 1.4fr",
              gap: "0 48px",
              paddingBottom: 56,
            }}>

              {/* ── Brand col ── */}
              <div className="footer-brand-col" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", fontWeight: 800, color: "#06101e",
                    flexShrink: 0,
                  }}>A</div>
                  <span style={{
                    fontSize: "1.2rem", fontWeight: 800, color: "white",
                    letterSpacing: "-0.03em",
                  }}>
                    Akshar<span style={{ color: "#7fd0ff" }}>Sync</span>
                  </span>
                </div>

                {/* Tagline */}
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 300 }}>
                  Scaling D2C brands through data-driven communication across Email, SMS, and WhatsApp.
                </p>

                {/* Facebook CTA */}
                <div>
                  <a href="#" className="footer-fb-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Join Our Facebook Community
                  </a>
                </div>

                {/* Social icons */}
                <div style={{ display: "flex", gap: 8 }}>
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.to} className="footer-social-btn" title={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Services col ── */}
              <div>
                <p style={{
                  fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)", marginBottom: 20,
                }}>
                  Services
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {serviceLinks.map((l) => (
                    <a key={l.label} href={l.to} className="footer-link">{l.label}</a>
                  ))}
                </div>
              </div>

              {/* ── Learn More col ── */}
              <div>
                <p style={{
                  fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)", marginBottom: 20,
                }}>
                  Learn More
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {learnMoreLinks.map((l) => (
                    <a key={l.label} href={l.to} className="footer-link">{l.label}</a>
                  ))}
                </div>
              </div>

              {/* ── Newsletter col ── */}
              <div>
                <Newsletter />
              </div>
            </div>

            {/* Divider */}
            <div className="footer-divider" />

            {/* ── Bottom bar ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 12,
              padding: "20px 0",
            }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.22)", fontWeight: 500 }}>
                © {new Date().getFullYear()} AksharSync. All rights reserved.
              </span>

              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {legalLinks.map((l) => (
                  <a key={l.label} href={l.to} className="legal-link">{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}