import React, { useState } from "react";
import { Box, Container, Typography, alpha, Stack, Button } from "@mui/material";
import { FAQComponent } from "../../components";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/paths";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import KeyIcon from "@mui/icons-material/Key";
import PolicyIcon from "@mui/icons-material/Policy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BlockIcon from "@mui/icons-material/Block";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const THEME_COLOR = "#34d399"; // Emerald Green for Deliverability

const data = [
  {
    title: "SPF (Sender Policy Framework)",
    short: "Ensures your sending sources are authorized.",
    analyze: "We verify your domain authentication setup to confirm all sending IP addresses are properly listed.",
    matters: "Without a valid SPF record, mail servers may reject your emails or mark them as spam.",
    icon: <VerifiedUserIcon fontSize="large" />
  },
  {
    title: "DKIM (DomainKeys Identified Mail)",
    short: "Validates your email signature authentication.",
    analyze: "We check the cryptographic signatures on your emails to ensure message integrity hasn't been compromised.",
    matters: "DKIM proves your emails are legitimate and haven't been tampered with in transit.",
    icon: <KeyIcon fontSize="large" />
  },
  {
    title: "DMARC",
    short: "Aligns SPF and DKIM for ultimate domain protection.",
    analyze: "We check your policy enforcement and reporting setup to ensure strict alignment between protocols.",
    matters: "DMARC protects your brand from spoofing and is now strictly required by Google and Yahoo.",
    icon: <PolicyIcon fontSize="large" />
  },
  {
    title: "Sender Reputation",
    short: "Analyzes your domain and IP standing.",
    analyze: "We review your past sending behavior, complaint rates, and placement across global blacklists.",
    matters: "A poor reputation forces your emails straight to the junk folder, regardless of authentication.",
    icon: <ThumbUpIcon fontSize="large" />
  },
  {
    title: "List Hygiene",
    short: "Evaluates the health and quality of your email list.",
    analyze: "We scan for inactive users, invalid email addresses, and hidden spam traps.",
    matters: "Sending to bad addresses severely damages your reputation and deliverability score.",
    icon: <CleaningServicesIcon fontSize="large" />
  },
  {
    title: "Suppression Logic",
    short: "Checks how risky or unengaged users are filtered.",
    analyze: "We verify that proper exclusion rules and sunset flows are correctly applied in your email platform.",
    matters: "Continuing to email unengaged subscribers will train inbox providers to classify your mail as spam.",
    icon: <BlockIcon fontSize="large" />
  },
  {
    title: "Deliverability Risks",
    short: "Identifies hidden factors causing emails to land in spam.",
    analyze: "We detect technical errors, poor content practices, or behavioral issues affecting inbox placement.",
    matters: "Finding and fixing these risks is the only way to restore your revenue and engagement.",
    icon: <WarningAmberIcon fontSize="large" />
  }
];

export default function DeliverabilityAudit() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

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
                  <MarkEmailReadIcon sx={{ color: THEME_COLOR, fontSize: 24 }} />
                  <Typography sx={{ color: THEME_COLOR, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Service Module
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                  Deliverability <span style={{ color: THEME_COLOR }}>Review</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.2rem", lineHeight: 1.6, mb: 5, maxWidth: 600 }}>
                  We analyze your sender reputation and authentication setup to ensure your emails reach the primary inbox, not the spam folder. Proper deliverability is the unseen foundation of all e-commerce revenue and customer engagement.
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
                    Get a Health Check
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
                    <Box sx={{ mb: 3, pb: 3, borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <Box>
                         <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>Inbox Placement</Typography>
                         <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "2rem" }}>99.2%</Typography>
                       </Box>
                       <Box sx={{ width: 60, height: 60, borderRadius: "50%", bgcolor: alpha(THEME_COLOR, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <MarkEmailReadIcon sx={{ color: THEME_COLOR, fontSize: 32 }} />
                       </Box>
                    </Box>
                    
                    <Stack spacing={3}>
                      {[
                        { label: "SPF Authenticated", status: "Pass" },
                        { label: "DKIM Validated", status: "Pass" },
                        { label: "DMARC Enforced", status: "Pass" },
                        { label: "Spam Trap Hits", status: "0" }
                      ].map((stat, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ color: alpha("#fff", 0.7), fontWeight: 600 }}>{stat.label}</Typography>
                          <Typography sx={{ color: THEME_COLOR, fontWeight: 800 }}>{stat.status}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              </Box>
            </Box>

            {/* 2. What We Check Section (Vertical Pipeline Flow) */}
            <Box>
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}>
                  The Diagnostic <span style={{ color: THEME_COLOR }}>Flow</span>
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.5), fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                  We map out and examine every technical factor that decides whether your emails hit the primary tab or the spam folder.
                </Typography>
              </Box>

              <Box sx={{ position: "relative", mt: 6, mb: 4, width: '100%' }}>
                {/* The central horizontal line with arrow */}
                <Box sx={{ 
                  position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', 
                  bgcolor: alpha(THEME_COLOR, 0.3), transform: 'translateY(-50%)', zIndex: 0,
                  "&::after": {
                     content: '""', position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                     borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `8px solid ${alpha(THEME_COLOR, 0.8)}`
                  }
                }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  {data.map((item, i) => {
                    const isTop = i % 2 === 0;
                    const isActive = activeStep === i;
                    return (
                      <Box 
                        key={i} 
                        onMouseEnter={() => setActiveStep(i)}
                        onClick={() => setActiveStep(i)}
                        sx={{ 
                          width: { xs: '45px', md: '120px' }, 
                          display: 'flex', flexDirection: 'column', alignItems: 'center', 
                          cursor: 'pointer', zIndex: 1,
                          transform: isActive ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.3s'
                        }}
                      >
                        {isTop ? (
                          <>
                            {/* Title Top */}
                            <Box sx={{ height: { xs: '60px', md: '70px' }, display: 'flex', alignItems: 'flex-end', pb: 1, px: 1 }}>
                               <Typography sx={{ fontSize: { xs: '0.55rem', md: '0.85rem' }, fontWeight: isActive ? 800 : 600, color: isActive ? THEME_COLOR : '#fff', textAlign: 'center', lineHeight: 1.2 }}>
                                 {item.title}
                               </Typography>
                            </Box>
                            {/* Icon */}
                            <Box sx={{ width: { xs: 36, md: 54 }, height: { xs: 36, md: 54 }, borderRadius: '50%', bgcolor: isActive ? THEME_COLOR : '#060e1a', border: `2px solid ${THEME_COLOR}`, color: isActive ? '#060e1a' : THEME_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                               {React.cloneElement(item.icon, { fontSize: 'small' })}
                            </Box>
                            <Box sx={{ width: '2px', height: '15px', bgcolor: alpha(THEME_COLOR, 0.5) }} />
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: isActive ? THEME_COLOR : '#060e1a', border: `2px solid ${THEME_COLOR}`, transform: 'translateY(50%)', transition: 'all 0.3s' }} />
                            <Box sx={{ height: { xs: '60px', md: '70px' } }} /> {/* Spacer */}
                          </>
                        ) : (
                          <>
                            <Box sx={{ height: { xs: '60px', md: '70px' } }} /> {/* Spacer */}
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: isActive ? THEME_COLOR : '#060e1a', border: `2px solid ${THEME_COLOR}`, transform: 'translateY(-50%)', transition: 'all 0.3s' }} />
                            <Box sx={{ width: '2px', height: '15px', bgcolor: alpha(THEME_COLOR, 0.5) }} />
                            {/* Icon */}
                            <Box sx={{ width: { xs: 36, md: 54 }, height: { xs: 36, md: 54 }, borderRadius: '50%', bgcolor: isActive ? THEME_COLOR : '#060e1a', border: `2px solid ${THEME_COLOR}`, color: isActive ? '#060e1a' : THEME_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                               {React.cloneElement(item.icon, { fontSize: 'small' })}
                            </Box>
                            {/* Title Bottom */}
                            <Box sx={{ height: { xs: '60px', md: '70px' }, display: 'flex', alignItems: 'flex-start', pt: 1, px: 1 }}>
                               <Typography sx={{ fontSize: { xs: '0.55rem', md: '0.85rem' }, fontWeight: isActive ? 800 : 600, color: isActive ? THEME_COLOR : '#fff', textAlign: 'center', lineHeight: 1.2 }}>
                                 {item.title}
                               </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                    )
                  })}
                </Box>
              </Box>

              {/* Active Step Details Panel */}
              <Box sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: '24px', 
                bgcolor: alpha('#fff', 0.02), 
                border: `1px solid ${alpha(THEME_COLOR, 0.3)}`, 
                minHeight: '180px',
                mb: 8,
                transition: 'all 0.3s'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: THEME_COLOR }}>{data[activeStep].title}</Typography>
                <Typography sx={{ color: '#fff', fontSize: '1.1rem', mb: 3 }}>{data[activeStep].short}</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                   <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: alpha('#fff', 0.6), mb: 1 }}>What We Analyze</Typography>
                      <Typography sx={{ fontSize: '0.95rem', color: alpha('#fff', 0.8), lineHeight: 1.6 }}>{data[activeStep].analyze}</Typography>
                   </Box>
                   <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: alpha('#fff', 0.6), mb: 1 }}>Why It Matters</Typography>
                      <Typography sx={{ fontSize: '0.95rem', color: alpha('#fff', 0.8), lineHeight: 1.6 }}>{data[activeStep].matters}</Typography>
                   </Box>
                </Box>
              </Box>
            </Box>

            {/* 3. Real-World Example Section */}
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
                      Real-World <span style={{ color: THEME_COLOR }}>Example</span>
                    </Typography>
                    <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", mb: 3, lineHeight: 1.7 }}>
                      An e-commerce brand saw open rates plummet from 40% to 12% over three weeks. We discovered their emails were landing in the promotional and spam folders due to a broken DMARC policy. By properly aligning their SPF and DKIM records, their inbox placement was fully restored, instantly recovering thousands of dollars in lost weekly revenue.
                    </Typography>
                 </Box>
                 <Box sx={{ p: 4, borderRadius: "20px", bgcolor: alpha("#060e1a", 0.6), border: `1px solid ${alpha(THEME_COLOR, 0.2)}`, minWidth: { md: "300px" } }}>
                    <Typography sx={{ color: THEME_COLOR, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", mb: 1 }}>Open Rate Recovery</Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 0 }}>40%</Typography>
                    <Typography sx={{ color: alpha("#fff", 0.5) }}>Restored baseline engagement</Typography>
                 </Box>
               </Box>
            </Box>

            {/* 4. FAQ Section */}
            <FAQComponent
              subtitle="Everything you need to know about our email deliverability services."
              items={[
                {
                  question: "What is email deliverability?",
                  answer: "Email deliverability is the ability to deliver emails to subscribers' inboxes. It's what some marketers use to gauge the likelihood of their email campaigns reaching their subscribers' primary inboxes rather than the spam or junk folder."
                },
                {
                  question: "How do I know if my emails are going to spam?",
                  answer: "You can track your open rates and use seed testing tools. If your open rates suddenly drop or are consistently low (below 15-20%), it's a strong indicator that you have deliverability issues."
                },
                {
                  question: "What are SPF, DKIM, and DMARC?",
                  answer: "These are email authentication protocols. SPF specifies which mail servers are authorized to send email for your domain. DKIM adds a digital signature to your emails. DMARC uses SPF and DKIM to give instructions to the receiving mail server on how to handle emails that fail authentication."
                },
                {
                  question: "How often should I audit my deliverability?",
                  answer: "We recommend a comprehensive technical audit at least once a quarter, or immediately if you notice a significant drop in engagement or plan to migrate to a new sending platform."
                }
              ]}
            />

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
