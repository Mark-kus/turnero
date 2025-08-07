"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {VercelAppointmentRepository} from "@/professional/adapters/vercel-appointment.adapter";
import {CreateAppointmentUseCase} from "@/professional/use-cases/create-appointment.use-case";
import {CreateAppointmentDto} from "@/professional/dtos/create-appoinment.dto";
import {throwNextRedirectError} from "@/shared/utils/error";

export async function createAppointment(appointment: CreateAppointmentDto) {
  const sessionAdapter = new JoseSessionAdapter();
  const repository = new VercelAppointmentRepository();

  const useCase = new CreateAppointmentUseCase(repository, sessionAdapter);

  try {
    await useCase.execute(appointment);
  } catch (e: any) {
    throwNextRedirectError(e);
    console.error(e);
  }

  revalidatePath("/appointment");
  redirect("/appointment");
}
