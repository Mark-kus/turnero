import type {
  Account,
  BookedAppointment,
  ListedProfessional,
  Patient,
  ProfessionalAvailability,
  Role,
} from "@/app/types";

export function bookedAppointmentDTO(appointment: any): BookedAppointment {
  return {
    appointmentId: appointment.appointment_id,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    professional: {
      firstName: appointment.professional_first_name,
      lastName: appointment.professional_last_name,
    },
    patient: {
      firstName: appointment.patient_first_name,
      lastName: appointment.patient_last_name,
      avatarUrl: appointment.patient_avatar_url,
    },
    additional: {
      firstName: appointment.additional_first_name,
      lastName: appointment.additional_last_name,
    },
    location: appointment.location,
    rating: appointment.rating,
  };
}

export function listedProfessionalDTO(professional: any): ListedProfessional {
  return {
    professionalId: professional.professional_id,
    avatarUrl: professional.avatar_url,
    firstName: professional.first_name,
    lastName: professional.last_name,
    birthdate: professional.birthdate,
    location: professional.location,
    daysOfWeek: professional.days_of_week,
    insurances: professional.insurances,
    specialties: professional.specialties,
  };
}

function canEditStablishment(role: Role) {
  return role === "establishment";
}

export function accountDTO(account: any): Account {
  return {
    accountId: account.account_id,
    firstName: account.first_name,
    lastName: account.last_name,
    birthdate: account.birthdate,
    email: account.email,
    avatarUrl: account.avatar_url,
    city: account.city,
    address: account.address,
    phone: account.phone,
    session: account.session,
    canEditStablishment: canEditStablishment(account.role),
  };
}

export function availabilitiesDTO(
  availabilities: any,
): ProfessionalAvailability {
  return {
    slotDuration: availabilities.slot_duration,
    startTime: availabilities.start_time,
    endTime: availabilities.end_time,
  };
}

export function patientDTO(patient: any): Patient {
  return {
    patientId: patient.account_id,
    firstName: patient.first_name,
    lastName: patient.last_name,
    birthdate: patient.birthdate,
    identificationNumber: patient.identification_number,
    email: patient.email,
    avatarUrl: patient.avatar_url,
    phone: patient.phone,
    insurances: patient.insurances,
  };
}
