import { Box, Toolbar } from "@mui/material";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export function CommonLayout() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      {/* Spacer so content doesn't hide behind fixed AppBar */}
      <Toolbar sx={{ minHeight: "72px !important" }} />
      <Outlet />
      <Footer />
    </Box>
  );
}
