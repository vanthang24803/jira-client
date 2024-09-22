import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@/components/Appbar";

import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { isLogin, getProfile } = useAuth();

  useEffect(() => {
    if (isLogin) {
      getProfile();
    }
  }, [isLogin, getProfile]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Box display="flex" flexDirection="column" height="100vh">
        <AppBar />
        <Box flexGrow={1}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
}
