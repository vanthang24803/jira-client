import * as z from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email can't be empty" })
    .email({ message: "Your email is invalid" })
    .max(255, { message: "Email is too long, please use a different one" }),
  password: z.string().min(1, { message: "Password can't empty" }),
});

export { loginValidation };
