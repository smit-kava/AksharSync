import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRoutes } from "./routes";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppRoutes />

    </ThemeProvider>
  );
}
