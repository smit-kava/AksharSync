import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid #e2e8f0", py: 5, mt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright {new Date().getFullYear()} AksharSync.
        </Typography>
      </Container>
    </Box>
  );
}
