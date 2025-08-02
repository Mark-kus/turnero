"use server";

import {cookies} from "next/headers";

import {LoginSchema} from "@/auth/schemas/login.schema";
import {COOKIES} from "@/shared/constants";
import {FormState} from "@/shared/types";
import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {BcryptService} from "@/auth/services/bcrypt.service";
import {LoginUseCase} from "@/auth/use-cases/login.use-case";
import {createSession} from "@/auth/adapters/session";

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const result = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    remember: formData.get("remember") === "on",
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (result.data.remember) {
    cookies().set(COOKIES.ACCOUNT_EMAIL, result.data.email);
  } else {
    cookies().delete(COOKIES.ACCOUNT_EMAIL);
  }

  const repository = new SqlAccountRepository();
  const hasher = new BcryptService();

  const useCase = new LoginUseCase(repository, hasher);

  try {
    const sessionData = await useCase.execute(result.data);

    await createSession(sessionData);
  } catch (e: any) {
    switch (e.message) {
      case "Account is not verified.":
        return {
          errors: {
            submit: ["Account is not verified."],
          },
        };
      case "Credentials are invalid.":
        return {
          errors: {
            submit: ["Invalid email or password."],
          },
        };
      default:
        return {
          errors: {
            submit: ["An unexpected error occurred."],
          },
        };
    }
  }
}
