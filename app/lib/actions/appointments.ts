"use server";

import { sql } from "@vercel/postgres";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AppointmentData, Review } from "@/app/types";

export async function scheduleAppointment(appointmentData: AppointmentData) {
  const session = await verifySession();

  const { scheduled_time, account_id, adittional_id, professional_id } =
    appointmentData;

  if (adittional_id) {
    await sql`
    INSERT INTO appointments (scheduled_time, account_id, adittional_id, professional_id)
    VALUES (${scheduled_time.toISOString()}, ${account_id}, ${adittional_id}, ${professional_id})
    `;
  } else {
    await sql`
    INSERT INTO appointments (scheduled_time, account_id, professional_id)
    VALUES (${scheduled_time.toISOString()}, ${account_id}, ${professional_id})
    `;
  }

  revalidatePath("/appointment");
  redirect("/appointment");
}

export async function rescheduleAppointment(appointmentData: AppointmentData) {
  const session = await verifySession();

  const { appointment_id, scheduled_time } = appointmentData;

  await sql`
    UPDATE appointments
    SET scheduled_time = ${scheduled_time.toISOString()}
    WHERE appointment_id = ${appointment_id}
  `;

  revalidatePath("/appointment/booked");
  redirect("/appointment/booked");
}

export async function cancelAppointment(appointment_id: number) {
  const session = await verifySession();

  await sql`
    UPDATE appointments
    SET status = 5
    WHERE appointment_id = ${appointment_id}
  `;

  revalidatePath("/appointment/booked");
}

export async function leaveReview(review: Review) {
  const session = await verifySession();

  if (review.comment) {
    await sql`
    INSERT INTO reviews (rating, comment, appointment_id)
    VALUES (${review.rating}, ${review.comment}, ${review.appointment_id})
  `;
  } else {
    await sql`
    INSERT INTO reviews (rating, appointment_id)
    VALUES (${review.rating}, ${review.appointment_id})
  `;
  }

  revalidatePath("/appointment/booked");
}
