import {BookedAppointmentDto} from "@/professional/dtos/booked-appointment.dto";
import {FamilyMemberDto} from "@/professional/dtos/family-member.dto";
import {PatientDto} from "@/professional/dtos/patient.dto";

export interface AppointmentReadModel {
  getPremakeAppointment(
    professionalId: number,
    familyMemberId?: number,
  ): Promise<{
    professional: any;
    patient: PatientDto;
    familyMember: FamilyMemberDto | null;
  }>;
  getBookedAppointments(accountId: number): Promise<{
    comingAppointments: BookedAppointmentDto[];
    dueAppointments: BookedAppointmentDto[];
  }>;
}
