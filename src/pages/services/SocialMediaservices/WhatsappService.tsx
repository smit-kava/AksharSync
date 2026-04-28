import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Container, Fade, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { ExpertCTA } from '../../../components';
import { GradientText, HeroChip } from "../../../components/Landing/Shared";
import RevealOnScroll from "../../../components/RevealOnScroll";
import { SMSProcessTimeline } from "../../../components/SMSProcessTimeline";
import {
    AnnouncementIcon,
    ArchitectureIcon,
    BlueTickIcon,
    BoltIcon,
    OngoingIcons,
    TargetIcon,
    TrendUpIcon,
    WeightICon,
    WhatsAppIcon
} from "../../../components/icons";

// ─── Animations ────────────────────────────────────────────────────────────────


const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 2; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const ofloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
`;

// const floatY = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-15px); }
// `;

// ─── Component ────────────────────────────────────────────────────────────────

const WhatsappService = () => {
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                    background: "radial-gradient(circle, rgba(37, 211, 102, 0.08) 0%, transparent 70%)",
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
                                    <WhatsAppIcon sx={{ fontSize: 16 }} />
                                    Full-Service WhatsApp Agency
                                </HeroChip>

                                <Typography variant="h1" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                                    lineHeight: 1.05, mb: 3.5, color: "#fff",
                                    letterSpacing: "-0.03em",
                                }}>
                                    Top <GradientText>WhatsApp Marketing</GradientText> <br />
                                    Services to Grow Outreach
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.55),
                                    fontSize: { xs: "1.1rem", md: "1.28rem" },
                                    lineHeight: 1.85, maxWidth: 560, mb: 6.5, fontWeight: 400,
                                }}>
                                    Meet your customers where they are and establish stellar brand
                                    communication with our WhatsApp marketing services. Flowium helps
                                    our clients succeed in advancing their marketing efforts through
                                    one of the most popular messengers, WhatsApp.
                                </Typography>

                                <ExpertCTA text="Talk to an Expert" sx={{ py: 2.2, borderRadius: "16px" }} />

                                {/* Mini Stats */}
                                <Box sx={{ mt: 8, display: "flex", alignItems: "center", gap: 4, opacity: 0.7 }}>
                                    {[
                                        { value: "95%+", label: "Open Rate" },
                                        { value: "40%+", label: "CTR Average" },
                                        { value: "15x", label: "Avg. ROI" },
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

                        {/* ── Right: Isometric Phone Canvas ── */}
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
                                    backgroundImage: "radial-gradient(circle, rgba(37, 211, 102, 0.12) 1px, transparent 1px)",
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
                                    <line x1="120" y1="120" x2="210" y2="180" stroke="#25d366" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" />
                                    <line x1="486" y1="148" x2="388" y2="172" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
                                </Box>

                                {/* ── Status badge — top-left ── */}
                                <Box sx={{
                                    position: "absolute", left: 30, top: 90,
                                    background: "rgba(5,14,32,0.97)",
                                    borderRadius: "14px", px: "14px", py: "8px",
                                    display: "flex", alignItems: "center", gap: "8px",
                                    border: "1px solid rgba(37, 211, 102, 0.3)",
                                    boxShadow: "0 8px 28px rgba(0,0,10,0.5)",
                                    animation: `${ofloat} 6s ease-in-out infinite 1s`,
                                    zIndex: 15,
                                }}>
                                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#25d366", flexShrink: 0, animation: `${pulseGlow} 2.5s ease-in-out infinite` }} />
                                    <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>Verified Business Profile</Typography>
                                </Box>

                                {/* ── Green orb pin ── */}
                                <Box sx={{
                                    position: "absolute", left: 62, top: 216,
                                    animation: `${ofloat} 5s ease-in-out infinite`,
                                    zIndex: 10,
                                }}>
                                    <Box sx={{ position: "absolute", width: 58, height: 58, borderRadius: "50%", background: "rgba(37, 211, 102, 0.06)", left: -10, top: -10 }} />
                                    <Box sx={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: "#25d366", left: 7, top: 7, boxShadow: "0 0 20px rgba(37, 211, 102, 0.8), 0 0 40px rgba(37, 211, 102, 0.3)" }} />
                                </Box>

                                {/* ── ISO Phone ── */}
                                <Box sx={{
                                    position: "absolute", left: 210, top: 55,
                                    width: 186, height: 390,
                                    transformStyle: "preserve-3d",
                                    transform: "rotateX(35.264deg) rotateZ(-45deg)",
                                    zIndex: 12,
                                }}>
                                    <Box sx={{
                                        position: "absolute", width: 186, height: 390,
                                        background: "#101d2e", borderRadius: "36px",
                                        border: "1.5px solid rgba(37, 211, 102, 0.3)",
                                        transform: "translateZ(10px)", overflow: "hidden",
                                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 40px 60px rgba(37, 211, 102, 0.04)",
                                    }}>
                                        <Box sx={{
                                            width: "100%", height: "100%", background: "#060e1a",
                                            borderRadius: "34px", display: "flex", flexDirection: "column",
                                            overflow: "hidden",
                                        }}>
                                            <Box sx={{
                                                px: "13px", py: "10px", display: "flex", alignItems: "center", gap: "9px",
                                                borderBottom: "1px solid rgba(255,255,255,0.07)",
                                                background: "rgba(7, 94, 84, 0.9)", flexShrink: 0,
                                            }}>
                                                <Box sx={{
                                                    width: 34, height: 34, borderRadius: "50%",
                                                    background: "#fff",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "10px", fontWeight: 900, color: "#075e54", flexShrink: 0,
                                                }}>AS</Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>AksharSync Business</Typography>
                                                    <Typography sx={{ fontSize: "9px", color: "#dcf8c6", mt: "1px" }}>online</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, px: "10px", pt: "11px", pb: "6px", display: "flex", flexDirection: "column", gap: "10px", background: "#e5ddd5" }}>
                                                <Box sx={{ borderRadius: "14px 14px 14px 4px", p: "9px 11px", maxWidth: "90%", background: "#fff", boxShadow: "0 1px 1px rgba(0,0,0,0.1)" }}>
                                                    <Typography sx={{ fontSize: "9.5px", color: "#111", lineHeight: 1.55 }}>Welcome to our WhatsApp outreach! 👋 Get exclusive updates and offers here.</Typography>
                                                </Box>
                                                <Box sx={{ alignSelf: "flex-end", borderRadius: "14px 14px 4px 14px", p: "9px 11px", maxWidth: "90%", background: "#dcf8c6", boxShadow: "0 1px 1px rgba(0,0,0,0.1)" }}>
                                                    <Typography sx={{ fontSize: "9.5px", color: "#111", lineHeight: 1.55 }}>Check out our latest collection: sync.shop/wa-special</Typography>
                                                </Box>
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
                SECTION 2 — Professional WhatsApp Marketing Company
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
                        radial-gradient(circle at 15% 50%, rgba(37, 211, 102, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 85% 20%, rgba(167,139,250,0.05) 0%, transparent 45%)`,
                    pointerEvents: "none",
                },
            }}>
                {/* ══════════════════════════════════════════════════════════════════
                SECTION 2 — Why Invest in WhatsApp Marketing (Cards)
            ══════════════════════════════════════════════════════════════════ */}
                <Box sx={{
                    py: { xs: 12, md: 18 },
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#060e1a",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                }}>
                    <RevealOnScroll>
                        <Container maxWidth="lg">
                            <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
                                <Typography variant="h2" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
                                    lineHeight: 1.1, letterSpacing: "-0.03em",
                                    color: "#fff", mb: 3,
                                }}>
                                    Why Invest in <GradientText>WhatsApp Marketing</GradientText>
                                </Typography>
                                <Typography sx={{
                                    color: alpha("#fff", 0.6),
                                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                                    lineHeight: 1.8, maxWidth: 850, mx: "auto"
                                }}>
                                    With almost 3 billion active users globally, WhatsApp offers businesses an effective way to connect with their target market more directly and personally. This channel can open many opportunities for the growth of your client base and business development.
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                                gap: 4, mb: 10
                            }}>
                                {[
                                    {
                                        title: "Worldwide Reach",
                                        desc: "WhatsApp Business is used by more than 200 million companies worldwide for customer service and engagement. With users in more than 180 countries and a market penetration rate of 97%, WhatsApp is one of the most popular messaging programs worldwide. Around 2.95B people use this messenger every month, and this number grows progressively.",
                                        icon: <ArchitectureIcon sx={{ fontSize: 32 }} />,
                                        color: "#25d366"
                                    },
                                    {
                                        title: "High Open Rates",
                                        desc: "Compared to other marketing channels, WhatsApp messages have a greater open rate. With an astounding 98% open rate, WhatsApp messages outperform traditional email marketing. This raises the likelihood that your messages will result in conversions by guaranteeing that your target audience sees them.",
                                        icon: <TrendUpIcon sx={{ fontSize: 32 }} />,
                                        color: "#a78bfa"
                                    },
                                    {
                                        title: "Higher Engagement Rates",
                                        desc: "By providing customers with timely and relevant messages, WhatsApp marketing services can assist in boosting consumer engagement. When compared to more conventional marketing channels, WhatsApp messages have noticeably greater KPI. WhatsApp marketing messages show high engagement with click-through rates ranging from 45% to 60%. The fact that users spend 34 minutes a day on WhatsApp on average suggests that they are highly engaged.",
                                        icon: <TargetIcon sx={{ fontSize: 32 }} />,
                                        color: "#34d399"
                                    },
                                    {
                                        title: "Cost Effectiveness and Revenue Generation",
                                        desc: "WhatsApp marketing service offers an affordable way for companies to communicate with clients wherever they may be in the world and reach a large global audience. It’s a cost-effective communication tool since it can cut operational expenses by up to 40% when used for customer support. WhatsApp is expected to produce $3.6 billion in revenue, demonstrating the platform's increasing significance in commercial communications.",
                                        icon: <WeightICon sx={{ fontSize: 32 }} />,
                                        color: "#fbbf24"
                                    },
                                    {
                                        title: "Direct and Personalized Communication",
                                        desc: "Businesses can optimize their personalization efforts by customizing messages sent via WhatsApp based on variables like consumers' location, preferences, past purchases, or behavior. Clients tend to buy 50% more items with customized WhatsApp messages, which highlights the value of personalized communication.",
                                        icon: <AnnouncementIcon sx={{ fontSize: 32 }} />,
                                        color: "#f43f5e"
                                    },
                                    {
                                        title: "Increased Customer Loyalty",
                                        desc: "WhatsApp channels enable real-time communication, allowing businesses to provide fast support, successfully answer questions, and deliver personalized services—all of which increase consumer loyalty.",
                                        icon: <OngoingIcons sx={{ fontSize: 32 }} />,
                                        color: "#0ea5e9"
                                    }
                                ].map((item, i) => (
                                    <Box key={i} sx={{
                                        p: 5, borderRadius: "28px",
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        display: "flex", flexDirection: "column",
                                        "&:hover": {
                                            transform: "translateY(-12px)",
                                            background: "rgba(255,255,255,0.04)",
                                            borderColor: alpha(item.color, 0.3),
                                            boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 20px ${alpha(item.color, 0.1)}`,
                                        }
                                    }}>
                                        <Box sx={{
                                            width: 56, height: 56, borderRadius: "16px",
                                            background: alpha(item.color, 0.1),
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            mb: 4, color: item.color,
                                            border: `1px solid ${alpha(item.color, 0.2)}`,
                                        }}>
                                            {item.icon}
                                        </Box>
                                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", mb: 2, lineHeight: 1.3 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", lineHeight: 1.7, flex: 1 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={{ textAlign: "center" }}>
                                <ExpertCTA text="Talk to an Expert" />
                            </Box>
                        </Container>
                    </RevealOnScroll>
                </Box>
            </Box>


            {/* ══════════════════════════════════════════════════════════════════
                SECTION 3 — WhatsApp Marketing Agency Overview
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 12, md: 20 },
                position: "relative",
                bgcolor: "#060e1a",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute", top: "20%", left: "-10%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(circle, rgba(37, 211, 102, 0.05) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                }
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
                            gap: { xs: 8, lg: 12 },
                            alignItems: "center"
                        }}>
                            {/* ── Left Column: Content ── */}
                            <Box>
                                <HeroChip sx={{ mb: 3.5 }}>Experienced Agency Partner</HeroChip>
                                <Typography variant="h2" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
                                    lineHeight: 1.1, mb: 4, color: "#fff",
                                }}>
                                    WhatsApp <GradientText>Marketing Agency</GradientText>
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.75),
                                    fontSize: "1.15rem", lineHeight: 1.8, mb: 4,
                                    fontWeight: 500
                                }}>
                                    We are an experienced WhatsApp marketing agency trusted by companies of all sizes and market niches. Our mission is to help businesses increase revenue and strengthen customer relationships through our powerful WhatsApp marketing solutions.
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.55),
                                    fontSize: "1.05rem", lineHeight: 1.8, mb: 4
                                }}>
                                    Flowium’s team brings unmatched expertise in leveraging the platform to unlock the full potential of your business. With 8+ years of experience, our agency delivers top-notch WhatsApp strategies designed to boost customer engagement, sales, and build long-term brand success.
                                </Typography>

                                <Typography sx={{
                                    color: alpha("#fff", 0.55),
                                    fontSize: "1.05rem", lineHeight: 1.8, mb: 6
                                }}>
                                    Our team of seasoned digital marketers, copywriters, graphic designers, data analysts, and sales professionals works together to craft compelling campaigns. By combining creativity with hyper-targeted WhatsApp marketing techniques, we help your brand stand out in its niche.
                                </Typography>

                                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                                    <ExpertCTA text="Work With Us" />
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem" }}>8+</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.75rem", textTransform: "uppercase" }}>Years Experience</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* ── Right Column: Trust Wall ── */}
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{
                                    p: { xs: 4, md: 6 }, borderRadius: "40px",
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backdropFilter: "blur(20px)",
                                    boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                                    textAlign: "center",
                                    display: "flex", flexDirection: "column", gap: 6
                                }}>
                                    {/* DAN Badge */}
                                    <Box sx={{ opacity: 0.8 }}>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", mb: 2 }}>MEMBER OF</Typography>
                                        <Box sx={{
                                            display: "inline-flex", alignItems: "center", gap: 1.5,
                                            px: 3, py: 1.5, borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
                                            background: "rgba(255,255,255,0.02)"
                                        }}>
                                            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.1em" }}>DAN</Typography>
                                            <Box sx={{ width: 1, height: 20, bgcolor: "rgba(255,255,255,0.2)" }} />
                                            <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.75rem", textAlign: "left", lineHeight: 1.2 }}>Digital Agency <br /> Network</Typography>
                                        </Box>
                                    </Box>

                                    {/* Clutch Badge */}
                                    <Box sx={{ opacity: 0.8 }}>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 1.5 }}>
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={i} sx={{ color: "#ffb400", fontSize: 20 }} />
                                            ))}
                                        </Box>
                                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", mb: 0.5 }}>Clutch</Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.9rem" }}>Top Global Service Provider</Typography>
                                    </Box>

                                    {/* Global Leader Status */}
                                    <Box sx={{
                                        pt: 4, borderTop: "1px solid rgba(255,255,255,0.06)",
                                        display: "flex", flexDirection: "column", alignItems: "center"
                                    }}>
                                        <Typography sx={{
                                            background: "linear-gradient(90deg, #25d366, #a78bfa)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            fontWeight: 900, fontSize: "1.1rem", mb: 1
                                        }}>
                                            Flowium is a Global Leader
                                        </Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.8rem" }}>in WhatsApp Marketing Solutions</Typography>
                                    </Box>
                                </Box>

                                {/* Background elements */}
                                <Box sx={{
                                    position: "absolute", top: -20, right: -20,
                                    width: 100, height: 100, borderRadius: "50%",
                                    background: "rgba(37, 211, 102, 0.1)", zIndex: -1,
                                    filter: "blur(20px)", pointerEvents: "none",
                                }} />
                            </Box>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 4 — WhatsApp Marketing Services
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 10, md: 15 },
                position: "relative",
                bgcolor: "#081121",
                "&::before": {
                    content: '""',
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.15), transparent)",
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
                                WhatsApp Marketing Services by <GradientText>AksharSync</GradientText>
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.5),
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                lineHeight: 1.8, maxWidth: 800, mx: "auto",
                            }}>
                                Our WhatsApp marketing agency manages every aspect of your messenger promotions.
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
                                    title: "WhatsApp API Setup",
                                    desc: "We handle the technical setup of the WhatsApp Business API, ensuring secure and scalable communication.",
                                    icon: <BoltIcon sx={{ fontSize: 28 }} />,
                                    color: "#25d366"
                                },
                                {
                                    title: "Automated Chatbots",
                                    desc: "Build intelligent automated flows that handle customer inquiries and drive sales 24/7.",
                                    icon: <BlueTickIcon sx={{ fontSize: 28 }} />,
                                    color: "#a78bfa"
                                },
                                {
                                    title: "Verified Profile Status",
                                    desc: "We help your brand obtain the Green Tick verification, building immediate trust with customers.",
                                    icon: <WeightICon sx={{ fontSize: 28 }} />,
                                    color: "#34d399"
                                },
                                {
                                    title: "Bulk Broadcasts",
                                    desc: "Reach your entire audience at once with high-delivery broadcast messages and promotions.",
                                    icon: <AnnouncementIcon sx={{ fontSize: 28 }} />,
                                    color: "#fbbf24"
                                },
                                {
                                    title: "Personalized Outreach",
                                    desc: "Segment your audience and send highly relevant messages based on customer behavior.",
                                    icon: <OngoingIcons sx={{ fontSize: 28 }} />,
                                    color: "#f43f5e"
                                },
                                {
                                    title: "Real-time Analytics",
                                    desc: "Track open rates, click-through rates, and conversion performance in real-time.",
                                    icon: <TrendUpIcon sx={{ fontSize: 28 }} />,
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
                                    }
                                }}>
                                    <Box sx={{
                                        width: 60, height: 60, borderRadius: "16px",
                                        background: alpha(item.color, 0.1),
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        mb: 4, color: item.color,
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
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══════════════════════════════════════════════════════════════════
                SECTION 5 — How We Approach WhatsApp Marketing
            ══════════════════════════════════════════════════════════════════ */}
            <Box sx={{
                py: { xs: 10, md: 15 },
                position: "relative",
                bgcolor: "#060e1a",
            }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: "center", mb: 10 }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
                                lineHeight: 1.1, mb: 3, color: "#fff",
                            }}>
                                How We Approach <GradientText>WhatsApp Marketing</GradientText>
                            </Typography>
                            <Typography sx={{
                                color: alpha("#fff", 0.5),
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                lineHeight: 1.8, maxWidth: 850, mx: "auto",
                            }}>
                                Our WhatsApp marketing experts adhere to the best practices to create the best campaigns
                                and messenger promotions that can bring your eCommerce business the most revenue.
                            </Typography>
                        </Box>
                    </Container>

                    <SMSProcessTimeline />

                    <Container maxWidth="lg" sx={{ mt: 10 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <ExpertCTA text="Get Started with WhatsApp" />
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
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
                <RevealOnScroll>
                    <Container maxWidth="md">
                        <Box sx={{ textAlign: "center", mb: 8 }}>
                            <Typography variant="h2" sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
                                lineHeight: 1.1, mb: 3, color: "#fff",
                            }}>
                                Frequently Asked <GradientText>Questions</GradientText>
                            </Typography>
                            <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem" }}>
                                Everything you need to know about our WhatsApp marketing services.
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            {[
                                {
                                    q: "1. What is WhatsApp marketing?",
                                    a: "WhatsApp marketing is a strategy that involves sending promotional and transactional messages to your audience via WhatsApp. It allows for direct, two-way communication with high engagement rates."
                                },
                                {
                                    q: "2. How does WhatsApp compare to SMS?",
                                    a: "WhatsApp offers richer content (images, videos, buttons) and is generally more cost-effective for international outreach. It also allows for continuous chat sessions."
                                },
                                {
                                    q: "3. Is my business eligible for a Green Tick?",
                                    a: "The Green Tick (verified status) is awarded by Meta to notable and authentic brands. We assist our clients in the application process to maximize their chances of approval."
                                }
                            ].map((faq, i) => {
                                const panelId = `panel${i}`;
                                return (
                                    <Accordion
                                        key={i}
                                        expanded={expanded === panelId}
                                        onChange={handleAccordionChange(panelId)}
                                        slotProps={{ transition: { timeout: 500 } }}
                                        sx={{
                                            bgcolor: "rgba(255,255,255,0.02)",
                                            color: "#fff",
                                            borderRadius: "12px !important",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            boxShadow: "none",
                                            "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                                            "&.Mui-expanded": { bgcolor: "rgba(255,255,255,0.05)", borderColor: "rgba(37, 211, 102, 0.4)" }
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#25d366" }} />}>
                                            <Typography sx={{ fontWeight: 700 }}>{faq.q}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography sx={{ color: alpha("#fff", 0.6), lineHeight: 1.6 }}>{faq.a}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </Box>

                        <Box sx={{ mt: 8, textAlign: "center" }}>
                            <ExpertCTA text="Talk to a WhatsApp Expert" />
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>
        </Box>
    );
};

export default WhatsappService;
