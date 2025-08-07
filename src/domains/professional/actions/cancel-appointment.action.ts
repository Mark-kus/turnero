"use server";

import {revalidatePath} from "next/cache";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelAppointmentRepository} from "@/professional/adapters/vercel-appointment.adapter";
import {CancelAppointmentUseCase} from "@/professional/use-cases/cancel-appointment.use-case";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function cancelAppointment(appointmentId: number) {
  const sessionAdapter = new JoseSessionAdapter();
  const repository = new VercelAppointmentRepository();

  const useCase = new CancelAppointmentUseCase(repository, sessionAdapter);

  try {
    await useCase.execute(appointmentId);
  } catch (e: any) {
    throwNextRedirectError(e);
    console.error(e);
  }

  revalidatePath("/appointment/booked");
}
