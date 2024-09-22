import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerValidation } from "@/validations/auth";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import _http from "@/libs/http";
import { useNavigate } from "react-router-dom";

type RegisterSchema = z.infer<typeof registerValidation>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setLoading(true);

      const response = await _http.post(`/auth/register`, data);

      if (response.status === 201) {
        toast.success("Check your email!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ width: "80%", mt: 2 }} direction="row" spacing={2}>
        <TextField
          label="First name"
          variant="outlined"
          size="small"
          sx={{ mt: 2, width: "80%" }}
          disabled={loading}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          label="Last name"
          variant="outlined"
          size="small"
          disabled={loading}
          sx={{ mt: 2, width: "80%" }}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register("lastName")}
        />
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        disabled={loading}
        sx={{ mt: 2, width: "80%" }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Password"
        variant="outlined"
        disabled={loading}
        size="small"
        sx={{ mt: 2, width: "80%" }}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
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
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          width: "80%",
          fontSize: 14,
          textTransform: "none",
          boxShadow: "none",
          height: "36px",
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={16} /> : "Sign up"}
      </Button>
    </form>
  );
}
