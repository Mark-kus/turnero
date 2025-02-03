import { z } from "zod";

const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .trim();

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email." })
  .trim();

const passwordSchema = z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
  .trim();

export const SignupFormSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const LoginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password field must not be empty." }),
  remember_me: z.union([z.string(), z.null()]),
});

export const ProfileFormSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  birthdate: z
    .string()
    .min(1, { message: "Please enter a valid birthdate." })
    .trim(),
  email: emailSchema,
  city: z.string().min(1, { message: "Please enter a valid city." }).trim(),
  address: z
    .string()
    .min(1, { message: "Please enter a valid address." })
    .trim(),
  phone: z
    .string()
    .min(1, { message: "Please enter a valid phone number." })
    .trim(),
});

export const ChangePasswordFormSchema = z.object({
  password: passwordSchema,
  password_confirmation: z.string(),
});
