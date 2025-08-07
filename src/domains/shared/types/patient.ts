import {FamilyMemberDto} from "@/professional/dtos/family-member.dto";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type NumberedAppointmentStatus = 1 | 2 | 3 | 4 | 5;

export type AppointmentStatus = "Pending" | "Approved" | "Denied" | "Completed" | "Cancelled";

export type CreateFamilyMemberFormState =
  | {
      errors?: {
        name?: string[];
        surname?: string[];
        identificationNumber?: string[];
        age?: string[];
      };
      message?: string;
      success?: {data: FamilyMemberDto};
    }
  | undefined;
