import {NumberedAppointmentStatus} from "@/shared/types/patient";

export interface BookedAppointmentRaw {
  appointment_id: number;
  scheduled_time: Date;
  status: number;
  professional_id: number;
  professional_first_name: string;
  professional_last_name: string;
  patient_first_name: string;
  patient_last_name: string;
  patient_avatar_url: string | null;
  family_member_id: number | null;
  family_member_name: string | null;
  family_member_surname: string | null;
  location: string;
  rating: number;
}

export interface BookedAppointmentDto {
  appointmentId: number;
  scheduledTime: Date;
  status: NumberedAppointmentStatus;
  rating: number;
  professional: {
    professionalId: number;
    firstName: string;
    lastName: string;
  };
  patient: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  familyMember: {
    familyMemberId: number | null;
    name: string | null;
    surname: string | null;
  };
  provider: {
    location: string;
  };
}

export function toBookedAppoinmentDto(row: BookedAppointmentRaw): BookedAppointmentDto {
  return {
    appointmentId: row.appointment_id,
    scheduledTime: row.scheduled_time,
    status: row.status as NumberedAppointmentStatus,
    rating: row.rating,
    professional: {
      professionalId: row.professional_id,
      firstName: row.professional_first_name,
      lastName: row.professional_last_name,
    },
    patient: {
      firstName: row.patient_first_name,
      lastName: row.patient_last_name,
      avatarUrl: row.patient_avatar_url,
    },
    familyMember: {
      familyMemberId: row.family_member_id,
      name: row.family_member_name,
      surname: row.family_member_surname,
    },
    provider: {
      location: row.location,
    },
  };
}
