import { z } from "zod";

export const commentValidation = z.object({
  content: z
    .string()
    .min(1, {
      message: "Required",
    })
    .max(255, {
      message: "Maximum 255 characters",
    }),
});

export type CommentSchema = z.infer<typeof commentValidation>;
