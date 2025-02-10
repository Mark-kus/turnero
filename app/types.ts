export type NumberedDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type NumberedAppointmentStatus = 1 | 2 | 3 | 4 | 5;
export type AppointmentStatus =
  | "Pending"
  | "Approved"
  | "Denied"
  | "Completed"
  | "Cancelled";

export type NumberedRole = 0 | 1 | 2;
export type Role = "patient" | "professional" | "establishment";
export type Rating = 1 | 2 | 3 | 4 | 5;
export type TimeSlot = `${number}${number}:${number}${number}:00`;
export type ISODate = `${number}-${number}-${number}`;

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
  scheduled_time: Date;
  account_id: number;
  professional_id: number;
  appointment_id: number | null;
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

export type AvailableSlot = `${number}${number}:${number}${number}`;
export interface ProfessionalAvailability {
  slot_duration: number;
  start_time: TimeSlot;
  end_time: TimeSlot;
}

export interface ListedProfessional {
  professionalId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  birthdate: ISODate;
  location: string;
  insurances: string;
  specialties: string;
  daysOfWeek: string;
}

export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  birthdate: ISODate | null;
  identificationNumber: string | null;
  email: string;
  avatarUrl: string | null;
  phone: string | null;
  insurances: string | null;
}

export interface BookedAppointment {
  appointmentId: number;
  scheduledTime: Date;
  status: NumberedAppointmentStatus;
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
  additional: {
    firstName: string;
    lastName: string;
  };
  location: string;
  rating: Rating | null;
}

export interface Account {
  accountId: number;
  firstName: string;
  lastName: string;
  birthdate: ISODate | null;
  email: string;
  avatarUrl: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
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
