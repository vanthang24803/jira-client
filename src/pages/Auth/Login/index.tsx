import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoginForm from "./LoginForm";

import { Link } from "react-router-dom";
import GoogleIcon from "@/assets/google.svg";

export default function Login() {
  return (
    <>
      <Typography sx={{ fontWeight: 500, pt: 1 }}>
        Log in to continue
      </Typography>

      <LoginForm />

      <Typography
        sx={{ fontWeight: 500, pt: 3, color: "rgb(6 78 59)", fontSize: 14 }}
      >
        Or continue with
      </Typography>
      <Button
        variant="outlined"
        sx={{
          mt: 1,
          width: "80%",
          fontSize: 14,
          textTransform: "none",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "36px",
          borderColor: "#ccc",
        }}
      >
        <Box
          component="img"
          src={GoogleIcon}
          alt="logo"
          width={16}
          height={16}
        />
        <Typography
          sx={{ fontWeight: 600, ml: 1, color: "black", fontSize: 14 }}
        >
          Google
        </Typography>{" "}
      </Button>

      <Stack
        sx={{
          my: 2,
        }}
        direction="row"
        spacing={2}
      >
        <Link
          to="#"
          style={{
            fontSize: 14,
            color: "#0384fc",
          }}
        >
          Can't log in?
        </Link>

        <Link
          to="/register"
          style={{
            fontSize: 14,
            color: "#0384fc",
          }}
        >
          Create an account
        </Link>
      </Stack>
    </>
  );
}
