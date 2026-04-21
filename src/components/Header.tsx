import { useState, useRef, useEffect } from "react";

// ─── Route paths (replace with your actual ROUTE_PATHS import) ───────────────
const ROUTE_PATHS = {
  HOME: "/",
  SOLUTIONS: "/solutions",
  SERVICES: "/services",
  ABOUT: "/about",
  WHY: "/why",
  SERVICE_EMAIL_FLOWS: "/services/email-flows",
  SERVICE_CUSTOMER_JOURNEYS: "/services/customer-journeys",
  SERVICE_MULTICHANNEL_AUTOMATION: "/services/multichannel-automation",
  SERVICE_ESP_MIGRATION: "/services/esp-migration",
  SERVICE_CRM_DATA_SYNC: "/services/crm-data-sync",
  SERVICE_DELIVERABILITY_AUDITS: "/services/deliverability-audits",
  SERVICE_LIQUID_AMPSCRIPT: "/services/liquid-ampscript",
  SERVICE_MODULAR_TEMPLATES: "/services/modular-templates",
  SERVICE_UX_UI_DESIGN: "/services/ux-ui-design",
  SERVICE_WHITE_LABEL_SOLUTIONS: "/services/white-label-solutions",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const mainServices = [
  {
    label: "Lifecycle & Automation",
    icon: "⟳",
    accent: "#7fd0ff",
    desc: "Automated journeys that convert",
    sub: [
      { label: "Email Flows", to: ROUTE_PATHS.SERVICE_EMAIL_FLOWS, icon: "✉" },
      { label: "Customer Journeys", to: ROUTE_PATHS.SERVICE_CUSTOMER_JOURNEYS, icon: "→" },
      { label: "Multi-channel Automation", to: ROUTE_PATHS.SERVICE_MULTICHANNEL_AUTOMATION, icon: "⟡" },
    ],
  },
  {
    label: "Technical Architecture",
    icon: "⚙",
    accent: "#a78bfa",
    desc: "Robust infrastructure & integrations",
    sub: [
      { label: "ESP Migration & Integration", to: ROUTE_PATHS.SERVICE_ESP_MIGRATION, icon: "⇄" },
      { label: "CRM Data Sync", to: ROUTE_PATHS.SERVICE_CRM_DATA_SYNC, icon: "⬡" },
      { label: "Deliverability Audits", to: ROUTE_PATHS.SERVICE_DELIVERABILITY_AUDITS, icon: "◎" },
      { label: "Liquid & Ampscript Templating", to: ROUTE_PATHS.SERVICE_LIQUID_AMPSCRIPT, icon: "{ }" },
    ],
  },
  {
    label: "Creative Production",
    icon: "✦",
    accent: "#34d399",
    desc: "Design that elevates your brand",
    sub: [
      { label: "Modular Template Production", to: ROUTE_PATHS.SERVICE_MODULAR_TEMPLATES, icon: "▦" },
      { label: "UX/UI Design", to: ROUTE_PATHS.SERVICE_UX_UI_DESIGN, icon: "◈" },
      { label: "White Label Solutions", to: ROUTE_PATHS.SERVICE_WHITE_LABEL_SOLUTIONS, icon: "◻" },
    ],
  },
];

const navItems = [
  { label: "Home", to: ROUTE_PATHS.HOME },
  { label: "Solutions", to: ROUTE_PATHS.SOLUTIONS },
  { label: "Services", to: ROUTE_PATHS.SERVICES, hasServices: true },
  { label: "About Us", to: ROUTE_PATHS.ABOUT },
  { label: "Why?", to: ROUTE_PATHS.WHY },
];

// ─── Link component (swap with react-router Link if needed) ─────────────────
function NavAnchor({ to, children, onClick, style, className }) {
  return (
    <a href={to} style={style} className={className}>
      {children}
    </a>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(mainServices[0].label);
  const [scrolled, setScrolled] = useState(false);

  const megaTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => {
      setMegaOpen(false);
      setHoveredService(mainServices[0].label);
    }, 160);
  };
  const keepMega = () => clearTimeout(megaTimeout.current);

  const activeService = mainServices.find(s => s.label === hoveredService) || mainServices[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .akshar-header * { box-sizing: border-box; margin: 0; padding: 0; }

        .akshar-header {
          position: sticky; top: 0; z-index: 1000;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          transition: all 0.4s ease;
        }

        .akshar-bar {
          background: linear-gradient(90deg, #06101e 0%, #0d2a50 50%, #1a0a38 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s ease;
        }
        .akshar-bar.scrolled {
          background: rgba(6,16,30,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(127,208,255,0.12);
          box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }

        .akshar-inner {
          max-width: 1180px; margin: 0 auto;
          padding: 0 32px;
          height: 72px;
          display: flex; align-items: center; gap: 0;
        }

        /* Logo */
        .akshar-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0; margin-right: 40px;
        }
        .akshar-logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; font-weight: 900; color: #06101e;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .akshar-logo:hover .akshar-logo-icon { transform: rotate(-5deg) scale(1.08); }
        .akshar-logo-text {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 1.25rem; font-weight: 800;
          color: white; letter-spacing: -0.03em;
          white-space: nowrap;
        }
        .akshar-logo-text span { color: #7fd0ff; }

        /* Desktop Nav */
        .akshar-nav {
          display: flex; align-items: center; gap: 6px;
          flex: 1; justify-content: center;
        }
        @media (max-width: 900px) { .akshar-nav { display: none; } }

        .akshar-nav-link {
          display: flex; align-items: center; gap: 4px;
          padding: 8px 14px; border-radius: 8px;
          color: rgba(255,255,255,0.7); font-size: 0.95rem; font-weight: 500;
          text-decoration: none; cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap; border: none; background: none; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em;
        }
        .akshar-nav-link:hover, .akshar-nav-link.active {
          color: white; background: rgba(255,255,255,0.07);
        }
        .akshar-nav-link .chevron {
          font-size: 0.7rem; opacity: 0.6;
          transition: transform 0.25s ease;
          display: inline-block;
        }
        .akshar-nav-link.mega-open .chevron { transform: rotate(180deg); }

        /* CTA */
        .akshar-cta-group {
          display: flex; align-items: center; gap: 10px; margin-left: auto; flex-shrink: 0;
        }
        @media (max-width: 900px) { .akshar-cta-group { display: none; } }

        .akshar-cta-ghost {
          padding: 8px 18px; border-radius: 8px;
          background: transparent; color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.18); font-size: 0.9rem; font-weight: 600;
          cursor: pointer; transition: all 0.25s ease; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          text-decoration: none; display: inline-flex; align-items: center;
          letter-spacing: -0.01em;
        }
        .akshar-cta-ghost:hover { border-color: rgba(255,255,255,0.5); color: white; background: rgba(255,255,255,0.05); }

        .akshar-cta-btn {
          padding: 9px 22px; border-radius: 8px;
          background: white; color: #06101e;
          border: none; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; transition: all 0.25s ease; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          display: inline-flex; align-items: center; gap: 7px;
          text-decoration: none; white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .akshar-cta-btn:hover { background: #e0f2ff; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(127,208,255,0.2); }
        .akshar-cta-btn .phone-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #06101e; flex-shrink: 0;
          animation: phone-blink 2s ease-in-out infinite;
        }
        @keyframes phone-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        /* Hamburger */
        .akshar-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px; border-radius: 8px;
          background: none; border: none; margin-left: auto;
          transition: background 0.2s;
        }
        .akshar-hamburger:hover { background: rgba(255,255,255,0.08); }
        @media (max-width: 900px) { .akshar-hamburger { display: flex; } }
        .ham-line {
          width: 22px; height: 2px; border-radius: 2px;
          background: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .ham-open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MEGA MENU ── */
        .akshar-mega-wrap {
          position: absolute; top: 72px; left: 0; right: 0;
          z-index: 999; pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
          opacity: 0; transform: translateY(-6px);
        }
        .akshar-mega-wrap.open {
          opacity: 1; transform: translateY(0); pointer-events: auto;
        }
        .akshar-mega {
          max-width: 1180px; margin: 0 auto 0;
          padding: 0 32px;
        }
        .akshar-mega-inner {
          background: rgba(8,18,36,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-top: none;
          border-radius: 0 0 20px 20px;
          overflow: hidden;
          display: grid; grid-template-columns: 220px 1fr;
        }

        /* Left column: service tabs */
        .mega-left {
          padding: 20px 12px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 4px;
        }
        .mega-tab {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 10px;
          cursor: pointer; transition: all 0.2s ease;
          border: none; background: none; text-align: left; width: 100%;
          font-family: inherit;
        }
        .mega-tab:hover, .mega-tab.active { background: rgba(255,255,255,0.06); }
        .mega-tab-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem; flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .mega-tab:hover .mega-tab-icon, .mega-tab.active .mega-tab-icon { transform: scale(1.12); }
        .mega-tab-label {
          font-size: 0.84rem; font-weight: 600; color: rgba(255,255,255,0.7);
          transition: color 0.2s;
          line-height: 1.3;
        }
        .mega-tab.active .mega-tab-label { color: white; }

        /* Right column: sub-links */
        .mega-right {
          padding: 24px 28px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .mega-right-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mega-right-title {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 1.05rem; font-weight: 700; color: white;
        }
        .mega-right-desc { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

        .mega-sub-link {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 10px;
          text-decoration: none; color: rgba(255,255,255,0.7);
          font-size: 0.9rem; font-weight: 500;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .mega-sub-link:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.08);
          color: white;
          transform: translateX(4px);
        }
        .mega-sub-icon {
          width: 28px; height: 28px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .mega-sub-link:hover .mega-sub-icon { transform: scale(1.1); }
        .mega-sub-arrow {
          margin-left: auto; font-size: 0.75rem;
          opacity: 0; transition: opacity 0.2s, transform 0.2s;
          transform: translateX(-4px);
        }
        .mega-sub-link:hover .mega-sub-arrow { opacity: 0.5; transform: translateX(0); }

        /* ── MOBILE DRAWER ── */
        .akshar-backdrop {
          position: fixed; inset: 0; z-index: 1001;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .akshar-backdrop.open { opacity: 1; pointer-events: auto; }

        .akshar-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 1002;
          width: 300px;
          background: #06101e;
          border-left: 1px solid rgba(255,255,255,0.08);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .akshar-drawer.open { transform: translateX(0); }

        .drawer-head {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .drawer-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.08); border: none;
          color: white; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .drawer-close:hover { background: rgba(255,255,255,0.15); }

        .drawer-body { padding: 16px 12px; }

        .drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-radius: 10px;
          color: rgba(255,255,255,0.8); font-size: 0.95rem; font-weight: 600;
          text-decoration: none; cursor: pointer; width: 100%;
          background: none; border: none; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em; text-align: left;
          transition: all 0.2s;
        }
        .drawer-link:hover { background: rgba(255,255,255,0.06); color: white; }

        .drawer-section {
          overflow: hidden;
          transition: max-height 0.35s ease;
          max-height: 0;
        }
        .drawer-section.open { max-height: 800px; }

        .drawer-main-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px 10px 28px; border-radius: 8px;
          color: rgba(255,255,255,0.65); font-size: 0.9rem; font-weight: 600;
          cursor: pointer; background: none; border: none;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em; text-align: left; width: 100%;
          transition: all 0.2s;
        }
        .drawer-main-item:hover { background: rgba(255,255,255,0.05); color: white; }

        .drawer-sub-section {
          overflow: hidden; max-height: 0;
          transition: max-height 0.3s ease;
        }
        .drawer-sub-section.open { max-height: 300px; }

        .drawer-sub-link {
          display: block;
          padding: 9px 14px 9px 52px;
          color: rgba(255,255,255,0.5); font-size: 0.85rem; font-weight: 500;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          text-decoration: none; border-radius: 8px;
          letter-spacing: -0.01em;
          transition: all 0.2s;
        }
        .drawer-sub-link:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.85); }

        .drawer-cta {
          padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 8px;
        }
        .drawer-cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px;
          background: white; color: #06101e;
          border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700;
          cursor: pointer; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em;
          transition: all 0.2s;
        }
        .drawer-cta-btn:hover { background: #e0f2ff; }
      `}</style>

      <div className="akshar-header" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
        {/* ── AppBar ── */}
        <div className={`akshar-bar${scrolled ? " scrolled" : ""}`}>
          <div className="akshar-inner">
            {/* Logo */}
            <NavAnchor to={ROUTE_PATHS.HOME} className="" style={{ textDecoration: "none" }} onClick={''}>
              <div className="akshar-logo">
                <div className="akshar-logo-icon">A</div>
                <span className="akshar-logo-text">Akshar<span>Sync</span></span>
              </div>
            </NavAnchor>

            {/* Desktop Nav */}
            <nav className="akshar-nav">
              {navItems.map((item) =>
                item.hasServices ? (
                  <div
                    key={item.label}
                    style={{ position: "relative" }}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <button className={`akshar-nav-link${megaOpen ? " mega-open" : ""}`}>
                      {item.label}
                      <span className="chevron">▼</span>
                    </button>
                  </div>
                ) : (
                  <NavAnchor
                    key={item.label}
                    to={item.to}
                    className="akshar-nav-link"
                    style={{ textDecoration: "none" }}
                    onClick={''}
                  >
                    {item.label}
                  </NavAnchor>
                )
              )}
            </nav>

            {/* CTA group */}
            <div className="akshar-cta-group">
              <NavAnchor to={ROUTE_PATHS.ABOUT} className="akshar-cta-ghost" style={{}} onClick={''}>
                About Us
              </NavAnchor>
              <button className="akshar-cta-btn">
                <span className="phone-dot" />
                Contact Us
              </button>
            </div>

            {/* Hamburger */}
            <button
              className={`akshar-hamburger${mobileOpen ? " ham-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="ham-line" />
              <div className="ham-line" />
              <div className="ham-line" />
            </button>
          </div>
        </div>

        {/* ── Mega Menu ── */}
        <div
          className={`akshar-mega-wrap${megaOpen ? " open" : ""}`}
          onMouseEnter={keepMega}
          onMouseLeave={closeMega}
        >
          <div className="akshar-mega">
            <div className="akshar-mega-inner">
              {/* Left tabs */}
              <div className="mega-left">
                {mainServices.map((svc) => (
                  <button
                    key={svc.label}
                    className={`mega-tab${hoveredService === svc.label ? " active" : ""}`}
                    onMouseEnter={() => setHoveredService(svc.label)}
                  >
                    <div
                      className="mega-tab-icon"
                      style={{ background: svc.accent + "18", color: svc.accent }}
                    >
                      {svc.icon}
                    </div>
                    <span className="mega-tab-label">{svc.label}</span>
                  </button>
                ))}
              </div>

              {/* Right content */}
              <div className="mega-right">
                <div className="mega-right-header">
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: activeService.accent + "18",
                      color: activeService.accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }}
                  >
                    {activeService.icon}
                  </div>
                  <div>
                    <div className="mega-right-title">{activeService.label}</div>
                    <div className="mega-right-desc">{activeService.desc}</div>
                  </div>
                </div>

                {activeService.sub.map((sub) => (
                  <NavAnchor
                    key={sub.to}
                    to={sub.to}
                    className="mega-sub-link"
                    style={{}}
                    onClick={() => setMegaOpen(false)}
                  >
                    <div
                      className="mega-sub-icon"
                      style={{ background: activeService.accent + "12", color: activeService.accent }}
                    >
                      {sub.icon}
                    </div>
                    <span>{sub.label}</span>
                    <span className="mega-sub-arrow">→</span>
                  </NavAnchor>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Backdrop ── */}
      <div
        className={`akshar-backdrop${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Drawer ── */}
      <div className={`akshar-drawer${mobileOpen ? " open" : ""}`}>
        <div className="drawer-head">
          <div className="akshar-logo" style={{ textDecoration: "none" }}>
            <div className="akshar-logo-icon" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>A</div>
            <span className="akshar-logo-text">Akshar<span style={{ color: "#7fd0ff" }}>Sync</span></span>
          </div>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <div className="drawer-body">
          {navItems.map((item) =>
            item.hasServices ? (
              <div key={item.label}>
                <button
                  className="drawer-link"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  <span>{item.label}</span>
                  <span style={{
                    fontSize: "0.7rem", opacity: 0.5,
                    transition: "transform 0.25s",
                    display: "inline-block",
                    transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0deg)",
                  }}>▼</span>
                </button>

                <div className={`drawer-section${mobileExpanded === item.label ? " open" : ""}`}>
                  {mainServices.map((main) => (
                    <div key={main.label}>
                      <button
                        className="drawer-main-item"
                        onClick={() => setMobileSubExpanded(mobileSubExpanded === main.label ? null : main.label)}
                      >
                        <span style={{ color: main.accent, fontSize: "0.85rem" }}>{main.icon}</span>
                        <span style={{ flex: 1 }}>{main.label}</span>
                        <span style={{
                          fontSize: "0.65rem", opacity: 0.4,
                          transition: "transform 0.25s",
                          display: "inline-block",
                          transform: mobileSubExpanded === main.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}>▼</span>
                      </button>

                      <div className={`drawer-sub-section${mobileSubExpanded === main.label ? " open" : ""}`}>
                        {main.sub.map((sub) => (
                          <NavAnchor
                            key={sub.to}
                            to={sub.to}
                            className="drawer-sub-link"
                            style={{}}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </NavAnchor>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <NavAnchor
                key={item.label}
                to={item.to}
                className="drawer-link"
                style={{ display: "flex" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavAnchor>
            )
          )}
        </div>

        <div className="drawer-cta">
          <button className="drawer-cta-btn">
            📞 Contact Us
          </button>
        </div>
      </div>
    </>
  );
}