import {randomUUID} from "crypto";

import {DayOfWeek} from "@/shared/types/common";
import {AppointmentStatus} from "@/shared/types/patient";

export const AVATARS_FOLDER_NAME = "avatars";

export const WEEK_DAYS: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const APPOINTMENT_STATUS_OPTIONS: AppointmentStatus[] = [
  "Pending",
  "Approved",
  "Denied",
  "Completed",
  "Cancelled",
];

export const SLOT_DURATIONS = [15, 30, 60]; // In minutes

export const RECURRENCE_PERIODS = [1, 3, 6]; // In months

export const TOKEN = {
  getToken: () => randomUUID(),
  getExpiryFromNow: () => new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
};

export const SEARCH_PARAMS = {
  TOKEN: "token",
  EMAIL: "email",
};

export const COOKIES = {
  ACCOUNT_EMAIL: "accountEmail",
};
