import {
  getDayIndex,
  getDayName,
  getAppointmentStatus,
  capitalize,
  capitalizeAll,
  getAge,
  getISODate,
  getDateByISODate,
  getLocalTimeByUTCTime,
  // localDateTimeToUTC,
  // utcToLocalDateTime,
  // formatAppointmentTime,
  // createAppointmentDateTime,
  // getLocalTimeFromUTC,
  // getLocalDateFromUTC,
  getDaysOfWeek,
} from "@/app/lib/utils";
import {
  // DayOfWeek,
  // NumberedDayOfWeek,
  // NumberedAppointmentStatus,
  ISODate,
  // TimeSlot,
} from "@/app/types";

describe("utils.ts", () => {
  describe("getDayIndex", () => {
    it("should return the correct index for each day", () => {
      expect(getDayIndex("Sunday")).toBe(0);
      expect(getDayIndex("Monday")).toBe(1);
      expect(getDayIndex("Tuesday")).toBe(2);
      expect(getDayIndex("Wednesday")).toBe(3);
      expect(getDayIndex("Thursday")).toBe(4);
      expect(getDayIndex("Friday")).toBe(5);
      expect(getDayIndex("Saturday")).toBe(6);
    });
  });

  describe("getDayName", () => {
    it("should return the correct day name for each index", () => {
      expect(getDayName(0)).toBe("Sunday");
      expect(getDayName(1)).toBe("Monday");
      expect(getDayName(2)).toBe("Tuesday");
      expect(getDayName(3)).toBe("Wednesday");
      expect(getDayName(4)).toBe("Thursday");
      expect(getDayName(5)).toBe("Friday");
      expect(getDayName(6)).toBe("Saturday");
    });
  });

  describe("getAppointmentStatus", () => {
    it("should return the correct status for each number", () => {
      expect(getAppointmentStatus(1)).toBe("Pending");
      expect(getAppointmentStatus(2)).toBe("Approved");
      expect(getAppointmentStatus(3)).toBe("Denied");
      expect(getAppointmentStatus(4)).toBe("Completed");
      expect(getAppointmentStatus(5)).toBe("Cancelled");
    });
  });

  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("HELLO")).toBe("HELLO");
      expect(capitalize("h")).toBe("H");
      expect(capitalize("")).toBe("");
    });

    it("should handle strings with numbers and special characters", () => {
      expect(capitalize("123abc")).toBe("123abc");
      expect(capitalize("!hello")).toBe("!hello");
    });
  });

  describe("capitalizeAll", () => {
    it("should capitalize all words in a string", () => {
      expect(capitalizeAll("hello world")).toBe("Hello World");
      expect(capitalizeAll("hello world test")).toBe("Hello World Test");
      expect(capitalizeAll("HELLO WORLD")).toBe("HELLO WORLD");
      expect(capitalizeAll("")).toBe("");
      expect(capitalizeAll("single")).toBe("Single");
    });

    it("should handle strings with multiple spaces", () => {
      expect(capitalizeAll("hello  world")).toBe("Hello  World");
    });
  });

  describe("getAge", () => {
    beforeEach(() => {
      // Mock current date to be 2025-07-23
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2025-07-23"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should calculate age correctly", () => {
      expect(getAge("1990-01-01" as ISODate)).toBe("35 años");
      expect(getAge("2000-12-31" as ISODate)).toBe("25 años");
      expect(getAge("2025-01-01" as ISODate)).toBe("0 años");
    });
  });

  describe("getISODate", () => {
    it("should convert Date to ISO date string", () => {
      const date = new Date("2025-07-23T10:30:00Z");

      expect(getISODate(date)).toBe("2025-07-23");
    });

    it("should handle different timezones consistently", () => {
      const date = new Date("2025-12-31T23:59:59Z");

      expect(getISODate(date)).toBe("2025-12-31");
    });
  });

  describe("getDateByISODate", () => {
    it("should convert ISO date string to Date object", () => {
      const result = getDateByISODate("2025-07-23" as ISODate);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(6); // July is month 6 (0-indexed)
      expect(result.getDate()).toBe(23);
    });

    it("should handle different dates correctly", () => {
      const result = getDateByISODate("2000-12-31" as ISODate);

      expect(result.getFullYear()).toBe(2000);
      expect(result.getMonth()).toBe(11); // December is month 11
      expect(result.getDate()).toBe(31);
    });
  });

  describe("getLocalTimeByUTCTime", () => {
    it("should convert UTC time to local time format", () => {
      const result = getLocalTimeByUTCTime("14:30:00");

      expect(result).toMatch(/^\d{2}:\d{2}$/); // Should match HH:MM format
    });
  });

  // describe('timezone utilities', () => {
  //   describe('localDateTimeToUTC', () => {
  //     it('should convert local datetime to UTC ISO string', () => {
  //       const localDateTime = '2025-07-23T14:30:00'
  //       const result = localDateTimeToUTC(localDateTime)
  //       expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  //     })
  //   })

  //   describe('utcToLocalDateTime', () => {
  //     it('should convert UTC datetime to local Date object', () => {
  //       const utcDateTime = '2025-07-23T14:30:00.000Z'
  //       const result = utcToLocalDateTime(utcDateTime)
  //       expect(result).toBeInstanceOf(Date)
  //       expect(result.toISOString()).toBe(utcDateTime)
  //     })
  //   })

  //   describe('formatAppointmentTime', () => {
  //     it('should format UTC datetime for display', () => {
  //       const utcDateTime = '2025-07-23T14:30:00.000Z'
  //       const result = formatAppointmentTime(utcDateTime)
  //       expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
  //     })

  //     it('should accept custom formatting options', () => {
  //       const utcDateTime = '2025-07-23T14:30:00.000Z'
  //       const options = { hour: '2-digit', minute: '2-digit', hour12: true } as const
  //       const result = formatAppointmentTime(utcDateTime, options)
  //       expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/)
  //     })
  //   })

  //   describe('createAppointmentDateTime', () => {
  //     it('should create UTC datetime from date and time', () => {
  //       const date = '2025-07-23' as ISODate
  //       const time = '14:30:00' as TimeSlot
  //       const result = createAppointmentDateTime(date, time)
  //       expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  //     })
  //   })

  //   describe('getLocalTimeFromUTC', () => {
  //     it('should extract local time from UTC datetime', () => {
  //       const utcDateTime = '2025-07-23T14:30:00.000Z'
  //       const result = getLocalTimeFromUTC(utcDateTime)
  //       expect(result).toMatch(/^\d{2}:\d{2}$/)
  //     })
  //   })

  //   describe('getLocalDateFromUTC', () => {
  //     it('should extract local date from UTC datetime', () => {
  //       const utcDateTime = '2025-07-23T14:30:00.000Z'
  //       const result = getLocalDateFromUTC(utcDateTime)
  //       expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
  //     })
  //   })
  // })

  describe("getDaysOfWeek", () => {
    it("should convert numbered days to day names", () => {
      expect(getDaysOfWeek("0, 1, 2")).toBe("Sunday, Monday, Tuesday");
      expect(getDaysOfWeek("5, 6")).toBe("Friday, Saturday");
      expect(getDaysOfWeek("3")).toBe("Wednesday");
    });

    it("should handle all days of the week", () => {
      expect(getDaysOfWeek("0, 1, 2, 3, 4, 5, 6")).toBe(
        "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
      );
    });
  });
});
