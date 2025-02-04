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
  return APPOINTMENT_STATUS[status - 1];
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAll = (str: string): string => {
  return str.split(" ").map(capitalize).join(" ");
};

export const getAge = (birthdate: Date): string => {
  return `${new Date().getFullYear() - new Date(birthdate).getFullYear()} años`;
};

export const getDaysOfWeek = (daysOfWeek: string): string => {
  return daysOfWeek
    .split(", ")
    .map((dayOfWeek) => {
      const parsedDayOfWeek = parseInt(dayOfWeek) as NumberedDayOfWeek;
      return getDayName(parsedDayOfWeek);
    })
    .join(", ");
};
