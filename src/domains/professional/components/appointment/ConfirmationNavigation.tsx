"use client";

import {createAppointment} from "@/professional/actions/create-appointment.action";
import {rescheduleAppointment} from "@/professional/actions/reschedule-appointment.action";
import {CreateAppointmentDto} from "@/professional/dtos/create-appoinment.dto";
import {RescheduleAppointmentDto} from "@/professional/dtos/reschedule-appointment.dto";

const ConfirmationNavigation = ({
  appointment,
  reschedule,
}: {
  appointment?: CreateAppointmentDto;
  reschedule?: RescheduleAppointmentDto;
}) => {
  const handleBack = () => {
    document.querySelector("#schedule-form")?.classList.remove("hidden");
    document.querySelector("#confirmation-panel")?.classList.add("hidden");
  };

  const handleSubmit = () => {
    if (reschedule) {
      rescheduleAppointment(reschedule);

      return;
    }

    if (appointment) {
      createAppointment(appointment).then(() => {
        const reviewModal = document.getElementById("confirmed_modal") as HTMLDialogElement;

        if (reviewModal) reviewModal.showModal();
      });
    }
  };

  return (
    <div className="mt-24 flex w-full justify-center gap-4">
      <button
        className="btn btn-primary btn-h-10 btn-round text-primary hover:text-primary-content w-full shrink border-none bg-white"
        onClick={handleBack}
      >
        Go back
      </button>
      <button className="btn btn-primary btn-h-10 btn-round w-full shrink" onClick={handleSubmit}>
        Confirm appointment
      </button>
    </div>
  );
};

export default ConfirmationNavigation;
