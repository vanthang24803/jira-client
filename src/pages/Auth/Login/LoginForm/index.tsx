import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "@/validations/auth";
import { z } from "zod";
import _http from "@/libs/http";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";

import CircularProgress from "@mui/material/CircularProgress";

export type LoginFormSchema = z.infer<typeof loginValidation>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      setLoading(true);
      await login(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        disabled={loading}
        label="Email"
        variant="outlined"
        size="small"
        sx={{ mt: 2, width: "80%" }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        disabled={loading}
        label="Password"
        variant="outlined"
        size="small"
        type="password"
        sx={{ mt: 2, width: "80%" }}
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />
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
        {loading ? <CircularProgress size={16} /> : "Continue"}
      </Button>
    </form>
  );
}
