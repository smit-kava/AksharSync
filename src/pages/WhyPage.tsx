import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ExpertCTA as CommonExpertCTA } from "../components";
import { GradientText } from "../components/Landing/Shared";
import RevealOnScroll from "../components/RevealOnScroll";
import {
    ArchitectureIcon,
    BoltIcon,
    OngoingIcons,
    TargetIcon,
    TrendUpIcon
} from "../components/icons";
import { EuIcons, GlobeIcon, IndiaFlagIcon, NetherlandsFlagIcon, UKFlagIcon } from "../components/icons/Icons";

// ─── Animations ───────────────────────────────────────────────────────────────



const scrollX = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const glow = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const borderPulse = keyframes`
  0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
  50% { border-color: rgba(52, 211, 153, 0.8); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const MarqueeTrack = styled(Box)({
    display: "flex",
    gap: "10px",
    width: "max-content",
    animation: `${scrollX} 25s linear infinite`,
    "&:hover": {
        animationPlayState: "paused"
    }
});

const PTag = styled(Box)(({ }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 14px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid",
    whiteSpace: "nowrap",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.05)"
    }
}));

// ─── Animated Stat Card ───────────────────────────────────────────────────────
function StatCard({ n, l, color, delay }: { n: string; l: string; color: string; delay: number }) {
    const numericStr = n.replace(/[^0-9]/g, "");
    const suffix = n.replace(/[0-9]/g, "");
    const target = parseInt(numericStr, 10) || 0;

    const motionVal = useMotionValue(0);
    // Round to nearest integer for display
    const displayVal = useTransform(motionVal, (v) => Math.round(v));

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionVal, target, {
                duration: 1.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: delay,
            });
            return () => controls.stop();
        }
    }, [isInView]);

    return (
        <motion.div
            ref={ref as any}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            style={{ flex: 1 }}
        >
            <Box sx={{
                textAlign: "center", py: { xs: 3, md: 4 }, px: 2,
                position: "relative",
                "&:after": {
                    content: '""',
                    position: "absolute", bottom: 0, left: "10%", right: "10%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${color}33, transparent)`
                }
            }}>
                <Typography component="div" sx={{
                    fontSize: { xs: "2rem", md: "2.6rem" },
                    fontWeight: 900,
                    lineHeight: 1,
                    mb: 0.8,
                    background: `linear-gradient(135deg, #fff 0%, ${color} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em",
                }}>
                    <motion.span>{displayVal}</motion.span>{suffix}
                </Typography>
                <Typography sx={{
                    fontSize: "0.7rem",
                    color: alpha("#fff", 0.35),
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600
                }}>
                    {l}
                </Typography>
            </Box>
        </motion.div>
    );
}

const WhyPage = () => {
    const stats = [
        { n: "10+", l: "Years since 2014", color: "#7fd0ff" },
        { n: "7", l: "ESP platforms", color: "#a78bfa" },
        { n: "5+", l: "Global regions", color: "#34d399" },
        { n: "100%", l: "White-label ready", color: "#fbbf24" }
    ];

    const coreAdvantages = [
        {
            title: "White-label ready",
            desc: "Built for agencies needing reliable backend retention execution. We operate as your silent technical partner.",
            icon: <ArchitectureIcon sx={{ color: "#7fd0ff", fontSize: 20 }} />,
            bg: "rgba(127,208,255,0.08)",
            color: "#7fd0ff"
        },
        {
            title: "Revenue-focused strategy",
            desc: "We focus on repeat purchases, retention, and CLV — not vanity metrics. Every sync is built for profit.",
            icon: <TrendUpIcon sx={{ color: "#34d399", fontSize: 20 }} />,
            bg: "rgba(52,211,153,0.08)",
            color: "#34d399"
        },
        {
            title: "Global delivery capability",
            desc: "Serving India, UK, EU, Netherlands, and international ecommerce businesses with localized precision.",
            icon: <TargetIcon sx={{ color: "#a78bfa", fontSize: 20 }} />,
            bg: "rgba(167,139,250,0.08)",
            color: "#a78bfa"
        }
    ];

    const expertiseItems = [
        {
            title: "Email development expertise since 2014",
            desc: "Deep operational experience across lifecycle systems and complex ESP integrations, developed over a decade of real delivery work.",
            icon: <OngoingIcons sx={{ color: "#fbbf24", fontSize: 20 }} />,
            bg: "rgba(251,191,36,0.08)"
        },
        {
            title: "Enterprise ESP experience",
            desc: "Hands-on delivery across Klaviyo, Shopify, Deployteq, BSI, HubSpot, Braze, and Salesforce — all production-grade.",
            icon: <BoltIcon sx={{ color: "#f43f5e", fontSize: 20 }} />,
            bg: "rgba(244,63,94,0.08)"
        }
    ];

    const platforms = [
        "Klaviyo", "Shopify", "Deployteq", "HubSpot", "Braze", "Salesforce", "BSI",
        "India", "UK", "EU", "Netherlands"
    ];

    const regions = [
        { name: "India", flag: <IndiaFlagIcon />, isSpecial: false },
        { name: "UK", flag: <UKFlagIcon />, isSpecial: false },
        { name: "EU", flag: <EuIcons />, isSpecial: false },
        { name: "Netherlands", flag: <NetherlandsFlagIcon />, isSpecial: false },
        { name: "International", flag: <GlobeIcon />, isSpecial: true }
    ];

    return (
        <Box sx={{ bgcolor: "#060e1a", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

            {/* ── HERO SECTION ── */}
            <Box sx={{ pt: { xs: 10, md: 16 }, pb: 8, textAlign: "center", position: "relative" }}>
                <Box sx={{
                    position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
                    width: "700px", height: "500px",
                    background: "radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,transparent 65%)",
                    pointerEvents: "none"
                }} />

                <Container maxWidth="md">
                    <RevealOnScroll>
                        <Typography variant="h1" sx={{
                            fontSize: { xs: "2.2rem", md: "3.5rem" },
                            fontWeight: 800, mb: 1.5, letterSpacing: "-0.04em"
                        }}>
                            Why <GradientText>AksharSync</GradientText>
                        </Typography>
                        <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "1rem", maxWidth: 460, mx: "auto", mb: 3.5 }}>
                            Why brands and agencies choose AksharSync as their strategic retention partner.
                        </Typography>
                        <CommonExpertCTA text="Schedule a Strategic Call" />
                    </RevealOnScroll>
                </Container>
            </Box>

            {/* ── STATS BAR ── */}
            <Box sx={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                bgcolor: "rgba(255,255,255,0.01)",
                position: "relative",
                overflow: "hidden"
            }}>
                {/* subtle shimmer glow behind the bar */}
                <Box sx={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 50% 50%, rgba(127,208,255,0.04) 0%, transparent 70%)",
                    pointerEvents: "none"
                }} />
                <Box sx={{ display: "flex", flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                    {stats.map((s, i) => (
                        <Box key={i} sx={{
                            flex: "1 1 140px",
                            borderRight: { sm: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" },
                            borderBottom: { xs: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", sm: "none" }
                        }}>
                            <StatCard n={s.n} l={s.l} color={s.color} delay={i * 0.12} />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* ── CORE ADVANTAGES (STAGGERED VERTICAL LAYOUT) ── */}
            <Box sx={{ py: 10, position: "relative" }}>
                <Container maxWidth="lg">
                    <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 10, display: "flex", alignItems: "center", gap: 1.5 }}>
                        Core advantages
                        <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(255,255,255,0.05)" }} />
                    </Typography>

                    <Box sx={{ position: "relative", px: { md: 10 } }}>
                        {/* Connecting Line (Desktop) */}
                        <Box sx={{
                            position: "absolute", left: "50%", top: 0, bottom: 0,
                            width: "1px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 10%, rgba(255,255,255,0.05) 90%, transparent)",
                            display: { xs: "none", md: "block" }
                        }} />

                        <Stack spacing={12}>
                            {coreAdvantages.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <RevealOnScroll key={i} delay={i * 0.1}>
                                        <Grid container spacing={4} sx={{
                                            alignItems: "center",
                                            flexDirection: isEven ? "row" : "row-reverse",
                                            textAlign: isEven ? "right" : "left"
                                        }}>
                                            <Grid size={{ xs: 12, md: 5 }}>
                                                <Box sx={{
                                                    display: "inline-flex",
                                                    width: 50, height: 50,
                                                    borderRadius: "14px",
                                                    bgcolor: item.bg,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: 2.5
                                                }}>
                                                    {item.icon}
                                                </Box>
                                                <Typography variant="h4" sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 1.5, color: "#fff" }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: "0.95rem", color: alpha("#fff", 0.4), lineHeight: 1.8 }}>
                                                    {item.desc}
                                                </Typography>
                                            </Grid>

                                            {/* Node on the line */}
                                            <Grid size={{ xs: 12, md: 2 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                                                <Box sx={{
                                                    width: 12, height: 12, borderRadius: "50%",
                                                    bgcolor: item.color,
                                                    boxShadow: `0 0 20px ${item.color}`,
                                                    border: "3px solid #060e1a",
                                                    zIndex: 2
                                                }} />
                                            </Grid>

                                            <Grid size={{ xs: 12, md: 5 }} />
                                        </Grid>
                                    </RevealOnScroll>
                                );
                            })}
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* ── ENTERPRISE EXECUTION ── */}
            <Box sx={{ py: 10, bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <RevealOnScroll>
                            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, fontWeight: 800, mb: 2 }}>
                                Enterprise-grade <GradientText>execution since 2014</GradientText>
                            </Typography>
                            <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.95rem", maxWidth: 600, mx: "auto" }}>
                                Building technical infrastructure that scales for the world's leading brands and agencies.
                            </Typography>
                        </RevealOnScroll>
                    </Box>

                    <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <RevealOnScroll delay={0.1}>
                                <Box sx={{
                                    p: { xs: 3, md: 4.5 },
                                    height: "100%",
                                    borderRadius: "24px",
                                    bgcolor: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    position: "relative",
                                    overflow: "hidden"
                                }}>
                                    <Box sx={{ position: "absolute", top: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                                    <Typography sx={{ color: alpha("#fff", 0.65), fontSize: "1.05rem", lineHeight: 1.8, mb: 4, position: "relative", zIndex: 1 }}>
                                        We don't just send emails. We build technical systems. Hands-on experience across every major platform ensures your retention strategy is never bottlenecked by execution capability.
                                    </Typography>

                                    <Box sx={{ display: "flex", gap: 2, position: "relative", zIndex: 1, flexWrap: "wrap" }}>
                                        {[
                                            "Multi-region delivery",
                                            "Advanced data sync",
                                            "Custom ESP flows",
                                            "White-label execution"
                                        ].map((t, i) => (
                                            <Box key={i} sx={{
                                                flex: "1 1 0",
                                                minWidth: 90,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 1,
                                                px: 1.5, py: 2,
                                                borderRadius: "14px",
                                                bgcolor: "rgba(125,211,252,0.04)",
                                                border: "1px solid rgba(125,211,252,0.08)",
                                                textAlign: "center",
                                                transition: "all 0.25s",
                                                "&:hover": { bgcolor: "rgba(125,211,252,0.08)", borderColor: "rgba(125,211,252,0.2)", transform: "translateY(-3px)" }
                                            }}>
                                                {/* Small check-circle icon */}
                                                <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "rgba(125,211,252,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M3 8.5L6.5 12L13 5" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Box>
                                                <Typography sx={{ fontSize: "0.72rem", fontWeight: 500, color: alpha("#fff", 0.7), lineHeight: 1.3 }}>{t}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </RevealOnScroll>
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Stack spacing={3} sx={{ height: "100%", justifyContent: "center" }}>
                                {expertiseItems.map((item, i) => (
                                    <RevealOnScroll key={i} delay={0.2 + (i * 0.1)}>
                                        <Box sx={{
                                            p: 3,
                                            borderRadius: "20px",
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "all 0.3s",
                                            display: "flex",
                                            gap: 2.5,
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                background: "rgba(255,255,255,0.04)",
                                                borderColor: "rgba(255,255,255,0.1)"
                                            }
                                        }}>
                                            <Box sx={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: item.bg, filter: "blur(40px)" }} />

                                            <Box sx={{
                                                width: 44, height: 44, borderRadius: "12px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                bgcolor: item.bg, flexShrink: 0,
                                                border: "1px solid rgba(255,255,255,0.05)",
                                                position: "relative", zIndex: 1
                                            }}>
                                                {item.icon}
                                            </Box>
                                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                                <Typography sx={{ fontSize: "1rem", fontWeight: 700, mb: 0.5, color: "#fff" }}>{item.title}</Typography>
                                                <Typography sx={{ fontSize: "0.85rem", color: alpha("#fff", 0.4), lineHeight: 1.6 }}>{item.desc}</Typography>
                                            </Box>
                                        </Box>
                                    </RevealOnScroll>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ── PLATFORMS MARQUEE ── */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2.5 }}>
                        Platforms & regions
                    </Typography>

                    <Box sx={{ mb: 3, display: "flex", gap: 3, fontSize: "0.65rem", color: alpha("#fff", 0.3) }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#818cf8" }} /> ESP platforms</Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}><Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#34d399" }} /> Active regions — highlighted</Box>
                    </Box>

                    <Box sx={{
                        overflow: "hidden",
                        position: "relative",
                        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)"
                    }}>
                        <MarqueeTrack sx={{ animationDuration: "35s" }}>
                            {[...platforms, ...platforms].map((p, i) => {
                                const isRegion = ["India", "UK", "EU", "Netherlands"].includes(p);
                                return (
                                    <PTag key={i} sx={{
                                        py: "6px", px: "12px", fontSize: "11px",
                                        bgcolor: isRegion ? "rgba(52,211,153,0.08)" : "rgba(99,102,241,0.08)",
                                        borderColor: isRegion ? "rgba(52,211,153,0.25)" : "rgba(99,102,241,0.15)",
                                        color: isRegion ? "#6ee7b7" : "#a5b4fc",
                                        animation: isRegion ? `${borderPulse} 2.5s ease infinite` : "none"
                                    }}>
                                        <Box sx={{
                                            width: 4, height: 4, borderRadius: "50%",
                                            bgcolor: isRegion ? "#34d399" : "#818cf8",
                                            mr: 0.8,
                                            animation: isRegion ? `${glow} 1.8s ease infinite` : "none"
                                        }} />
                                        {p}
                                    </PTag>
                                );
                            })}
                        </MarqueeTrack>
                    </Box>

                    {/* ── REGIONS GRID ── */}
                    <Box sx={{ mt: 6 }}>
                        <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2.5 }}>
                            Active regions
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                            {regions.map((r, i) => (
                                <RevealOnScroll key={i} delay={i * 0.1}>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.2,
                                        px: 2,
                                        py: 1,
                                        borderRadius: "100px",
                                        bgcolor: r.isSpecial ? "rgba(99,102,241,0.05)" : "rgba(52,211,153,0.05)",
                                        border: "1px solid",
                                        borderColor: r.isSpecial ? "rgba(99,102,241,0.15)" : "rgba(52,211,153,0.15)",
                                        animation: r.isSpecial ? "none" : `${borderPulse} 3s ease infinite`,
                                        animationDelay: `${i * 0.2}s`,
                                        transition: "transform 0.2s",
                                        "&:hover": { transform: "translateY(-2px)", bgcolor: r.isSpecial ? "rgba(99,102,241,0.08)" : "rgba(52,211,153,0.08)" }
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 22, height: 22,
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            '& svg': { width: "100%", height: "100%" }
                                        }}>
                                            {r.flag}
                                        </Box>
                                        <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: r.isSpecial ? "#a5b4fc" : "#6ee7b7" }}>
                                            {r.name}
                                        </Typography>
                                    </Box>
                                </RevealOnScroll>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ── CTA BOX ── */}
            <Box sx={{ py: 10, position: "relative" }}>
                <Box sx={{
                    position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                    width: "500px", height: "300px",
                    background: "radial-gradient(ellipse,rgba(52,211,153,0.07) 0%,transparent 65%)",
                    pointerEvents: "none"
                }} />

                <Container maxWidth="sm">
                    <RevealOnScroll>
                        <Box sx={{
                            bgcolor: "rgba(255,255,255,0.012)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "24px",
                            p: { xs: 4, md: 6 },
                            textAlign: "center"
                        }}>
                            <Typography variant="h3" sx={{ fontSize: "1.6rem", fontWeight: 700, mb: 1.5 }}>
                                Partner with <GradientText>certainty</GradientText>
                            </Typography>
                            <Typography sx={{ color: alpha("#fff", 0.3), fontSize: "0.85rem", lineHeight: 1.6, mb: 3.5 }}>
                                Ready to synchronize your agency's execution with a partner that understands enterprise retention? Let's discuss your backend needs.
                            </Typography>
                            <CommonExpertCTA text="Schedule a Strategic Call" />
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>

        </Box>
    );
};

export default WhyPage;
