import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HelpIcon from "@mui/icons-material/Help";
import useAuth from "@/hooks/use-auth";

export default function RightAppBar() {
  const { profile } = useAuth();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <HelpIcon />
      <NotificationsRoundedIcon />
      <SettingsIcon />
      <Avatar sx={{ width: 30, height: 30 }} src={profile?.avatar} />
    </Stack>
  );
}
