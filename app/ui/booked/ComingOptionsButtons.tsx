"use client";

import { BookedAppointment } from "@/app/types";
import Link from "next/link";

const ComingOptionsButtons = ({
  appointment,
  serverAppointmentTime,
  disabled = false,
}: {
  appointment: BookedAppointment;
  serverAppointmentTime: string;
  disabled: boolean;
}) => {
  const openModal = (id: string) => {
    const cancelModal = document.getElementById(id) as HTMLDialogElement;
    const input = cancelModal.querySelector(
      "#appointment_id",
    ) as HTMLInputElement;

    input.value = appointment.appointmentId.toString();

    cancelModal.showModal();
  };

  const [date] = appointment.scheduledTime.toISOString().split("T");
  const searchParams = new URLSearchParams();
  searchParams.set("date", date);
  searchParams.set("time", serverAppointmentTime);
  const href = `/appointment/${appointment.professional.professionalId}/${appointment.appointmentId}?${searchParams.toString()}`;

  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        disabled={disabled}
        onClick={() => openModal("cancel_modal")}
        className="btn-base-300 btn btn-h-8 btn-round w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
      >
        Cancel
      </button>
      {!disabled ? (
        <Link
          href={href}
          className="btn btn-outline btn-primary btn-h-8 btn-round w-full shrink border-none bg-white bg-opacity-40"
        >
          Reschedule
        </Link>
      ) : (
        <button
          disabled={disabled}
          className="btn-base-300 btn btn-h-8 btn-round w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
        >
          Reschedule
        </button>
      )}
    </div>
  );
};

export default ComingOptionsButtons;
