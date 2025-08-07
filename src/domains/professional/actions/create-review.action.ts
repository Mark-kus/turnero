"use server";

import {revalidatePath} from "next/cache";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {CreateReviewUseCase} from "@/professional/use-cases/create-review.use-case";
import {VercelReviewRepository} from "@/professional/adapters/vercel-review.adapter";
import {CreateReviewDto} from "@/professional/dtos/create-review.dto";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function createReview(review: CreateReviewDto): Promise<void> {
  const sessionAdapter = new JoseSessionAdapter();
  const repository = new VercelReviewRepository();

  const useCase = new CreateReviewUseCase(repository, sessionAdapter);

  try {
    await useCase.execute(review);
  } catch (e: any) {
    throwNextRedirectError(e);
    console.error(e);
  }

  revalidatePath("/appointment/booked");
}
