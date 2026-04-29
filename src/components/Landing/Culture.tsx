import { Box, Container, Typography, Button, alpha } from "@mui/material";
import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";

// ─── Animations ───────────────────────────────────────────────────────────────
const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.06); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const highlights = [
    { initials: "SK", label: "Founder & Architect", gradient: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)" },
    { initials: "ST", label: "CRM Strategists", gradient: "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)" },
    { initials: "DQ", label: "Dev & QA Squad", gradient: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)" },
    { initials: "CS", label: "Client Success", gradient: "linear-gradient(135deg, #a78bfa 0%, #7fd0ff 100%)" },
];

const stats = [
    { value: "10+", label: "Years of expertise" },
    { value: "5+", label: "Global regions" },
    { value: "350+", label: "Brands served" },
    { value: "100%", label: "White-label ready" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Culture() {
    return (
        <Box
            sx={{
                py: 12,
                bgcolor: "#060e1a",
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            {/* Ambient orbs */}
            <Box sx={{ position: "absolute", top: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(127,208,255,0.06) 0%, transparent 70%)", animation: `${pulse} 5s ease infinite`, pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", bottom: "10%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", animation: `${pulse} 5s ease infinite 1.5s`, pointerEvents: "none" }} />

            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 6, lg: 10 },
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { md: "center" },
                    }}
                >
                    {/* ── LEFT: Text ── */}
                    <Box sx={{ flex: 1 }}>

                        {/* Badge — no background */}
                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                            <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7fd0ff" }}>
                                AksharSync Culture
                            </Typography>
                        </Box>

                        {/* Decorative line */}
                        <Box sx={{ width: 48, height: 2, borderRadius: "1px", background: "linear-gradient(90deg, #7fd0ff, #a78bfa, transparent)", mb: 3.5 }} />

                        {/* Heading */}
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#fff", mb: 3 }}
                        >
                            A global team built{" "}
                            <Box component="span" sx={{ background: "linear-gradient(90deg, #7fd0ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                around your growth
                            </Box>
                        </Typography>

                        {/* Body copy */}
                        <Typography sx={{ color: alpha("#fff", 0.48), fontSize: "0.97rem", lineHeight: 1.85, mb: 2.5 }}>
                            The AksharSync team is an international group of professionals spread across the globe. Our diverse backgrounds bring unique ideas and fresh perspectives — contributing to industry-leading retention innovation.
                        </Typography>
                        <Typography sx={{ color: alpha("#fff", 0.35), fontSize: "0.92rem", lineHeight: 1.85, mb: 5 }}>
                            Despite our differences, we're a tight-knit group with extraordinary communication. We work together to go the extra mile for every client — every send, every flow, every campaign.
                        </Typography>

                        {/* CTA */}
                        <Button
                            component={RouterLink}
                            to={ROUTE_PATHS.ABOUT}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderRadius: "10px",
                                bgcolor: alpha("#7fd0ff", 0.1),
                                color: "#7fd0ff",
                                border: "1px solid rgba(127,208,255,0.25)",
                                px: 3.5,
                                py: 1.4,
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                textTransform: "none",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    bgcolor: alpha("#7fd0ff", 0.18),
                                    borderColor: "rgba(127,208,255,0.5)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 24px rgba(127,208,255,0.15)",
                                },
                            }}
                        >
                            Learn More About Us
                        </Button>
                    </Box>

                    {/* ── RIGHT: Who's behind ── */}
                    <Box sx={{ flexShrink: 0, width: { xs: "100%", md: 420 }, animation: `${float} 6s ease-in-out infinite` }}>

                        {/* Team card */}
                        <Box
                            sx={{
                                borderRadius: "24px",
                                border: "1px solid rgba(255,255,255,0.07)",
                                background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                                p: 3.5,
                                mb: 2,
                            }}
                        >
                            <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: alpha("#fff", 0.25), mb: 2.5 }}>
                                Who's behind AksharSync
                            </Typography>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                                {highlights.map((h, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: "flex", alignItems: "center", gap: 1.5,
                                            p: 1.5, borderRadius: "14px",
                                            background: "rgba(255,255,255,0.02)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            transition: "all 0.25s",
                                            "&:hover": { background: "rgba(255,255,255,0.04)", borderColor: "rgba(127,208,255,0.15)" },
                                        }}
                                    >
                                        <Box sx={{ width: 38, height: 38, borderRadius: "11px", background: h.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, color: "#060e1a", flexShrink: 0 }}>
                                            {h.initials}
                                        </Box>
                                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: alpha("#fff", 0.65), lineHeight: 1.3 }}>
                                            {h.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Stats row */}
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
                            {stats.map((s, i) => (
                                <Box key={i} sx={{ textAlign: "center", p: 1.5, borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 900, background: "linear-gradient(135deg, #7fd0ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>
                                        {s.value}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.55rem", color: alpha("#fff", 0.3), mt: 0.5, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                                        {s.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}
