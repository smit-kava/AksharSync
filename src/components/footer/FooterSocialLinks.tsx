import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IconButton, Stack } from "@mui/material";

const socialItems = [
  { label: "YouTube", icon: <YouTubeIcon />, href: "#" },
  { label: "LinkedIn", icon: <LinkedInIcon />, href: "#" },
  { label: "Instagram", icon: <InstagramIcon />, href: "#" },
  { label: "Facebook", icon: <FacebookOutlinedIcon />, href: "#" },
  { label: "X", icon: <XIcon />, href: "#" },
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
