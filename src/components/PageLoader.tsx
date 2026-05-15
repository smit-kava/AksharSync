import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/Logo.svg";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [_phase, setPhase] = useState<"in" | "pulse" | "out">("in");

  useEffect(() => {
    setLoading(true);
    setPhase("in");

    const t1 = setTimeout(() => setPhase("pulse"), 400);
    const t2 = setTimeout(() => setPhase("out"), 1800);
    const t3 = setTimeout(() => setLoading(false), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  // Orbital ring definitions
  const orbits = [
    { size: 220, duration: 3.2, delay: 0, color: "#32f5f5", dotSize: 6, opacity: 0.6 },
    { size: 290, duration: 4.5, delay: 0.8, color: "#7fd0ff", dotSize: 5, opacity: 0.45 },
    { size: 360, duration: 5.8, delay: 1.5, color: "#32f5f5", dotSize: 4, opacity: 0.3 },
  ];

  const particles = Array.from({ length: 18 }, (_, i) => i);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060e1a",
            overflow: "hidden",
          }}
        >
          {/* ── Hex-grid background ── */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hexgrid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon
                  points="30,2 56,16 56,44 30,58 4,44 4,16"
                  fill="none"
                  stroke="#32f5f5"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexgrid)" />
          </svg>

          {/* ── Radial gradient vignette ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, #060e1a 80%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Ambient glow blob ── */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(50,245,245,0.18) 0%, rgba(127,208,255,0.08) 50%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          {/* ── Corner scanline accents ── */}
          {[
            { top: 20, left: 20 },
            { top: 20, right: 20 },
            { bottom: 20, left: 20 },
            { bottom: 20, right: 20 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.7, 0.4], scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                ...pos,
                borderTop: "top" in pos ? "1.5px solid rgba(50,245,245,0.5)" : undefined,
                borderBottom: "bottom" in pos ? "1.5px solid rgba(50,245,245,0.5)" : undefined,
                borderLeft: "left" in pos ? "1.5px solid rgba(50,245,245,0.5)" : undefined,
                borderRight: "right" in pos ? "1.5px solid rgba(50,245,245,0.5)" : undefined,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* ── Floating particles ── */}
          {particles.map((i) => {
            const angle = (i / particles.length) * 360;
            const radius = 160 + Math.sin(i * 1.3) * 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const size = 2 + Math.random() * 3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0.3, 0.8, 0],
                  scale: [0, 1, 0.6, 1, 0],
                  x: [x * 0.6, x, x * 1.1],
                  y: [y * 0.6, y, y * 1.1],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.07,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  background: i % 3 === 0 ? "#32f5f5" : "#7fd0ff",
                  boxShadow: `0 0 ${size * 3}px ${size}px ${i % 3 === 0 ? "rgba(50,245,245,0.6)" : "rgba(127,208,255,0.6)"}`,
                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* ── Orbital rings ── */}
          {orbits.map((orbit, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: orbit.size,
                height: orbit.size,
                borderRadius: "50%",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ opacity: orbit.opacity, scale: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 0.6, delay: i * 0.15 },
                  scale: { duration: 0.8, delay: i * 0.15, ease: "easeOut" },
                  rotate: {
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: orbit.delay,
                  },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `1px dashed ${orbit.color}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -orbit.dotSize / 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: orbit.dotSize,
                    height: orbit.dotSize,
                    borderRadius: "50%",
                    background: orbit.color,
                    boxShadow: `0 0 10px 4px ${orbit.color}`,
                  }}
                />
              </motion.div>
            </div>
          ))}

          {/* ── Logo container ── */}
          <div style={{ position: "relative", zIndex: 10 }}>
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: n * 0.55,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(50,245,245,0.5)",
                  pointerEvents: "none",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{
                scale: [0, 1.15, 0.95, 1],
                opacity: [0, 1, 1, 1],
                rotate: [-20, 5, -3, 0],
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  filter: [
                    "drop-shadow(0 0 12px rgba(50,245,245,0.3)) drop-shadow(0 0 30px rgba(50,245,245,0.15))",
                    "drop-shadow(0 0 30px rgba(50,245,245,0.8)) drop-shadow(0 0 60px rgba(127,208,255,0.4))",
                    "drop-shadow(0 0 12px rgba(50,245,245,0.3)) drop-shadow(0 0 30px rgba(50,245,245,0.15))",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <img
                  src={logo}
                  alt="AksharSync"
                  style={{ width: 140, height: 140, objectFit: "contain", display: "block", border: "none", outline: "none" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: 80,
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 2,
                background: "rgba(50,245,245,0.12)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #32f5f5, #7fd0ff, #32f5f5)",
                  backgroundSize: "200% 100%",
                  borderRadius: 2,
                  boxShadow: "0 0 8px rgba(50,245,245,0.8)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontFamily: "'Anta', 'Courier New', monospace",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {"AKSHAR".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  style={{ display: "inline-block" }}
                >
                  {ch}
                </motion.span>
              ))}
              {"SYNC".split("").map((ch, i) => (
                <motion.span
                  key={`s-${i}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.06 }}
                  style={{ display: "inline-block", color: "#32f5f5" }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
            transition={{ duration: 2, delay: 0.2, times: [0, 0.3, 0.7, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #32f5f5, transparent)",
              transformOrigin: "left",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>);
}