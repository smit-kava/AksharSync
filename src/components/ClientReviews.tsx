import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarIcon from '@mui/icons-material/Star';
import {
    Alert,
    Avatar,
    Box,
    Button, CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Rating,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

// ── API Base – used for fetching and submitting reviews ──
const API_BASE = '/api/reviews';

// ── Static fallback reviews (shown while DB loads or if empty) ──
const STATIC_REVIEWS = [
    {
        id: 's1', name: 'Gregory Kinsman-Ch...', company: '',
        date: '2022-04-22',
        review: 'Super friendly team and great results - they even have a podcast! Highly recommended!',
        rating: 5,
        avatar_url: 'https://i.pravatar.cc/150?u=greg',
    },
    {
        id: 's2', name: 'Andy Maldonado', company: '',
        date: '2021-12-24',
        review: "Great service and attention to details the team at AksharSync provide! Can't say enough good things about them!",
        rating: 5,
        avatar_url: 'https://i.pravatar.cc/150?u=andy',
    },
    {
        id: 's3', name: 'Alana Steyn', company: '',
        date: '2024-03-14',
        review: 'I signed up for a flow audit with AksharSync and was so impressed! Jeffrey was extremely knowledgeable, friendly and helpful and went above and beyond.',
        rating: 5,
        avatar_url: 'https://i.pravatar.cc/150?u=alana',
    },
    {
        id: 's4', name: 'Michael Chen', company: 'E-commerce Brand',
        date: '2023-11-05',
        review: 'Exceptional results with our push notification strategy. Our CTR improved by 15% in the first month!',
        rating: 5,
        avatar_url: 'https://i.pravatar.cc/150?u=mike',
    },
    {
        id: 's5', name: 'Sarah Johnson', company: 'SaaS Startup',
        date: '2024-01-20',
        review: 'The implementation process was seamless. They understood our brand voice perfectly and delivered high-quality creatives.',
        rating: 5,
        avatar_url: 'https://i.pravatar.cc/150?u=sarah',
    },
];

type Review = {
    id: string | number;
    name: string;
    company?: string;
    date: string;
    review: string;
    rating: number;
    avatar_url: string;
};

// ── Google G SVG icon ────────────────────────────────────────
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// ── Review Card ───────────────────────────────────────────────
const ReviewCard = ({ review }: { review: Review }) => (
    <Box sx={{
        minWidth: { xs: 260, md: 320 },
        maxWidth: { xs: 260, md: 320 },
        bgcolor: 'rgba(255,255,255,0.02)',
        borderRadius: '20px',
        p: 3,
        mx: 1.5,
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        transition: 'all 0.3s',
        '&:hover': {
            bgcolor: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            transform: 'translateY(-5px)',
        },
    }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
                <Avatar
                    src={review.avatar_url}
                    sx={{ width: 42, height: 42, border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Box>
                    <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
                        {review.name}
                    </Typography>
                    {review.company && (
                        <Typography sx={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 600 }}>
                            {review.company}
                        </Typography>
                    )}
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                        {review.date}
                    </Typography>
                </Box>
            </Box>
            <GoogleIcon />
        </Box>

        <Rating value={review.rating} readOnly size="small" sx={{ color: '#FBBC05' }} />

        <Typography sx={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.85rem',
            lineHeight: 1.65,
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
        }}>
            {review.review}
        </Typography>
    </Box>
);

// ── Submit Review Modal ───────────────────────────────────────
const initialForm = { name: '', email: '', company: '', rating: 5, review: '' };

const SubmitReviewModal = ({
    open, onClose, onSuccess,
}: { open: boolean; onClose: () => void; onSuccess: () => void }) => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        setError('');
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.email.trim() || !form.review.trim()) {
            setError('Please fill in Name, Email, and Review.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/submit-review.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                setForm(initialForm);
                onClose();
                onSuccess();
            } else {
                setError(json.message || 'Submission failed. Please try again.');
            }
        } catch {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#fff',
            borderRadius: '10px',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
            '&:hover fieldset': { borderColor: 'rgba(56,189,248,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#38bdf8' },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#38bdf8' },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: '#0d1b2e',
                        backgroundImage: 'linear-gradient(135deg, rgba(56,189,248,0.04) 0%, rgba(99,102,241,0.04) 100%)',
                        border: '1px solid rgba(56,189,248,0.15)',
                        borderRadius: '20px',
                        color: '#fff',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
                    },
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        width: 38, height: 38, borderRadius: '10px',
                        bgcolor: 'rgba(56,189,248,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <EditNoteIcon sx={{ color: '#38bdf8', fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                        Share Your Experience
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fff' } }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.2, pt: 2 }}>
                {/* Rating stars */}
                <Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', mb: 0.8 }}>
                        Your Rating *
                    </Typography>
                    <Rating
                        value={form.rating}
                        onChange={(_, val) => val && setForm(prev => ({ ...prev, rating: val }))}
                        size="large"
                        icon={<StarIcon sx={{ color: '#FBBC05' }} />}
                        emptyIcon={<StarIcon sx={{ color: 'rgba(255,255,255,0.15)' }} />}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        label="Full Name *"
                        fullWidth
                        value={form.name}
                        onChange={handleChange('name')}
                        sx={inputSx}
                        slotProps={{ htmlInput: { maxLength: 120 } }}
                    />
                    <TextField
                        label="Company / Brand"
                        fullWidth
                        value={form.company}
                        onChange={handleChange('company')}
                        sx={inputSx}
                        slotProps={{ htmlInput: { maxLength: 120 } }}
                    />
                </Box>

                <TextField
                    label="Email Address *"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange('email')}
                    sx={inputSx}
                    helperText={
                        <Typography component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.73rem' }}>
                            Not displayed publicly — used for Gravatar avatar only.
                        </Typography>
                    }
                />

                <TextField
                    label="Your Review *"
                    multiline
                    rows={4}
                    fullWidth
                    value={form.review}
                    onChange={handleChange('review')}
                    sx={inputSx}
                    slotProps={{ htmlInput: { maxLength: 2000 } }}
                    helperText={
                        <Typography component="span" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.73rem' }}>
                            {form.review.length}/2000 characters
                        </Typography>
                    }
                />

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                        >
                            <Alert
                                severity="error"
                                sx={{
                                    bgcolor: 'rgba(239,68,68,0.1)',
                                    color: '#fca5a5',
                                    border: '1px solid rgba(239,68,68,0.25)',
                                    borderRadius: '10px',
                                    '& .MuiAlert-icon': { color: '#fca5a5' },
                                }}
                            >
                                {error}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Typography sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.75rem' }}>
                    ✦ Reviews are verified by our team before they appear publicly.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                    sx={{
                        color: 'rgba(255,255,255,0.45)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        px: 3,
                        textTransform: 'none',
                        '&:hover': { borderColor: 'rgba(255,255,255,0.25)', color: '#fff' },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : null}
                    sx={{
                        background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
                        borderRadius: '10px',
                        px: 4,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)',
                            boxShadow: '0 6px 28px rgba(56,189,248,0.45)',
                        },
                        '&:disabled': { opacity: 0.6 },
                    }}
                >
                    {loading ? 'Submitting…' : 'Submit Review'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// ── Main ClientReviews Section ────────────────────────────────
export const ClientReviews = () => {
    const [reviews, setReviews] = useState<Review[]>(STATIC_REVIEWS);
    const [avgRating, setAvgRating] = useState(4.7);
    const [totalCount, setTotalCount] = useState(64);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    // const navigate = useNavigate();

    const fetchReviews = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/get-reviews.php?limit=30`);
            if (!res.ok) return; // keep static reviews if API fails
            const json = await res.json();
            console.log("Reviews API Response:", json);
            if (json.success && Array.isArray(json.reviews) && json.reviews.length > 0) {
                const mapped: Review[] = json.reviews.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    company: r.company ?? '',
                    date: r.date,
                    review: r.review,
                    rating: r.rating,
                    avatar_url: r.avatar_url ?? `https://i.pravatar.cc/150?u=${r.id}`,
                }));
                setReviews(mapped);
                if (json.avg_rating) setAvgRating(parseFloat(json.avg_rating));
                if (json.total) setTotalCount(json.total);
            }
        } catch {
            // Silent fail — static reviews remain
        }
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const duplicated = [...reviews, ...reviews]; // infinite scroll

    const handleSuccess = () => {
        setSnackbar({
            open: true,
            message: '🎉 Thank you! Your review is under review and will appear soon.',
        });
        fetchReviews();
    };

    return (
        <Box sx={{
            py: 8,
            bgcolor: '#060e1a',
            overflow: 'hidden',
            position: 'relative',
            borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
            {/* Section Header */}
            <Container maxWidth="lg" sx={{ mb: 5, textAlign: 'center' }}>
                {/* <Typography
                    component="span"
                    sx={{
                        display: 'inline-block',
                        bgcolor: 'rgba(56,189,248,0.08)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        color: '#38bdf8',
                        borderRadius: '50px',
                        px: 2, py: 0.5,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        mb: 2,
                    }}
                >
                    Client Testimonials
                </Typography> */}

                <Typography variant="h2" sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    color: '#fff',
                    mb: 1.5,
                    lineHeight: 1.2,
                }}>
                    Verified Reviews From{' '}
                    <Box component="span" sx={{
                        background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Our Clients
                    </Box>
                </Typography>

                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', mb: 0 }}>
                    Real results from real brands — unfiltered and verified.
                </Typography>
            </Container>

            {/* Scrolling Reviews Ticker */}
            <Box sx={{
                display: 'flex',
                width: 'fit-content',
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}>
                <motion.div
                    animate={{ x: [0, -(330 * reviews.length)] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: reviews.length * 4.5,
                            ease: 'linear',
                        },
                    }}
                    style={{ display: 'flex' }}
                >
                    {duplicated.map((review, i) => (
                        <ReviewCard key={`${review.id}-${i}`} review={review} />
                    ))}
                </motion.div>
            </Box>

            {/* Stats bar & CTA */}
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    p: { xs: 2, md: 2.5 },
                    px: { md: 2 },
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', md: 'flex-start' }
                    }}>
                        <Rating value={Math.round(avgRating)} readOnly size="small" sx={{ color: '#FBBC05' }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>
                            Overall rating:{' '}
                            <strong style={{ color: '#fff' }}>{avgRating} / 5</strong>
                            {' '}based on{' '}
                            <strong style={{ color: '#fff' }}>{totalCount} verified reviews</strong>
                        </Typography>
                    </Box>

                    {/* <Tooltip title="Share your experience — takes less than 2 minutes" arrow>
                        <Button
                            id="write-review-btn"
                            onClick={() => navigate(ROUTE_PATHS.WRITE_REVIEW)}
                            variant="contained"
                            startIcon={<FavoriteIcon sx={{ fontSize: 18 }} />}
                            sx={{
                                background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
                                color: '#fff',
                                borderRadius: '50px',
                                px: 4,
                                py: 1.4,
                                fontWeight: 800,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                boxShadow: '0 8px 25px rgba(56,189,248,0.25)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                '&:hover': {
                                    transform: 'scale(1.05) translateY(-2px)',
                                    boxShadow: '0 12px 30px rgba(56,189,248,0.4)',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)',
                                },
                            }}
                        >
                            Write a Review
                        </Button> */}
                    {/* </Tooltip> */}
                </Box>
            </Container>

            {/* Submit Review Modal */}
            <SubmitReviewModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={handleSuccess}
            />

            {/* Success Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                    sx={{
                        bgcolor: 'rgba(16,185,129,0.15)',
                        color: '#6ee7b7',
                        border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(12px)',
                        '& .MuiAlert-icon': { color: '#6ee7b7' },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ClientReviews;
