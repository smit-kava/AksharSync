import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { alpha, Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FAQComponent } from "../components";
import KlaviyoAuditHero from "../components/KlaviyoAuditHero";
import { ROUTE_PATHS } from "../routes/paths";

const THEME_COLOR = "#7fd0ff";
const ACCENT_COLOR = "#a78bfa";

const WHAT_WE_COVER = [
  {
    icon: <BarChartIcon />,
    title: "Flow Coverage & Gaps",
    desc: "Identify which critical automations are missing from your account and the revenue they're costing you.",
  },
  {
    icon: <SpeedIcon />,
    title: "Deliverability Health",
    desc: "Check your sending reputation, bounce rates, and spam indicators that hurt inbox placement.",
  },
  {
    icon: <TipsAndUpdatesIcon />,
    title: "Segmentation Quality",
    desc: "Evaluate how well your lists are segmented for relevance and engagement.",
  },
  {
    icon: <StarIcon />,
    title: "Campaign Performance",
    desc: "Benchmark your open, click, and revenue-per-recipient metrics against industry standards.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Take the Audit", desc: "Answer a short set of questions about your current Klaviyo setup — takes under 15 minutes." },
  { step: "02", title: "Instant Analysis", desc: "Our engine benchmarks your answers against proven best practices for DTC & e-commerce brands." },
  { step: "03", title: "Get Your Report", desc: "Receive a detailed, personalised report with your score and prioritised action items — no calls, no waiting." },
];

const TESTIMONIALS = [
  {
    quote: "The audit uncovered three missing flows that were costing us thousands each month. Implementing the recommendations added 22% to our email revenue within 60 days.",
    author: "Sarah K.",
    role: "Head of Marketing, DTC Brand",
  },
  {
    quote: "I was skeptical of a free audit, but this was genuinely the most actionable piece of advice I've received for our Klaviyo account.",
    author: "James R.",
    role: "E-commerce Director",
  },
  {
    quote: "Quick, sharp, and zero fluff. We fixed our segmentation the same day and saw a 15% lift in open rates within two weeks.",
    author: "Priya M.",
    role: "CRM Manager",
  },
];

const KlaviyoAuditPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", color: "#fff" }}>
      {/* ── Hero Section ── */}
      <KlaviyoAuditHero />

      {/* ── What We Cover ── */}
      <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "400px",
            background: `radial-gradient(ellipse, ${alpha(ACCENT_COLOR, 0.05)} 0%, transparent 70%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "3rem" },
                  mb: 2,
                }}
              >
                What Your Audit{" "}
                <span style={{ color: THEME_COLOR }}>Covers</span>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.5),
                  fontSize: "1.1rem",
                  maxWidth: 560,
                  mx: "auto",
                  lineHeight: 1.7,
                }}
              >
                We evaluate the four pillars that determine whether your Klaviyo
                account is working hard enough for you.
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 3,
            }}
          >
            {WHAT_WE_COVER.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: "20px",
                    bgcolor: alpha("#fff", 0.02),
                    border: `1px solid ${alpha("#fff", 0.06)}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      bgcolor: alpha(THEME_COLOR, 0.04),
                      borderColor: alpha(THEME_COLOR, 0.3),
                      boxShadow: `0 16px 40px ${alpha(THEME_COLOR, 0.1)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: "14px",
                      bgcolor: alpha(THEME_COLOR, 0.12),
                      color: THEME_COLOR,
                      mb: 2.5,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: alpha("#fff", 0.45), fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── How It Works ── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          background: `linear-gradient(180deg, ${alpha(THEME_COLOR, 0.03)} 0%, transparent 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "3rem" },
                  mb: 2,
                }}
              >
                How It <span style={{ color: THEME_COLOR }}>Works</span>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.5),
                  fontSize: "1.1rem",
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                Three simple steps to your personalised Klaviyo performance
                report.
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
              position: "relative",
            }}
          >
            {/* Connector line */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: "52px",
                left: "17%",
                right: "17%",
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${alpha(THEME_COLOR, 0.4)}, transparent)`,
              }}
            />
            {HOW_IT_WORKS.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      bgcolor: "#060e1a",
                      border: `2px solid ${THEME_COLOR}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: `0 0 30px ${alpha(THEME_COLOR, 0.25)}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "2rem",
                        color: THEME_COLOR,
                      }}
                    >
                      {phase.step}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", mb: 1.5 }}>
                    {phase.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: alpha("#fff", 0.45),
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      maxWidth: 260,
                      mx: "auto",
                    }}
                  >
                    {phase.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Testimonials ── */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "3rem" },
                  mb: 2,
                }}
              >
                What Brands <span style={{ color: THEME_COLOR }}>Say</span>
              </Typography>
            </Box>
          </motion.div>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    bgcolor: alpha("#fff", 0.02),
                    border: `1px solid ${alpha("#fff", 0.06)}`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: alpha(ACCENT_COLOR, 0.3),
                      bgcolor: alpha(ACCENT_COLOR, 0.03),
                    },
                  }}
                >
                  {/* Stars */}
                  <Stack direction="row" spacing={0.5}>
                    {[...Array(5)].map((_, s) => (
                      <StarIcon key={s} sx={{ color: "#f59e0b", fontSize: 18 }} />
                    ))}
                  </Stack>

                  <Typography
                    sx={{
                      color: alpha("#fff", 0.7),
                      fontSize: "0.97rem",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    "{t.quote}"
                  </Typography>

                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
                      {t.author}
                    </Typography>
                    <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.85rem" }}>
                      {t.role}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Talk to Expert CTA Banner ── */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                p: { xs: 5, md: 8 },
                borderRadius: "28px",
                background: `linear-gradient(135deg, ${alpha(THEME_COLOR, 0.12)} 0%, ${alpha(ACCENT_COLOR, 0.08)} 100%)`,
                border: `1px solid ${alpha(THEME_COLOR, 0.2)}`,
                boxShadow: `0 32px 80px ${alpha(THEME_COLOR, 0.1)}`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative glow */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-30%",
                  right: "-10%",
                  width: "400px",
                  height: "400px",
                  background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.12)} 0%, transparent 70%)`,
                  filter: "blur(60px)",
                  pointerEvents: "none",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.8rem", md: "2.6rem" },
                  mb: 2,
                  position: "relative",
                }}
              >
                Want Expert Eyes on{" "}
                <span style={{ color: THEME_COLOR }}>Your Account?</span>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.55),
                  fontSize: "1.1rem",
                  mb: 5,
                  maxWidth: 520,
                  mx: "auto",
                  lineHeight: 1.7,
                  position: "relative",
                }}
              >
                Book a free 30-minute strategy call and let our Klaviyo
                specialists walk through your account with you — no obligation.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ position: "relative", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: "50px",
                    background: `linear-gradient(135deg, ${THEME_COLOR} 0%, ${ACCENT_COLOR} 100%)`,
                    color: "#060e1a",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: `0 12px 32px ${alpha(THEME_COLOR, 0.3)}`,
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: `0 20px 48px ${alpha(THEME_COLOR, 0.4)}`,
                    },
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  Talk to an Expert
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: "50px",
                    borderColor: alpha(THEME_COLOR, 0.4),
                    color: THEME_COLOR,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: THEME_COLOR,
                      bgcolor: alpha(THEME_COLOR, 0.06),
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Take the Free Audit
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ── FAQ ── */}
      <Box sx={{ pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <FAQComponent
            subtitle="Common questions about the Klaviyo Self-Audit."
            items={[
              {
                question: "Is this audit really free?",
                answer:
                  "Yes, completely. There is no hidden cost, no credit card required, and no obligation to purchase anything. We offer this audit as a value-first resource for e-commerce brands.",
              },
              {
                question: "How long does it take to complete?",
                answer:
                  "Most users complete the audit in under 15 minutes. Your personalised report is generated instantly upon submission.",
              },
              {
                question: "What do I need to take the audit?",
                answer:
                  "Basic knowledge of your current Klaviyo setup is sufficient. Having your Klaviyo dashboard open in another tab while you fill in the audit will help you answer questions accurately.",
              },
              {
                question: "Will my data be kept private?",
                answer:
                  "Absolutely. Your responses are used solely to generate your personalised report. We do not sell or share your data with third parties.",
              },
              {
                question: "What if I want help implementing the recommendations?",
                answer:
                  "Our team is here to help. Use the 'Talk to an Expert' button to book a free strategy call and we'll walk through your report together.",
              },
            ]}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default KlaviyoAuditPage;
