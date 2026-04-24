import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, alpha, Fade } from "@mui/material";
import { keyframes } from "@mui/system";
import { HeroChip, GradientText } from "../../components/Landing/Shared";
import { SmsIcon, BroadcastIcon, PackageIcon, TargetIcon, WinBackIcon, TrendUpIcon, BoltIcon } from "../../components/icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ─── Animations ────────────────────────────────────────────────────────────────

const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
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
                        gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                        gap: { xs: 10, md: 6 },
                        alignItems: "center",
                    }}>
                        {/* ── Left: Text ─────────────────────────────────────── */}
                        <Fade in={visible} timeout={800}>
                            <Box sx={{ animation: `${slideInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1)` }}>
                                <HeroChip sx={{ mb: 3.5 }}>
                                    <SmsIcon sx={{ fontSize: 16 }} />
                                    Full-Service SMS Agency
                                </HeroChip>

                                <Typography variant="h1" sx={{
                                    fontWeight: 950,
                                    fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.4rem" },
                                    lineHeight: 1.05, mb: 3.5, color: "#fff",
                                    letterSpacing: "-0.03em",
                                }}>
                                    Increase Revenue with Our <br />
                                    <GradientText>SMS Marketing Agency</GradientText>
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.55),
                                    fontSize: { xs: "1.1rem", md: "1.28rem" },
                                    lineHeight: 1.85, maxWidth: 620, mb: 6.5, fontWeight: 400,
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

                        {/* ── Right: Phone Mockup ─────────────────────────────── */}
                        <Box sx={{
                            position: "relative", display: "flex",
                            justifyContent: "center", alignItems: "center",
                            animation: `${floatY} 6s ease-in-out infinite`,
                        }}>
                            <Box sx={{
                                position: "absolute", width: "120%", height: "120%",
                                background: "radial-gradient(circle, rgba(127,208,255,0.12) 0%, transparent 60%)",
                                animation: `${pulseGlow} 4s ease-in-out infinite`, zIndex: -1,
                            }} />

                            {/* Phone Frame */}
                            <Box sx={{
                                width: { xs: 280, md: 320 }, height: { xs: 560, md: 640 },
                                borderRadius: "48px", p: "12px",
                                background: "#1a2a3b",
                                boxShadow: "0 50px 100px rgba(0,0,0,0.7), inset 0 0 40px rgba(127,208,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}>
                                {/* Screen */}
                                <Box sx={{
                                    width: "100%", height: "100%",
                                    background: "#060e1a", borderRadius: "38px",
                                    overflow: "hidden", position: "relative",
                                    display: "flex", flexDirection: "column",
                                }}>
                                    {/* Status Bar */}
                                    <Box sx={{ height: 44, display: "flex", justifyContent: "center", alignItems: "flex-end", pb: 1 }}>
                                        <Box sx={{ width: 60, height: 18, borderRadius: "20px", background: "#000" }} />
                                    </Box>

                                    {/* App Header */}
                                    <Box sx={{
                                        p: 2.5, display: "flex", alignItems: "center", gap: 2,
                                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    }}>
                                        <Box sx={{
                                            width: 40, height: 40, borderRadius: "50%",
                                            background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontWeight: 800, color: "#060e1a", fontSize: "0.9rem",
                                        }}>AS</Box>
                                        <Box>
                                            <Typography sx={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700 }}>AksharSync</Typography>
                                            <Typography sx={{ color: "#34d399", fontSize: "0.65rem", fontWeight: 600 }}>● Online</Typography>
                                        </Box>
                                    </Box>

                                    {/* Chat Feed */}
                                    <Box sx={{ flex: 1, p: 2.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
                                        <Box sx={{
                                            alignSelf: "flex-start", maxWidth: "85%", p: 2.2,
                                            borderRadius: "20px 20px 20px 6px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                        }}>
                                            <Typography sx={{ color: alpha("#fff", 0.8), fontSize: "0.88rem", lineHeight: 1.5 }}>
                                                The new collection is live! Use your exclusive early-access link:
                                            </Typography>
                                        </Box>

                                        <Box sx={{
                                            alignSelf: "flex-start", maxWidth: "85%", p: 2.2,
                                            borderRadius: "20px 20px 20px 6px",
                                            background: "linear-gradient(135deg, rgba(127,208,255,0.15), rgba(167,139,250,0.15))",
                                            border: "1px solid rgba(127,208,255,0.3)",
                                            boxShadow: "0 10px 25px rgba(127,208,255,0.15)",
                                        }}>
                                            <Typography sx={{ color: "#7fd0ff", fontSize: "0.9rem", fontWeight: 700, mb: 1 }}>
                                                sync.shop/vI3k9
                                            </Typography>
                                            <Typography sx={{ color: alpha("#fff", 0.7), fontSize: "0.85rem", lineHeight: 1.4 }}>
                                                Click to shop 25% OFF site-wide for the next 2 hours.
                                            </Typography>
                                        </Box>

                                        <Typography sx={{
                                            alignSelf: "center", mt: "auto", mb: 2,
                                            color: alpha("#fff", 0.2), fontSize: "0.7rem", letterSpacing: "0.05em",
                                        }}>
                                            Text STOP to opt-out
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Floating Badge — Revenue */}
                            <Box sx={{
                                position: "absolute", bottom: "20%", left: "-18%",
                                px: 2, py: 1.5, borderRadius: "16px",
                                background: "rgba(13,31,56,0.95)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(127,208,255,0.25)",
                                display: "flex", alignItems: "center", gap: 1.5,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                                animation: `${floatY} 5s ease-in-out infinite 0.5s`,
                            }}>
                                <Box sx={{
                                    width: 10, height: 10, borderRadius: "50%", bgcolor: "#34d399",
                                    animation: `${pulseGlow} 2s infinite`,
                                }} />
                                <Typography sx={{ color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>Revenue: +42%</Typography>
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
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" },
                        gap: { xs: 8, md: 10 },
                        alignItems: "center",
                    }}>
                        {/* ── Left: SMS Campaign Hub Visual ──────────────────── */}
                        <Box sx={{ position: "relative", height: { xs: "auto", md: 540 }, display: "flex", alignItems: "center", justifyContent: "center" }}>

                            {/* ── Outer ambient glow ── */}
                            <Box sx={{
                                position: "absolute",
                                width: 380, height: 380,
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(127,208,255,0.07) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)",
                                animation: `${pulseGlow} 5s ease-in-out infinite`,
                                zIndex: 0,
                            }} />

                            {/* ── Orbit ring 1 ── */}
                            <Box sx={{
                                position: "absolute",
                                width: 320, height: 320,
                                borderRadius: "50%",
                                border: "1px dashed rgba(127,208,255,0.08)",
                                animation: `${floatY} 12s linear infinite`,
                            }} />

                            {/* ── Orbit ring 2 ── */}
                            <Box sx={{
                                position: "absolute",
                                width: 460, height: 460,
                                borderRadius: "50%",
                                border: "1px dashed rgba(167,139,250,0.06)",
                            }} />

                            {/* ── Central LIVE Broadcast Hub ── */}
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
                                {/* Pulse rings */}
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

                            {/* ── SMS Message Bubble 1 — top-left ── */}
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
                                    <Typography sx={{ color: "#7fd0ff", fontSize: "0.68rem", fontWeight: 800 }}>
                                        Order Shipped!
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>
                                    Your order #4821 is on its way. Track here →
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1 }}>
                                    <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#34d399" }} />
                                    <Typography sx={{ fontSize: "0.55rem", color: "#34d399", fontWeight: 700 }}>Delivered · 2s ago</Typography>
                                </Box>
                            </Box>

                            {/* ── SMS Message Bubble 2 — bottom-left ── */}
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
                                    <Typography sx={{ color: "#a78bfa", fontSize: "0.68rem", fontWeight: 800 }}>
                                        Flash Sale — 4hrs Left
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>
                                    Use code SYNC25 for 25% off everything.
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1 }}>
                                    <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#a78bfa" }} />
                                    <Typography sx={{ fontSize: "0.55rem", color: "#a78bfa", fontWeight: 700 }}>Opened · 98% rate</Typography>
                                </Box>
                            </Box>

                            {/* ── SMS Message Bubble 3 — right ── */}
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
                                    <Typography sx={{ color: "#34d399", fontSize: "0.68rem", fontWeight: 800 }}>
                                        Win-Back Campaign
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.62rem", lineHeight: 1.4 }}>
                                    We miss you! Here's 30% off to come back.
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 1 }}>
                                    <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#fbbf24" }} />
                                    <Typography sx={{ fontSize: "0.55rem", color: "#fbbf24", fontWeight: 700 }}>CTR: +34% ↑</Typography>
                                </Box>
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
                                    <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.55rem" }}>Revenue Growth</Typography>
                                </Box>
                            </Box>

                            {/* ── Floating Metric Chip — bottom-center ── */}
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
                                    <Typography sx={{ color: "#fbbf24", fontSize: "0.8rem", fontWeight: 900, lineHeight: 1 }}>1,000+</Typography>
                                    <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.55rem" }}>Brands Served</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* ── Right: Content ─────────────────────────────────── */}
                        <Box>
                            <HeroChip sx={{ mb: 3.5 }}>
                                Professional SMS Marketing Company
                            </HeroChip>

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

                            {/* Star Trust Row */}
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

                            <Typography sx={{
                                color: alpha("#fff", 0.58),
                                fontSize: { xs: "1.05rem", md: "1.18rem" },
                                lineHeight: 1.9, mb: 3.5,
                            }}>
                                It's crucial to have a solid plan and carefully craft each message you send.
                                For this, you need an expert in the field like AksharSync. You can entrust our
                                SMS marketing company to completely manage it for you, so you don't have to
                                add more hours to your workload.
                            </Typography>

                            <Typography sx={{
                                color: alpha("#fff", 0.58),
                                fontSize: { xs: "1.05rem", md: "1.18rem" },
                                lineHeight: 1.9, mb: 6,
                            }}>
                                At AksharSync, we use our{" "}
                                <Box component="span" sx={{ color: "#7fd0ff", fontWeight: 700 }}>
                                    7 years of experience
                                </Box>{" "}
                                and expertise in ecommerce marketing to deliver optimal results for our clients.
                            </Typography>

                            {/* Feature Checks */}
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
                                        <Typography sx={{
                                            color: alpha("#fff", 0.7),
                                            fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 500,
                                        }}>
                                            {item.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                    color: "#060e1a", px: 5, py: 2,
                                    borderRadius: "14px", fontWeight: 800,
                                    textTransform: "none", fontSize: "1rem",
                                    boxShadow: "0 16px 36px rgba(127,208,255,0.25)",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 24px 48px rgba(127,208,255,0.35)",
                                        background: "linear-gradient(135deg, #99ddff 0%, #b8a2ff 100%)",
                                    },
                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                }}
                            >
                                Work With Our Team
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default SMSService;
