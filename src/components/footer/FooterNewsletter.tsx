import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";

export function FooterNewsletter() {
  return (
    <Stack spacing={2.5}>
      <Typography variant="h6" sx={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>
        Sign Up For Our Newsletter
      </Typography>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 2.5,
          px: 1.5,
          py: 0.75,
          bgcolor: "white",
          maxWidth: 320,
        }}
      >
        <InputBase placeholder="Email Address" sx={{ flex: 1, px: 1.5, color: "#4f647d" }} />
        <IconButton sx={{ color: "primary.main" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Paper>
      <Box>
        <Typography variant="h6" sx={{ color: "white", fontSize: "1.1rem", fontWeight: 700, mb: 2 }}>
          Get In Touch
        </Typography>
      </Box>
    </Stack>
  );
}
