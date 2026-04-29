import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { ExpertCTA as CommonExpertCTA } from "../components";
import { GradientText } from "../components/Landing/Shared";
import RevealOnScroll from "../components/RevealOnScroll";
import {
    ArchitectureIcon,
    BoltIcon,
    TrendUpIcon,
    TargetIcon,
    EmailIcon,
    MessagingIcon,
} from "../components/icons";

// ─── Animations ───────────────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ─── Styled ───────────────────────────────────────────────────────────────────

const OrbGlow = styled(Box)({
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
    filter: "blur(80px)",
});

const StatCard = styled(Box)({
    flex: 1,
    minWidth: 140,
    textAlign: "center",
    padding: "28px 16px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    "&:hover": {
        background: "rgba(127,208,255,0.04)",
        borderColor: "rgba(127,208,255,0.18)",
        transform: "translateY(-4px)",
    },
});

const ValueCard = styled(Box)({
    padding: "28px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.35s ease",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(127,208,255,0.2)",
        transform: "translateY(-6px)",
    },
});

const TeamCard = styled(Box)({
    borderRadius: "24px",
    overflow: "hidden",
    background: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
    transition: "all 0.35s ease",
    "&:hover": {
        borderColor: "rgba(127,208,255,0.22)",
        transform: "translateY(-6px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
    },
});

const TimelineDot = styled(Box)<{ color?: string }>(({ color = "#7fd0ff" }) => ({
    width: 44,
    height: 44,
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: alpha(color, 0.12),
    border: `1px solid ${alpha(color, 0.22)}`,
    color,
}));

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
    { n: "2014", l: "Founded" },
    { n: "10+", l: "Years of expertise" },
    { n: "7", l: "ESP platforms" },
    { n: "5+", l: "Global regions" },
    { n: "100%", l: "White-label ready" },
];

const values = [
    {
        icon: <TrendUpIcon sx={{ fontSize: 22, color: "#34d399" }} />,
        color: "#34d399",
        title: "Revenue-first thinking",
        desc: "Every decision we make is anchored to measurable outcomes — repeat purchases, CLV, and sustainable retention growth.",
    },
    {
        icon: <ArchitectureIcon sx={{ fontSize: 22, color: "#7fd0ff" }} />,
        color: "#7fd0ff",
        title: "Technical depth",
        desc: "We go beyond strategy — we build, deploy, and iterate on the technical systems that make great CRM actually work.",
    },
    {
        icon: <TargetIcon sx={{ fontSize: 22 }} />,
        color: "#a78bfa",
        title: "Silent partnership",
        desc: "We operate as your invisible execution layer. Your brand, your client — we just make sure every send is flawless.",
    },
    {
        icon: <BoltIcon sx={{ fontSize: 22, color: "#fbbf24" }} />,
        color: "#fbbf24",
        title: "Speed & precision",
        desc: "Tight deadlines, complex briefs — we're built for enterprise velocity without sacrificing quality or brand standards.",
    },
    {
        icon: <MessagingIcon sx={{ fontSize: 22, color: "#f472b6" }} />,
        color: "#f472b6",
        title: "Omnichannel fluency",
        desc: "Email is just the start. We think across SMS, WhatsApp, push, RCS, and beyond to meet your audience anywhere.",
    },
    {
        icon: <EmailIcon sx={{ fontSize: 22, color: "#6ee7b7" }} />,
        color: "#6ee7b7",
        title: "Inbox obsession",
        desc: "Deliverability isn't an afterthought — it's wired into everything we build, from DNS configuration to content scoring.",
    },
];

const timeline = [
    {
        year: "2014",
        label: "Founded",
        desc: "AksharSync was established with a focus on email development and lifecycle marketing.",
        color: "#7fd0ff",
    },
    {
        year: "2017",
        label: "ESP Expansion",
        desc: "Extended capabilities across Klaviyo, HubSpot, Braze, and Salesforce Marketing Cloud.",
        color: "#a78bfa",
    },
    {
        year: "2020",
        label: "Global Reach",
        desc: "Launched operations across UK, EU, Netherlands, and international ecommerce markets.",
        color: "#34d399",
    },
    {
        year: "2022",
        label: "Omnichannel",
        desc: "Rolled out SMS, WhatsApp, push notification, and RCS retention systems.",
        color: "#fbbf24",
    },
    {
        year: "2024",
        label: "White-label Agency",
        desc: "Became the trusted silent partner for 20+ digital agencies and enterprise brands.",
        color: "#f472b6",
    },
];

const team = [
    {
        name: "Strategy Team",
        role: "CRM & Lifecycle Specialists",
        bio: "Data-led strategists who turn customer journeys into compounding revenue engines.",
        initials: "ST",
        gradient: "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)",
    },
    {
        name: "Dev & QA Squad",
        role: "Technical Execution",
        bio: "Production-grade email developers and QA engineers delivering pixel-perfect builds.",
        initials: "DQ",
        gradient: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AboutPage = () => {
    return (
        <Box sx={{ bgcolor: "#060e1a", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

            {/* ── HERO ── */}
            <Box sx={{ pt: { xs: 14, md: 20 }, pb: 10, textAlign: "center", position: "relative" }}>
                <OrbGlow sx={{ top: "-80px", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 65%)" }} />
                <OrbGlow sx={{ top: 100, left: "10%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(127,208,255,0.07) 0%, transparent 70%)", animation: `${pulse} 4s ease infinite` }} />
                <OrbGlow sx={{ top: 60, right: "8%", width: 240, height: 240, background: "radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)", animation: `${pulse} 5s ease infinite 1s` }} />

                {/* ── Circular emblem badge ── */}
                <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: 160, mb: 3, zIndex: 1 }}>
                    {/* Outer dashed ring 160px — spinning 12s blue dot */}
                    <Box sx={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", border: "1px dashed rgba(127,208,255,0.22)", animation: `${spin} 12s linear infinite` }}>
                        <Box sx={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", bgcolor: "#7fd0ff", boxShadow: "0 0 12px #7fd0ff" }} />
                    </Box>
                    {/* Inner ring 120px — counter-spinning 8s purple dot */}
                    <Box sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(167,139,250,0.25)", animation: `${spin} 8s linear infinite reverse` }}>
                        <Box sx={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", bgcolor: "#a78bfa", boxShadow: "0 0 10px #a78bfa" }} />
                    </Box>
                    {/* Center glass circle — perfectly centered */}
                    <Box sx={{ width: 80, height: 80, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(6,14,26,0.9)", border: "1px solid rgba(127,208,255,0.15)", backdropFilter: "blur(12px)", boxShadow: "0 0 30px rgba(127,208,255,0.08)", position: "relative", zIndex: 1 }}>
                        <Typography sx={{ fontSize: "1.4rem", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, #7fd0ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", userSelect: "none" }}>A</Typography>
                        <Typography sx={{ fontSize: "0.38rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(127,208,255,0.6)", mt: 0.5, userSelect: "none" }}>AksharSync</Typography>
                    </Box>
                </Box>

                <Container maxWidth="md">
                    <RevealOnScroll>
                        <Typography variant="h1" sx={{ fontSize: { xs: "2.4rem", md: "4rem" }, fontWeight: 800, mb: 2.5, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                            The team behind <GradientText>precision retention</GradientText>
                        </Typography>
                        <Typography sx={{ color: alpha("#fff", 0.45), fontSize: { xs: "1rem", md: "1.15rem" }, maxWidth: 580, mx: "auto", lineHeight: 1.8, mb: 4 }}>
                            Since 2014, AksharSync has been the silent execution engine behind brands and agencies who demand more than just email blasts — they demand systematic, revenue-generating retention.
                        </Typography>
                        <CommonExpertCTA text="Work With Us" />
                    </RevealOnScroll>
                </Container>
            </Box>

            {/* ── STATS BAR ── */}
            <Box sx={{ py: 4, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", bgcolor: "rgba(255,255,255,0.01)" }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                            {stats.map((s, i) => (
                                <StatCard key={i}>
                                    <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, mb: 0.5, background: "linear-gradient(135deg, #7fd0ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</Typography>
                                    <Typography sx={{ fontSize: "0.65rem", color: alpha("#fff", 0.3), textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</Typography>
                                </StatCard>
                            ))}
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>

            {/* ── MISSION ── */}
            <Box sx={{ py: 12, position: "relative" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} sx={{ alignItems: "center" }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <RevealOnScroll>
                                <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2 }}>
                                    Our Mission
                                </Typography>
                                <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, mb: 3, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                                    We make retention <GradientText>systematic</GradientText>
                                </Typography>
                                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1rem", lineHeight: 1.9, mb: 3 }}>
                                    AksharSync exists to eliminate the gap between retention strategy and technical execution. Most brands have great ideas — they just don't have the infrastructure to deliver them consistently, at scale, across every channel.
                                </Typography>
                                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1rem", lineHeight: 1.9 }}>
                                    We bridge that gap. As your white-label execution partner, we build the flows, the templates, the integrations, and the reporting that turn one-time buyers into loyal, high-CLV customers.
                                </Typography>
                            </RevealOnScroll>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <RevealOnScroll delay={0.15}>
                                <Box sx={{ position: "relative", animation: `${float} 5s ease infinite` }}>
                                    {/* Visual element */}
                                    <Box sx={{ borderRadius: "28px", border: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", p: 4, position: "relative", overflow: "hidden" }}>
                                        <OrbGlow sx={{ top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(127,208,255,0.12) 0%, transparent 70%)" }} />
                                        <Stack spacing={2.5}>
                                            {[
                                                { label: "Lifecycle Automation", pct: 95, color: "#7fd0ff" },
                                                { label: "Deliverability Score", pct: 98, color: "#34d399" },
                                                { label: "Revenue Attribution", pct: 88, color: "#a78bfa" },
                                                { label: "White-label Readiness", pct: 100, color: "#fbbf24" },
                                            ].map((item) => (
                                                <Box key={item.label}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: alpha("#fff", 0.75) }}>{item.label}</Typography>
                                                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: item.color }}>{item.pct}%</Typography>
                                                    </Box>
                                                    <Box sx={{ height: 6, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                                                        <Box sx={{ height: "100%", width: `${item.pct}%`, borderRadius: "999px", background: `linear-gradient(90deg, ${item.color}88, ${item.color})`, transition: "width 1s ease" }} />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </RevealOnScroll>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ── CORE VALUES ── */}
            <Box sx={{ py: 12, bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ textAlign: "center", mb: 8 }}>
                            <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2 }}>
                                What We Stand For
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, letterSpacing: "-0.03em" }}>
                                Our core <GradientText>values</GradientText>
                            </Typography>
                        </Box>
                    </RevealOnScroll>
                    <Grid container spacing={3}>
                        {values.map((v, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <RevealOnScroll delay={i * 0.08}>
                                    <ValueCard>
                                        <Box sx={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: alpha(v.color, 0.06), filter: "blur(40px)" }} />
                                        <Box sx={{ width: 44, height: 44, borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: alpha(v.color, 0.1), border: `1px solid ${alpha(v.color, 0.2)}`, mb: 2.5, position: "relative", zIndex: 1 }}>
                                            {v.icon}
                                        </Box>
                                        <Typography sx={{ fontSize: "1rem", fontWeight: 700, mb: 1, color: "#fff", position: "relative", zIndex: 1 }}>{v.title}</Typography>
                                        <Typography sx={{ fontSize: "0.85rem", color: alpha("#fff", 0.42), lineHeight: 1.7, position: "relative", zIndex: 1 }}>{v.desc}</Typography>
                                    </ValueCard>
                                </RevealOnScroll>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── TIMELINE ── */}
            <Box sx={{ py: 12 }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ textAlign: "center", mb: 8 }}>
                            <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2 }}>
                                Our Journey
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, letterSpacing: "-0.03em" }}>
                                A decade of <GradientText>milestones</GradientText>
                            </Typography>
                        </Box>
                    </RevealOnScroll>
                    <Box sx={{ position: "relative" }}>
                        {/* Vertical connector line */}
                        <Box sx={{ position: "absolute", left: { xs: 20, md: "50%" }, top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 15%, rgba(255,255,255,0.07) 85%, transparent)", display: { xs: "none", md: "block" } }} />
                        <Stack spacing={8}>
                            {timeline.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <RevealOnScroll key={i} delay={i * 0.1}>
                                        <Grid container spacing={4} sx={{ alignItems: "center", flexDirection: { md: isEven ? "row" : "row-reverse" } }}>
                                            <Grid size={{ xs: 12, md: 5 }}>
                                                <Box sx={{ p: 3.5, borderRadius: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", "&:hover": { borderColor: alpha(item.color, 0.3), background: alpha(item.color, 0.03) } }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                                        <TimelineDot color={item.color}>
                                                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: item.color }}>{item.year}</Typography>
                                                        </TimelineDot>
                                                        <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{item.label}</Typography>
                                                    </Box>
                                                    <Typography sx={{ fontSize: "0.88rem", color: alpha("#fff", 0.42), lineHeight: 1.7 }}>{item.desc}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 2 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                                                <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: item.color, boxShadow: `0 0 20px ${item.color}`, border: "3px solid #060e1a", zIndex: 2 }} />
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

            {/* ── TEAM ── */}
            <Box sx={{ py: 12, bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <Container maxWidth="lg">
                    <RevealOnScroll>
                        <Box sx={{ textAlign: "center", mb: 8 }}>
                            <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.2), mb: 2 }}>
                                Who We Are
                            </Typography>
                            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, letterSpacing: "-0.03em" }}>
                                Meet the <GradientText>team</GradientText>
                            </Typography>
                        </Box>
                    </RevealOnScroll>
                    <Grid container spacing={4} sx={{ justifyContent: "space-around" }}>

                        {team.map((member, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <RevealOnScroll delay={i * 0.1}>
                                    <TeamCard>
                                        {/* Top colored band */}
                                        <Box sx={{ height: 6, background: member.gradient }} />
                                        <Box sx={{ p: 3.5, }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5, }}>
                                                <Box sx={{ width: 52, height: 52, borderRadius: "16px", background: member.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 800, color: "#060e1a", flexShrink: 0 }}>
                                                    {member.initials}
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff", mb: 0.2 }}>{member.name}</Typography>
                                                    <Typography sx={{ fontSize: "0.72rem", color: alpha("#fff", 0.35), textTransform: "uppercase", letterSpacing: "0.06em" }}>{member.role}</Typography>
                                                </Box>
                                            </Box>
                                            <Typography sx={{ fontSize: "0.88rem", color: alpha("#fff", 0.45), lineHeight: 1.7 }}>{member.bio}</Typography>
                                        </Box>
                                    </TeamCard>
                                </RevealOnScroll>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ── CTA ── */}
            <Box sx={{ py: 14, position: "relative", textAlign: "center" }}>
                <OrbGlow sx={{ top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 65%)" }} />
                <Container maxWidth="sm">
                    <RevealOnScroll>
                        <Box sx={{ bgcolor: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "28px", p: { xs: 4, md: 6 } }}>
                            <Typography variant="h3" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 800, mb: 2, letterSpacing: "-0.03em" }}>
                                Ready to <GradientText>sync up?</GradientText>
                            </Typography>
                            <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.92rem", lineHeight: 1.7, mb: 4 }}>
                                Whether you're an agency needing a reliable backend partner or a brand ready to systematise your retention — let's talk.
                            </Typography>
                            <CommonExpertCTA text="Schedule a Strategic Call" />
                        </Box>
                    </RevealOnScroll>
                </Container>
            </Box>

        </Box>
    );
};

export default AboutPage;
