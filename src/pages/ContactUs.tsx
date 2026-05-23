import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/paths";

/* ─── Contact info cards ──────────────────────────────────────────────────── */
const CONTACT_ITEMS = [
    {
        icon: <EmailIcon sx={{ fontSize: 20, color: "#7fd0ff" }} />,
        label: "Email us",
        value: "support@aksharsync.com",
        href: "mailto:support@aksharsync.com",
    },
    {
        icon: <LanguageIcon sx={{ fontSize: 20, color: "#7fd0ff" }} />,
        label: "Website",
        value: "aksharsync.com",
        href: "https://aksharsync.com",
    },
    {
        icon: <LocationOnIcon sx={{ fontSize: 20, color: "#7fd0ff" }} />,
        label: "Based in",
        value: "India · Serving globally",
        href: null,
    },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const ContactUs = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) return;

        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const res = await fetch("/api/send-email.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: "",
                    countryCode: "",
                    website: "",
                    message: formData.message,
                    type: "contact_inquiry",
                }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus({ type: "success", message: "Message sent! We'll get back to you within 24 hours." });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus({ type: "error", message: data.message || "Something went wrong. Please try again." });
            }
        } catch {
            setStatus({ type: "error", message: "Connection failed. Please email us directly at support@aksharsync.com" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                pt: { xs: 14, md: 18 },
                pb: { xs: 10, md: 14 },
                background: "linear-gradient(to bottom, #060e1a 0%, #081121 100%)",
                overflow: "hidden",
            }}
        >
            {/* Background glows */}
            <Box sx={{ position: "absolute", top: "-10%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(127,208,255,0.05) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
            <Box sx={{ position: "absolute", bottom: "0%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(71,33,135,0.08) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: "flex-start" }}>

                    {/* ── LEFT: Heading + contact info ── */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "2.4rem", md: "3.2rem" },
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    mb: 2,
                                    background: "linear-gradient(135deg, #fff 0%, #7fd0ff 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Get in Touch
                            </Typography>
                            <Typography
                                sx={{
                                    color: alpha("#fff", 0.5),
                                    fontSize: "1rem",
                                    lineHeight: 1.7,
                                    mb: 5,
                                    maxWidth: 420,
                                }}
                            >
                                Have a question, partnership idea, or just want to say hello?
                                Drop us a message and we'll get back to you within 24 hours.
                            </Typography>

                            {/* Contact info cards */}
                            <Stack spacing={2.5}>
                                {CONTACT_ITEMS.map((item) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                    >
                                        <Box
                                            component={item.href ? "a" : "div"}
                                            href={item.href ?? undefined}
                                            target={item.href?.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                p: 2.5,
                                                borderRadius: "16px",
                                                bgcolor: alpha("#ffffff", 0.03),
                                                border: `1px solid ${alpha("#ffffff", 0.07)}`,
                                                textDecoration: "none",
                                                transition: "all 0.25s ease",
                                                cursor: item.href ? "pointer" : "default",
                                                "&:hover": item.href
                                                    ? { bgcolor: alpha("#7fd0ff", 0.05), borderColor: alpha("#7fd0ff", 0.2) }
                                                    : {},
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 44, height: 44, flexShrink: 0,
                                                    borderRadius: "12px",
                                                    bgcolor: alpha("#7fd0ff", 0.08),
                                                    border: `1px solid ${alpha("#7fd0ff", 0.15)}`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}
                                            >
                                                {item.icon}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: "0.72rem", color: alpha("#7fd0ff", 0.7), textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, mb: 0.2 }}>
                                                    {item.label}
                                                </Typography>
                                                <Typography sx={{ fontSize: "0.92rem", color: "#fff", fontWeight: 600 }}>
                                                    {item.value}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Stack>

                            {/* Book consultation CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Box
                                    sx={{
                                        mt: 4,
                                        p: 3,
                                        borderRadius: "16px",
                                        background: `linear-gradient(135deg, ${alpha("#7fd0ff", 0.07)} 0%, ${alpha("#472187", 0.1)} 100%)`,
                                        border: `1px solid ${alpha("#7fd0ff", 0.15)}`,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 700, color: "#fff", mb: 0.5, fontSize: "0.95rem" }}>
                                        Want a Free Retention Audit?
                                    </Typography>
                                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.82rem", mb: 2, lineHeight: 1.6 }}>
                                        Book a 30-min call and walk away with a clear 90-day retention roadmap.
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => navigate(ROUTE_PATHS.RETENTION_AUDIT_BOOKING)}
                                        sx={{
                                            borderColor: alpha("#7fd0ff", 0.4),
                                            color: "#7fd0ff",
                                            borderRadius: "8px",
                                            fontSize: "0.8rem",
                                            fontWeight: 700,
                                            textTransform: "none",
                                            "&:hover": {
                                                borderColor: "#7fd0ff",
                                                bgcolor: alpha("#7fd0ff", 0.08),
                                            },
                                        }}
                                    >
                                        Book a consultation →
                                    </Button>
                                </Box>
                            </motion.div>
                        </motion.div>
                    </Grid>

                    {/* ── RIGHT: Simple contact form ── */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: "24px",
                                    bgcolor: alpha("#ffffff", 0.03),
                                    backdropFilter: "blur(12px)",
                                    border: `1px solid ${alpha("#ffffff", 0.08)}`,
                                    boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                {/* Accent line */}
                                <Box
                                    sx={{
                                        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                                        background: "linear-gradient(90deg, #7fd0ff, #472187)",
                                    }}
                                />

                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                                        <Box
                                            sx={{
                                                width: 40, height: 40,
                                                borderRadius: "10px",
                                                bgcolor: alpha("#7fd0ff", 0.1),
                                                border: `1px solid ${alpha("#7fd0ff", 0.2)}`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <EmailIcon sx={{ color: "#7fd0ff", fontSize: 20 }} />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>
                                                Send a Message
                                            </Typography>
                                            <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.78rem" }}>
                                                We read every message personally
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Stack spacing={3}>
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Jane Smith"
                                                sx={inputStyles}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="jane@company.com"
                                                sx={inputStyles}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                multiline
                                                rows={5}
                                                placeholder="Tell us about your project, question, or idea…"
                                                sx={inputStyles}
                                            />

                                            <Box sx={{ pt: 1 }}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    type="submit"
                                                    disabled={loading}
                                                    endIcon={!loading && <SendIcon />}
                                                    sx={{
                                                        py: 1.8,
                                                        fontSize: "1rem",
                                                        fontWeight: 700,
                                                        background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                                                        boxShadow: "0 10px 20px rgba(127,208,255,0.2)",
                                                        borderRadius: "14px",
                                                        textTransform: "none",
                                                        transition: "all 0.3s ease",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)",
                                                            boxShadow: "0 15px 30px rgba(127,208,255,0.3)",
                                                        },
                                                        "&.Mui-disabled": {
                                                            background: alpha("#7fd0ff", 0.3),
                                                            color: alpha("#fff", 0.5),
                                                        },
                                                    }}
                                                >
                                                    {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Send Message"}
                                                </Button>
                                            </Box>

                                            <Typography
                                                variant="caption"
                                                sx={{ textAlign: "center", color: "text.secondary", display: "block" }}
                                            >
                                                No spam. We reply within 24 hours.
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>

            {/* Status snackbar */}
            <Snackbar
                open={status.type !== null}
                autoHideDuration={6000}
                onClose={() => setStatus({ ...status, type: null })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setStatus({ ...status, type: null })}
                    severity={status.type || "info"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {status.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

/* ─── Input styles ────────────────────────────────────────────────────────── */
const inputStyles = {
    "& .MuiOutlinedInput-root": {
        bgcolor: "rgba(255,255,255,0.02)",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
        "&:hover fieldset": { borderColor: "rgba(127,208,255,0.3)" },
        "&.Mui-focused fieldset": { borderColor: "#7fd0ff", borderWidth: "1px" },
    },
    "& .MuiInputLabel-root": {
        color: "rgba(255,255,255,0.5)",
        "&.Mui-focused": { color: "#7fd0ff" },
    },
    "& .MuiInputBase-input": { color: "#fff" },
    "& .MuiInputBase-inputMultiline": { color: "#fff" },
};

export default ContactUs;