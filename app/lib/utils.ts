import type {
  AppointmentStatus,
  DayOfWeek,
  ISODate,
  NumberedAppointmentStatus,
  NumberedDayOfWeek,
  TimeSlot,
} from "@/app/types";

import {APPOINTMENT_STATUS, WEEK_DAYS} from "@/app/constants";

export const getDayIndex = (day: DayOfWeek): NumberedDayOfWeek => {
  return WEEK_DAYS.indexOf(day) as NumberedDayOfWeek;
};

export const getDayName = (day: NumberedDayOfWeek): DayOfWeek => {
  return WEEK_DAYS[day];
};

export const getAppointmentStatus = (status: NumberedAppointmentStatus): AppointmentStatus => {
  return APPOINTMENT_STATUS[status - 1];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAll = (str: string): string => {
  return str.split(" ").map(capitalize).join(" ");
};

export const getAge = (birthdate: ISODate): string => {
  return `${new Date().getUTCFullYear() - new Date(birthdate).getUTCFullYear()} años`;
};

export const getISODate = (date: Date): ISODate => {
  return date.toISOString().split("T")[0] as ISODate;
};

export const getDateByISODate = (isoDate: ISODate): Date => {
  const [year, month, day] = isoDate.split("-").map(Number);

  return new Date(year, month - 1, day);
};

export const getLocalTimeByUTCTime = (utcTime: string): string => {
  return new Date(`${new Date().toISOString().split("T")[0]}T${utcTime}Z`)
    .toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
    .slice(0, 5);
};

// ============ TIMEZONE UTILITIES FOR APPOINTMENTS ============

/**
 * Converts a local datetime to UTC for database storage
 * Use this when saving appointment times to the database
 */
// export const localDateTimeToUTC = (localDateTime: string, timezone?: string): string => {
//   const date = new Date(localDateTime);

//   return date.toISOString();
// };

/**
 * Converts UTC datetime from database to local timezone for display
 * ⚠️  USE ON CLIENT SIDE ONLY - Browser automatically uses user's timezone
 * Use this when displaying appointment times to users in components
 */
// export const utcToLocalDateTime = (utcDateTime: string): Date => {
//   return new Date(utcDateTime);
// };

/**
 * Format appointment time for display in user's local timezone
 * This will automatically show the correct time based on user's browser timezone
 */
// export const formatAppointmentTime = (
//   utcDateTime: string,
//   options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   },
// ): string => {
//   return new Date(utcDateTime).toLocaleString(undefined, options);
// };

/**
 * Create a datetime string for appointment scheduling
 * Combines date and time, converts to UTC for database storage
 */
// export const createAppointmentDateTime = (date: ISODate, time: TimeSlot): string => {
//   const dateTimeString = `${date}T${time}`;
//   const localDate = new Date(dateTimeString);

//   return localDate.toISOString();
// };

/**
 * Extract time from UTC datetime for display
 * Returns time in user's local timezone
 */
// export const getLocalTimeFromUTC = (utcDateTime: string): string => {
//   return new Date(utcDateTime).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
// };

/**
 * Extract date from UTC datetime for display
 * Returns date in user's local timezone
 */
// export const getLocalDateFromUTC = (utcDateTime: string): string => {
//   return new Date(utcDateTime).toLocaleDateString();
// };

export const getDaysOfWeek = (daysOfWeek: string): string => {
  return daysOfWeek
    .split(", ")
    .map((dayOfWeek) => {
      const parsedDayOfWeek = parseInt(dayOfWeek) as NumberedDayOfWeek;

      return getDayName(parsedDayOfWeek);
    })
    .join(", ");
};
