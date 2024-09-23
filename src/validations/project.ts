import * as z from "zod";

const projectValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Name project can't empty" })
    .max(255, { message: "Name project < 255 characters" }),
  url: z
    .string()
    .min(1, { message: "Name project can't empty" })
    .max(255, { message: "Name project < 255 characters" }),
  category: z
    .string()
    .min(1, { message: "Name project can't empty" })
    .max(255, { message: "Name project < 255 characters" }),
  description: z.string().optional(),
});

const updateProjectValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Name project can't empty" })
    .max(255, { message: "Name project < 255 characters" }),
  category: z
    .string()
    .min(1, { message: "Name project can't empty" })
    .max(255, { message: "Name project < 255 characters" }),
  description: z.string().optional(),
});

export { projectValidation, updateProjectValidation };
