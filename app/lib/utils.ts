import type {
  AppointmentStatus,
  DayOfWeek,
  ISODate,
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
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .slice(0, 5);
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
