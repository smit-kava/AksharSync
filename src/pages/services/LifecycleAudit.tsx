import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import InsightsIcon from "@mui/icons-material/Insights";

const THEME_COLOR = "#38bdf8"; // Light Blue/Sky

export default function LifecycleAudit() {
  return (
    <Box sx={{ bgcolor: "#060e1a", minHeight: "100vh", pt: 15, pb: 10, color: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={8}>
            
            {/* 1. Hero Section */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" }, gap: { xs: 6, md: 8 }, alignItems: "center", pt: { xs: 2, md: 4 } }}>
              <Box>
                <Box sx={{ 
                  display: "inline-flex", alignItems: "center", gap: 1.5, 
                  px: 2, py: 1, borderRadius: "12px", 
                  bgcolor: alpha(THEME_COLOR, 0.1), border: "1px solid", borderColor: alpha(THEME_COLOR, 0.2),
                  mb: 4
                }}>
                  <TimelineIcon sx={{ color: THEME_COLOR, fontSize: 24 }} />
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Service Module 01
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                  Customer Journey <span style={{ color: THEME_COLOR }}>Automation</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.2rem", lineHeight: 1.6, mb: 5, maxWidth: 600 }}>
                  Transform one-time buyers into loyal brand advocates with data-driven lifecycle marketing and automated journeys tailored for E-commerce and D2C brands.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      bgcolor: THEME_COLOR, color: "#060e1a", py: 1.5, px: 4, 
                      fontWeight: 800, fontSize: "1rem", borderRadius: "12px",
                      "&:hover": { bgcolor: alpha(THEME_COLOR, 0.8) } 
                    }}
                  >
                    Book a Demo
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: alpha(THEME_COLOR, 0.5), color: THEME_COLOR, py: 1.5, px: 4, 
                      fontWeight: 700, fontSize: "1rem", borderRadius: "12px",
                      "&:hover": { borderColor: THEME_COLOR, bgcolor: alpha(THEME_COLOR, 0.05) } 
                    }}
                  >
                    View Pricing
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
                    <Stack spacing={4}>
                      {[
                        { icon: <AutoGraphIcon sx={{ color: THEME_COLOR }} />, width: "40%", label: "Welcome Flow" },
                        { icon: <ShoppingCartCheckoutIcon sx={{ color: THEME_COLOR }} />, width: "70%", label: "Abandoned Cart" },
                        { icon: <MarkEmailReadIcon sx={{ color: THEME_COLOR }} />, width: "95%", label: "Post-Purchase" }
                      ].map((item, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: alpha(THEME_COLOR, 0.1) }}>{item.icon}</Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ color: alpha("#fff", 0.7), fontSize: "0.85rem", mb: 0.5 }}>{item.label}</Typography>
                            <Box sx={{ height: 8, borderRadius: 4, bgcolor: alpha("#fff", 0.1), overflow: "hidden" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: item.width }}
                                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                style={{ height: "100%", borderRadius: 4, backgroundColor: THEME_COLOR }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Conversion Lift</Typography>
                        <Typography sx={{ color: THEME_COLOR, fontWeight: 900, fontSize: "1.1rem" }}>+35% Lift</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* 2. Introduction Section */}
            <Box sx={{ 
              p: { xs: 4, md: 6 }, borderRadius: "24px", 
              background: `linear-gradient(135deg, ${alpha(THEME_COLOR, 0.05)} 0%, rgba(255,255,255,0.01) 100%)`, 
              border: "1px solid rgba(255,255,255,0.06)",
              position: "relative", overflow: "hidden"
            }}>
              <Box sx={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: `radial-gradient(circle, ${alpha(THEME_COLOR, 0.1)} 0%, transparent 70%)`, filter: "blur(40px)" }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                Stop leaving money on the table.
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", maxWidth: 800, mb: 4, lineHeight: 1.7 }}>
                Without a proper lifecycle strategy, you're experiencing low retention, lost revenue at checkout, and poor post-purchase engagement. Customer journey automation recovers abandoned sales, builds brand loyalty, and generates revenue on autopilot.
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 3 }}>
                {[
                  { metric: "Low Retention", label: "One-time buyers churning", icon: <TrendingDownIcon /> },
                  { metric: "Lost Revenue", label: "Cart & browse abandonment", icon: <ShoppingCartCheckoutIcon /> },
                  { metric: "Poor Engagement", label: "Ignored promotional emails", icon: <MarkEmailReadIcon /> }
                ].map((stat, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: alpha("#ef4444", 0.1), color: "#ef4444" }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.5 }}>{stat.metric}</Typography>
                      <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem" }}>{stat.label}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 3. Services Section (8 Flows) */}
            <Box>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
                  Essential <span style={{ color: THEME_COLOR }}>Lifecycle Flows</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                  We build, test, and optimize the critical automated journeys that every scalable e-commerce brand needs.
                </Typography>
              </Box>
              
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 3 }}>
                {[
                  { title: "Welcome Series", desc: "Convert new subscribers into first-time buyers with a compelling brand introduction.", icon: <AutoGraphIcon /> },
                  { title: "Abandoned Cart", desc: "Recover lost sales automatically by bringing high-intent shoppers back to checkout.", icon: <ShoppingCartCheckoutIcon /> },
                  { title: "Browse Abandonment", desc: "Turn window shoppers into customers by reminding them of products they viewed.", icon: <SearchIcon /> },
                  { title: "Post-Purchase Flow", desc: "Build trust, reduce buyer's remorse, and cross-sell complementary products.", icon: <LocalShippingIcon /> },
                  { title: "Winback Campaigns", desc: "Re-engage inactive customers with targeted offers before they churn forever.", icon: <HistoryIcon /> },
                  { title: "Replenishment Flows", desc: "Predict when customers need a refill and prompt them to purchase exactly on time.", icon: <EventRepeatIcon /> },
                  { title: "Reactivation & Sunset", desc: "Clean your list by engaging dormant subscribers or gracefully sunsetting them.", icon: <NightlightRoundIcon /> },
                  { title: "VIP & Loyalty", desc: "Reward your best customers with exclusive perks to maximize lifetime value.", icon: <WorkspacePremiumIcon /> }
                ].map((flow, i) => (
                  <Box key={i} sx={{ 
                    p: 3, borderRadius: "20px", bgcolor: alpha("#fff", 0.02), 
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "transform 0.3s, background 0.3s",
                    "&:hover": { transform: "translateY(-5px)", bgcolor: alpha("#fff", 0.04), borderColor: alpha(THEME_COLOR, 0.3) }
                  }}>
                    <Box sx={{ color: THEME_COLOR, mb: 2, display: "inline-block", p: 1.5, borderRadius: "12px", bgcolor: alpha(THEME_COLOR, 0.1) }}>
                      {flow.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 1 }}>{flow.title}</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.9rem", lineHeight: 1.5 }}>{flow.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 4. Benefits Section */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 6, alignItems: "center" }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                  The impact of <span style={{ color: THEME_COLOR }}>Automated Journeys</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", mb: 4, lineHeight: 1.7 }}>
                  Our lifecycle marketing strategies do more than just send emails. They create an ecosystem that nurtures your audience and drives sustainable growth.
                </Typography>
                <Stack spacing={3}>
                  {[
                    { title: "Increased Revenue", desc: "Generate 20-30% of your total store revenue on autopilot." },
                    { title: "Better Customer Retention", desc: "Increase repeat purchase rates and maximize customer lifetime value (LTV)." },
                    { title: "Automated Engagement", desc: "Deliver the right message at the exact right moment without manual effort." },
                    { title: "Personalized Experience", desc: "Use data-driven segmentation to treat every subscriber as an individual." }
                  ].map((benefit, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 2 }}>
                      <CheckCircleIcon sx={{ color: THEME_COLOR, mt: 0.5 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: "1.1rem" }}>{benefit.title}</Typography>
                        <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.95rem" }}>{benefit.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ 
                  p: 4, borderRadius: "24px", 
                  background: `linear-gradient(135deg, ${alpha(THEME_COLOR, 0.1)} 0%, ${alpha("#060e1a", 1)} 100%)`, 
                  border: `1px solid ${alpha(THEME_COLOR, 0.2)}`,
                  boxShadow: `0 20px 40px -10px ${alpha(THEME_COLOR, 0.15)}`
                }}>
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 800, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.1em", mb: 2 }}>
                    Expected Results
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: "4rem" }}>
                    +35%
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 4 }}>Average Lift in Email Revenue</Typography>
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
                      <Typography sx={{ color: alpha("#fff", 0.6) }}>Implementation Time</Typography>
                      <Typography sx={{ fontWeight: 700 }}>14-21 Days</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
                      <Typography sx={{ color: alpha("#fff", 0.6) }}>ROI Timeline</Typography>
                      <Typography sx={{ fontWeight: 700 }}>Immediate</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}>
                      <Typography sx={{ color: alpha("#fff", 0.6) }}>Platform Support</Typography>
                      <Typography sx={{ fontWeight: 700 }}>Klaviyo, Omnisend, etc.</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>

            {/* 5. How It Works */}
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 6 }}>How It Works</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 4, position: "relative" }}>
                {/* Connecting line for desktop */}
                <Box sx={{ 
                  display: { xs: "none", md: "block" }, 
                  position: "absolute", top: "40px", left: "12%", right: "12%", 
                  height: "2px", background: `linear-gradient(90deg, transparent, ${alpha(THEME_COLOR, 0.5)}, transparent)`, 
                  zIndex: 0 
                }} />
                
                {[
                  { step: "01", title: "Audit", desc: "We analyze your existing flows and identify revenue leaks." },
                  { step: "02", title: "Strategy", desc: "We design a custom lifecycle roadmap tailored to your brand." },
                  { step: "03", title: "Setup", desc: "Full implementation of flows, triggers, and dynamic content." },
                  { step: "04", title: "Optimization", desc: "Continuous A/B testing and refinement for maximum ROI." }
                ].map((phase, i) => (
                  <Box key={i} sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ 
                      width: 80, height: 80, borderRadius: "50%", 
                      bgcolor: "#060e1a", border: `2px solid ${THEME_COLOR}`, 
                      display: "flex", alignItems: "center", justifyContent: "center", 
                      mx: "auto", mb: 3,
                      boxShadow: `0 0 20px ${alpha(THEME_COLOR, 0.2)}`
                    }}>
                      <Typography sx={{ fontWeight: 900, fontSize: "1.5rem", color: THEME_COLOR }}>{phase.step}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", mb: 1 }}>{phase.title}</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "0.95rem", px: 2 }}>{phase.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 6. Why Choose Us */}
            <Box sx={{ 
              p: { xs: 4, md: 6 }, borderRadius: "24px", 
              bgcolor: alpha("#fff", 0.02), border: "1px solid rgba(255,255,255,0.05)",
              display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 6, alignItems: "center"
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                  Why Partner With <span style={{ color: THEME_COLOR }}>Us</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", mb: 4 }}>
                  We don't just build basic templates. We engineer highly sophisticated customer journeys based on deep behavioral data.
                </Typography>
                <Stack spacing={3}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <VerifiedUserIcon sx={{ color: THEME_COLOR, mt: 0.5, fontSize: 28 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>Specialized Expertise</Typography>
                      <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.95rem" }}>Deep technical knowledge of ESPs and e-commerce platforms.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <DataUsageIcon sx={{ color: THEME_COLOR, mt: 0.5, fontSize: 28 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>Data-Driven Approach</Typography>
                      <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.95rem" }}>Every delay, filter, and message is backed by behavioral analytics.</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <InsightsIcon sx={{ color: THEME_COLOR, mt: 0.5, fontSize: 28 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>Proven Results</Typography>
                      <Typography sx={{ color: alpha("#fff", 0.4), fontSize: "0.95rem" }}>Millions of dollars generated across our portfolio of brand partners.</Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ flex: 1, width: "100%" }}>
                <Box sx={{ p: 4, borderRadius: "20px", background: `linear-gradient(135deg, ${alpha(THEME_COLOR, 0.15)} 0%, ${alpha("#060e1a", 1)} 100%)`, border: `1px solid ${alpha(THEME_COLOR, 0.3)}`, textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Ready to scale your retention?</Typography>
                  <Typography sx={{ color: alpha("#fff", 0.6), mb: 4 }}>Book a free discovery call to audit your current flows.</Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: THEME_COLOR, color: "#060e1a", py: 1.5, fontWeight: 800, "&:hover": { bgcolor: alpha(THEME_COLOR, 0.8) } }}
                  >
                    Schedule Audit
                  </Button>
                </Box>
              </Box>
            </Box>

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
