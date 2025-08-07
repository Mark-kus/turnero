import {NumberedAppointmentStatus} from "@/shared/types/patient";

export interface AppointmentRepository {
  create(
    scheduledTime: Date,
    accountId: number,
    professionalId: number,
    familyMemberId: number | null,
  ): Promise<void>;
  updateSchedule(appointmentId: number, scheduledTime: Date): Promise<void>;
  updateStatus(appointmentId: number, status: NumberedAppointmentStatus): Promise<void>;
}
