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
          style: { fontSize: "0.875rem", height: "22px" },
          autoComplete: "off",
        },
        FormHelperTextProps: {
          sx: { fontWeight: 500, letterSpacing: "-0.05em" },
        },
      },
    },
  },
});

export default theme;
