import {sql as sqlMock} from "@vercel/postgres";
import {redirect as redirectMock} from "next/navigation";
import {revalidatePath as revalidatePathMock} from "next/cache";

import {
  scheduleAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from "@/app/lib/actions/appointments";
import {AppointmentData} from "@/app/types";
import {verifySession as verifySessionMock} from "@/app/lib/session";

// Mock the dependencies
jest.mock("@vercel/postgres", () => ({
  sql: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock("@/app/lib/session", () => ({
  verifySession: jest.fn().mockResolvedValue({userId: "1", role: "patient"}),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Appointment Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("scheduleAppointment", () => {
    it("should schedule appointment without additional member", async () => {
      const appointmentData: AppointmentData = {
        scheduled_time: new Date("2025-07-25T10:00:00Z"),
        account_id: 1,
        professional_id: 2,
        appointment_id: null,
        additional_id: null,
      };

      await scheduleAppointment(appointmentData);

      // Should only include scheduled_time, account_id, professional_id
      expect(sqlMock as unknown as jest.Mock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining(
            "INSERT INTO appointments (scheduled_time, account_id, professional_id)",
          ),
        ]),
        "2025-07-25T10:00:00.000Z",
        1,
        2,
      );
      expect(revalidatePathMock as unknown as jest.Mock).toHaveBeenCalledWith("/appointment");
      expect(redirectMock as unknown as jest.Mock).toHaveBeenCalledWith("/appointment");
    });

    it("should schedule appointment with additional member", async () => {
      const appointmentData: AppointmentData = {
        scheduled_time: new Date("2025-07-25T10:00:00Z"),
        account_id: 1,
        additional_id: 3,
        professional_id: 2,
        appointment_id: null,
      };

      await scheduleAppointment(appointmentData);

      // Should include scheduled_time, account_id, additional_id, professional_id
      expect(sqlMock as unknown as jest.Mock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining(
            "INSERT INTO appointments (scheduled_time, account_id, additional_id, professional_id)",
          ),
        ]),
        "2025-07-25T10:00:00.000Z",
        1,
        3,
        2,
      );
    });

    it("should verify session before scheduling", async () => {
      const appointmentData: AppointmentData = {
        scheduled_time: new Date("2025-07-25T10:00:00Z"),
        account_id: 1,
        professional_id: 2,
        appointment_id: null,
        additional_id: null,
      };

      await scheduleAppointment(appointmentData);

      expect(verifySessionMock as unknown as jest.Mock).toHaveBeenCalled();
    });
  });

  describe("rescheduleAppointment", () => {
    it("should reschedule existing appointment", async () => {
      const appointmentData: AppointmentData = {
        appointment_id: 1,
        scheduled_time: new Date("2025-07-26T14:00:00Z"),
        account_id: 1,
        professional_id: 2,
        additional_id: null,
      };

      await rescheduleAppointment(appointmentData);

      expect(sqlMock as unknown as jest.Mock).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.stringContaining("UPDATE appointments"),
          expect.stringContaining("SET scheduled_time"),
          expect.stringContaining("WHERE appointment_id"),
        ]),
        "2025-07-26T14:00:00.000Z",
        1,
      );
      expect(revalidatePathMock as unknown as jest.Mock).toHaveBeenCalledWith(
        "/appointment/booked",
      );
      expect(redirectMock as unknown as jest.Mock).toHaveBeenCalledWith("/appointment/booked");
    });

    it("should verify session before rescheduling", async () => {
      const appointmentData: AppointmentData = {
        appointment_id: 1,
        scheduled_time: new Date("2025-07-26T14:00:00Z"),
        account_id: 1,
        professional_id: 2,
        additional_id: null,
      };

      await rescheduleAppointment(appointmentData);

      expect(verifySessionMock as unknown as jest.Mock).toHaveBeenCalled();
    });
  });

  describe("cancelAppointment", () => {
    it("should cancel appointment by ID", async () => {
      const appointmentId = 1;

      await cancelAppointment(appointmentId);

      expect(verifySessionMock as unknown as jest.Mock).toHaveBeenCalled();
      expect(sqlMock as unknown as jest.Mock).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining("UPDATE appointments")]),
        1,
      );
    });
  });
});
