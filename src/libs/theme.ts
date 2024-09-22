import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { sx: { fontSize: "0.875rem" } },
        inputProps: {
          style: { fontSize: "0.875rem", height: "20px" },
          autoComplete: "off",
        },
        FormHelperTextProps: {
          sx: { fontWeight: 500, letterSpacing: "-0.05em" },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          color: "#64686e",
          cursor: "pointer",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
