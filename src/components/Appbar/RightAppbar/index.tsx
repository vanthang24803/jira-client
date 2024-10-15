import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HelpIcon from "@mui/icons-material/Help";
import useAuth from "@/hooks/use-auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { toast } from "sonner";

export default function RightAppBar() {
  const { profile, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notImplement = () => {
    toast.info("Feature under development");
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <HelpIcon />
      <NotificationsRoundedIcon />
      <SettingsIcon />
      <Avatar
        sx={{
          width: 30,
          height: 30,
          cursor: "pointer",
        }}
        src={profile?.avatar}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        PaperProps={{
          sx: {
            width: "260px",
          },
        }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box p={2} display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 30, height: 30 }} src={profile?.avatar} />
          <Box display="flex" flexDirection="column">
            <Typography>
              {profile?.firstName} {profile?.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              {profile?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={notImplement}
        >
          <Typography sx={{ fontSize: "13px" }}>Manager Account</Typography>
          <OpenInNewIcon
            sx={{
              width: "13px",
              height: "13px",
            }}
          />
        </MenuItem>
        <MenuItem onClick={notImplement} sx={{ fontSize: "13px" }}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout} sx={{ fontSize: "13px" }}>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}
