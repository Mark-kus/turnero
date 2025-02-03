export type NumberedDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type NumberedAppointmentStatus = 0 | 1 | 2 | 3 | 4;
export type AppointmentStatus =
  | "Pending"
  | "Approved"
  | "Denied"
  | "Completed"
  | "Cancelled";

export type NumberedRole = 0 | 1 | 2;
export type Role = "patient" | "professional" | "establishment";

export type Time = `${number}${number}:${number}${number}:${number}${number}`; // TIME en formato HH:MM:SS
export type FormState =
  | {
      errors?: {
        first_name?: string[];
        last_name?: string[];
        email?: string[];
        password?: string[];
        submit?: string[];
        birthdate?: string[];
        avatarUrl?: string[];
        city?: string[];
        address?: string[];
        phone?: string[];
      };
      message?: string;
    }
  | undefined;

export type TemplateType = "verifyEmail" | "changePassword";

export type SessionPayload = {
  userId: string | number;
  role: Role;
  expiresAt: Date;
};

export interface ProfessionalsFilters {
  insurance: string;
  specialty: string;
  name: string;
}

export interface ListedProfessional {
  professionalId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  location: string;
  insurances: string;
  specialties: string;
  daysOfWeek: string;
}

export interface BookedAppointment {
  appointmentId: number;
  date: Date;
  time: Time;
  status: NumberedAppointmentStatus;
  professional: {
    firstName: string;
    lastName: string;
  };
  patient: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  additional: {
    firstName: string;
    lastName: string;
  };
  location: string;
}

export interface Account {
  firstName: string;
  lastName: string;
  birthdate: Date;
  email: string;
  avatarUrl: string;
  city: string;
  address: string;
  phone: string;
  session: SessionPayload;
  canEditStablishment: boolean;
}
