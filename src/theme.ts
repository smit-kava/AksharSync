import { createTheme } from "@mui/material/styles";

export const marketingTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7fd0ff", // Sky Blue for Dark Theme
      dark: "#0D3B66",
      light: "#a78bfa",
    },
    secondary: {
      main: "#472187",
    },
    background: {
      default: "#060e1a",
      paper: "#081121",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          overflowX: "hidden",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#0D3B66 transparent",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track, &::-webkit-scrollbar-button, &::-webkit-scrollbar-corner":
            {
              background: "transparent !important",
              display: "none",
            },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #0D3B66 0%, #472187 100%)",
            borderRadius: "10px",
            "&:hover": {
              background: "linear-gradient(180deg, #472187 0%, #0D3B66 100%)",
            },
          },
        },
        body: {
          backgroundColor: "#060e1a",
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::selection": {
          background: "rgba(127, 208, 255, 0.3)",
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 14px 36px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
  },
});
