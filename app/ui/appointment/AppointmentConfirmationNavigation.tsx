"use client";

import {
  rescheduleAppointment,
  scheduleAppointment,
} from "@/app/lib/actions/appointments";
import { AppointmentData } from "@/app/types";
import React from "react";

const AppointmentConfirmationNavigation = ({
  appointmentData,
}: {
  appointmentData: AppointmentData;
}) => {
  const handleBack = () => {
    document.querySelector("#schedule-form")?.classList.remove("hidden");
    document.querySelector("#confirmation-panel")?.classList.add("hidden");
  };

  const handleSubmit = () => {
    if (appointmentData.appointment_id) {
      rescheduleAppointment(appointmentData);
    } else {
      scheduleAppointment(appointmentData).then(() => {
        const reviewModal = document.getElementById(
          "confirmed_modal",
        ) as HTMLDialogElement;
        if (reviewModal) reviewModal.showModal();
      });
    }
  };

  return (
    <div className="mt-24 flex w-full justify-center gap-4">
      <button
        onClick={handleBack}
        className="btn btn-primary btn-h-10 btn-round w-full shrink border-none bg-white text-primary hover:text-primary-content"
      >
        Go back
      </button>
      <button
        onClick={handleSubmit}
        className={"btn btn-primary btn-h-10 btn-round w-full shrink"}
      >
        Confirm appointment
      </button>
    </div>
  );
};

export default AppointmentConfirmationNavigation;
