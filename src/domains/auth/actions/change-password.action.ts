"use server";

import {redirect} from "next/navigation";

import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {ChangePasswordSchema} from "@/auth/schemas/change-passowrd.schema";
import {BcryptService} from "@/auth/services/bcrypt.service";
import {FormState} from "@/shared/types";
import {ChangePasswordUseCase} from "@/auth/use-cases/change-password.use-case";
import {logout} from "@/auth/actions/logout.action";
import {ChangePasswordDTO} from "@/auth/dtos/change-password.dto";

export async function changePassword(state: FormState, formData: FormData): Promise<FormState> {
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

  const repository = new SqlAccountRepository();
  const hasher = new BcryptService();

  const useCase = new ChangePasswordUseCase(repository, hasher);

  const dto: ChangePasswordDTO = {
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
