"use server";

import {verifySession} from "@/auth/adapters/session";
import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {UpdateProfileDTO} from "@/auth/dtos/update-profile.dto";
import {UpdateProfileSchema} from "@/auth/schemas/update-profile.schema";
import {EmailService} from "@/auth/services/email.service";
import {UpdateProfileUseCase} from "@/auth/use-cases/update-profile.use-case";
import {FormState} from "@/shared/types";

export async function updateProfile(state: FormState, formData: FormData): Promise<FormState> {
  const {accountId} = await verifySession();

  const avatarFile = formData.get("avatar") as File | null;
  const avatar = avatarFile && avatarFile.size > 0 ? avatarFile : undefined;

  const result = UpdateProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    birthdate: formData.get("birthdate"),
    email: formData.get("email"),
    city: formData.get("city"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    avatar,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const repository = new SqlAccountRepository();
  const mailer = new EmailService();

  const useCase = new UpdateProfileUseCase(repository, mailer);

  const dto: UpdateProfileDTO = {
    accountId,
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    email: result.data.email,
    birthdate: result.data.birthdate ? result.data.birthdate : null,
    city: result.data.city ? result.data.city : null,
    address: result.data.address ? result.data.address : null,
    phone: result.data.phone ? result.data.phone : null,
    avatar: result.data.avatar ? result.data.avatar : null,
  };

  try {
    await useCase.execute(dto);
  } catch (e: any) {
    return {
      errors: {
        submit: e.message ? [e.message] : ["Failed to update profile."],
      },
    };
  }
}
