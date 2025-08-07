"use server";

import {cookies} from "next/headers";

import {LoginSchema} from "@/auth/schemas/login.schema";
import {COOKIES} from "@/shared/constants";
import {LoginFormState} from "@/shared/types/auth";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {LoginUseCase} from "@/auth/use-cases/login.use-case";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {BcryptHasher} from "@/auth/adapters/bcrypt.adapter";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
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

  const repository = new VercelAccountRepository();
  const hasher = new BcryptHasher();
  const sessionAdapter = new JoseSessionAdapter();

  const useCase = new LoginUseCase(repository, hasher);

  try {
    const sessionData = await useCase.execute(result.data);

    await sessionAdapter.createSession(sessionData);
  } catch (e: any) {
    throwNextRedirectError(e);
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
