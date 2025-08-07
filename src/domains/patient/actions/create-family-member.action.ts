"use server";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelFamilyMemberRepository} from "@/patient/adapters/vercel-family-member.adapter";
import {CreateFamilyMemberDto} from "@/patient/dtos/create-family-member.dto";
import {CreateFamilyMemberSchema} from "@/patient/schemas/create-family-member.schema";
import {CreateFamilyMemberUseCase} from "@/patient/use-cases/create-family-member.use-cases";
import {CreateFamilyMemberFormState} from "@/shared/types/patient";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function createFamilyMember(
  familyMember: CreateFamilyMemberDto,
): Promise<CreateFamilyMemberFormState> {
  const result = CreateFamilyMemberSchema.safeParse(familyMember);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const sessionAdapter = new JoseSessionAdapter();
  const repository = new VercelFamilyMemberRepository();

  const useCase = new CreateFamilyMemberUseCase(repository, sessionAdapter);

  try {
    return {success: {data: await useCase.execute(familyMember)}};
  } catch (e: any) {
    throwNextRedirectError(e);
    console.error(e);
  }
}
