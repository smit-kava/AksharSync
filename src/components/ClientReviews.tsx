import { Box, Container, Typography, Avatar, Rating } from '@mui/material';
import { motion } from 'framer-motion';

const reviews = [
    {
        name: "Gregory Kinsman-Ch...",
        date: "2022-04-22",
        text: "Super friendly team and great results - they even have a podcast! Highly recommended!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=greg"
    },
    {
        name: "Andy Maldonado",
        date: "2021-12-24",
        text: "Great service and attention to details the team at AksharSync provide! Can't say enough good things about them! It just felt like they actually were excited and happy to help us...",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=andy"
    },
    {
        name: "Alana Steyn",
        date: "2024-03-14",
        text: "I signed up for a flow audit with AksharSync and was! I was so impressed! Jeffrey was extremely knowledgeable, friendly and helpful and went above and beyond of what...",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=alana"
    },
    {
        name: "Michael Chen",
        date: "2023-11-05",
        text: "Exceptional results with our push notification strategy. The team is professional and always available to help. Our CTR improved by 15% in the first month!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=mike"
    },
    {
        name: "Sarah Johnson",
        date: "2024-01-20",
        text: "The implementation process was seamless. They understood our brand voice perfectly and delivered high-quality creatives that resonate with our audience.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sarah"
    }
];

// Duplicate reviews for infinite scroll
const duplicatedReviews = [...reviews, ...reviews];

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
    </svg>
);

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
    <Box sx={{
        minWidth: { xs: 260, md: 320 },
        maxWidth: { xs: 260, md: 320 },
        bgcolor: "rgba(255,255,255,0.02)",
        borderRadius: "20px",
        p: 3,
        mx: 1.5,
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        transition: "all 0.3s",
        "&:hover": {
            bgcolor: "rgba(255,255,255,0.04)",
            borderColor: "rgba(56, 189, 248, 0.3)",
            transform: "translateY(-5px)"
        }
    }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Avatar src={review.avatar} sx={{ width: 42, height: 42, border: "1px solid rgba(255,255,255,0.1)" }} />
                <Box>
                    <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{review.name}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{review.date}</Typography>
                </Box>
            </Box>
            <GoogleIcon />
        </Box>
        
        <Rating value={review.rating} readOnly size="small" sx={{ color: "#FBBC05" }} />
        
        <Typography sx={{ 
            color: "rgba(255,255,255,0.6)", 
            fontSize: "0.85rem", 
            lineHeight: 1.6,
            flexGrow: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical"
        }}>
            {review.text}
        </Typography>
        
        <Typography component="a" href="#" sx={{ 
            color: "#38bdf8", 
            fontSize: "0.8rem", 
            fontWeight: 600, 
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" }
        }}>
            Read More
        </Typography>
    </Box>
);

export const ClientReviews = () => {
    return (
        <Box sx={{ 
            py: 8, 
            bgcolor: "#060e1a", 
            overflow: "hidden",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.04)"
        }}>
            <Container maxWidth="lg" sx={{ mb: 6, textAlign: "center" }}>
                <Typography variant="h2" sx={{ 
                    fontWeight: 900, 
                    fontSize: { xs: "1.8rem", md: "2.5rem" }, 
                    color: "#fff",
                    mb: 1,
                    display: "inline-block",
                    px: 3,
                    py: 1,
                    borderRadius: "12px"
                }}>
                    Verified Reviews From Our Clients
                </Typography>
            </Container>

            {/* Scrolling Container */}
            <Box sx={{ 
                display: "flex", 
                width: "fit-content",
                position: "relative"
            }}>
                <motion.div
                    animate={{ x: [0, -1850] }} // Adjust based on total cards width
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                    style={{ display: "flex" }}
                >
                    {duplicatedReviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </motion.div>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
                <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
                    Trustindex rating score: <strong style={{ color: "rgba(255,255,255,0.5)" }}>4.7 of 5</strong>, based on <strong style={{ color: "rgba(255,255,255,0.5)" }}>64 reviews</strong>
                </Typography>
            </Container>
        </Box>
    );
};

export default ClientReviews;
