import {APPOINTMENT_STATUS_OPTIONS, WEEK_DAYS} from "@/shared/constants";
import {DayOfWeek, NumberedDayOfWeek} from "@/shared/types/common";
import {AppointmentStatus, NumberedAppointmentStatus} from "@/shared/types/patient";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAllWords = (str: string): string => {
  return str.split(" ").map(capitalize).join(" ");
};

export const getAppointmentStatusString = (
  status: NumberedAppointmentStatus,
): AppointmentStatus => {
  return APPOINTMENT_STATUS_OPTIONS[status - 1];
};

export const getAppointmentStatusIndex = (status: AppointmentStatus): NumberedAppointmentStatus => {
  return APPOINTMENT_STATUS_OPTIONS.indexOf(status) as NumberedAppointmentStatus;
};

export const getDayOfWeekIndex = (day: DayOfWeek): NumberedDayOfWeek => {
  return WEEK_DAYS.indexOf(day) as NumberedDayOfWeek;
};

export const getDayOfWeekName = (day: NumberedDayOfWeek) => {
  return WEEK_DAYS[day];
};

export const getDaysOfWeekString = (daysOfWeek: string): string => {
  return daysOfWeek
    .split(", ")
    .map((dayOfWeek) => {
      const parsedDayOfWeek = parseInt(dayOfWeek) as NumberedDayOfWeek;

      return getDayOfWeekName(parsedDayOfWeek);
    })
    .join(", ");
};
