export interface ProfessionalFilters {
  insurance: string;
  specialty: string;
  name: string;
}

export type TimeSlot = `${number}${number}:${number}${number}:00`;
