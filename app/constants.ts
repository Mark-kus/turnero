import { AppointmentStatus, DayOfWeek } from "@/app/types";

export const AVATARS_FOLDER = "avatars";

export const WEEK_DAYS: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const APPOINTMENT_STATUS: AppointmentStatus[] = [
  "Pending",
  "Approved",
  "Denied",
  "Completed",
  "Cancelled",
];

export const slotDurations = [15, 30, 60]; // In minutes
export const recurrencePeriods = [1, 3, 6]; // In months
