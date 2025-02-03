import type {
  AppointmentStatus,
  DayOfWeek,
  NumberedAppointmentStatus,
  NumberedDayOfWeek,
} from "@/app/types";
import { APPOINTMENT_STATUS, WEEK_DAYS } from "@/app/constants";

export const getDayIndex = (day: DayOfWeek): NumberedDayOfWeek => {
  return WEEK_DAYS.indexOf(day) as NumberedDayOfWeek;
};

export const getDayName = (day: NumberedDayOfWeek): DayOfWeek => {
  return WEEK_DAYS[day];
};

export const getAppointmentStatus = (
  status: NumberedAppointmentStatus,
): AppointmentStatus => {
  return APPOINTMENT_STATUS[status];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAll = (str: string): string => {
  return str.split(" ").map(capitalize).join(" ");
};
