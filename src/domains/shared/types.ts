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

export type AppointmentStatus = "Pending" | "Approved" | "Denied" | "Completed" | "Cancelled";

export type NumberedRole = 0 | 1 | 2;

export type Role = "patient" | "professional" | "provider";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type TimeSlot = `${number}${number}:${number}${number}:00`;

export type ISODate = `${number}-${number}-${number}`;

export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        surname?: string[];
        name?: string[];
        email?: string[];
        password?: string[];
        passwordConfirmation?: string[];
        submit?: string[];
        birthdate?: string[];
        avatar?: string[];
        city?: string[];
        address?: string[];
        phone?: string[];
        identificationNumber?: string[];
        age?: string[];
        token?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;

export type TemplateType = "verifyEmail" | "changePassword";

export interface Review {
  rating: Rating;
  comment?: string;
  appointmentId: number;
}

export interface AppointmentData {
  scheduledTime: Date;
  accountId: number;
  professionalId: number;
  appointmentId: number | null;
  familyMemberId: number | null;
}

export interface SessionData {
  accountId: string;
  avatarUrl: string | null;
  role: Role;
}

export interface SessionPayload extends SessionData {
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
  familyMember: {
    name: string;
    surname: string;
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

export interface FamilyMember {
  familyMemberId: number;
  name: string;
  surname: string;
  age: number;
  identificationNumber: string;
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
