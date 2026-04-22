import { Box, Container, Typography, alpha, Fade } from "@mui/material";
import { useInView } from "./Shared";

const stats = [
  { value: "350+", label: "Clients Served" },
  { value: "98%", label: "Client Retention" },
  { value: "12×", label: "Average ROI" },
  { value: "8+", label: "Years Experience" },
];

export default function Stats() {
  const [statsRef, statsInView] = useInView(0.1);

  return (
    <Box
      ref={statsRef}
      sx={{
        py: 8,
        borderTop: `1px solid ${alpha("#fff", 0.06)}`,
        borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
        bgcolor: alpha("#fff", 0.01),
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {stats.map((s, i) => (
            <Box
              key={s.label}
              sx={{
                flex: { xs: "0 0 50%", md: "0 0 25%" },
                textAlign: "center",
                py: 2,
              }}
            >
              <Fade in={statsInView} timeout={600 + i * 200}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 1,
                      background: "linear-gradient(90deg, #7fd0ff, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="overline" sx={{ color: alpha("#fff", 0.4), letterSpacing: 2, fontWeight: 700 }}>
                    {s.label}
                  </Typography>
                </Box>
              </Fade>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
