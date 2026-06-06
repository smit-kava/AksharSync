import { Box, styled } from "@mui/material";
import type { BoxProps } from "@mui/material";

const PageWrapper = styled(Box)<BoxProps>(() => ({
    backgroundColor: "#060e1a",
    color: "#fff",
    minHeight: "100vh",
    overflowX: "hidden",
}));

export default PageWrapper;
