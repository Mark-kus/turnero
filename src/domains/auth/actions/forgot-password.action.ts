"use server";

import {verifySession} from "@/auth/adapters/session";
import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {RequestPasswordResetDTO} from "@/auth/dtos/request-reset-password.dto";
import {ForgotPasswordSchema} from "@/auth/schemas/forgot-password.schema";
import {EmailService} from "@/auth/services/email.service";
import {RequestPasswordResetUseCase} from "@/auth/use-cases/request-password-reset.use-case";
import {FormState} from "@/shared/types";

export async function forgotPassword(state: FormState, formData: FormData): Promise<FormState> {
  const result = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const repository = new SqlAccountRepository();
  const mailer = new EmailService();

  const useCase = new RequestPasswordResetUseCase(repository, mailer);

  const session = await verifySession().catch(() => null);

  const dto: RequestPasswordResetDTO = {
    email: result.data.email,
    sessionAccountId: session?.accountId ? Number(session.accountId) : null,
  };

  try {
    await useCase.execute(dto);
  } catch (e: any) {
    return {
      errors: {
        submit: [e.message || "Unknown error"],
      },
    };
  }
}
