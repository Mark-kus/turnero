"use server";

import { sql } from "@vercel/postgres";
import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AppointmentData, Review } from "@/app/types";

export async function saveAppointment(appointmentData: AppointmentData) {
  const session = await verifySession();

  const { date, time, account_id, adittional_id, professional_id } =
    appointmentData;

  const parsedDate = new Date(date).toISOString();

  console.log(date, time);

  if (adittional_id) {
    await sql`
    INSERT INTO appointments (date, time, account_id, adittional_id, professional_id)
    VALUES (${parsedDate}, ${time}, ${account_id}, ${adittional_id}, ${professional_id})
    `;
  } else {
    await sql`
    INSERT INTO appointments (date, time, account_id, professional_id)
    VALUES (${parsedDate}, ${time}, ${account_id}, ${professional_id})
    `;
  }

  revalidatePath("/appointment");
  redirect("/appointment");
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
