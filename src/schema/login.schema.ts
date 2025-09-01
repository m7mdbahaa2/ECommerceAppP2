import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .nonempty({ message: "password is required" }),
});

export type LoginFormType = z.infer<typeof formSchema>;