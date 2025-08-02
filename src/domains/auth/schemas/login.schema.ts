import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message: "Please enter a valid email."}).trim(),
  password: z.string().min(1, {message: "Password field must not be empty."}),
  remember: z.boolean(),
});
