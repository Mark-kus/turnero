"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {SignupUseCase} from "@/auth/use-cases/signup.use-case";
import {SignupSchema} from "@/auth/schemas/signup.schema";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {COOKIES} from "@/shared/constants";
import {BcryptHasher} from "@/auth/adapters/bcrypt.adapter";
import {ResendEmailSender} from "@/auth/adapters/resend-email.adapter";
import {RegisterFormState} from "@/shared/types/auth";

export async function signup(
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const result = SignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {errors: result.error.flatten().fieldErrors};
  }

  const repository = new VercelAccountRepository();
  const hasher = new BcryptHasher();
  const mailer = new ResendEmailSender();

  const useCase = new SignupUseCase(repository, hasher, mailer);

  try {
    await useCase.execute(result.data);
    cookies().set(COOKIES.ACCOUNT_EMAIL, result.data.email);
  } catch (e: any) {
    return {
      errors: {
        submit: [e.message || "Unknown error"],
      },
    };
  }

  redirect("/verify");
}
