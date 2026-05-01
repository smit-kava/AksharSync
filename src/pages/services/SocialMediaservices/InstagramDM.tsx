import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Fade, Typography, alpha } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { ClientReviews, ExpertCTA } from '../../../components';
import { GradientText, HeroChip } from "../../../components/Landing/Shared";
import { UserIcons } from '../../../components/icons/Icons';

// ─── Keyframes ────────────────────────────────────────────────────────────────

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatA = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50%      { transform: translateY(-15px) translateX(5px); }
`;

const floatB = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50%      { transform: translateY(-10px) translateX(-5px); }
`;

// ─── Chat Bubble Component ────────────────────────────────────────────────────

const ChatBubble = ({ side, text, isLast }: { side: 'left' | 'right', text: React.ReactNode, isLast?: boolean }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
            mb: isLast ? 0 : 1.5
        }}>
            {side === 'left' && (
                <Box sx={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                    flexShrink: 0, mr: 1, mt: 'auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 2L2 22l10-4 10 4L12 2z" /></svg>
                </Box>
            )}
            <Box sx={{
                maxWidth: '75%',
                bgcolor: side === 'right' ? 'transparent' : '#f1f5f9',
                background: side === 'right' ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : undefined,
                color: side === 'right' ? '#fff' : '#1e293b',
                px: 1.5, py: 1,
                borderRadius: '16px',
                borderBottomLeftRadius: side === 'left' ? '4px' : '16px',
                borderBottomRightRadius: side === 'right' ? '4px' : '16px',
                boxShadow: side === 'left' ? '0 1px 2px rgba(0,0,0,0.05)' : '0 4px 10px rgba(168,85,247,0.3)',
            }}>
                <Typography sx={{ fontSize: '10.5px', lineHeight: 1.4, fontWeight: 500 }}>{text}</Typography>
            </Box>
        </Box>
    );
};

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

const PhoneMockup = () => {
    return (
        <Box sx={{ position: "relative", width: 260, height: 520, flexShrink: 0 }}>
            {/* Phone Bezel */}
            <Box sx={{
                position: "absolute", inset: 0,
                borderRadius: "38px",
                background: "#f8fafc",
                border: "6px solid #0f172a",
                boxShadow: [
                    "0 30px 60px rgba(0,0,0,0.5)",
                    "inset 0 0 0 2px #475569",
                ].join(", "),
                overflow: "hidden",
                display: "flex", flexDirection: "column"
            }}>
                {/* Status Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2.5, pt: 1.5, pb: 0.5 }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>6:51</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <Box sx={{ width: 14, height: 9, bgcolor: '#0f172a', borderRadius: '1.5px' }} />
                        <Box sx={{ width: 12, height: 9, bgcolor: '#0f172a', borderRadius: '1.5px' }} />
                        <Box sx={{ width: 18, height: 9, bgcolor: '#0f172a', borderRadius: '2px' }} />
                    </Box>
                </Box>
                {/* Notch */}
                <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 90, height: 22, bgcolor: '#0f172a', borderBottomLeftRadius: 14, borderBottomRightRadius: 14, zIndex: 10 }}>
                    <Box sx={{ position: 'absolute', top: 5, right: 20, width: 6, height: 6, borderRadius: '50%', bgcolor: '#1e293b' }} />
                </Box>

                {/* Header */}
                <Box sx={{
                    px: 1.5, pt: 1.5, pb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid #e2e8f0', bgcolor: '#fff', zIndex: 5
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', p: '2px' }}>
                            <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 2L2 22l10-4 10 4L12 2z" /></svg>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', fontWeight: 700, lineHeight: 1, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                Pure Glow
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </Typography>
                            <Typography sx={{ fontSize: '9px', color: '#64748b', mt: '2px' }}>Active today</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5, color: '#334155' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    </Box>
                </Box>

                {/* Chat Area */}
                <Box sx={{ flex: 1, bgcolor: '#fff', p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5, overflow: 'hidden' }}>
                    <ChatBubble side="left" text="What skincare products are you looking for? Cleansers, moisturizers, serums?" />
                    <ChatBubble side="right" text="Moisturizer" />
                    <ChatBubble side="left" text="Got it! What's your skin type? Dry, oily, combination?" />
                    <ChatBubble side="right" text="Combination skin" />
                    <ChatBubble side="left" text={<span>Sure! Check <span style={{ color: '#38bdf8' }}>top-rated moisturizers for combination skin</span></span>} />
                    <ChatBubble side="right" text="Do they have SPF?" />
                    <ChatBubble side="left" text="Got it! What's your skin type? Dry, oily, combination?" />
                    <ChatBubble side="right" text="Awesome! Ordering now!" isLast />
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 1.5, bgcolor: '#fff', borderTop: '1px solid #f1f5f9', pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: '24px', px: 1.5, py: 1 }}>
                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                        </Box>
                        <Typography sx={{ flex: 1, ml: 1, fontSize: '12px', color: '#94a3b8' }}>Message...</Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, color: '#64748b' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9.5C9.33 9.5 10 10.17 10 11s-.67 1.5-1.5 1.5S7 11.83 7 11s.67-1.5 1.5-1.5zM12 17.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" /></svg>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </Box>
                    </Box>
                </Box>
                {/* Home Indicator */}
                <Box sx={{ width: 100, height: 4, bgcolor: '#cbd5e1', borderRadius: 2, mx: 'auto', mb: 1 }} />
            </Box>
        </Box>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InstagramDM() {
    const [ready, setReady] = useState(false);
    const [expandedService, setExpandedService] = useState<string | false>('service-0');

    useEffect(() => { setReady(true); }, []);

    const handleServiceChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedService(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ bgcolor: "#060e1a", color: "#fff" }}>
            {/* ══ HERO SECTION ══ */}
            <Box sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                pt: { xs: "80px", md: "88px" },
                pb: { xs: "60px", md: "40px" },
            }}>
                {/* Background Glows */}
                <Box sx={{
                    position: "absolute", top: "-15%", right: "-5%",
                    width: "50vw", height: "50vw",
                    background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 65%)",
                    filter: "blur(70px)", pointerEvents: "none",
                }} />
                <Box sx={{
                    position: "absolute", bottom: "-10%", left: "-5%",
                    width: "38vw", height: "38vw",
                    background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
                    filter: "blur(55px)", pointerEvents: "none",
                }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "50% 50%" },
                        alignItems: "center",
                        gap: { xs: "40px", lg: "24px" },
                    }}>
                        {/* Left Column */}
                        <Fade in={ready} timeout={600}>
                            <Box sx={{ animation: `${slideUp} 0.7s cubic-bezier(0.16,1,0.3,1)` }}>
                                <Box sx={{ mb: "16px" }}>
                                    <HeroChip>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                        Instagram DM Services
                                    </HeroChip>
                                </Box>
                                <Typography variant="h1" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.1rem", sm: "2.7rem", md: "3.2rem", lg: "3.5rem" },
                                    lineHeight: 1.08, letterSpacing: "-0.035em", mb: "18px",
                                }}>
                                    Quick <GradientText>Instagram DM</GradientText> Automation Services
                                </Typography>
                                <Typography sx={{
                                    color: alpha("#fff", 0.52), fontSize: { xs: "0.93rem", md: "1.02rem" },
                                    lineHeight: 1.8, maxWidth: 490, mb: "26px",
                                }}>
                                    Free yourself from constantly answering frequently asked questions that are repeated in private messages and comments on Instagram or other social media. Let our Instagram DM automation services take care of automation by setting everything up quickly, accurately, and efficiently, increasing customer engagement and saving you time.
                                </Typography>
                                <Box sx={{ mb: "30px" }}>
                                    <ExpertCTA text="Talk to Our Expert" sx={{ py: "13px", px: "26px", borderRadius: "13px" }} />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap" }}>
                                    {[
                                        { value: "1000+", label: "Trusted Brands", grad: true },
                                        { value: "2025", label: "Inc. 5000 Honoree", grad: false },
                                        { value: "24/7", label: "Automation", grad: false },
                                    ].map((s, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && <Box sx={{ width: 1, height: 24, bgcolor: "rgba(255,255,255,0.09)" }} />}
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 900, fontSize: "1.05rem",
                                                    ...(s.grad ? {
                                                        background: "linear-gradient(90deg,#8b5cf6,#ec4899)",
                                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                                    } : { color: "#fff" }),
                                                }}>{s.value}</Typography>
                                                <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.66rem", fontWeight: 700, mt: "3px", textTransform: "uppercase" }}>{s.label}</Typography>
                                            </Box>
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Box>
                        </Fade>

                        {/* Right Column (SVG Graphic) */}
                        <Fade in={ready} timeout={900}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: { xs: "500px", lg: "580px" } }}>
                                <Box sx={{ position: "relative", width: 440, height: 500 }}>

                                    {/* 3D IG Logo Placeholder (Top Left) */}
                                    <Box sx={{
                                        position: 'absolute', top: 0, left: 10,
                                        width: 90, height: 90, borderRadius: '24px',
                                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                        boxShadow: '0 20px 40px rgba(220, 39, 67, 0.4), inset 0 4px 0 rgba(255,255,255,0.4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transform: 'rotate(-12deg)',
                                        animation: `${floatB} 6s ease-in-out infinite`,
                                        zIndex: 20
                                    }}>
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="6" ry="6"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </Box>

                                    {/* Chatbot Bubble (Top Right) */}
                                    <Box sx={{
                                        position: 'absolute', top: 20, right: 10,
                                        width: 80, height: 70, borderRadius: '22px',
                                        background: 'linear-gradient(135deg, #ef4444 0%, #be123c 100%)',
                                        boxShadow: '0 15px 35px rgba(225, 29, 72, 0.4), inset 0 3px 0 rgba(255,255,255,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transform: 'rotate(10deg)',
                                        animation: `${floatA} 5s ease-in-out infinite 1s`,
                                        zIndex: 20,
                                        '&::after': {
                                            content: '""', position: 'absolute', bottom: -10, left: 20,
                                            width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
                                            borderTop: '15px solid #be123c', transform: 'rotate(25deg)'
                                        }
                                    }}>
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
                                            <path d="M12 2a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v2h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1V8a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM8 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                        </svg>
                                    </Box>

                                    {/* Purple Float 1 (Left) */}
                                    <Box sx={{
                                        position: 'absolute', top: 170, left: -40,
                                        background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)', px: 2.5, py: 1.5, borderRadius: '24px',
                                        borderBottomLeftRadius: 6,
                                        boxShadow: '0 15px 35px rgba(139, 92, 246, 0.4)',
                                        display: 'flex', alignItems: 'center', gap: 1.5,
                                        animation: `${floatA} 5.5s ease-in-out infinite 0.5s`,
                                        zIndex: 20
                                    }}>
                                        <Typography sx={{ fontSize: '20px' }}><UserIcons /></Typography>
                                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>&#123;User_Name&#125;</Typography>
                                    </Box>

                                    {/* Purple Float 2 (Left Lower) */}
                                    <Box sx={{
                                        position: 'absolute', top: 250, left: -20,
                                        background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)', px: 2.5, py: 1.5, borderRadius: '24px',
                                        borderBottomLeftRadius: 6,
                                        boxShadow: '0 15px 35px rgba(139, 92, 246, 0.4)',
                                        display: 'flex', alignItems: 'center', gap: 1.5,
                                        animation: `${floatB} 6.5s ease-in-out infinite 1.5s`,
                                        zIndex: 20
                                    }}>
                                        <Typography sx={{ fontSize: '20px' }}>😀</Typography>
                                        <Box sx={{ width: 60, height: 6, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 3 }} />
                                    </Box>

                                    {/* White Float 1 (Right) */}
                                    <Box sx={{
                                        position: 'absolute', top: 180, right: -30,
                                        bgcolor: '#fff', px: 2.5, py: 1.8, borderRadius: '24px',
                                        borderBottomRightRadius: 6,
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                        display: 'flex', alignItems: 'center', gap: 1.5,
                                        animation: `${floatB} 5s ease-in-out infinite 0.8s`,
                                        zIndex: 20
                                    }}>
                                        <Typography sx={{ fontSize: '20px', color: '#ef4444' }}>❤️</Typography>
                                        <Box sx={{ width: 80, height: 6, bgcolor: '#e2e8f0', borderRadius: 3 }} />
                                    </Box>

                                    {/* White Float 2 (Right Lower) */}
                                    <Box sx={{
                                        position: 'absolute', top: 260, right: -10,
                                        bgcolor: '#fff', px: 2.5, py: 1.8, borderRadius: '24px',
                                        borderBottomRightRadius: 6,
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                        display: 'flex', alignItems: 'center', gap: 1.5,
                                        animation: `${floatA} 6s ease-in-out infinite 1.2s`,
                                        zIndex: 20
                                    }}>
                                        <Typography sx={{ fontSize: '20px' }}>😍</Typography>
                                        <Box sx={{ width: 70, height: 6, bgcolor: '#e2e8f0', borderRadius: 3 }} />
                                    </Box>

                                    {/* The Phone Itself */}
                                    <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                        <PhoneMockup />
                                    </Box>

                                </Box>
                            </Box>
                        </Fade>
                    </Box>
                </Container>
            </Box>

            <Box>
                <ClientReviews />
            </Box>

            {/* ══ BENEFITS SECTION ══ */}
            <Box sx={{
                py: { xs: 10, md: 16 },
                bgcolor: "#09162a",
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.04)",
            }}>
                {/* Background glow */}
                <Box sx={{
                    position: "absolute", top: "50%", left: "60%",
                    transform: "translate(-50%, -50%)",
                    width: "50vw", height: "50vw",
                    background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
                    filter: "blur(60px)", pointerEvents: "none",
                }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ textAlign: "center", mb: { xs: 7, md: 10 } }}>
                        <Box sx={{ width: 40, height: 4, bgcolor: "#38bdf8", borderRadius: "100px", mx: "auto", mb: 3 }} />
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3.2rem" }, color: "#fff" }}>
                            Benefits Provided by this <GradientText>Instagram DM</GradientText><br />Automation Agency
                        </Typography>
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 8, md: 10 }, alignItems: "center" }}>

                        {/* LEFT TEXT */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {[
                                {
                                    title: "Always-On Customer Communication",
                                    text: "Primarily, DM automation for your Instagram helps you quickly and systematically engage with your audience without needing to be online 24/7. Instant responses to messages, comments, and customer reactions help keep your customers engaged and prevent you from losing them due to delays."
                                },
                                {
                                    title: "Automated User Journeys at Scale",
                                    text: "Thanks to automated scripts, you can guide users to the information they need, collect leads, segment your audience, and maintain personalized communication even with a large flow of inquiries."
                                },
                                {
                                    title: "Better Experience, Higher Efficiency",
                                    text: "The overall benefits of social media automation include an improved customer experience, increased conversion rates, and reduced workload for your team."
                                }
                            ].map((item, i) => (
                                <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                                    <Box sx={{
                                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0, mt: "4px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#38bdf8",
                                    }}>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M4 11.5L8.5 16L18 7" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ color: "#fff", fontSize: "1.15rem", fontWeight: 700, mb: 1 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: alpha("#fff", 0.72), fontSize: "0.95rem", lineHeight: 1.7 }}>
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* RIGHT GRAPHIC */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            {/* Graphic showing SMS icons and smiles on a phone */}
                            <Box component="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" sx={{ width: "100%", maxWidth: 400, filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}>
                                {/* Floating Background Elements */}
                                <circle cx="200" cy="200" r="140" fill="rgba(56,189,248,0.05)" />
                                <circle cx="200" cy="200" r="100" fill="rgba(56,189,248,0.08)" />

                                {/* Phone Outline */}
                                <rect x="110" y="40" width="180" height="340" rx="28" fill="#0a1220" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />
                                <rect x="160" y="48" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)" />

                                {/* Chat Bubbles inside Phone */}
                                <rect x="125" y="80" width="110" height="36" rx="12" fill="rgba(255,255,255,0.08)" />
                                <rect x="135" y="90" width="80" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
                                <rect x="135" y="100" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)" />

                                <rect x="165" y="130" width="110" height="36" rx="12" fill="rgba(56,189,248,0.15)" />
                                <rect x="185" y="140" width="80" height="6" rx="3" fill="#38bdf8" opacity="0.9" />
                                <rect x="235" y="150" width="30" height="4" rx="2" fill="#38bdf8" opacity="0.6" />

                                <rect x="125" y="180" width="130" height="46" rx="12" fill="rgba(255,255,255,0.08)" />
                                <rect x="135" y="190" width="100" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
                                <rect x="135" y="200" width="80" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
                                <rect x="135" y="208" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)" />

                                {/* Smile 1 */}
                                <g transform="translate(60, 100)">
                                    <circle cx="16" cy="16" r="16" fill="#fbbf24" />
                                    <circle cx="10" cy="12" r="2" fill="#000" />
                                    <circle cx="22" cy="12" r="2" fill="#000" />
                                    <path d="M 9 18 Q 16 24 23 18" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </g>

                                {/* SMS Icon */}
                                <g transform="translate(300, 150)">
                                    <rect x="0" y="0" width="36" height="28" rx="8" fill="#38bdf8" />
                                    <path d="M 6 28 L 12 28 L 6 34 Z" fill="#38bdf8" />
                                    <circle cx="10" cy="14" r="2" fill="#fff" />
                                    <circle cx="18" cy="14" r="2" fill="#fff" />
                                    <circle cx="26" cy="14" r="2" fill="#fff" />
                                </g>

                                {/* Heart */}
                                <g transform="translate(70, 240)">
                                    <path d="M 16 30 C 16 30 4 20 4 10 C 4 4 10 2 16 8 C 22 2 28 4 28 10 C 28 20 16 30 16 30 Z" fill="#f43f5e" />
                                </g>

                                {/* Another Smile */}
                                <g transform="translate(290, 260)">
                                    <circle cx="14" cy="14" r="14" fill="#fbbf24" />
                                    <path d="M 8 10 Q 10 8 12 10" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <path d="M 16 10 Q 18 8 20 10" stroke="#000" strokeWidth="1.5" fill="none" />
                                    <path d="M 9 16 Q 14 22 19 16" stroke="#000" strokeWidth="1.5" fill="none" />
                                </g>

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ OTHER KEY BENEFITS SECTION ══ */}
            <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, color: "#fff", mb: 8 }}>
                        Other key benefits include:
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {/* Row 1 (3 items) */}
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
                            {/* Item 1 */}
                            <Box sx={{ textAlign: "center", px: 2 }}>
                                <Box sx={{ color: "#38bdf8", mb: 2.5, display: "flex", justifyContent: "center" }}>
                                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 14v-4a8 8 0 1 1 16 0v4" />
                                        <rect x="2" y="14" width="4" height="4" />
                                        <rect x="18" y="14" width="4" height="4" />
                                        <circle cx="12" cy="20" r="2" />
                                        <circle cx="8" cy="20" r="2" />
                                        <circle cx="16" cy="20" r="2" />
                                    </svg>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.6 }}>
                                    <strong>Lead generation</strong> directly on<br />Instagram
                                </Typography>
                            </Box>

                            {/* Item 2 */}
                            <Box sx={{ textAlign: "center", px: 2 }}>
                                <Box sx={{ color: "#38bdf8", mb: 2.5, display: "flex", justifyContent: "center" }}>
                                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="9" strokeDasharray="4 3" />
                                        <circle cx="12" cy="9" r="3" />
                                        <path d="M7 19c0-3 3-5 5-5s5 2 5 5" />
                                    </svg>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.6 }}>
                                    Development of <strong>personalized<br />communication scenarios</strong> based on<br />triggers
                                </Typography>
                            </Box>

                            {/* Item 3 */}
                            <Box sx={{ textAlign: "center", px: 2 }}>
                                <Box sx={{ color: "#38bdf8", mb: 2.5, display: "flex", justifyContent: "center" }}>
                                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                    </svg>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.6 }}>
                                    Additional opportunities to <strong>segment<br />your audience</strong> by interests and actions
                                </Typography>
                            </Box>
                        </Box>

                        {/* Row 2 (2 items) */}
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 4, maxWidth: "800px", mx: "auto" }}>
                            {/* Item 4 */}
                            <Box sx={{ textAlign: "center", px: 2 }}>
                                <Box sx={{ color: "#38bdf8", mb: 2.5, display: "flex", justifyContent: "center" }}>
                                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="17 6 22 10 17 14" />
                                        <line x1="2" y1="10" x2="22" y2="10" />
                                        <polyline points="7 18 2 14 7 10" />
                                        <line x1="22" y1="14" x2="2" y2="14" />
                                    </svg>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.6 }}>
                                    Faster <strong>processing</strong> of requests from<br />potential customers
                                </Typography>
                            </Box>

                            {/* Item 5 */}
                            <Box sx={{ textAlign: "center", px: 2 }}>
                                <Box sx={{ color: "#38bdf8", mb: 2.5, display: "flex", justifyContent: "center" }}>
                                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 3 3 21 21 21" />
                                        <polyline points="3 17 9 11 13 15 21 7" />
                                        <polyline points="16 7 21 7 21 12" />
                                    </svg>
                                </Box>
                                <Typography sx={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.6 }}>
                                    <strong>Increased conversion</strong> from comments<br />and stories into dialogues.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            {/* ══ SERVICES WE PROVIDE ══ */}
            <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: "#0a1220", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ textAlign: "center", mb: 10, maxWidth: 850, mx: "auto" }}>
                        <Box sx={{ width: 45, height: 3, bgcolor: "#38bdf8", borderRadius: 10, mx: "auto", mb: 4 }} />
                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3.2rem" }, mb: 3 }}>
                            Instagram DM <GradientText>Automation Services</GradientText> We Provide
                        </Typography>
                        <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.05rem", lineHeight: 1.8 }}>
                            To be competitive in the omnichannel marketing services market, our work must stand out and offer customers something unique. Fortunately, years of expertise of the AksharSync team ensured special solutions. Our services go beyond standard social media automation, guaranteeing you ROI and customer engagement thanks to:
                        </Typography>
                    </Box>

                    {/* Services Accordion Grid (Masonry flex layout to prevent cross-column spacing) */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1, md: 1 },
                        maxWidth: 1100,
                        mx: "auto",
                        alignItems: "flex-start"
                    }}>
                        {(() => {
                            const services = [
                                {
                                    title: "DM Automation",
                                    desc: "Engaging recipients with automated direct messages, replies, and campaigns."
                                },
                                {
                                    title: "Omnichannel Activity",
                                    desc: "Engaging your followers to be active not only on social media but also on your other channels."
                                },
                                {
                                    title: "List Expansion",
                                    desc: "Development of incentives for your Instagram followers that will lead to the expansion of your email and SMS lists."
                                },
                                {
                                    title: "Increased Engagement",
                                    desc: "Ensuring engagement in your social media posts through dynamic and rapid conversational experiences."
                                },
                                {
                                    title: "Triggered Message Flows",
                                    desc: "Customization of automated direct message flows triggered by comments, keywords, replies to stories, or clicks on links."
                                },
                                {
                                    title: "Enhancing Loyal Customers",
                                    desc: "Analysis of your potential customers in direct messages and redirecting them to email or SMS."
                                },
                                {
                                    title: "Synchronization with CRM",
                                    desc: "Synchronization of interactions in direct messages with your CRM for targeting and attribution."
                                }
                            ];

                            const renderAccordion = (index: number) => (
                                <Accordion
                                    key={index}
                                    expanded={expandedService === `service-${index}`}
                                    onChange={handleServiceChange(`service-${index}`)}
                                    sx={{
                                        bgcolor: "rgba(255,255,255,0.02)",
                                        color: "#fff",
                                        borderRadius: "12px !important",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        boxShadow: "none",
                                        transition: "all 0.001s",
                                        width: "100%",
                                        "&:hover": { borderColor: "rgba(56, 189, 248, 0.3)" },
                                        "&.Mui-expanded": {
                                            bgcolor: "rgba(255,255,255,0.04)",
                                            borderColor: "rgba(56, 189, 248, 0.5)",
                                            m: "0 !important"
                                        },
                                        "&:before": { display: "none" }
                                    }}
                                >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: alpha("#fff", 0.4) }} />} sx={{ minHeight: "72px !important", "& .MuiAccordionSummary-content": { my: 0 } }}>
                                        <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>{services[index].title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0, pb: 3, px: 2.5 }}>
                                        <Typography sx={{ color: alpha("#fff", 0.65), lineHeight: 1.6, fontSize: "0.95rem" }}>
                                            {services[index].desc}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );

                            return (
                                <>
                                    {/* Column 1 */}
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 3 }, flex: 1, width: "100%" }}>
                                        {renderAccordion(0)}
                                        {renderAccordion(3)}
                                    </Box>

                                    {/* Column 2 */}
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, md: 3 }, flex: 1, width: "100%" }}>
                                        {renderAccordion(1)}
                                        {renderAccordion(4)}
                                        {renderAccordion(6)}
                                    </Box>

                                    {/* Column 3 */}
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 }, flex: 1, width: "100%" }}>
                                        {renderAccordion(2)}
                                        {renderAccordion(5)}
                                    </Box>
                                </>
                            );
                        })()}
                    </Box>

                    {/* Bottom CTA */}
                    <Box sx={{ mt: 10, textAlign: "center" }}>
                        <ExpertCTA text="Talk to Our Expert" />
                    </Box>
                </Container>
            </Box>

            <Box sx={{ py: 8 }}>
                <ClientReviews />
            </Box>

        </Box>
    );
}
