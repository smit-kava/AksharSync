import { Box, Container, Typography, alpha, Grid, Button } from "@mui/material";
import { HeroChip, GradientText } from "../components/Landing/Shared";
import RevealOnScroll from "../components/RevealOnScroll";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BoltIcon, TargetIcon, WinBackIcon, TrendUpIcon } from "../components/icons";

const WhyPage = () => {
    return (
        <Box sx={{ bgcolor: "#060e1a", color: "#fff", minHeight: "100vh" }}>
            
            {/* ── Hero Section ────────────────────────────────────────────────── */}
            <Box sx={{ pt: { xs: 15, md: 24 }, pb: 15, position: "relative", overflow: "hidden" }}>
                <Box sx={{
                    position: "absolute", bottom: "10%", left: "-5%",
                    width: "600px", height: "600px",
                    background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
                    filter: "blur(80px)", pointerEvents: "none",
                }} />
                
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ textAlign: "center", mb: 10 }}>
                            <HeroChip sx={{ mb: 3 }}>The AksharSync Advantage</HeroChip>
                            <Typography variant="h1" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.8rem", md: "4.5rem" },
                                lineHeight: 1.1, mb: 4, letterSpacing: "-0.02em"
                            }}>
                                Why Brands <br />
                                <GradientText>Synchronize with Us</GradientText>
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.5),
                                fontSize: "1.25rem", lineHeight: 1.8,
                                maxWidth: 800, mx: "auto"
                            }}>
                                We replace fragmented marketing tactics with synchronized technical 
                                ecosystems. Discover why 1,000+ brands trust AksharSync to power their growth.
                            </Typography>
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>

            {/* ── The Advantage Grid ─────────────────────────────────────────── */}
            <Box sx={{ py: 15, bgcolor: "#081121" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <RevealOnScroll>
                                <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Not Just a Service, <br /><GradientText>A Growth Partner</GradientText></Typography>
                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", lineHeight: 1.8, mb: 6 }}>
                                    Unlike traditional agencies that focus on one-off campaigns, we build 
                                    long-term revenue engines. Our technical depth allows us to solve 
                                    complex problems that others simply can't handle.
                                </Typography>
                                
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                    {[
                                        { title: "Technical Excellence", desc: "Our team consists of engineers and data scientists, not just marketers.", icon: <BoltIcon sx={{ color: "#7fd0ff" }} /> },
                                        { title: "ROI Guarantee", desc: "We focus on the metrics that matter: revenue, LTV, and profit.", icon: <TrendUpIcon sx={{ color: "#34d399" }} /> },
                                        { title: "Seamless Integration", desc: "We sync your entire tech stack for a 360-degree view of your customer.", icon: <TargetIcon sx={{ color: "#a78bfa" }} /> }
                                    ].map((item, i) => (
                                        <Box key={i} sx={{ display: "flex", gap: 3 }}>
                                            <Box sx={{ 
                                                width: 48, height: 48, borderRadius: "12px", 
                                                background: "rgba(255,255,255,0.05)", 
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0
                                            }}>
                                                {item.icon}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 800, color: "#fff", mb: 0.5 }}>{item.title}</Typography>
                                                <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.9rem" }}>{item.desc}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </RevealOnScroll>
                        </Grid>
                        
                        <Grid size={{ xs: 12, md: 6 }}>
                            <RevealOnScroll>
                                <Box sx={{
                                    position: "relative",
                                    p: 5, borderRadius: "40px",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
                                }}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography sx={{ color: "#34d399", fontWeight: 900, fontSize: "2.5rem", mb: 1 }}>98%</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Client Retention Rate</Typography>
                                    </Box>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography sx={{ color: "#7fd0ff", fontWeight: 900, fontSize: "2.5rem", mb: 1 }}>12x</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Average Campaign ROI</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ color: "#a78bfa", fontWeight: 900, fontSize: "2.5rem", mb: 1 }}>24/7</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Technical Support & Monitoring</Typography>
                                    </Box>
                                    
                                    {/* Decorative elements */}
                                    <Box sx={{
                                        position: "absolute", top: -20, right: -20,
                                        width: 80, height: 80, borderRadius: "50%",
                                        background: "linear-gradient(135deg, #7fd0ff, #34d399)",
                                        opacity: 0.1, filter: "blur(20px)"
                                    }} />
                                </Box>
                            </RevealOnScroll>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ── Testimonial/Proof Section ──────────────────────────────────── */}
            <Box sx={{ py: 15 }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ 
                            p: 8, borderRadius: "40px", 
                            background: "rgba(255,255,255,0.03)", 
                            border: "1px solid rgba(255,255,255,0.05)",
                            textAlign: "center"
                        }}>
                            <WinBackIcon sx={{ fontSize: 48, color: alpha("#fff", 0.2), mb: 4 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, fontStyle: "italic", mb: 4, lineHeight: 1.6 }}>
                                "AksharSync completely transformed our technical marketing stack. 
                                Their synchronization process allowed us to scale from $1M to $10M 
                                in annual revenue in just 18 months."
                            </Typography>
                            <Typography sx={{ fontWeight: 900, color: "#fff" }}>James Wilson</Typography>
                            <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem" }}>CEO, GrowthBrands Global</Typography>
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>

            {/* ── Final CTA ──────────────────────────────────────────────────── */}
            <Box sx={{ py: 15 }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{
                            p: { xs: 6, md: 10 },
                            borderRadius: "40px",
                            background: "linear-gradient(135deg, rgba(127,208,255,0.05) 0%, rgba(167,139,250,0.05) 100%)",
                            border: "1px solid rgba(127,208,255,0.1)",
                            textAlign: "center"
                        }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Experience the <GradientText>Difference</GradientText></Typography>
                            <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.2rem", mb: 6, maxWidth: 600, mx: "auto" }}>
                                Stop settling for fragmented results. It's time to synchronize your brand for the future.
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                                    color: "#060e1a", px: 6, py: 2.5,
                                    borderRadius: "16px", fontWeight: 900,
                                    textTransform: "none", fontSize: "1.1rem",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 25px 50px rgba(127,208,255,0.35)",
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>
        </Box>
    );
};

export default WhyPage;
