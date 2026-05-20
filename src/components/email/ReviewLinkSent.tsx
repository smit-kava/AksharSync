import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  alpha,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Star as StarIcon, StarBorder as StarBorderIcon, ContentCopy as ContentCopyIcon, Check as CheckIcon, OpenInNew as OpenInNewIcon, Share as ShareIcon } from "@mui/icons-material";
import logoSrc from "../../assets/Logo.svg";

interface ReviewLinkSentProps {
  recipientName: string;
  visible: boolean;
  reviewUrl?: string;
}


const REVIEW_URL = "https://aksharsync.com/write-review";

const StarRating = ({ rating, onChange }: { rating: number; onChange: (r: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHovered(star)}
          onHoverEnd={() => setHovered(0)}
        >
          <IconButton
            size="small"
            onClick={() => onChange(star)}
            sx={{ p: 0.3, color: star <= (hovered || rating) ? "#FFD700" : alpha("#fff", 0.2) }}
          >
            {star <= (hovered || rating) ? (
              <StarIcon sx={{ fontSize: 28 }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 28 }} />
            )}
          </IconButton>
        </motion.div>
      ))}
    </Box>
  );
};

const ReviewLinkSent: React.FC<ReviewLinkSentProps> = ({
  recipientName,
  visible,
  reviewUrl = REVIEW_URL,
}) => {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleRatingSubmit = () => {
    if (rating > 0) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              background: "linear-gradient(145deg, rgba(6,14,26,0.99) 0%, rgba(12,20,38,0.99) 100%)",
              border: `1px solid ${alpha("#FFD700", 0.15)}`,
              boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.03)",
              position: "relative",
            }}
          >
            {/* Top accent */}
            <Box
              sx={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "3px",
                background: "linear-gradient(90deg, transparent, #FFD700, #ff8c00, transparent)",
              }}
            />

            {/* Confetti-like sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1.2 }}
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? "#FFD700" : "#7fd0ff",
                  top: `${20 + Math.random() * 40}%`,
                  left: `${5 + i * 15}%`,
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Header */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(255,140,0,0.04) 100%)",
                borderBottom: `1px solid ${alpha("#FFD700", 0.08)}`,
              }}
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
              >
                <Box
                  component="img"
                  src={logoSrc}
                  alt="AksharSync"
                  sx={{ width: 44, height: 44, objectFit: "contain" }}
                />
              </motion.div>
              <Box>
                <Typography sx={{ fontWeight: 800, color: "#fff", fontSize: "1rem" }}>
                  Email Sent Successfully! 🎉
                </Typography>
                <Typography variant="caption" sx={{ color: alpha("#FFD700", 0.7), fontSize: "0.72rem" }}>
                  Review link delivered to {recipientName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Success animation */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(40,200,64,0.15), rgba(40,200,64,0.05))",
                      border: `2px solid ${alpha("#28c840", 0.4)}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <CheckIcon sx={{ color: "#28c840", fontSize: 36 }} />
                    </motion.div>
                  </Box>
                </motion.div>
              </Box>

              {/* Review link card */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "14px",
                    bgcolor: alpha("#ffffff", 0.03),
                    border: `1px solid ${alpha("#ffffff", 0.07)}`,
                    mb: 2.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: alpha("#7fd0ff", 0.7), fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 1 }}>
                    Review Link
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: "0.78rem",
                        color: alpha("#fff", 0.6),
                        fontFamily: "monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {reviewUrl}
                    </Typography>
                    <Tooltip title={copied ? "Copied!" : "Copy link"}>
                      <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{
                          color: copied ? "#28c840" : alpha("#7fd0ff", 0.7),
                          bgcolor: alpha(copied ? "#28c840" : "#7fd0ff", 0.08),
                          border: `1px solid ${alpha(copied ? "#28c840" : "#7fd0ff", 0.2)}`,
                          borderRadius: "8px",
                          width: 32,
                          height: 32,
                          transition: "all 0.2s",
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <CheckIcon sx={{ fontSize: 16 }} />
                            </motion.div>
                          ) : (
                            <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <ContentCopyIcon sx={{ fontSize: 16 }} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </motion.div>

              {/* Quick rating */}
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="rating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: "14px",
                        bgcolor: alpha("#FFD700", 0.04),
                        border: `1px solid ${alpha("#FFD700", 0.12)}`,
                        mb: 2.5,
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem", mb: 0.5 }}>
                        Rate your experience
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha("#fff", 0.45), display: "block", mb: 2, fontSize: "0.72rem" }}>
                        How would you rate your interaction with AksharSync so far?
                      </Typography>
                      <StarRating rating={rating} onChange={setRating} />
                      {rating > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            onClick={handleRatingSubmit}
                            size="small"
                            variant="contained"
                            sx={{
                              mt: 2,
                              background: "linear-gradient(90deg, #FFD700, #ff8c00)",
                              color: "#000",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: "8px",
                              px: 2.5,
                              "&:hover": { background: "linear-gradient(90deg, #ffe033, #ffa020)" },
                            }}
                          >
                            Submit Rating
                          </Button>
                        </motion.div>
                      )}
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: "14px",
                        textAlign: "center",
                        bgcolor: alpha("#28c840", 0.06),
                        border: `1px solid ${alpha("#28c840", 0.15)}`,
                        mb: 2.5,
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, color: "#28c840", fontSize: "1rem", mb: 0.5 }}>
                        Thank you for your rating! ⭐
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha("#fff", 0.5) }}>
                        Your feedback helps us serve you better.
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <Stack direction="row" spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    py: 1.3,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #7fd0ff, #472187)",
                    borderRadius: "10px",
                    "&:hover": { transform: "translateY(-1px)", boxShadow: "0 8px 20px rgba(127,208,255,0.25)" },
                    transition: "all 0.2s",
                  }}
                >
                  Leave a Review
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon sx={{ fontSize: 16 }} />}
                  onClick={handleCopy}
                  sx={{
                    py: 1.3,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    borderColor: alpha("#7fd0ff", 0.25),
                    color: alpha("#7fd0ff", 0.8),
                    borderRadius: "10px",
                    minWidth: 48,
                    "&:hover": { borderColor: alpha("#7fd0ff", 0.5), bgcolor: alpha("#7fd0ff", 0.05) },
                  }}
                >
                  Share
                </Button>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewLinkSent;
