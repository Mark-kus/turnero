"use server";

import {redirect} from "next/navigation";

import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {ChangePasswordSchema} from "@/auth/schemas/change-passowrd.schema";
import {ChangePasswordUseCase} from "@/auth/use-cases/change-password.use-case";
import {logout} from "@/auth/actions/logout.action";
import {ChangePasswordDto} from "@/auth/dtos/change-password.dto";
import {BcryptHasher} from "@/auth/adapters/bcrypt.adapter";
import {ChangePasswordFormState} from "@/shared/types/auth";

export async function changePassword(
  state: ChangePasswordFormState,
  formData: FormData,
): Promise<ChangePasswordFormState> {
  const result = ChangePasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const repository = new VercelAccountRepository();
  const hasher = new BcryptHasher();

  const useCase = new ChangePasswordUseCase(repository, hasher);

  const dto: ChangePasswordDto = {
    token: result.data.token,
    password: result.data.password,
  };

  try {
    await useCase.execute(dto);
  } catch (error: any) {
    return {
      errors: {
        submit: [error.message || "Unknown error"],
      },
    };
  }

  logout();
  redirect("/login");
}
