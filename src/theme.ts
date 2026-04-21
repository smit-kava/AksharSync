import { createTheme } from "@mui/material/styles";

export const marketingTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#123457",
      dark: "#0c2743",
      light: "#2f5d8a",
    },
    secondary: {
      main: "#1aa7ff",
    },
    background: {
      default: "#eef4fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#11243b",
      secondary: "#4f647d",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(18, 52, 87, 0.08)",
          boxShadow: "0 14px 36px rgba(15, 35, 62, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 999,
        },
      },
    },
  },
});
