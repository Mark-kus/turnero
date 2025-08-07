import {DateOnly} from "@/shared/types/common";

export class DateUtils {
  static getAge(birthdate: Date | string) {
    return new Date().getUTCFullYear() - new Date(birthdate).getUTCFullYear();
  }

  static getDateOnlyByFullDate(date: Date): DateOnly {
    return date.toISOString().split("T")[0] as DateOnly;
  }

  static getFullDateByDateOnly(isoDate: DateOnly): Date {
    const [year, month, day] = isoDate.split("-").map(Number);

    return new Date(year, month - 1, day);
  }
}
