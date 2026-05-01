import React, { useState } from 'react';
import { Box, Container, Typography, alpha, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

interface FAQComponentProps {
    title?: React.ReactNode;
    subtitle?: string;
    items: FAQItem[];
}

export function FAQComponent({ title = "Frequently Asked Questions", subtitle, items }: FAQComponentProps) {
    const [expanded, setExpanded] = useState<string | false>('faq-0');

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#060e1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Box sx={{ width: 45, height: 3, bgcolor: "#38bdf8", borderRadius: 10, mx: "auto", mb: 4 }} />
                    <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "2.8rem" }, color: "#fff", mb: 2 }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography sx={{ color: alpha("#fff", 0.6), fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {items.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `faq-${index}`}
                            onChange={handleChange(`faq-${index}`)}
                            slotProps={{ transition: { timeout: 500 } }}
                            sx={{
                                bgcolor: "rgba(255,255,255,0.02)",
                                color: "#fff",
                                borderRadius: "16px !important",
                                border: "1px solid rgba(255,255,255,0.05)",
                                boxShadow: "none",
                                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:before": { display: "none" },
                                "&:hover": { borderColor: "rgba(56, 189, 248, 0.3)" },
                                "&.Mui-expanded": {
                                    bgcolor: "rgba(255,255,255,0.04)",
                                    borderColor: "rgba(56, 189, 248, 0.5)",
                                    my: 1
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "#38bdf8" }} />}
                                sx={{
                                    py: 1,
                                    px: 3,
                                    "& .MuiAccordionSummary-content": { my: 1.5 }
                                }}
                            >
                                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                                <Typography sx={{ color: alpha("#fff", 0.65), lineHeight: 1.7, fontSize: "1rem" }}>
                                    {item.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
