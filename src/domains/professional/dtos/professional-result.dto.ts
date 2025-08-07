import {ProfessionalResultRaw} from "@/professional/adapters/vercel-professional.readmodel";
import {DateOnly} from "@/shared/types/common";

export interface ProfessionalResultDto {
  professionalId: number;
  firstName: string;
  lastName: string;
  birthdate: DateOnly;
  avatarUrl: string | null;
  location: string;
  daysOfWeek: string;
  insurances: string;
  specialties: string;
}

export function toProfessionalResultDto(row: ProfessionalResultRaw): ProfessionalResultDto {
  return {
    professionalId: row.professional_id,
    firstName: row.first_name,
    lastName: row.last_name,
    birthdate: row.birthdate as DateOnly,
    avatarUrl: row.avatar_url,
    location: row.location,
    daysOfWeek: row.days_of_week,
    specialties: row.specialties,
    insurances: row.insurances,
  };
}
