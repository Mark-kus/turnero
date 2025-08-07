import {z} from "zod";

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(3, "Must be 3 to 30 characters long")
    .max(30, "Must be 3 to 30 characters long")
    .regex(/^[A-Za-z][A-Za-z0-9\- ]*$/, "Only letters and spaces allowed"),
  lastName: z
    .string()
    .min(3, "Must be 3 to 30 characters long")
    .max(30, "Must be 3 to 30 characters long")
    .regex(/^[A-Za-z][A-Za-z0-9\- ]*$/, "Only letters and spaces allowed"),
  email: z
    .string()
    .email("Enter valid email address")
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/),
  password: z
    .string()
    .min(7, "Must be more than 7 characters")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[a-zA-Z]/, "Must contain at least one letter")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one symbol"),
});
