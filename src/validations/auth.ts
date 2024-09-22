import * as z from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "Email can't be empty" })
    .email({ message: "Your email is invalid" })
    .max(255, { message: "Email is too long, please use a different one" }),
  password: z.string().min(1, { message: "Password can't empty" }),
});

const registerValidation = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name can't empty" })
    .max(50, "First name too long"),
  lastName: z
    .string()
    .min(1, { message: "Last name can't empty" })
    .max(50, "Last name too long"),
  email: z
    .string()
    .min(1, { message: "Email can't be empty" })
    .email({ message: "Your email is invalid" })
    .max(255, { message: "Email is too long, please use a different one" }),
  password: z.string().min(6, { message: "Password min 6 character" }),
});

export { loginValidation, registerValidation };
