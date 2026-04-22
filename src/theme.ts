import { createTheme } from "@mui/material/styles";

export const marketingTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D3B66", // Deep Blue
      dark: "#0a2d4d",
      light: "#3d6285",
    },
    secondary: {
      main: "#472187", // Rich Purple
    },
    background: {
      default: "#f4f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#0D3B66",
      secondary: "#472187",
    },
  },
  typography: {
    fontFamily: '"Anta", sans-serif',
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
