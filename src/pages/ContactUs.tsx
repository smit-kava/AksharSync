import SendIcon from "@mui/icons-material/Send";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    MenuItem,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
    ArchitectureIcon,
    JourneyIcon,
    TrendUpIcon,
} from "../components/icons";

// Sub-components
import EmailSendTemplate from "../components/email/EmailSendTemplate";
import type { TemplateType } from "../components/email/LoadTemplate";
import ReviewLinkSent from "../components/email/ReviewLinkSent";
import ScheduleBookingTemplate from "../components/email/ScheduleBookingTemplate";

/* ─── Static data ─────────────────────────────── */
const FEATURES = [
    {
        title: "Understand your retention gaps",
        description:
            "In this 30-minute call, we'll talk about your goals, customers, and the parts of your lifecycle that have untapped potential.",
        icon: <TrendUpIcon sx={{ fontSize: 32, color: "#7fd0ff" }} />,
    },
    {
        title: "Get to know our strategy and services",
        description:
            "See how we drive engagement and conversion with an omnichannel approach that uses email, SMS, WhatsApp, RCS and more.",
        icon: <ArchitectureIcon sx={{ fontSize: 32, color: "#7fd0ff" }} />,
    },
    {
        title: "Walk away with clear next steps",
        description:
            "You'll leave with actionable recommendations to strengthen retention and improve LTV, backed by experience with 1,000+ brands.",
        icon: <JourneyIcon sx={{ fontSize: 32, color: "#7fd0ff" }} />,
    },
];

const COUNTRY_CODES = [
    { code: "+1", label: "US", flag: "🇺🇸" },
    { code: "+44", label: "UK", flag: "🇬🇧" },
    { code: "+91", label: "IN", flag: "🇮🇳" },
    { code: "+61", label: "AU", flag: "🇦🇺" },
    { code: "+971", label: "UAE", flag: "🇦🇪" },
    { code: "+49", label: "DE", flag: "🇩🇪" },
    { code: "+33", label: "FR", flag: "🇫🇷" },
    { code: "+81", label: "JP", flag: "🇯🇵" },
];

type FlowStep = "form" | "sending" | "scheduled" | "review";

/* ─── Component ───────────────────────────────── */
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        website: "",
    });

    const [loading, setLoading] = useState(false);
    const [flowStep, setFlowStep] = useState<FlowStep>("form");
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, countryCode: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        // Show sending animation first
        setFlowStep("sending");

        try {
            const response = await fetch("https://aksharsync.com/api/send-email.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, template: selectedTemplate || "consultation" }),
            });

            const responseClone = response.clone();
            let data;
            try {
                data = await response.json();
            } catch (_e) {
                const text = await responseClone.text();
                console.error("Non-JSON response:", text);
                throw new Error("Server returned an invalid format.");
            }

            // Simulate 2s send animation then transition
            await new Promise((r) => setTimeout(r, 2000));

            if (data.success) {
                setFlowStep("scheduled");
                setTimeout(() => setFlowStep("review"), 3000);
                setFormData({ name: "", email: "", countryCode: "+91", phone: "", website: "" });
            } else {
                setFlowStep("form");
                setStatus({
                    type: "error",
                    message: data.message || "Server error while processing your request.",
                });
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            // For demo/dev - still animate through the flow
            await new Promise((r) => setTimeout(r, 2000));
            setFlowStep("scheduled");
            setTimeout(() => setFlowStep("review"), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFlowStep("form");
        setSelectedTemplate(null);
    };

    const handleCloseStatus = () => setStatus({ ...status, type: null });

    /* ── Right-panel content switcher ── */
    const renderRightPanel = () => {
        if (flowStep === "sending") {
            return (
                <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Box sx={{ textAlign: "center", py: 3, mb: 3 }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ display: "inline-block", marginBottom: 12 }}
                        >
                            <SendIcon sx={{ color: "#7fd0ff", fontSize: 36 }} />
                        </motion.div>
                        <Typography sx={{ color: "#7fd0ff", fontWeight: 700, fontSize: "1rem" }}>
                            Sending your email…
                        </Typography>
                        <Typography variant="caption" sx={{ color: alpha("#fff", 0.4) }}>
                            Please wait while we process your request
                        </Typography>
                    </Box>
                    <EmailSendTemplate
                        recipientName={formData.name || "Valued Client"}
                        recipientEmail={formData.email || "client@example.com"}
                        visible={true}
                    />
                </motion.div>
            );
        }

        if (flowStep === "scheduled") {
            return (
                <motion.div key="scheduled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Consultation Details */}

                    {/* Schedule Booking */}
                    <Box sx={{ mt: 3 }}>
                        <ScheduleBookingTemplate
                            visible={true}
                            details={{
                                name: formData.name || "Valued Client",
                                email: formData.email || "client@example.com",
                                website: formData.website,
                            }}
                        />
                    </Box>
                </motion.div>
            );
        }

        if (flowStep === "review") {
            return (
                <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ReviewLinkSent
                        recipientName={formData.name || "Valued Client"}
                        visible={true}
                    />
                    <Button
                        onClick={handleReset}
                        variant="text"
                        fullWidth
                        sx={{ mt: 2, color: alpha("#fff", 0.4), fontSize: "0.78rem", "&:hover": { color: "#7fd0ff" } }}
                    >
                        ← Submit another request
                    </Button>
                </motion.div>
            );
        }

        // Default: form panel (no tabs)
        return (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#fff" }}>
                            Let's talk growth
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth label="Your Name" name="name"
                                    value={formData.name} onChange={handleInputChange}
                                    variant="outlined" placeholder="John Doe" required sx={inputStyles}
                                />
                                <TextField
                                    fullWidth label="Business Email" name="email"
                                    value={formData.email} onChange={handleInputChange}
                                    type="email" variant="outlined" placeholder="john@company.com"
                                    required sx={inputStyles}
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        select label="Code" name="countryCode"
                                        value={formData.countryCode} onChange={handleSelectChange}
                                        sx={{ ...inputStyles, minWidth: "110px" }}
                                    >
                                        {COUNTRY_CODES.map((opt) => (
                                            <MenuItem key={opt.code} value={opt.code}>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <span>{opt.flag}</span>
                                                    <span>{opt.code}</span>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        fullWidth label="Phone Number" name="phone"
                                        value={formData.phone} onChange={handleInputChange}
                                        variant="outlined" placeholder="1234567890" sx={inputStyles}
                                    />
                                </Stack>
                                <TextField
                                    fullWidth label="Website URL" name="website"
                                    value={formData.website} onChange={handleInputChange}
                                    variant="outlined" placeholder="www.yourbrand.com" sx={inputStyles}
                                />

                                <Box sx={{ pt: 1 }}>
                                    <Button
                                        fullWidth size="large" variant="contained" type="submit"
                                        disabled={loading}
                                        endIcon={!loading && <SendIcon />}
                                        sx={{
                                            py: 1.8,
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            background: "linear-gradient(135deg, #7fd0ff 0%, #472187 100%)",
                                            boxShadow: "0 10px 20px rgba(127, 208, 255, 0.2)",
                                            transition: "all 0.3s ease",
                                            borderRadius: "14px",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 15px 30px rgba(127, 208, 255, 0.3)",
                                            },
                                            "&.Mui-disabled": {
                                                background: alpha("#7fd0ff", 0.3),
                                                color: alpha("#fff", 0.5),
                                            },
                                        }}
                                    >
                                        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Book Your Consultation Call"}
                                    </Button>
                                </Box>
                                <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary", display: "block" }}>
                                    No spam. Just high-impact strategy.
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        );

    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                pt: { xs: 12, md: 16 },
                pb: { xs: 8, md: 12 },
                overflow: "hidden",
                background: "linear-gradient(to bottom, #060e1a 0%, #081121 100%)",
            }}
        >
            {/* Decorative blobs */}
            <Box sx={{ position: "absolute", top: "-10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(127, 208, 255, 0.05) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
            <Box sx={{ position: "absolute", bottom: "0%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(71, 33, 135, 0.08) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid container spacing={8}>
                    {/* LEFT: Features */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                    fontWeight: 800,
                                    mb: 3,
                                    background: "linear-gradient(135deg, #fff 0%, #7fd0ff 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1,
                                }}
                            >
                                Book Your<br />Consultation Call
                            </Typography>

                            <Stack spacing={5} sx={{ mt: 6 }}>
                                {FEATURES.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                                    >
                                        <Box sx={{ display: "flex", gap: 3 }}>
                                            <Box
                                                sx={{
                                                    flexShrink: 0, width: 64, height: 64,
                                                    borderRadius: "16px",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    bgcolor: alpha("#7fd0ff", 0.08),
                                                    border: `1px solid ${alpha("#7fd0ff", 0.2)}`,
                                                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main", mb: 1, letterSpacing: "-0.01em" }}>
                                                    {feature.title}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6, maxWidth: "450px" }}>
                                                    {feature.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* RIGHT: Dynamic panel */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <AnimatePresence mode="wait">
                                {renderRightPanel()}
                            </AnimatePresence>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>

            {/* Status snackbar */}
            <Snackbar
                open={status.type !== null}
                autoHideDuration={6000}
                onClose={handleCloseStatus}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseStatus} severity={status.type || "info"} variant="filled" sx={{ width: "100%" }}>
                    {status.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

/* ─── Input styles ─────────────────────────────── */
const inputStyles = {
    "& .MuiOutlinedInput-root": {
        bgcolor: "rgba(255, 255, 255, 0.02)",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
        "&:hover fieldset": { borderColor: "rgba(127, 208, 255, 0.3)" },
        "&.Mui-focused fieldset": { borderColor: "#7fd0ff", borderWidth: "1px" },
    },
    "& .MuiInputLabel-root": {
        color: "rgba(255, 255, 255, 0.5)",
        "&.Mui-focused": { color: "#7fd0ff" },
    },
    "& .MuiInputBase-input": { color: "#fff" },
};

export default ContactUs;