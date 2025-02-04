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
export type Rating = 1 | 2 | 3 | 4 | 5;

export type Time = `${number}${number}:${number}${number}:${number}${number}`; // TIME en formato HH:MM:SS
export type FormState =
  | {
      errors?: {
        first_name?: string[];
        last_name?: string[];
        email?: string[];
        password?: string[];
        password_confirmation?: string[];
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

export interface Review {
  rating: Rating;
  comment?: string;
  appointment_id: number;
}

export interface AppointmentData {
  date: Date;
  time: string;
  account_id: number;
  professional_id: number;
  adittional_id: number | null;
}

export interface CreatedSession {
  userId: number;
  avatarUrl?: string;
  role: Role;
}

export interface SessionPayload extends CreatedSession {
  expiresAt: Date;
}

export interface ProfessionalsFilters {
  insurance: string;
  specialty: string;
  name: string;
}

export interface ProfessionalAvailability {
  slotDuration: number;
  startTime: Time;
  endTime: Time;
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

export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  identificationNumber: string;
  email: string;
  avatarUrl: string;
  phone: string;
  insurances: string;
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
  rating: Rating;
}

export interface Account {
  accountId: number;
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

export type EmailTemplateProps = {
  firstName: string;
  tokenizedUrl: string;
};

interface FormElements extends HTMLFormControlsCollection {
  specialty: HTMLInputElement;
  name: HTMLInputElement;
  insurance: HTMLInputElement;
}

export interface FormElement extends HTMLFormElement {
  elements: FormElements;
}
