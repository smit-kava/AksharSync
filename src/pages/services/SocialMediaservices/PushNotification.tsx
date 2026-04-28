import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Container, Fade, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { ClientReviews, ExpertCTA } from '../../../components';
import { GradientText, HeroChip } from "../../../components/Landing/Shared";
import RevealOnScroll from "../../../components/RevealOnScroll";
import {
    AnnouncementIcon,
    ArchitectureIcon,
    BoltIcon,
    CreativeIcon,
    MultiChannelIcon,
    OngoingIcons,
    PushNotificationIcon,
    TargetIcon, TrendUpIcon
} from "../../../components/icons";
import { TimeIcons } from '../../../components/icons/Icons';

// ─── Keyframes ────────────────────────────────────────────────────────────────

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatA = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  40%       { transform: translateY(-10px) translateX(3px); }
  70%       { transform: translateY(-5px) translateX(-3px); }
`;

const floatB = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  35%       { transform: translateY(-12px) translateX(-3px); }
  65%       { transform: translateY(-6px) translateX(2px); }
`;

const rowFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
`;

const pulse = keyframes`
  0%   { transform: scale(1);    opacity: 0.55; }
  70%  { transform: scale(1.35); opacity: 0; }
  100% { transform: scale(1.35); opacity: 0; }
`;



// ─── Floating Notification Card ───────────────────────────────────────────────

interface NotifProps {
    icon: React.ReactNode;
    color: string;
    title: string;
    sub: string;
    anim: ReturnType<typeof keyframes>;
    delay?: string;
    sx?: object;
}

const NotifCard: React.FC<NotifProps> = ({ icon, color, title, sub, anim, delay = "0s", sx = {} }) => (
    <Box sx={{
        position: "absolute",
        display: "flex", alignItems: "center", gap: "12px",
        px: "14px", py: "11px",
        minWidth: 196,
        borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(7,18,36,0.97) 0%, rgba(11,26,50,0.96) 100%)",
        border: `1px solid ${alpha(color, 0.3)}`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 ${alpha("#fff", 0.06)}`,
        backdropFilter: "blur(16px)",
        animation: `${anim} 6s ease-in-out infinite ${delay}`,
        zIndex: 20,
        ...sx,
    }}>
        <Box sx={{
            width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
            background: alpha(color, 0.12),
            border: `1px solid ${alpha(color, 0.22)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color,
            position: "relative",
            "&::after": {
                content: '""', position: "absolute", inset: -3,
                borderRadius: "13px",
                border: `1px solid ${alpha(color, 0.18)}`,
                animation: `${pulse} 2.5s ease-out infinite`,
            },
        }}>
            {icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "11.5px", fontWeight: 800, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: "10px", color: alpha("#fff", 0.42), mt: "2px", whiteSpace: "nowrap" }}>
                {sub}
            </Typography>
        </Box>
        <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: color, flexShrink: 0, boxShadow: `0 0 7px ${color}` }} />
    </Box>
);

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

const PhoneMockup: React.FC = () => {
    const rows = [
        { icon: <BoltIcon sx={{ fontSize: 14 }} />, text: "Flash Sale Live Now", color: "#fbbf24" },
        { icon: <TimeIcons sx={{ fontSize: 14 }} />, text: "Only 2 hours left!", color: "#f43f5e" },
        { icon: <LocalShippingIcon sx={{ fontSize: 14 }} />, text: "Free shipping today", color: "#34d399" },
        { icon: <ShoppingCartIcon sx={{ fontSize: 14 }} />, text: "Complete your order", color: "#a78bfa" },
    ];

    return (
        <Box sx={{ position: "relative", width: 196, height: 400, flexShrink: 0 }}>
            {/* Shell */}
            <Box sx={{
                position: "absolute", inset: 0,
                borderRadius: "38px",
                background: "linear-gradient(165deg, #0e1e38 0%, #060f1e 100%)",
                border: "1.5px solid rgba(56,189,248,0.2)",
                boxShadow: [
                    "0 40px 80px rgba(0,0,0,0.65)",
                    "0 0 0 1px rgba(255,255,255,0.04)",
                    "inset 0 0 50px rgba(56,189,248,0.04)",
                    "0 0 60px rgba(56,189,248,0.08)",
                ].join(", "),
                overflow: "hidden",
            }}>
                <Box sx={{ p: "18px", pt: "26px", height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* Notch */}
                    <Box sx={{ width: 56, height: 5, bgcolor: "rgba(255,255,255,0.08)", borderRadius: 10, mx: "auto", mb: "18px", flexShrink: 0 }} />

                    {/* Bell + badge */}
                    <Box sx={{ textAlign: "center", mb: "16px", flexShrink: 0 }}>
                        <Box sx={{
                            display: "inline-flex", position: "relative",
                            width: 50, height: 50, borderRadius: "15px",
                            background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
                            alignItems: "center", justifyContent: "center",
                            boxShadow: "0 10px 28px rgba(14,165,233,0.45)",
                        }}>
                            <Typography sx={{ fontSize: 22, lineHeight: 1 }}>🔔</Typography>
                            <Box sx={{
                                position: "absolute", top: -5, right: -5,
                                width: 19, height: 19, borderRadius: "50%",
                                bgcolor: "#f43f5e",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                border: "2px solid #060f1e",
                                boxShadow: "0 0 10px rgba(244,63,94,0.65)",
                            }}>
                                <Typography sx={{ fontSize: "8px", fontWeight: 900, color: "#fff" }}>5</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Rows */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        {rows.map((r, i) => (
                            <Box key={i} sx={{
                                display: "flex", alignItems: "center", gap: "9px",
                                px: "9px", py: "8px",
                                borderRadius: "9px",
                                background: `linear-gradient(135deg, ${alpha(r.color, 0.08)}, ${alpha(r.color, 0.02)})`,
                                border: `1px solid ${alpha(r.color, 0.13)}`,
                                animation: `${rowFloat} ${3.5 + i * 0.4}s ease-in-out infinite ${i * 0.25}s`,
                            }}>
                                <Box sx={{ color: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {r.icon}
                                </Box>
                                <Typography sx={{ fontSize: "9px", color: alpha("#fff", 0.72), fontWeight: 600, lineHeight: 1.3 }}>
                                    {r.text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Side buttons */}
            {[
                { s: "left", top: 88, h: 26 },
                { s: "left", top: 124, h: 22 },
                { s: "right", top: 105, h: 40 },
            ].map((b, i) => (
                <Box key={i} sx={{
                    position: "absolute",
                    [b.s]: -2.5,
                    top: b.top, width: 3, height: b.h,
                    borderRadius: b.s === "left" ? "2px 0 0 2px" : "0 2px 2px 0",
                    bgcolor: "rgba(56,189,248,0.22)",
                }} />
            ))}
        </Box>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PushNotification() {
    const [ready, setReady] = useState(false);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [detailedExpanded, setDetailedExpanded] = useState<string | false>('mobile');

    const handleDetailedChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setDetailedExpanded(isExpanded ? panel : false);
    };

    const mobileFeatures = [
        "Support for native iOS and Android apps.",
        "Foundational flow adjustments (up to 10 messages).",
        "Sending both standard push notifications in the form of visible alerts and silent/background ones as data messages.",
        "Creating push notifications with multimedia elements such as images for Android or even GIF files for iOS.",
        "Develop deep links in notifications to redirect users to the specific app screen you want.",
        "Opt-in strategy and adjustments.",
        "Integrate push notifications into other channels such as email, SMS, or in-app messages for omnichannel customer journeys.",
        "Creation of automated campaigns, such as welcome messages, abandoned cart reminders, promotions, re-engagement, or order updates.",
        "Implementation of Klaviyo platform segmentation capabilities to personalize push notifications based on customer data."
    ];

    const webFeatures = [
        "Development of standard web push alerts, such as cart abandonment, browse abandonment, restock notifications, etc.",
        "Personalization of web push notifications using Klaviyo segments.",
        "Automation and customization of web push notification campaigns to launch them based on customer data or actions."
    ];

    const additionalBenefits = [
        {
            title: "Supportive Channel",
            desc: "Our push services are separate additional services that extend your influence to multi-channel marketing. That is, they do not replace our email or SMS services, but are an excellent additional strategy that, with our help, will bring more and more leads to your business.",
            icon: <MultiChannelIcon sx={{ fontSize: 32 }} />,
            color: "#38bdf8"
        },
        {
            title: "Vibrant Eye-Catching Designs",
            desc: "Stylish designs that are pleasing to the eye are our calling card. Whether we are developing emails, SMS, push notifications or anything else, our designs are among the most competitive. More importantly, the designs will preserve your brand's signature style, thereby increasing its recognition.",
            icon: <CreativeIcon sx={{ fontSize: 32 }} />,
            color: "#a78bfa"
        },
        {
            title: "Finding an Approach to Your Customers",
            desc: "Our agency has been working in email marketing across a wide variety of industries for years. This means that we know a great deal about personalization, timing, and finding the right audience to segment. If you choose emails, mobile, or web push notifications services, they will be highly relevant and help you connect with your audience while encouraging them to interact.",
            icon: <TargetIcon sx={{ fontSize: 32 }} />,
            color: "#34d399"
        },
        {
            title: "Realizing the Full Potential of Data",
            desc: "Collecting and using data is essential for achieving high results in all aspects of your marketing efforts. Thanks to powerful analytical tools, AksharSync experts will provide you with high-quality services based on data about detailed customer behavior and more, optimizing strategies and achieving success.",
            icon: <TrendUpIcon sx={{ fontSize: 32 }} />,
            color: "#fbbf24"
        },
        {
            title: "Ensuring Deliverability",
            desc: "Before contacting us for services, clients often have many problems with email deliverability. We understand its importance; hence, we focus on aspects that ensure it. Together with the AksharSync team, you will not only maintain your reputation as a reliable and trusted brand but also improve it.",
            icon: <ArchitectureIcon sx={{ fontSize: 32 }} />,
            color: "#f43f5e"
        },
        {
            title: "Performance Visibility",
            desc: "Our tools allow us to track the performance of each key metric from start to finish. This makes our services transparent and gives you a complete picture of the results our work brings.",
            icon: <AnnouncementIcon sx={{ fontSize: 32 }} />,
            color: "#0ea5e9"
        },
        {
            title: "Quality Guarantee",
            desc: "Our agency takes a responsible approach to projects, and our experts treat every detail of our work with professionalism and meticulousness. The success of our email marketing services is guaranteed through testing and optimization using platforms such as Klaviyo.",
            icon: <BoltIcon sx={{ fontSize: 32 }} />,
            color: "#fbbf24"
        },
        {
            title: "Protection and Insurance",
            desc: "Transferring company data for services can be a tense procedure, but not with AksharSync. Our own reputation and the trust of our clients are important to us, so we provide them with full insurance against all major risk categories, including cybersecurity, media, and liability. Developing a business in the digital space can be risky; AksharSync minimizes those risks.",
            icon: <OngoingIcons sx={{ fontSize: 32 }} />,
            color: "#a78bfa"
        }
    ];

    useEffect(() => { setReady(true); }, []);

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
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
                    background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)",
                    filter: "blur(70px)", pointerEvents: "none",
                }} />
                <Box sx={{
                    position: "absolute", bottom: "-10%", left: "-5%",
                    width: "38vw", height: "38vw",
                    background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
                    filter: "blur(55px)", pointerEvents: "none",
                }} />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "52% 48%" },
                        alignItems: "center",
                        gap: { xs: "40px", lg: "24px" },
                    }}>
                        {/* Left Column */}
                        <Fade in={ready} timeout={600}>
                            <Box sx={{ animation: `${slideUp} 0.7s cubic-bezier(0.16,1,0.3,1)` }}>
                                <Box sx={{ mb: "16px" }}>
                                    <HeroChip>
                                        <PushNotificationIcon sx={{ fontSize: 14 }} />
                                        Advanced Push Strategy Agency
                                    </HeroChip>
                                </Box>
                                <Typography variant="h1" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.1rem", sm: "2.7rem", md: "3.2rem", lg: "3.5rem" },
                                    lineHeight: 1.08, letterSpacing: "-0.035em", mb: "18px",
                                }}>
                                    Mobile & Web <GradientText>Push Notification</GradientText> Services
                                </Typography>
                                <Typography sx={{
                                    color: alpha("#fff", 0.52), fontSize: { xs: "0.93rem", md: "1.02rem" },
                                    lineHeight: 1.8, maxWidth: 490, mb: "26px",
                                }}>
                                    Creating and managing truly engaging push notifications that encourage clicks requires significant development and marketing knowledge. AksharSync is exactly what you need to take advantage of this opportunity!
                                </Typography>
                                <Box sx={{ mb: "30px" }}>
                                    <ExpertCTA text="Talk to Our Expert" sx={{ py: "13px", px: "26px", borderRadius: "13px" }} />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap" }}>
                                    {[
                                        { value: "12%+", label: "Avg. CTR", grad: true },
                                        { value: "Instant", label: "Delivery", grad: false },
                                        { value: "24/7", label: "Engagement", grad: false },
                                    ].map((s, i) => (
                                        <React.Fragment key={i}>
                                            {i > 0 && <Box sx={{ width: 1, height: 24, bgcolor: "rgba(255,255,255,0.09)" }} />}
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 900, fontSize: "1.05rem",
                                                    ...(s.grad ? {
                                                        background: "linear-gradient(90deg,#38bdf8,#a78bfa)",
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

                        {/* Right Column */}
                        <Fade in={ready} timeout={900}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: { xs: "420px", lg: "520px" } }}>
                                <Box sx={{ position: "relative", width: 440, height: 480 }}>
                                    {/* SVG connectors */}
                                    <Box component="svg" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 5 }} viewBox="0 0 440 480">
                                        <defs>
                                            <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                                                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                                            </linearGradient>
                                            <linearGradient id="cg2" x1="100%" y1="100%" x2="0%" y2="0%">
                                                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
                                                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
                                                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="176" y1="100" x2="206" y2="136" stroke="url(#cg1)" strokeWidth="1.5" strokeDasharray="4 3" />
                                        <line x1="270" y1="370" x2="242" y2="344" stroke="url(#cg2)" strokeWidth="1.5" strokeDasharray="4 3" />
                                    </Box>

                                    <Box sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
                                        <PhoneMockup />
                                    </Box>

                                    <NotifCard
                                        icon={<BoltIcon sx={{ fontSize: 16 }} />}
                                        color="#fbbf24"
                                        title="Flash Sale Live!"
                                        sub="Ends in 2 hours. Shop now."
                                        anim={floatA}
                                        sx={{ left: 0, top: "72px" }}
                                    />
                                    <NotifCard
                                        icon={<TargetIcon sx={{ fontSize: 16 }} />}
                                        color="#a78bfa"
                                        title="Abandoned Cart"
                                        sub="Finish your purchase today!"
                                        anim={floatB}
                                        delay="1.2s"
                                        sx={{ right: 0, bottom: "68px" }}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    </Box>
                </Container>
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
                <RevealOnScroll>
                    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                        {/* Title */}
                        <Box sx={{ textAlign: "center", mb: { xs: 7, md: 10 } }}>
                            <Box sx={{ width: 40, height: 4, bgcolor: "#38bdf8", borderRadius: "100px", mx: "auto", mb: 3 }} />
                            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3.2rem" }, color: "#fff" }}>
                                Benefits of <GradientText>Push Notification Marketing</GradientText>
                            </Typography>
                        </Box>

                        {/* Two-column layout */}
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 8, md: 10 }, alignItems: "center" }}>

                            {/* LEFT — Checklist */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
                                {[
                                    "With web push notifications, you can send short pop-up messages and reminders to your customers via browser, even if they are not on your website.",
                                    "Offer customers personalized offers and content to deliver on-site during the customer's shopping session.",
                                    "Improve customer engagement to use your app.",
                                    "Send the reminders you need directly to customer phones.",
                                    "Increase user awareness of the special offers you provide.",
                                    "With push notification segmentation, offer your loyal VIP customers a personalized experience and individual incentives.",
                                ].map((text, i) => (
                                    <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                                        {/* Checkmark icon */}
                                        <Box sx={{
                                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0, mt: "2px",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#38bdf8",
                                        }}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M4 11.5L8.5 16L18 7" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Box>
                                        <Typography sx={{ color: alpha("#fff", 0.72), fontSize: "0.95rem", lineHeight: 1.7 }}>
                                            {text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* RIGHT — SVG Push Notification Mockup */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <Box component="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 420"
                                    sx={{ width: "100%", maxWidth: 480, filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}>

                                    {/* ── Browser notification panel ── */}
                                    <rect x="20" y="10" width="280" height="180" rx="14" fill="#0d2040" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                                    {/* dots */}
                                    <circle cx="42" cy="32" r="5" fill="#f43f5e" />
                                    <circle cx="58" cy="32" r="5" fill="#fbbf24" />
                                    <circle cx="74" cy="32" r="5" fill="#34d399" />
                                    {/* address bar */}
                                    <rect x="88" y="24" width="190" height="16" rx="8" fill="rgba(255,255,255,0.06)" />
                                    {/* divider */}
                                    <line x1="20" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                    {/* notification rows inside browser */}
                                    {[
                                        { y: 68, color: "#38bdf8", label: "Your cart is waiting" },
                                        { y: 108, color: "#fbbf24", label: "24-hour deal is live" },
                                        { y: 148, color: "#a78bfa", label: "Weekend Sale is here!" },
                                    ].map((n, i) => (
                                        <g key={i}>
                                            <rect x="32" y={n.y} width="256" height="32" rx="8" fill="rgba(255,255,255,0.04)" stroke={`${n.color}33`} strokeWidth="1" />
                                            <circle cx="50" cy={n.y + 16} r="9" fill={`${n.color}22`} stroke={n.color} strokeWidth="1.2" />
                                            {/* Bell SVG icon */}
                                            <path d={`M50 ${n.y + 11} a3 3 0 0 1 6 0 5 5 0 0 1 2 4v1h-10v-1a5 5 0 0 1 2-4z`} fill={n.color} opacity="0.9" />
                                            <path d={`M49 ${n.y + 23} h8 a2 2 0 0 1-8 0z`} fill={n.color} opacity="0.9" />
                                            <text x="68" y={n.y + 20} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">{n.label}</text>
                                        </g>
                                    ))}

                                    {/* badge count */}
                                    <circle cx="300" cy="10" r="14" fill="#f43f5e" />
                                    <text x="300" y="15" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold" fontFamily="sans-serif">3</text>

                                    {/* ── Phone mockup ── */}
                                    <rect x="290" y="80" width="175" height="320" rx="26" fill="#0a1e38" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />
                                    {/* notch */}
                                    <rect x="350" y="88" width="54" height="8" rx="4" fill="rgba(255,255,255,0.07)" />
                                    {/* status bar */}
                                    <text x="302" y="106" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">9:41</text>
                                    <text x="440" y="106" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif" textAnchor="end">●●●</text>
                                    {/* notification rows inside phone */}
                                    {[
                                        { label: "Shopping App", sub: "Enjoy 20% off on your next purchase.", color: "#38bdf8", y: 118 },
                                        { label: "Weekend Sale", sub: "Items selling fast — grab yours now!", color: "#fbbf24", y: 178 },
                                        { label: "New Arrivals", sub: "Discover the latest collections today.", color: "#34d399", y: 238 },
                                    ].map((n, i) => (
                                        <g key={i}>
                                            <rect x="302" y={n.y} width="151" height="50" rx="10" fill="rgba(255,255,255,0.04)" stroke={`${n.color}33`} strokeWidth="1" />
                                            <circle cx="316" cy={n.y + 15} r="7" fill={`${n.color}22`} stroke={n.color} strokeWidth="1" />
                                            {/* Bell SVG icon (small) */}
                                            <path d={`M316 ${n.y + 10} a2.5 2.5 0 0 1 5 0 4 4 0 0 1 1.5 3v1h-8v-1a4 4 0 0 1 1.5-3z`} fill={n.color} opacity="0.9" />
                                            <path d={`M314.5 ${n.y + 20} h7 a1.5 1.5 0 0 1-7 0z`} fill={n.color} opacity="0.9" />
                                            <text x="328" y={n.y + 16} fontSize="8" fill="rgba(255,255,255,0.85)" fontWeight="bold" fontFamily="sans-serif">{n.label}</text>
                                            <text x="312" y={n.y + 34} fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">{n.sub}</text>
                                        </g>
                                    ))}

                                    {/* side buttons */}
                                    <rect x="288" y="140" width="3" height="22" rx="1.5" fill="rgba(56,189,248,0.2)" />
                                    <rect x="288" y="170" width="3" height="18" rx="1.5" fill="rgba(56,189,248,0.2)" />
                                    <rect x="464" y="155" width="3" height="34" rx="1.5" fill="rgba(56,189,248,0.2)" />

                                    {/* Home bar */}
                                    <rect x="347" y="385" width="60" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            <ClientReviews />

            {/* ══ PUSH SERVICES SECTION (SIDE-BY-SIDE ACCORDIONS) ══ */}
            <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        {/* Title & Subtitle */}
                        <Box sx={{ textAlign: "center", mb: 8, maxWidth: 850, mx: "auto" }}>
                            <Box sx={{ width: 45, height: 3, bgcolor: "#38bdf8", borderRadius: 10, mx: "auto", mb: 4 }} />
                            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3.5rem" }, mb: 3 }}>
                                Push Notification Services
                            </Typography>
                            <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1rem", lineHeight: 1.8 }}>
                                The years of experience that the AksharSync team has working with Klaviyo let us offer full services for setting up mobile and web push notifications. Our services include:
                            </Typography>
                        </Box>

                        {/* Two Accordions Side-by-Side */}
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 8, alignItems: "flex-start" }}>

                            {/* Mobile Accordion */}
                            <Accordion
                                expanded={detailedExpanded === 'mobile'}
                                onChange={handleDetailedChange('mobile')}
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.02)",
                                    color: "#fff",
                                    borderRadius: "16px !important",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    boxShadow: "none",
                                    transition: "all 0.3s",
                                    "&:hover": { borderColor: "rgba(56, 189, 248, 0.3)" },
                                    "&.Mui-expanded": {
                                        bgcolor: "rgba(255,255,255,0.03)",
                                        borderColor: "rgba(56, 189, 248, 0.4)"
                                    },
                                    "&:before": { display: "none" }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: alpha("#fff", 0.3) }} />}>
                                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Mobile Push Notifications:</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {mobileFeatures.map((f, i) => (
                                            <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                                                <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#38bdf8", mt: "10px", flexShrink: 0 }} />
                                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.9rem", lineHeight: 1.5 }}>{f}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            {/* Web Accordion */}
                            <Accordion
                                expanded={detailedExpanded === 'web'}
                                onChange={handleDetailedChange('web')}
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.02)",
                                    color: "#fff",
                                    borderRadius: "16px !important",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    boxShadow: "none",
                                    transition: "all 0.3s",
                                    "&:hover": { borderColor: "rgba(167, 139, 250, 0.3)" },
                                    "&.Mui-expanded": {
                                        bgcolor: "rgba(255,255,255,0.03)",
                                        borderColor: "rgba(167, 139, 250, 0.4)"
                                    },
                                    "&:before": { display: "none" }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: alpha("#fff", 0.3) }} />}>
                                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Web Push Notifications:</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        {webFeatures.map((f, i) => (
                                            <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                                                <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#a78bfa", mt: "10px", flexShrink: 0 }} />
                                                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.9rem", lineHeight: 1.5 }}>{f}</Typography>
                                            </Box>
                                        ))}

                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        {/* Bottom CTA */}
                        <Box sx={{ textAlign: "center" }}>
                            <ExpertCTA text="Talk to Our Expert" />
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══ WHY CHOOSE AKSHARSYNC (ADDITIONAL VALUE) ══ */}
            <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <RevealOnScroll>
                    <Container maxWidth="lg">
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 4
                        }}>
                            {additionalBenefits.map((item, i) => (
                                <Box key={i} sx={{
                                    p: { xs: 4, md: 5 },
                                    borderRadius: "28px",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    width: {
                                        xs: "100%",
                                        sm: "calc(50% - 16px)",
                                        lg: "calc(33.33% - 22px)"
                                    },
                                    transition: "all 0.4s",
                                    "&:hover": {
                                        transform: "translateY(-12px)",
                                        background: "rgba(255,255,255,0.04)",
                                        borderColor: alpha(item.color, 0.3)
                                    },
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2
                                }}>
                                    <Box sx={{
                                        width: 56, height: 56, borderRadius: "16px",
                                        background: alpha(item.color, 0.1),
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        mb: 2, color: item.color
                                    }}>
                                        {item.icon}
                                    </Box>
                                    <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#fff", lineHeight: 1.3 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", lineHeight: 1.7 }}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Bottom CTA for this section */}
                        <Box sx={{ mt: 10, textAlign: "center" }}>
                            <ExpertCTA text="Schedule a Call" />
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

            {/* ══ CLIENT REVIEWS SECTION ══ */}



            {/* ══ FAQ SECTION ══ */}
            <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: "#081121", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <RevealOnScroll>
                    <Container maxWidth="md">
                        <Box sx={{ textAlign: "center", mb: 8 }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2.2rem", md: "3.4rem" }, mb: 3 }}>
                                Frequently Asked <GradientText>Questions</GradientText>
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            {[
                                {
                                    q: "What are push notifications?",
                                    a: "Push notifications are short alerts that can appear in a browser or phone, even when the user isn’t on the site or in the app. To get them, the customer needs to allow notifications in their browser or install the app. They let brands constantly reach out, quickly share info, and boost customer engagement."
                                },
                                {
                                    q: "Which businesses can benefit from push notifications?",
                                    a: "Push notifications are very effective for eCommerce, SaaS, media, delivery services, educational platforms, and any projects that want to stay in the customer’s focus."
                                },
                                {
                                    q: "How are mobile push notifications useful?",
                                    a: "Mobile push notifications help maintain activity and online presence in a mobile app, notify users about updates, personalized offers, completed transactions, and important events. Having a high open rate, they attract high engagement."
                                },
                                {
                                    q: "How long does it take to launch push notifications?",
                                    a: "They can be launched fairly quickly. Basic setup takes from a few hours to 1-2 days, depending on the complexity of the customization. Automation and custom scenarios may take longer. With AksharSync, you can launch effective push notifications at the optimal time."
                                },
                                {
                                    q: "Do users need to allow push notifications?",
                                    a: "Yes. Web and mobile push notifications only work after the user subscribes through the native permission window of the browser or operating system. On phones, it is often enough for the user to download your app for you to be able to send them notifications."
                                }
                            ].map((faq, i) => (
                                <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleAccordionChange(`panel${i}`)} sx={{ bgcolor: "rgba(255,255,255,0.02)", color: "#fff", borderRadius: "12px !important", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "none", "&.Mui-expanded": { borderColor: "rgba(56, 189, 248, 0.4)" } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#38bdf8" }} />}>
                                        <Typography sx={{ fontWeight: 700 }}>{faq.q}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography sx={{ color: alpha("#fff", 0.6), lineHeight: 1.6 }}>{faq.a}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Container>
                </RevealOnScroll>
            </Box>

        </Box>
    );
}