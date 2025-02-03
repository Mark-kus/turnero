import { z } from "zod";

export const UserLogin = z
  .object({
    username: z.string().email().min(6).max(100),
    password: z.string().min(6).max(100),
    rememberMe: z.string().optional(),
  })
  // .transform((data) => {
  //   if (data.rememberMe === "on") {
  //     data.rememberMe = true;
  //   }
  //   return data;
  // });

export const UserCreate = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .min(6)
    .max(100),
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(2)
    .max(100),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(2)
    .max(100),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .max(100),
});

export const UserEdit = z.object({
  avatar_url: z.string().optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .min(6)
    .max(100),
  first_name: z
    .string({
      required_error: "First name is required",
    })
    .min(2)
    .max(100),
  last_name: z
    .string({
      required_error: "Last name is required",
    })
    .min(2)
    .max(100),
  birthday: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
});
