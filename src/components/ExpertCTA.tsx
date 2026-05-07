import React from 'react';
import { Button } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes/paths';

interface ExpertCTAProps {
    text?: string;
    sx?: SxProps<Theme>;
    onClick?: () => void;
    to?: string;
}

const ExpertCTA: React.FC<ExpertCTAProps> = ({
    text = '',
    sx,
    onClick,
    to = ROUTE_PATHS.RETENTION_AUDIT_BOOKING
}) => {
    return (
        <Button
            variant="contained"
            component={onClick ? "button" : RouterLink}
            to={onClick ? undefined : to}
            onClick={onClick}
            endIcon={<ArrowForwardIcon />}
            sx={{
                background: "linear-gradient(135deg, #7fd0ff 0%, #a78bfa 100%)",
                color: "#060e1a",
                px: { xs: 4, md: 5 },
                py: 2,
                borderRadius: "14px",
                fontWeight: 850,
                textTransform: "none",
                fontSize: "1.05rem",
                boxShadow: "0 16px 36px rgba(127,208,255,0.25)",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 24px 48px rgba(127,208,255,0.35)",
                    background: "linear-gradient(135deg, #99ddff 0%, #b8a2ff 100%)",
                },
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                ...sx
            }}
        >
            {text}
        </Button>
    );
};

export default ExpertCTA;
