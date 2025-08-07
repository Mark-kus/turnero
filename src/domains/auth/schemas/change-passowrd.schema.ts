import z from "zod";

export const ChangePasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });
