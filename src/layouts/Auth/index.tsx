import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Logo from "@/assets/logo.svg";
import LogoDisable from "@/assets/logo-disable.svg";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url("https://img.freepik.com/free-photo/office-supplies-laptop_23-2147689761.jpg?t=st=1726929925~exp=1726933525~hmac=d61dae34d1bbf307e39fc1ee5c521122a220ceb0871a30700c4886ba65409e8c&w=1060")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "50vh",
          height: "80vh",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 0",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: "230px",
            height: "50px",
          }}
        />
        <Outlet />

        <Box sx={{ width: "80%", border: "0.25px solid #d0d3d9" }} />

        <Box
          component="img"
          src={LogoDisable}
          alt="logo"
          sx={{
            width: "150px",
            height: "40px",
            mt: 2,
          }}
        />
        <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
          One account for Jira, Confluence, Trello and more?.
        </Typography>
      </Box>
    </Container>
  );
}
