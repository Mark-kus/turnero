import {randomUUID} from "crypto";

import {AppointmentStatus, DayOfWeek} from "@/shared/types";

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
