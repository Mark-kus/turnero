import {DateOnly} from "@/shared/types/common";

export interface PatientRaw {
  account_id: number;
  first_name: string;
  last_name: string;
  email: string;
  birthdate: DateOnly;
  avatar_url: string | null;
  identification_number: number | null;
  phone: string | null;
  insurances: string | null;
}

export interface PatientDto {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: DateOnly;
  avatarUrl: string | null;
  identificationNumber: number | null;
  phone: string | null;
  insurances: string | null;
}

export function toPatientDto(row: PatientRaw): PatientDto {
  return {
    patientId: row.account_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    birthdate: row.birthdate,
    avatarUrl: row.avatar_url,
    identificationNumber: row.identification_number,
    phone: row.phone,
    insurances: row.insurances,
  };
}
