import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import GoogleIcon from "@/assets/google.svg";

import Stack from "@mui/material/Stack";

export default function Register() {
  return (
    <>
      <Typography sx={{ fontWeight: 500, pt: 1 }}>
        Sign up to continue
      </Typography>

      <Box sx={{ mt: 2, width: "80%" }}></Box>

      <Stack sx={{ width: "80%", mt: 2 }} direction="row" spacing={2}>
        <TextField
          label="First name"
          variant="outlined"
          size="small"
          sx={{ mt: 2, width: "80%" }}
          InputLabelProps={{ sx: { fontSize: 14 } }}
          inputProps={{ style: { fontSize: 14, height: "22px" } }}
        />
        <TextField
          label="Last name"
          variant="outlined"
          size="small"
          sx={{ mt: 2, width: "80%" }}
          InputLabelProps={{ sx: { fontSize: 14 } }}
          inputProps={{ style: { fontSize: 14, height: "22px" } }}
        />
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        sx={{ mt: 2, width: "80%" }}
        InputLabelProps={{ sx: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 14, height: "22px" } }}
      />
      <TextField
        label="Password"
        variant="outlined"
        size="small"
        sx={{ mt: 2, width: "80%" }}
        InputLabelProps={{ sx: { fontSize: 14 } }}
        inputProps={{ style: { fontSize: 14, height: "22px" } }}
        type="password"
      />

      <Typography
        sx={{
          fontWeight: 400,
          pt: 1,
          width: "80%",
          color: "rgb(6 78 59)",
          fontSize: 11,
        }}
      >
        By signing up, I accept the Atlassian Cloud Terms of Service and
        acknowledge the Privacy Policy.
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 2,
          width: "80%",
          fontSize: 14,
          textTransform: "none",
          boxShadow: "none",
          height: "36px",
        }}
      >
        Sign up
      </Button>
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
