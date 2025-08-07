import {sql} from "@vercel/postgres";

import {AppointmentRepository} from "@/professional/contracts/appointment.repository";
import {NumberedAppointmentStatus} from "@/shared/types/patient";

export class VercelAppointmentRepository implements AppointmentRepository {
  async create(
    scheduledTime: Date,
    accountId: number,
    professionalId: number,
    familyMemberId: number | null,
  ): Promise<void> {
    await sql`
        INSERT INTO appointments (scheduled_time, account_id, family_member_id, professional_id)
        VALUES (${scheduledTime.toISOString()}, ${accountId}, ${familyMemberId}, ${professionalId})
    `;
  }

  async updateSchedule(appointmentId: number, scheduledTime: Date): Promise<void> {
    await sql`
        UPDATE appointments
        SET scheduled_time = ${scheduledTime.toISOString()}
        WHERE appointment_id = ${appointmentId}
  `;
  }

  async updateStatus(appointmentId: number, status: NumberedAppointmentStatus): Promise<void> {
    await sql`
        UPDATE appointments
        SET status = ${status}
        WHERE appointment_id = ${appointmentId}
    `;
  }
}
