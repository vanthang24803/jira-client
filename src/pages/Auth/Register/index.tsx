import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import GoogleIcon from "@/assets/google.svg";

import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <>
      <Typography sx={{ fontWeight: 500, pt: 1 }}>
        Sign up to continue
      </Typography>

      <RegisterForm />

      <Divider sx={{ pt: 2, width: "80%" }} />

      <Typography
        sx={{ fontWeight: 500, pt: 2, color: "rgb(6 78 59)", fontSize: 14 }}
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
        </Typography>
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
          gap: 2,
        }}
      >
        <Link
          to="/login"
          style={{
            fontSize: 14,
            color: "#0384fc",
          }}
        >
          Already have an Atlassian account? Log in
        </Link>
      </Box>
    </>
  );
}
