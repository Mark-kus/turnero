"use server";

import {ResendEmailSender} from "@/auth/adapters/resend-email.adapter";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {RequestPasswordResetDto} from "@/auth/dtos/request-reset-password.dto";
import {ForgotPasswordSchema} from "@/auth/schemas/forgot-password.schema";
import {RequestPasswordResetUseCase} from "@/auth/use-cases/request-password-reset.use-case";
import {ForgotPasswordFormState} from "@/shared/types/auth";

export async function requestPasswordReset(
  state: ForgotPasswordFormState,
  formData: FormData,
): Promise<ForgotPasswordFormState> {
  const result = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const repository = new VercelAccountRepository();
  const mailer = new ResendEmailSender();
  const sessionAdapter = new JoseSessionAdapter();

  const useCase = new RequestPasswordResetUseCase(repository, mailer);

  const session = await sessionAdapter.verifySession().catch(() => null);

  const dto: RequestPasswordResetDto = {
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
