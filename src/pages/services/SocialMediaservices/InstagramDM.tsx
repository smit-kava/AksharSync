import React, { useEffect, useState } from 'react';
import { Box, Container, Fade, Typography, alpha } from "@mui/material";
import { keyframes } from "@mui/system";
import { ExpertCTA } from '../../../components';
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

    useEffect(() => { setReady(true); }, []);

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
        </Box>
    );
}
