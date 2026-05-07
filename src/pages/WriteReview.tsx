import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShieldIcon from '@mui/icons-material/Shield';
import StarIcon from '@mui/icons-material/Star';
import {
    Alert,
    Box,
    Button, CircularProgress,
    Grid,
    Rating, TextField,
    Typography
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = '/api/reviews';
const initialForm = { name: '', email: '', company: '', rating: 5, review: '' };

const IllustrationSVG = () => (
    <svg width="220" height="280" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="160" height="200" rx="16" fill="rgba(139,131,232,0.08)" stroke="rgba(139,131,232,0.18)" strokeWidth="1" />
        <rect x="46" y="54" width="128" height="12" rx="6" fill="rgba(139,131,232,0.25)" />
        <rect x="46" y="76" width="96" height="8" rx="4" fill="rgba(255,255,255,0.07)" />
        <rect x="46" y="100" width="128" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
        <rect x="54" y="108" width="64" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="54" y="118" width="44" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="46" y="148" width="128" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
        <rect x="54" y="156" width="80" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="54" y="166" width="52" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="46" y="196" width="128" height="22" rx="8" fill="rgba(139,131,232,0.35)" />
        <rect x="60" y="203" width="56" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
        <circle cx="174" cy="207" r="6" fill="rgba(139,131,232,0.6)" />
        <path d="M171 207 L173.5 209.5 L177 205" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="92" y="16" width="36" height="22" rx="6" fill="#0c1524" stroke="rgba(29,158,117,0.3)" strokeWidth="1" />
        <rect x="100" y="22" width="20" height="4" rx="2" fill="rgba(29,158,117,0.5)" />
        <rect x="104" y="29" width="12" height="4" rx="2" fill="rgba(29,158,117,0.3)" />
        <line x1="110" y1="38" x2="110" y2="54" stroke="rgba(29,158,117,0.25)" strokeWidth="0.75" strokeDasharray="3 2" />
        <circle cx="192" cy="110" r="18" fill="rgba(239,159,39,0.08)" stroke="rgba(239,159,39,0.2)" strokeWidth="1" />
        <text x="192" y="116" textAnchor="middle" fill="rgba(239,159,39,0.7)" fontSize="16">★</text>
        <circle cx="22" cy="160" r="14" fill="rgba(139,131,232,0.08)" stroke="rgba(139,131,232,0.2)" strokeWidth="1" />
        <rect x="15" y="157" width="14" height="2" rx="1" fill="rgba(139,131,232,0.5)" />
        <rect x="15" y="161" width="10" height="2" rx="1" fill="rgba(139,131,232,0.3)" />
        <rect x="15" y="165" width="12" height="2" rx="1" fill="rgba(139,131,232,0.2)" />
        <rect x="140" y="238" width="52" height="28" rx="8" fill="rgba(29,158,117,0.08)" stroke="rgba(29,158,117,0.18)" strokeWidth="1" />
        <text x="166" y="250" textAnchor="middle" fill="rgba(29,158,117,0.5)" fontSize="9" fontWeight="600">VERIFIED</text>
        <rect x="148" y="255" width="36" height="5" rx="2.5" fill="rgba(29,158,117,0.2)" />
        <rect x="16" y="238" width="52" height="28" rx="8" fill="rgba(216,90,48,0.06)" stroke="rgba(216,90,48,0.15)" strokeWidth="1" />
        <text x="42" y="250" textAnchor="middle" fill="rgba(216,90,48,0.5)" fontSize="9" fontWeight="600">REVIEW</text>
        <rect x="24" y="255" width="36" height="5" rx="2.5" fill="rgba(216,90,48,0.15)" />
        <circle cx="30" cy="100" r="3" fill="rgba(139,131,232,0.3)" />
        <circle cx="196" cy="70" r="2" fill="rgba(29,158,117,0.3)" />
        <circle cx="196" cy="170" r="2" fill="rgba(239,159,39,0.3)" />
        <circle cx="30" cy="220" r="2" fill="rgba(216,90,48,0.3)" />
    </svg>
);

export const WriteReview = () => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

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
            if (json.success) { setSuccess(true); setForm(initialForm); }
            else setError(json.message || 'Submission failed. Please try again.');
        } catch {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#e2e8f0',
            borderRadius: '8px',
            bgcolor: 'rgba(255,255,255,0.03)',
            fontSize: '0.83rem',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.07)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&.Mui-focused fieldset': { borderColor: 'rgba(139,131,232,0.5)', borderWidth: '1px' },
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'rgba(139,131,232,0.9)' },
    };

    return (
        <Box sx={{
            minHeight: '100vh', width: '100vw',
            bgcolor: '#070d18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Box sx={{
                width: '100%', maxWidth: 860,
                mx: 'auto', my: { xs: 0, md: 4 },
                borderRadius: { xs: 0, md: '16px' },
                overflow: 'hidden',
                border: { md: '1px solid rgba(255,255,255,0.06)' },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                minHeight: { xs: '100vh', md: 580 },
            }}>

                {/* ── LEFT PANEL (hidden on mobile) ── */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: '#0c1524',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    p: '40px 36px',
                }}>
                    <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                        <Box component="span" sx={{ color: '#8b83e8' }}>Akshar</Box>Sync
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <IllustrationSVG />
                    </Box>

                    <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.22)', lineHeight: 1.7 }}>
                        Trusted by 2,400+ teams<br />
                        Reviews verified within 24h<br />
                        SSL encrypted &amp; secure
                    </Typography>
                </Box>

                {/* ── RIGHT PANEL (form) ── */}
                <Box sx={{
                    bgcolor: '#070d18',
                    p: { xs: '32px 24px', sm: '40px 36px' },
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

                                {/* Accent bar */}
                                <Box sx={{ height: '2px', background: 'linear-gradient(90deg, #7F77DD, #1D9E75, #EF9F27)', borderRadius: '2px', mb: 2.5 }} />

                                {/* Badge */}
                                <Box sx={{
                                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                                    textTransform: 'uppercase', color: '#8b83e8',
                                    bgcolor: 'rgba(139,131,232,0.1)', border: '1px solid rgba(139,131,232,0.2)',
                                    borderRadius: '20px', px: 1.25, py: 0.5, mb: 1.5,
                                }}>
                                    <EditNoteIcon sx={{ fontSize: 12 }} /> Share your experience
                                </Box>

                                <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '1.3rem', letterSpacing: '-0.025em', mb: 0.5 }}>
                                    Write a review
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', mb: 2.5 }}>
                                    Takes less than a minute. Your feedback matters.
                                </Typography>

                                <Grid container spacing={1.25}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField label="Full name *" fullWidth size="small" value={form.name} onChange={handleChange('name')} sx={inputSx} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField label="Email *" type="email" fullWidth size="small" value={form.email} onChange={handleChange('email')} sx={inputSx} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField label="Company" fullWidth size="small" value={form.company} onChange={handleChange('company')} sx={inputSx} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{
                                            border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px',
                                            px: 1.5, height: '38px',
                                            display: 'flex', alignItems: 'center', gap: 1.5,
                                            bgcolor: 'rgba(255,255,255,0.03)',
                                        }}>
                                            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>Rating</Typography>
                                            <Rating
                                                value={form.rating}
                                                onChange={(_, val) => val && setForm(p => ({ ...p, rating: val }))}
                                                size="small"
                                                icon={<StarIcon sx={{ color: '#EF9F27', fontSize: '1rem' }} />}
                                                emptyIcon={<StarIcon sx={{ color: 'rgba(255,255,255,0.1)', fontSize: '1rem' }} />}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid size={12}>
                                        <TextField
                                            label="Your review *"
                                            multiline rows={4} fullWidth
                                            value={form.review}
                                            onChange={handleChange('review')}
                                            slotProps={{
                                                htmlInput: { maxLength: 500 },
                                                formHelperText: { sx: { color: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', textAlign: 'right', mr: 0 } }
                                            }}
                                            helperText={`${form.review.length} / 500`}
                                            sx={inputSx}
                                        />
                                    </Grid>
                                    {error && (
                                        <Grid size={12}>
                                            <Alert severity="error" sx={{
                                                bgcolor: 'rgba(226,75,74,0.07)', color: '#fca5a5',
                                                border: '1px solid rgba(226,75,74,0.15)', borderRadius: '8px',
                                                fontSize: '0.75rem', py: 0.5,
                                                '& .MuiAlert-icon': { color: '#f87171' }
                                            }}>{error}</Alert>
                                        </Grid>
                                    )}
                                </Grid>

                                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                        <ShieldIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }} />
                                        <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>SSL encrypted</Typography>
                                    </Box>
                                    <Button
                                        onClick={handleSubmit} disabled={loading} variant="contained"
                                        sx={{
                                            px: 2.5, py: 0.9, bgcolor: '#7F77DD', color: '#fff',
                                            borderRadius: '8px', fontWeight: 600, fontSize: '0.82rem',
                                            textTransform: 'none', minWidth: 130,
                                            '&:hover': { bgcolor: '#6B63C9' },
                                            '&:disabled': { bgcolor: 'rgba(127,119,221,0.3)', color: 'rgba(255,255,255,0.4)' },
                                        }}
                                    >
                                        {loading ? <CircularProgress size={15} sx={{ color: '#fff' }} /> : 'Submit →'}
                                    </Button>
                                </Box>
                            </motion.div>
                        ) : (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Box sx={{
                                        width: 52, height: 52, borderRadius: '50%',
                                        bgcolor: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2,
                                    }}>
                                        <CheckCircleOutlineIcon sx={{ color: '#1D9E75', fontSize: 26 }} />
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '1.15rem', mb: 0.75 }}>Review submitted!</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mb: 2.5 }}>
                                        It'll appear on the site once verified by our team.
                                    </Typography>
                                    <Button variant="outlined" onClick={() => navigate('/')} sx={{
                                        color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '8px', textTransform: 'none', fontSize: '0.8rem', px: 3,
                                        '&:hover': { borderColor: 'rgba(255,255,255,0.25)', bgcolor: 'rgba(255,255,255,0.03)' }
                                    }}>
                                        Back to home
                                    </Button>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </Box>
        </Box>
    );
};

export default WriteReview;