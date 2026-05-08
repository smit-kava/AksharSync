import { Box, Container, Typography, alpha, Stack, Button, IconButton } from "@mui/material";
import { FAQComponent } from "../../components";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CategoryIcon from "@mui/icons-material/Category";
import SpeedIcon from "@mui/icons-material/Speed";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState, useEffect } from "react";

const THEME_COLOR = "#38bdf8"; // Light Blue/Sky


const data = [
  {
    title: "Repeat Purchase Gaps",
    short: "Find exactly where your customers stop buying.",
    analyze: "We analyze purchase timing, frequency, and behavioral patterns.",
    matters: "Locating drop-offs helps create targeted interventions that extend customer lifetime value.",
    icon: <EventRepeatIcon fontSize="large" />
  },
  {
    title: "Underperforming Lifecycle Revenue",
    short: "Pinpoint campaigns failing to meet revenue benchmarks.",
    analyze: "We evaluate existing flows to find weak points in your automated customer journey.",
    matters: "Fixing broken flows directly increases your baseline automated revenue.",
    icon: <TrendingDownIcon fontSize="large" />
  },
  {
    title: "Segmentation Opportunities",
    short: "Discover profitable audience subsets hidden in your data.",
    analyze: "We identify ways to group users based on engagement, purchase history, and intent.",
    matters: "Better segmentation leads to highly personalized targeting.",
    icon: <CategoryIcon fontSize="large" />
  },
  {
    title: "Campaign Inefficiencies",
    short: "Audit underperforming broadcasts.",
    analyze: "We examine low-performing campaigns for issues with open rates, clicks, and conversions.",
    matters: "Optimizing improves deliverability and ROI.",
    icon: <SpeedIcon fontSize="large" />
  },
  {
    title: "Missed Retention Revenue",
    short: "Capitalize on retention gaps.",
    analyze: "We detect missing flows or underutilized automations.",
    matters: "Unlock untapped revenue from existing customers.",
    icon: <MonetizationOnIcon fontSize="large" />
  }
];

export default function RevenueAudit() {


  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 24; // 280px width + 24px gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardWidth = 280 + 24;
        
        // Loop back to start if at the end, else scroll next
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    const cardWidth = 280 + 24;

    if (container) {
      if (direction === "left") {
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };


  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={8}>

            {/* 1. Hero / Introduction */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center", pt: { xs: 2, md: 4 } }}>
              <Box>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1.5,
                  px: 2, py: 1, borderRadius: "12px",
                  bgcolor: alpha(THEME_COLOR, 0.1), border: "1px solid", borderColor: alpha(THEME_COLOR, 0.2),
                  mb: 4
                }}>
                  <QueryStatsIcon sx={{ color: THEME_COLOR, fontSize: 24 }} />
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Service Module
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                  Revenue Opportunity <span style={{ color: THEME_COLOR }}>Analysis</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.2rem", lineHeight: 1.6, mb: 5, maxWidth: 600 }}>
                  We analyze your customer lifecycle and retention data to uncover hidden revenue gaps. Discover why identifying these missed opportunities is the most reliable path to scalable growth for E-commerce, D2C, and SaaS brands.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(ROUTE_PATHS.CONTACT)}
                    sx={{
                      bgcolor: THEME_COLOR, color: "#060e1a", py: 1.5, px: 4,
                      fontWeight: 800, fontSize: "1rem", borderRadius: "12px",
                      "&:hover": { bgcolor: alpha(THEME_COLOR, 0.8) }
                    }}
                  >
                    Request an Audit
                  </Button>
                </Stack>
              </Box>

              {/* Right Side Graphic */}
              <Box sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.15)} 0%, transparent 70%)`, filter: "blur(40px)", zIndex: 0 }} />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <Box sx={{
                    p: 4, borderRadius: "24px", bgcolor: alpha("#fff", 0.03),
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 20px 40px -10px ${alpha(THEME_COLOR, 0.15)}`
                  }}>
                    <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>Recovered Revenue</Typography>
                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.8rem" }}>$124,500</Typography>
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.5, borderRadius: "20px", bgcolor: alpha("#4ade80", 0.1), color: "#4ade80", display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ArrowForwardIcon sx={{ transform: "rotate(-45deg)", fontSize: 16 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>18.5%</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ width: "100%", height: 180, position: "relative" }}>
                      <svg viewBox="0 0 400 180" width="100%" height="100%" style={{ overflow: "visible" }}>
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={THEME_COLOR} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={THEME_COLOR} stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={alpha(THEME_COLOR, 0.2)} />
                            <stop offset="50%" stopColor={THEME_COLOR} />
                            <stop offset="100%" stopColor="#fff" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Grid lines */}
                        {[40, 90, 140].map((y, i) => (
                          <line key={i} x1="0" y1={y} x2="400" y2={y} stroke={alpha("#fff", 0.05)} strokeWidth="1" strokeDasharray="4 4" />
                        ))}

                        {/* Area Path */}
                        <motion.path
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          d="M0,140 C50,130 100,140 150,90 C200,40 250,70 300,40 C350,10 380,20 400,5 L400,180 L0,180 Z"
                          fill="url(#chartGradient)"
                        />

                        {/* Line Path */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M0,140 C50,130 100,140 150,90 C200,40 250,70 300,40 C350,10 380,20 400,5"
                          fill="none"
                          stroke="url(#lineGradient)"
                          strokeWidth="3"
                          filter="url(#glow)"
                        />

                        {/* Data Points */}
                        {[
                          { cx: 150, cy: 90, delay: 0.8 },
                          { cx: 300, cy: 40, delay: 1.4 },
                          { cx: 400, cy: 5, delay: 2.0 }
                        ].map((point, i) => (
                          <motion.circle
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: point.delay, duration: 0.5, type: "spring" }}
                            cx={point.cx} cy={point.cy} r="5" fill="#060e1a" stroke="#fff" strokeWidth="2"
                            filter="url(#glow)"
                          />
                        ))}
                      </svg>

                      {/* Floating Data Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.5 }}
                        style={{ position: "absolute", top: "10%", right: "15%", transform: "translate(0, -50%)" }}
                      >
                        <Box sx={{
                          px: 1.5, py: 1, borderRadius: "8px", bgcolor: alpha("#fff", 0.1),
                          backdropFilter: "blur(10px)", border: `1px solid ${alpha(THEME_COLOR, 0.3)}`,
                          boxShadow: `0 5px 15px -5px ${alpha(THEME_COLOR, 0.2)}`,
                          display: "flex", alignItems: "center", gap: 1
                        }}>
                          <Typography sx={{ fontWeight: 800, color: "#fff", fontSize: "0.8rem", whiteSpace: "nowrap" }}>Opportunity Unlocked</Typography>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* 2. What We Identify Section */}
            <Box>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
                  What We <span style={{ color: THEME_COLOR }}>Identify</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                  A comprehensive breakdown of your customer journey to locate friction points and uncover dormant revenue.
                </Typography>
              </Box>
              <Box sx={{ position: "relative", mx: { xs: 0, md: 2 } }}>

                {/* LEFT BUTTON */}
                <IconButton
                  onClick={() => scroll("left")}
                  sx={{
                    position: "absolute",
                    left: { xs: 0, md: -24 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    bgcolor: alpha("#060e1a", 0.8),
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${alpha(THEME_COLOR, 0.3)}`,
                    color: THEME_COLOR,
                    display: { xs: "none", md: "flex" },
                    "&:hover": { bgcolor: alpha(THEME_COLOR, 0.1), borderColor: THEME_COLOR }
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                {/* RIGHT BUTTON */}
                <IconButton
                  onClick={() => scroll("right")}
                  sx={{
                    position: "absolute",
                    right: { xs: 0, md: -24 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    bgcolor: alpha("#060e1a", 0.8),
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${alpha(THEME_COLOR, 0.3)}`,
                    color: THEME_COLOR,
                    display: { xs: "none", md: "flex" },
                    "&:hover": { bgcolor: alpha(THEME_COLOR, 0.1), borderColor: THEME_COLOR }
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>

                {/* SCROLL CONTAINER */}
                <Box
                  ref={scrollRef}
                  onScroll={handleScroll}
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    scrollSnapType: "x mandatory",
                    py: 2,
                    pb: 4, // extra padding for scrollbar
                    px: "calc(50% - 140px)", // centers the first and last cards
                    "&::-webkit-scrollbar": { height: "6px" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(THEME_COLOR, 0.3), borderRadius: "10px" },
                    "&::-webkit-scrollbar-track": { backgroundColor: alpha("#fff", 0.02), borderRadius: "10px" },
                    "&:hover::-webkit-scrollbar-thumb": { backgroundColor: alpha(THEME_COLOR, 0.6) }
                  }}
                >
                  {data.map((item, i) => {
                    const isActive = activeIndex === i;
                    return (
                    <Box
                      key={i}
                      sx={{
                        minWidth: "280px",
                        maxWidth: "280px",
                        flex: "0 0 auto",
                        scrollSnapAlign: "center",
                        p: 3,
                        borderRadius: "20px",
                        bgcolor: alpha("#fff", 0.02),
                        border: isActive ? `1px solid ${alpha(THEME_COLOR, 0.5)}` : "1px solid rgba(255,255,255,0.05)",
                        opacity: isActive ? 1 : 0.4,
                        filter: isActive ? "blur(0px)" : "blur(4px)",
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        transition: "all 0.4s ease-out",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          transform: isActive ? "translateY(-6px) scale(1)" : "scale(0.95)",
                          bgcolor: alpha("#fff", 0.04),
                          borderColor: alpha(THEME_COLOR, 0.3)
                        }
                      }}
                    >
                      <Box
                        sx={{
                          color: THEME_COLOR,
                          mb: 2.5,
                          p: 1.5,
                          borderRadius: "12px",
                          bgcolor: alpha(THEME_COLOR, 0.1),
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "fit-content"
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", mb: 1, lineHeight: 1.3 }}>
                        {item.title}
                      </Typography>

                      <Typography sx={{ color: THEME_COLOR, fontSize: "0.9rem", fontWeight: 600, mb: 2.5, lineHeight: 1.4 }}>
                        {item.short}
                      </Typography>

                      <Box sx={{ mt: "auto" }}>
                        <Typography sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: alpha("#fff", 0.8), mb: 0.5 }}>
                          What We Analyze
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem", color: alpha("#fff", 0.5), mb: 2, lineHeight: 1.5 }}>
                          {item.analyze}
                        </Typography>

                        <Typography sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: alpha("#fff", 0.8), mb: 0.5 }}>
                          Why It Matters
                        </Typography>
                        <Typography sx={{ fontSize: "0.9rem", color: alpha("#fff", 0.5), lineHeight: 1.5 }}>
                          {item.matters}
                        </Typography>
                      </Box>
                    </Box>
                  )})}
                </Box>
              </Box>
            </Box>

            {/* 3. Real-World Example Section (Optional as requested) */}
            <Box sx={{
              p: { xs: 4, md: 6 }, borderRadius: "24px",
              background: `linear-gradient(135deg, ${alpha(THEME_COLOR, 0.05)} 0%, rgba(255,255,255,0.01) 100%)`,
              border: "1px solid rgba(255,255,255,0.06)",
              position: "relative", overflow: "hidden"
            }}>
              <Box sx={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.1)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "center", position: "relative", zIndex: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                    Real-World <span style={{ color: THEME_COLOR }}>Impact</span>
                  </Typography>
                  <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", mb: 3, lineHeight: 1.7 }}>
                    Recently, we audited a mid-sized D2C brand and found their second-purchase rate had dropped significantly. By analyzing the data, we discovered a gap in their post-purchase flow timing. Adjusting the delay by just 48 hours increased repeat purchases by 18% within a month.
                  </Typography>
                </Box>
                <Box sx={{ p: 4, borderRadius: "20px", bgcolor: alpha("#060e1a", 0.6), border: `1px solid ${alpha(THEME_COLOR, 0.2)}`, minWidth: { md: "300px" } }}>
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", mb: 1 }}>Result Achieved</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, mb: 0 }}>+18%</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.5) }}>Repeat Purchase Rate Lift</Typography>
                </Box>
              </Box>
            </Box>

            {/* 4. FAQ Section */}
            <FAQComponent
              subtitle="Everything you need to know about our revenue opportunity audit."
              items={[
                {
                  question: "What is a revenue opportunity audit?",
                  answer: "It's a comprehensive analysis of your entire retention marketing ecosystem to identify where you're losing money and where you have untapped potential for growth."
                },
                {
                  question: "How long does the audit take?",
                  answer: "Typically, a full revenue audit takes 7-10 business days to complete, including data collection, analysis, and the final strategy presentation."
                },
                {
                  question: "What data do you need for the audit?",
                  answer: "We require view-only access to your ESP (like Klaviyo), your e-commerce platform (like Shopify), and your Google Analytics to get a complete picture of your customer journey."
                },
                {
                  question: "How much extra revenue can I expect?",
                  answer: "While results vary, most brands see a 15-30% increase in automated revenue within the first 90 days of implementing our audit's recommendations."
                }
              ]}
            />

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
