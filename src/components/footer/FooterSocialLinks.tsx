import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { IconButton, Stack } from "@mui/material";

const socialItems = [
  { label: "Instagram", icon: <InstagramIcon />, href: "https://www.instagram.com/aksharsync?igsh=MXh5cnB5eDJ6a2IyOQ==" },
  { label: "X", icon: <XIcon />, href: "https://x.com/Aksharsync" },
];

export function FooterSocialLinks() {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {socialItems.map((item) => (
        <IconButton
          key={item.label}
          component="a"
          href={item.href}
          aria-label={item.label}
          sx={{
            color: "white",
            border: "1px solid rgba(255,255,255,0.22)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
          }}
        >
          {item.icon}
        </IconButton>
      ))}
    </Stack>
  );
}
