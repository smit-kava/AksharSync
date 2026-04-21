import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type FooterLinkItem = {
  label: string;
  to: string;
};

type FooterLinkGroupProps = {
  title: string;
  links: FooterLinkItem[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ color: "white", fontSize: "1.1rem", fontWeight: 700 }}>
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {links.map((link) => (
          <Typography
            key={link.label}
            component={RouterLink}
            to={link.to}
            sx={{
              color: "rgba(255,255,255,0.92)",
              textDecoration: "none",
              fontSize: "1.05rem",
              "&:hover": { color: "#d7efff" },
            }}
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
