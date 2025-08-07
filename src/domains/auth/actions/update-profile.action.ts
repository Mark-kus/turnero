"use server";

import {ResendEmailSender} from "@/auth/adapters/resend-email.adapter";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {VercelBlobService} from "@/auth/adapters/vercel-blob.adapter";
import {UpdateProfileDto} from "@/auth/dtos/update-profile.dto";
import {UpdateProfileSchema} from "@/auth/schemas/update-profile.schema";
import {UpdateProfileUseCase} from "@/auth/use-cases/update-profile.use-case";
import {UpdateProfileFormState} from "@/shared/types/auth";

export async function updateProfile(
  state: UpdateProfileFormState,
  formData: FormData,
): Promise<UpdateProfileFormState> {
  const sessionAdapter = new JoseSessionAdapter();
  const {accountId} = await sessionAdapter.verifySession();

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

  const repository = new VercelAccountRepository();
  const mailer = new ResendEmailSender();
  const blobUploader = new VercelBlobService();

  const useCase = new UpdateProfileUseCase(repository, mailer, blobUploader);

  const dto: UpdateProfileDto = {
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
