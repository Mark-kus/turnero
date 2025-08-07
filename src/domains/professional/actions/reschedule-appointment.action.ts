"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelAppointmentRepository} from "@/professional/adapters/vercel-appointment.adapter";
import {RescheduleAppointmentUseCase} from "@/professional/use-cases/reschedule-appointment.use-case";
import {RescheduleAppointmentDto} from "@/professional/dtos/reschedule-appointment.dto";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function rescheduleAppointment(appointment: RescheduleAppointmentDto) {
  const sessionAdapter = new JoseSessionAdapter();
  const repository = new VercelAppointmentRepository();

  const useCase = new RescheduleAppointmentUseCase(repository, sessionAdapter);

  try {
    await useCase.execute(appointment);
  } catch (e: any) {
    throwNextRedirectError(e);
    console.error(e);
  }

  revalidatePath("/appointment/booked");
  redirect("/appointment/booked");
}
