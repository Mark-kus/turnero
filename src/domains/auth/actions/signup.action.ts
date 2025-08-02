"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {CreateAccountUseCase} from "@/auth/use-cases/create-account.use-case";
import {BcryptService} from "@/auth/services/bcrypt.service";
import {EmailService} from "@/auth/services/email.service";
import {FormState} from "@/shared/types";
import {SignupSchema} from "@/auth/schemas/signup.schema";
import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {COOKIES} from "@/shared/constants";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const result = SignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {errors: result.error.flatten().fieldErrors};
  }

  const repository = new SqlAccountRepository();
  const hasher = new BcryptService();
  const mailer = new EmailService();

  const useCase = new CreateAccountUseCase(repository, hasher, mailer);

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
