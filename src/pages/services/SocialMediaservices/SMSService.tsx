import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, alpha, Fade } from "@mui/material";
import { keyframes } from "@mui/system";
import { HeroChip, GradientText } from "../../../components/Landing/Shared";
import { SmsIcon, BroadcastIcon, PackageIcon, TargetIcon, WinBackIcon, TrendUpIcon, BoltIcon } from "../../../components/icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { SMSProcessTimeline } from "../../../components/SMSProcessTimeline";
import { AnnouncementIcon, BlueTickIcon, OngoingIcons, TransferIcon, WeightICon } from '../../../components/icons/Icons';
import { ExpertCTA, FAQComponent } from '../../../components';

// ─── Animations ────────────────────────────────────────────────────────────────

const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 2; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const scanAnim = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(400%); }
`;

const gpulse = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(127,208,255,0.4); }
  50%       { box-shadow: 0 0 22px rgba(127,208,255,0.75), 0 0 40px rgba(127,208,255,0.25); }
`;

const dpulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px #34d399; }
  50%       { box-shadow: 0 0 16px #34d399, 0 0 28px rgba(52,211,153,0.5); }
`;

const ofloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
`;

const pfloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const SMSService = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setVisible(true); }, []);

    return (
        <Box sx={{ bgcolor: "#060e1a", color: "#fff" }}>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 1 — Hero
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                minHeight: "100vh",
                pt: { xs: 15, md: 24 },
                pb: 15,
                overflow: "hidden",
                position: "relative",
            }}>
                {/* Background glows */}
                <Box sx={{
                    position: "absolute", top: "10%", right: "-5%",
                    width: "600px", height: "600px",
                    background: "radial-gradient(circle, rgba(127,208,255,0.08) 0%, transparent 70%)",
                    filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
                }} />
                <Box sx={{
                    position: "absolute", bottom: "5%", left: "-5%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
                    filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
                }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                        gap: { xs: 8, lg: 4 },
                        alignItems: "center",
                        minHeight: { lg: "80vh" },
                    }}>
                        {/* ── Left: Text ─────────────────────────────────────── */}
                        <Fade in={visible} timeout={800}>
                            <Box sx={{ animation: `${slideInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1)`, maxWidth: { lg: 620 } }}>
                                <HeroChip sx={{ mb: 3.5 }}>
                                    <SmsIcon sx={{ fontSize: 16 }} />
                                    Full-Service SMS Agency
                                </HeroChip>

                                <Typography variant="h1" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.4rem" },
                                    lineHeight: 1.05, mb: 3.5, color: "#fff",
                                    letterSpacing: "-0.03em",
                                }}>
                                    Increase Revenue with Our <br />
                                    <GradientText>SMS Marketing Agency</GradientText>
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.55),
                                    fontSize: { xs: "1.1rem", md: "1.28rem" },
                                    lineHeight: 1.85, maxWidth: 560, mb: 6.5, fontWeight: 400,
                                }}>
                                    Leverage the full potential of text message marketing without
                                    technical overwhelm. Our SMS agency will develop and execute an
                                    effective text message promotion strategy, so you can reach the
                                    right customers &amp; prospects at the right time.
                                </Typography>

                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                        color: "#060e1a", px: { xs: 4, md: 5 }, py: 2.2,
                                        borderRadius: "16px", fontWeight: 850,
                                        textTransform: "none", fontSize: "1.05rem",
                                        boxShadow: "0 20px 40px rgba(127,208,255,0.25)",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 25px 50px rgba(127,208,255,0.35)",
                                            background: "linear-gradient(135deg, #99ddff 0%, #b8a2ff 100%)",
                                        },
                                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    }}
                                >
                                    Get Your Free Strategy Call
                                </Button>

                                {/* Mini Stats */}
                                <Box sx={{ mt: 8, display: "flex", alignItems: "center", gap: 4, opacity: 0.7 }}>
                                    {[
                                        { value: "98%", label: "Open Rate" },
                                        { value: "25%+", label: "CTR Average" },
                                        { value: "10x", label: "Avg. ROI" },
                                    ].map((s, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && <Box sx={{ width: 1, height: 30, bgcolor: "rgba(255,255,255,0.1)" }} />}
                                            <Box>
                                                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>{s.value}</Typography>
                                                <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</Typography>
                                            </Box>
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Box>
                        </Fade>

                        {/* ── Right: Isometric Phone Canvas — responsive scale wrapper ── */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: {
                                xs: Math.round(560 * 0.62) + "px",
                                sm: Math.round(560 * 0.78) + "px",
                                md: Math.round(560 * 0.92) + "px",
                                lg: Math.round(560 * 1.00) + "px",
                                xl: Math.round(560 * 1.10) + "px",
                            },
                            overflow: "visible",
                        }}>
                            <Box sx={{
                                width: 640, height: 560,
                                flexShrink: 0,
                                transformOrigin: "center center",
                                transform: {
                                    xs: "scale(0.62)",
                                    sm: "scale(0.78)",
                                    md: "scale(0.92)",
                                    lg: "scale(1.00)",
                                    xl: "scale(1.10)",
                                },
                                position: "relative",
                                transformStyle: "preserve-3d",
                                "&::before": {
                                    content: '""',
                                    position: "absolute", inset: 0,
                                    backgroundImage: "radial-gradient(circle, rgba(127,208,255,0.12) 1px, transparent 1px)",
                                    backgroundSize: "32px 32px",
                                    pointerEvents: "none",
                                },
                            }}>

                                {/* ── SVG connector lines ── */}
                                <Box
                                    component="svg"
                                    sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 20 }}
                                    viewBox="0 0 640 560"
                                >
                                    <line x1="430" y1="460" x2="380" y2="420" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" />
                                    <line x1="120" y1="120" x2="210" y2="180" stroke="#7fd0ff" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" />
                                    <line x1="486" y1="148" x2="388" y2="172" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
                                    <line x1="486" y1="192" x2="390" y2="210" stroke="#7fd0ff" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                                    <line x1="86" y1="258" x2="86" y2="290" stroke="#7fd0ff" strokeWidth="1.5" opacity="0.45" />
                                    <line x1="86" y1="290" x2="178" y2="315" stroke="#7fd0ff" strokeWidth="1" strokeDasharray="4 3" opacity="0.28" />
                                </Box>

                                {/* ── Deliverability badge — top-left ── */}
                                <Box sx={{
                                    position: "absolute", left: 30, top: 90,
                                    background: "rgba(5,14,32,0.97)",
                                    borderRadius: "14px", px: "14px", py: "8px",
                                    display: "flex", alignItems: "center", gap: "8px",
                                    border: "1px solid rgba(127,208,255,0.3)",
                                    boxShadow: "0 8px 28px rgba(0,0,10,0.5)",
                                    animation: `${ofloat} 6s ease-in-out infinite 1s`,
                                    zIndex: 15,
                                }}>
                                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#7fd0ff", flexShrink: 0, animation: `${pulseGlow} 2.5s ease-in-out infinite` }} />
                                    <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>98% Deliverability</Typography>
                                </Box>

                                {/* ── Teal orb pin — left:62 top:216 ── */}
                                <Box sx={{
                                    position: "absolute", left: 62, top: 216,
                                    animation: `${ofloat} 5s ease-in-out infinite`,
                                    zIndex: 10,
                                }}>
                                    <Box sx={{ position: "absolute", width: 58, height: 58, borderRadius: "50%", background: "rgba(127,208,255,0.06)", left: -10, top: -10 }} />
                                    <Box sx={{ position: "absolute", width: 40, height: 40, borderRadius: "50%", background: "rgba(127,208,255,0.1)", left: -1, top: -1 }} />
                                    <Box sx={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: "#7fd0ff", left: 7, top: 7, boxShadow: "0 0 20px rgba(127,208,255,0.8), 0 0 40px rgba(127,208,255,0.3)" }} />
                                    <Box sx={{ position: "absolute", width: 7, height: 7, borderRadius: "50%", background: "#e0f8ff", left: 14, top: 11, opacity: 0.8 }} />
                                    <Box sx={{ position: "absolute", left: 21, top: 34, width: 3, height: 28, background: "linear-gradient(to bottom, rgba(127,208,255,0.6), transparent)", borderRadius: "2px" }} />
                                    <Box sx={{ position: "absolute", left: 17, top: 62, width: 9, height: 4, background: "rgba(127,208,255,0.3)", borderRadius: "50%" }} />
                                </Box>

                                {/* ── Revenue badge — bottom-right ── */}
                                <Box sx={{
                                    position: "absolute", left: 390, top: 450,
                                    background: "rgba(5,14,32,0.97)",
                                    borderRadius: "14px", px: "14px", py: "8px",
                                    display: "flex", alignItems: "center", gap: "8px",
                                    border: "1px solid rgba(127,208,255,0.3)",
                                    boxShadow: "0 8px 28px rgba(0,0,10,0.5)",
                                    animation: `${ofloat} 5s ease-in-out infinite`,
                                    zIndex: 15,
                                }}>
                                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#34d399", flexShrink: 0, animation: `${dpulse} 2.5s ease-in-out infinite` }} />
                                    <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>Revenue: +42%</Typography>
                                </Box>

                                {/* ── Pill 1 — Early access link — right ── */}
                                <Box sx={{
                                    position: "absolute", left: 470, top: 128,
                                    background: "rgba(5,12,30,0.95)",
                                    borderRadius: "100px", px: "14px", py: "6px",
                                    border: "1px solid rgba(167,139,250,0.4)",
                                    boxShadow: "0 6px 20px rgba(0,0,10,0.5)",
                                    animation: `${pfloat} 4s ease-in-out infinite`,
                                    zIndex: 15,
                                }}>
                                    <Typography sx={{ fontSize: "10.5px", fontWeight: 600, color: "#c4b5fd", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>Early access link</Typography>
                                </Box>

                                {/* ── Pill 2 — 25% OFF — right ── */}
                                <Box sx={{
                                    position: "absolute", left: 470, top: 172,
                                    background: "rgba(5,12,30,0.95)",
                                    borderRadius: "100px", px: "14px", py: "6px",
                                    border: "1px solid rgba(127,208,255,0.35)",
                                    boxShadow: "0 6px 20px rgba(0,0,10,0.5)",
                                    animation: `${pfloat} 4s ease-in-out infinite 0.7s`,
                                    zIndex: 15,
                                }}>
                                    <Typography sx={{ fontSize: "10.5px", fontWeight: 600, color: "#7fd0ff", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>25% OFF · 2 hrs only</Typography>
                                </Box>

                                {/* ── Floating Data Particles ── */}
                                {[
                                    { left: 100, top: 150, size: 4, delay: 0 },
                                    { left: 520, top: 320, size: 6, delay: 1 },
                                    { left: 180, top: 410, size: 3, delay: 2 },
                                    { left: 480, top: 110, size: 5, delay: 1.5 },
                                ].map((p, i) => (
                                    <Box key={i} sx={{
                                        position: "absolute", left: p.left, top: p.top,
                                        width: p.size, height: p.size, borderRadius: "50%",
                                        background: "rgba(127,208,255,0.4)",
                                        filter: "blur(1px)",
                                        animation: `${ofloat} ${4 + i}s ease-in-out infinite ${p.delay}s`,
                                        zIndex: 5,
                                    }} />
                                ))}

                                {/* ── ISO Phone — left:210 top:55 ── */}
                                <Box sx={{
                                    position: "absolute", left: 210, top: 55,
                                    width: 186, height: 390,
                                    transformStyle: "preserve-3d",
                                    transform: "rotateX(35.264deg) rotateZ(-45deg)",
                                    zIndex: 12,
                                }}>
                                    <Box sx={{
                                        position: "absolute", width: 20, height: 390,
                                        background: "linear-gradient(to right, #091420, #0c1a2a)",
                                        borderRadius: "4px 0 0 4px",
                                        transformOrigin: "right center",
                                        transform: "rotateY(90deg) translateZ(-10px)",
                                        right: 186, border: "1px solid rgba(255,255,255,0.05)",
                                    }} />
                                    <Box sx={{
                                        position: "absolute", width: 186, height: 20,
                                        background: "linear-gradient(to bottom, #0c1a2a, #07101e)",
                                        borderRadius: "0 0 4px 4px",
                                        transformOrigin: "top center",
                                        transform: "rotateX(-90deg) translateZ(-10px)",
                                        bottom: -20, border: "1px solid rgba(255,255,255,0.05)",
                                    }} />
                                    <Box sx={{
                                        position: "absolute", width: 186, height: 390,
                                        background: "#101d2e", borderRadius: "36px",
                                        border: "1.5px solid rgba(127,208,255,0.3)",
                                        transform: "translateZ(10px)", overflow: "hidden",
                                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 40px 60px rgba(127,208,255,0.04)",
                                    }}>
                                        <Box sx={{
                                            position: "absolute", left: 0, width: "100%", height: 60,
                                            background: "linear-gradient(to bottom, transparent, rgba(127,208,255,0.04), transparent)",
                                            animation: `${scanAnim} 4s linear infinite`,
                                            zIndex: 10, pointerEvents: "none",
                                        }} />
                                        <Box sx={{
                                            width: "100%", height: "100%", background: "#060e1a",
                                            borderRadius: "34px", display: "flex", flexDirection: "column",
                                            overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                        }}>
                                            <Box sx={{ height: 30, display: "flex", justifyContent: "center", alignItems: "flex-end", pb: "5px", flexShrink: 0 }}>
                                                <Box sx={{ width: 60, height: 16, background: "#000", borderRadius: "12px" }} />
                                            </Box>
                                            <Box sx={{
                                                px: "13px", py: "10px", display: "flex", alignItems: "center", gap: "9px",
                                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                                                background: "rgba(13,30,48,0.9)", flexShrink: 0,
                                            }}>
                                                <Box sx={{
                                                    width: 34, height: 34, borderRadius: "50%",
                                                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "10px", fontWeight: 900, color: "#060e1a", flexShrink: 0,
                                                    animation: `${gpulse} 3s ease-in-out infinite`,
                                                }}>AS</Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>AksharSync</Typography>
                                                    <Typography sx={{ fontSize: "9px", color: "#34d399", mt: "1px" }}>● Online</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, px: "10px", pt: "11px", pb: "6px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
                                                <Box sx={{ borderRadius: "14px 14px 14px 4px", p: "9px 11px", maxWidth: "90%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                                    <Typography sx={{ fontSize: "9.5px", color: "rgba(255,255,255,0.84)", lineHeight: 1.55 }}>The new collection is live! Use your exclusive early-access link:</Typography>
                                                </Box>
                                                <Box sx={{ borderRadius: "14px 14px 14px 4px", p: "9px 11px", maxWidth: "93%", background: "rgba(127,208,255,0.1)", border: "1px solid rgba(127,208,255,0.4)", boxShadow: "inset 0 0 20px rgba(127,208,255,0.08)" }}>
                                                    <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#7fd0ff", mb: "5px" }}>sync.shop/vI3k9</Typography>
                                                    <Typography sx={{ fontSize: "9px", color: "rgba(255,255,255,0.74)", lineHeight: 1.55 }}>Click to shop 25% OFF site-wide for the next 2 hours.</Typography>
                                                </Box>
                                                <Typography sx={{ mt: "auto", textAlign: "center", fontSize: "8px", color: "rgba(255,255,255,0.2)", py: "3px" }}>Text STOP to opt-out</Typography>
                                            </Box>
                                            <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
                                                <Box sx={{ width: 56, height: 4, borderRadius: "3px", background: "rgba(255,255,255,0.2)" }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    position: "absolute", left: 160, bottom: 30,
                                    width: 300, height: 28,
                                    background: "radial-gradient(ellipse, rgba(10,20,60,0.7) 0%, transparent 72%)",
                                    borderRadius: "50%", zIndex: 5,
                                }} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 2 — Professional SMS Marketing Company
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 12, md: 18 },
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.04)",
                "&::before": {
                    content: '""',
                    position: "absolute", inset: 0,
                    backgroundImage: `
                        radial-gradient(circle at 15% 50%, rgba(127,208,255,0.05) 0%, transparent 50%),
                        radial-gradient(circle at 85% 20%, rgba(167,139,250,0.05) 0%, transparent 45%)`,
                    pointerEvents: "none",
                },
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
                            gap: { xs: 8, md: 10 },
                            alignItems: "center",
                        }}>
                            {/* ── Left: SMS Campaign Hub Visual ──────────────────── */}
                            <Box sx={{ position: "relative", height: { xs: "auto", md: 540 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Box sx={{
                                    position: "absolute",
                                    width: 380, height: 380,
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)",
                                    animation: `${pulseGlow} 5s ease-in-out infinite`,
                                    zIndex: 0,
                                }} />
                                <Box sx={{
                                    position: "absolute",
                                    width: 320, height: 320,
                                    borderRadius: "50%",
                                    border: "1px dashed rgba(127,208,255,0.08)",
                                    animation: `${floatY} 12s linear infinite`,
                                }} />
                                <Box sx={{
                                    position: "absolute",
                                    width: 460, height: 460,
                                    borderRadius: "50%",
                                    border: "1px dashed rgba(167,139,250,0.06)",
                                }} />
                                <Box sx={{
                                    position: "relative",
                                    width: 120, height: 120,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(127,208,255,0.15) 0%, rgba(167,139,250,0.15) 100%)",
                                    border: "1px solid rgba(127,208,255,0.3)",
                                    backdropFilter: "blur(20px)",
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 0 60px rgba(127,208,255,0.2), 0 0 120px rgba(127,208,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                                    zIndex: 10,
                                }}>
                                    {[1, 2, 3].map(n => (
                                        <Box key={n} sx={{
                                            position: "absolute",
                                            inset: -(n * 16),
                                            borderRadius: "50%",
                                            border: `1px solid ${alpha("#7fd0ff", 0.15 / n)}`,
                                            animation: `${pulseGlow} ${3 + n}s ease-in-out infinite ${n * 0.6}s`,
                                        }} />
                                    ))}
                                    <BroadcastIcon sx={{ fontSize: 32, color: "#7fd0ff" }} />
                                    <Typography sx={{ color: "#34d399", fontSize: "0.55rem", fontWeight: 900, letterSpacing: "0.12em", mt: 0.5 }}>LIVE</Typography>
                                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.08em" }}>BROADCASTING</Typography>
                                </Box>

                                <Box sx={{
                                    position: "absolute", top: "4%", left: "0%",
                                    maxWidth: 200,
                                    px: 2, py: 1.5, borderRadius: "16px 16px 16px 4px",
                                    background: "linear-gradient(135deg, rgba(13,31,56,0.95), rgba(8,20,42,0.98))",
                                    border: "1px solid rgba(127,208,255,0.2)",
                                    backdropFilter: "blur(16px)",
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(127,208,255,0.05)",
                                    animation: `${floatY} 5.5s ease-in-out infinite`,
                                    zIndex: 8,
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                                        <PackageIcon sx={{ fontSize: 14, color: "#7fd0ff" }} />
                                        <Typography sx={{ color: "#7fd0ff", fontSize: "0.68rem", fontWeight: 800 }}>Order Shipped!</Typography>
                                    </Box>
                                    <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>Your order #4821 is on its way. Track here →</Typography>
                                </Box>

                                <Box sx={{
                                    position: "absolute", bottom: "6%", left: "2%",
                                    maxWidth: 195,
                                    px: 2, py: 1.5, borderRadius: "16px 16px 16px 4px",
                                    background: "linear-gradient(135deg, rgba(13,31,56,0.95), rgba(8,20,42,0.98))",
                                    border: "1px solid rgba(167,139,250,0.25)",
                                    backdropFilter: "blur(16px)",
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                                    animation: `${floatY} 6.5s ease-in-out infinite 1s`,
                                    zIndex: 8,
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                                        <TargetIcon sx={{ fontSize: 14, color: "#a78bfa" }} />
                                        <Typography sx={{ color: "#a78bfa", fontSize: "0.68rem", fontWeight: 800 }}>Flash Sale — 4hrs Left</Typography>
                                    </Box>
                                    <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>Use code SYNC25 for 25% off everything.</Typography>
                                </Box>

                                <Box sx={{
                                    position: "absolute", top: "30%", right: "-4%",
                                    maxWidth: 190,
                                    px: 2, py: 1.5, borderRadius: "16px 16px 4px 16px",
                                    background: "linear-gradient(135deg, rgba(13,31,56,0.95), rgba(8,20,42,0.98))",
                                    border: "1px solid rgba(52,211,153,0.25)",
                                    backdropFilter: "blur(16px)",
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                                    animation: `${floatY} 4.8s ease-in-out infinite 0.4s`,
                                    zIndex: 8,
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                                        <WinBackIcon sx={{ fontSize: 14, color: "#34d399" }} />
                                        <Typography sx={{ color: "#34d399", fontSize: "0.68rem", fontWeight: 800 }}>Win-Back Campaign</Typography>
                                    </Box>
                                    <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>We miss you! Here's 30% off to come back.</Typography>
                                </Box>

                                {/* ── Floating Metric Chip — top-right ── */}
                                <Box sx={{
                                    position: "absolute", top: "2%", right: "5%",
                                    px: 2, py: 1.2, borderRadius: "50px",
                                    background: "rgba(13,31,56,0.9)",
                                    border: "1px solid rgba(52,211,153,0.3)",
                                    backdropFilter: "blur(16px)",
                                    display: "flex", alignItems: "center", gap: 1.5,
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                                    animation: `${floatY} 4s ease-in-out infinite reverse`,
                                    zIndex: 9,
                                }}>
                                    <Box sx={{
                                        width: 28, height: 28, borderRadius: "8px",
                                        background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))",
                                        border: "1px solid rgba(52,211,153,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#34d399",
                                    }}>
                                        <TrendUpIcon sx={{ fontSize: 16 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ color: "#34d399", fontSize: "0.8rem", fontWeight: 900, lineHeight: 1 }}>+320%</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.55rem" }}>Growth</Typography>
                                    </Box>
                                </Box>

                                {/* ── Floating Metric Chip — bottom-right ── */}
                                <Box sx={{
                                    position: "absolute", bottom: "2%", right: "12%",
                                    px: 2, py: 1.2, borderRadius: "50px",
                                    background: "rgba(13,31,56,0.9)",
                                    border: "1px solid rgba(251,191,36,0.3)",
                                    backdropFilter: "blur(16px)",
                                    display: "flex", alignItems: "center", gap: 1.5,
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                                    animation: `${floatY} 5.2s ease-in-out infinite 0.8s`,
                                    zIndex: 9,
                                }}>
                                    <Box sx={{
                                        width: 28, height: 28, borderRadius: "8px",
                                        background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05))",
                                        border: "1px solid rgba(251,191,36,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fbbf24",
                                    }}>
                                        <BoltIcon sx={{ fontSize: 16 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ color: "#fbbf24", fontSize: "0.8rem", fontWeight: 900, lineHeight: 1 }}>1k+ Brands</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* ── Right: Content ─────────────────────────────────── */}
                            <Box>
                                <HeroChip sx={{ mb: 3.5 }}>Professional SMS Marketing Company</HeroChip>
                                <Typography variant="h2" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" },
                                    lineHeight: 1.08, letterSpacing: "-0.025em",
                                    color: "#fff", mb: 2,
                                }}>
                                    AksharSync is a <br />
                                    <GradientText>Professional SMS</GradientText> <br />
                                    Marketing Company
                                </Typography>
                                <Box sx={{
                                    display: "inline-flex", alignItems: "center", gap: 1.5,
                                    px: 2.5, py: 1.2, borderRadius: "50px",
                                    background: "rgba(127,208,255,0.05)",
                                    border: "1px solid rgba(127,208,255,0.1)",
                                    mb: 4.5,
                                }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Typography key={i} sx={{ fontSize: "0.9rem", color: "#fbbf24" }}>★</Typography>
                                    ))}
                                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.82rem", ml: 0.5 }}>
                                        Trusted by <strong style={{ color: "#fff" }}>1,000+</strong> eCommerce Brands
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: alpha("#fff", 0.58), fontSize: { xs: "1.05rem", md: "1.18rem" }, lineHeight: 1.9, mb: 3.5 }}>
                                    It's crucial to have a solid plan and carefully craft each message you send.
                                    For this, you need an expert in the field like AksharSync. You can entrust our
                                    SMS marketing company to completely manage it for you, so you don't have to
                                    add more hours to your workload.
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 6 }}>
                                    {[
                                        { text: "Full-service SMS campaign strategy & execution", color: "#7fd0ff" },
                                        { text: "List growth, segmentation & audience targeting", color: "#34d399" },
                                        { text: "A/B testing & performance optimization", color: "#a78bfa" },
                                        { text: "Compliance-first approach — TCPA & GDPR ready", color: "#fbbf24" },
                                    ].map((item, i) => (
                                        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                            <Box sx={{
                                                width: 22, height: 22, borderRadius: "50%",
                                                background: alpha(item.color, 0.12),
                                                border: `1px solid ${alpha(item.color, 0.3)}`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, mt: 0.2,
                                            }}>
                                                <Typography sx={{ fontSize: "0.65rem", color: item.color, fontWeight: 900 }}>✓</Typography>
                                            </Box>
                                            <Typography sx={{ color: alpha("#fff", 0.7), fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 500 }}>{item.text}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Button variant="contained" endIcon={<ArrowForwardIcon />} sx={{
                                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                    color: "#060e1a", px: 5, py: 2, borderRadius: "14px", fontWeight: 800, textTransform: "none", fontSize: "1rem", boxShadow: "0 16px 36px rgba(127,208,255,0.25)",
                                    "&:hover": { transform: "translateY(-4px)", boxShadow: "0 24px 48px rgba(127,208,255,0.35)", background: "linear-gradient(135deg, #99ddff 0%, #b8a2ff 100%)" }, transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                                }}>Work With Our Team</Button>
                            </Box>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 3 — SMS Marketing Services
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 5, md: 10 },
                position: "relative",
                bgcolor: "#081121",
                "&::before": {
                    content: '""',
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(127,208,255,0.15), transparent)",
                }
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", mb: { xs: 10, md: 14 } }}>

                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
                                lineHeight: 1.1, mb: 3,
                                color: "#fff",
                            }}>
                                SMS Marketing Services by <GradientText>AksharSync</GradientText>
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.5),
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                lineHeight: 1.8, maxWidth: 800, mx: "auto",
                            }}>
                                Our SMS marketing agency manages every aspect of your text promotions.
                                Spend minimum time providing feedback and enjoy the results.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                            gap: 4,
                        }}>
                            {[
                                {
                                    title: "Hassle-Free SMS Migration",
                                    desc: "We will handle the entire migration process, ensuring a smooth and secure transfer of all SMS assets.",
                                    icon: <TransferIcon sx={{ fontSize: 28 }} />,
                                    color: "#7fd0ff"
                                },
                                {
                                    title: "Seamless SMS Integration",
                                    desc: "We will optimize the performance of your key email automations with strategically placed SMS messages.",
                                    icon: <BlueTickIcon sx={{ fontSize: 28 }} />,
                                    color: "#a78bfa"
                                },
                                {
                                    title: "Legally Compliant Opt-ins",
                                    desc: "We will collect SMS consent across multiple touchpoints to ensure legal compliance.",
                                    icon: <WeightICon sx={{ fontSize: 28 }} />,
                                    color: "#34d399"
                                },
                                {
                                    title: "Comprehensive Campaign Management",
                                    desc: "We will manage your SMS content calendar, integrating it into your email and social strategies.",
                                    icon: <AnnouncementIcon sx={{ fontSize: 28 }} />,
                                    color: "#fbbf24"
                                },
                                {
                                    title: "Ongoing Optimization",
                                    desc: "We will continuously test your campaigns to ensure healthy deliverability and maximum performance.",
                                    icon: <OngoingIcons sx={{ fontSize: 28 }} />,
                                    color: "#f43f5e"
                                },
                                {
                                    title: "Detailed Reporting",
                                    desc: "We will prepare monthly performance reports to keep you informed about the impact of our strategies.",
                                    icon: <SmsIcon sx={{ fontSize: 28 }} />,
                                    color: "#0ea5e9"
                                }
                            ].map((item, i) => (
                                <Box key={i} sx={{
                                    p: 5, borderRadius: "24px",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        background: "rgba(255,255,255,0.04)",
                                        borderColor: alpha(item.color, 0.3),
                                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${alpha(item.color, 0.1)}`,
                                        "& .icon-box": {
                                            transform: "rotateY(180deg)",
                                            background: alpha(item.color, 0.2),
                                        }
                                    }
                                }}>
                                    <Box className="icon-box" sx={{
                                        width: 60, height: 60, borderRadius: "16px",
                                        background: alpha(item.color, 0.1),
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        mb: 4, color: item.color,
                                        transition: "all 0.6s ease",
                                        border: `1px solid ${alpha(item.color, 0.2)}`,
                                    }}>
                                        {item.icon}
                                    </Box>
                                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", mb: 2 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.95rem", lineHeight: 1.7 }}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ mt: 10, textAlign: "center" }}>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                    color: "#060e1a", px: 6, py: 2.5,
                                    borderRadius: "16px", fontWeight: 900,
                                    textTransform: "none", fontSize: "1.1rem",
                                    boxShadow: "0 20px 40px rgba(127,208,255,0.25)",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 25px 50px rgba(127,208,255,0.35)",
                                        background: "linear-gradient(135deg, #99ddff 0%, #b8a2ff 100%)",
                                    },
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                }}
                            >
                                Schedule A Call
                            </Button>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 4 — Why Hire a Professional SMS Agency?
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 15, md: 22 },
                position: "relative",
                bgcolor: "#060e1a",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute", inset: 0,
                    background: "radial-gradient(circle at 80% 50%, rgba(127,208,255,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                }
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        {/* Header */}
                        <Box sx={{ mb: { xs: 8, md: 10 } }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
                                lineHeight: 1.1, mb: 3, color: "#fff",
                            }}>
                                Why Hire a Professional SMS Agency?
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.6),
                                fontSize: { xs: "1.1rem", md: "1.2rem" },
                                lineHeight: 1.8, maxWidth: 850,
                            }}>
                                When you have an ecommerce business to run, a DIY project is not an option when it comes to marketing.
                                Only with the help of an expert SMS marketing agency, you’ll be able to achieve desired results.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            gap: { xs: 10, md: 4 },
                            alignItems: "center",
                        }}>
                            {/* ── Left: Checklist Grid ────────────────────────── */}
                            <Box sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                gap: { xs: 4, md: 6 },
                            }}>
                                {[
                                    {
                                        title: "Efficient Use of Time & Resources",
                                        desc: "Enjoy the impact of expert SMS marketing services without adding more to your plate."
                                    },
                                    {
                                        title: "Guaranteed Results",
                                        desc: "We have the expertise and experience you need to ensure a positive ROI."
                                    },
                                    {
                                        title: "Technical Competence",
                                        desc: "We set up your text messages for maximum performance."
                                    },
                                    {
                                        title: "Avoiding Costly Errors",
                                        desc: "Marketing via SMS can be complex, but we ensure smooth, error-free operations."
                                    },
                                    {
                                        title: "Strategy Optimization",
                                        desc: "We will monitor your SMS performance beyond the initial setup for best results."
                                    }
                                ].map((item, i) => (
                                    <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
                                        <Box sx={{ color: "#7fd0ff", mt: 0.5 }}>
                                            <Typography sx={{ fontWeight: 900, fontSize: "1.3rem" }}>✓</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", mb: 1, lineHeight: 1.3 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.9rem", lineHeight: 1.6 }}>
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            {/* ── Right: Image Composition (SMS Bubbles) ──────── */}
                            <Box sx={{ position: "relative", height: { xs: 350, md: 450 }, display: "flex", alignItems: "center", justifyContent: "center" }}>

                                {/* Orbital Rings */}
                                <Box sx={{
                                    position: "absolute", width: 380, height: 380,
                                    borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.1)",
                                    animation: `${floatY} 15s linear infinite`,
                                }} />
                                <Box sx={{
                                    position: "absolute", width: 280, height: 280,
                                    borderRadius: "50%", border: "1px dashed rgba(127,208,255,0.15)",
                                    animation: `${floatY} 10s linear infinite reverse`,
                                }} />

                                {/* White/Gray SMS Bubble */}
                                <Box sx={{
                                    position: "absolute", top: "10%", right: "10%",
                                    animation: `${ofloat} 5s ease-in-out infinite`,
                                    zIndex: 5,
                                }}>
                                    <Typography sx={{ fontSize: "0.65rem", color: alpha("#fff", 0.3), mb: 0.5, ml: 1, fontWeight: 600 }}>Company Name</Typography>
                                    <Box sx={{
                                        bgcolor: "#f1f5f9", p: "14px 20px", borderRadius: "20px 20px 4px 20px",
                                        maxWidth: 240, boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                                        border: "1px solid #fff",
                                    }}>
                                        <Typography sx={{ color: "#1e293b", fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.5 }}>
                                            Hey you! 👋 We've got new products dropping every week for you and your family. Shop now: <Box component="span" sx={{ fontWeight: 800 }}>FAMILY5</Box>
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Green SMS Bubble */}
                                <Box sx={{
                                    position: "absolute", bottom: "15%", left: "5%",
                                    animation: `${ofloat} 6s ease-in-out infinite 0.5s`,
                                    zIndex: 10,
                                }}>
                                    <Typography sx={{ fontSize: "0.65rem", color: alpha("#fff", 0.3), mb: 0.5, ml: 1, fontWeight: 600 }}>Company Name</Typography>
                                    <Box sx={{
                                        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                        p: "14px 22px", borderRadius: "20px 20px 20px 4px",
                                        maxWidth: 220, boxShadow: "0 20px 40px rgba(34,197,94,0.2)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}>
                                        <Typography sx={{ color: "#fff", fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>
                                            We miss you! 🥹 <br />
                                            Have you seen our new items?
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Center Icon/Glow */}
                                <Box sx={{
                                    position: "relative", width: 80, height: 80,
                                    borderRadius: "50%", background: "rgba(127,208,255,0.05)",
                                    border: "1px solid rgba(127,208,255,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    zIndex: 1,
                                }}>
                                    <SmsIcon sx={{ fontSize: 32, color: alpha("#fff", 0.1) }} />
                                    <Box sx={{
                                        position: "absolute", inset: -20,
                                        background: "radial-gradient(circle, rgba(127,208,255,0.1) 0%, transparent 70%)",
                                        animation: `${pulseGlow} 4s ease-in-out infinite`,
                                    }} />
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 5 — How We Approach SMS Marketing
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 5, md: 10 },
                position: "relative",
                bgcolor: "#060e1a",
                "&::before": {
                    content: '""',
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(127,208,255,0.1), transparent)",
                }
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", mb: { xs: 0, md: -10 } }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
                                lineHeight: 1.1, mb: 3, color: "#fff",
                            }}>
                                How We Approach <GradientText>SMS Marketing</GradientText>
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.5),
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                lineHeight: 1.8, maxWidth: 850, mx: "auto",
                            }}>
                                Our SMS marketing experts adhere to the best practices to create the best campaigns
                                and text message promotions that can bring your eCommerce business the most revenue.
                            </Typography>
                        </Box>
                    </Container>

                    <SMSProcessTimeline />

                    <Container maxWidth="lg">
                        <Box sx={{
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden"
                        }}>
                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: "#fff" }}>
                                    Ready to get started?
                                </Typography>
                                <Typography sx={{ color: alpha("#fff", 0.5), mb: 5, fontSize: "1.1rem" }}>
                                    Schedule a free consultation with our team and learn about your next steps.
                                </Typography>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                        color: "#060e1a", px: 6, py: 2.2,
                                        borderRadius: "16px", fontWeight: 900,
                                        textTransform: "none", fontSize: "1.1rem",

                                    }}
                                >
                                    Get Started
                                </Button>
                            </Box>

                            {/* Decorative glow */}
                            <Box sx={{
                                position: "absolute", top: "-50%", right: "-20%",
                                width: 300, height: 300,
                                background: "radial-gradient(circle, rgba(127,208,255,0.15) 0%, transparent 70%)",
                                filter: "blur(40px)", pointerEvents: "none"
                            }} />
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 6 — Frequently Asked Questions
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 10, md: 15 },
                position: "relative",
                bgcolor: "#081121",
                "&::before": {
                    content: '""',
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)",
                }
            }}>
                <RevealOnScroll>
                    <Container maxWidth="md">
                        <FAQComponent
                            subtitle="Everything you need to know about our SMS marketing services and pricing."
                            items={[
                                {
                                    question: "What is SMS marketing?",
                                    answer: "SMS marketing is a strategy that involves sending promotional text messages to your audience. By using an SMS marketing platform, you can reach your customers directly through their phones. It’s a marketing method proven effective to promote your brand, inform customers about product updates, and announce sales or special offers."
                                },
                                {
                                    question: "How much do your SMS marketing services cost?",
                                    answer: "The price of SMS promotions depends on three main factors: the number of texts you send, the frequency of your campaigns, additional features you may need, and your SMS marketing provider’s fees. The average price is between $0.10 and $0.50 per text message. For a precise quote, please contact our team."
                                },
                                {
                                    question: "How to collect phone numbers for SMS marketing?",
                                    answer: "You can collect phone numbers in several ways. One effective method is to offer users the option to subscribe to SMS messages when they sign up for your email list. Another approach is to use a pop-up on your blog or website, inviting your website visitors to receive SMS updates."
                                },
                                {
                                    question: "What is the best time to send SMS campaigns?",
                                    answer: "The best time to send your SMS marketing campaigns depends on your audience’s habits and preferences. Before launching SMS campaigns, we study your audience’s behavior as well as your SMS marketing campaign analytics."
                                }
                            ]}
                        />

                        <Box sx={{ mt: 6, textAlign: "center" }}>
                            <Box sx={{ mt: 6, textAlign: "center" }}>
                                <ExpertCTA text='Talk to a Flowium Expert' />
                            </Box>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>
        </Box>
    );
};

export default SMSService;
