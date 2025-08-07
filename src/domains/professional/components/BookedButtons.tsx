"use client";

import Link from "next/link";

import {BookedAppointmentDto} from "@/professional/dtos/booked-appointment.dto";

const openModal = (modalId: string, appointmentId: number) => {
  const reviewModal = document.getElementById(modalId) as HTMLDialogElement;
  const input = reviewModal.querySelector("#appointment_id") as HTMLInputElement;

  input.value = appointmentId.toString();

  reviewModal.showModal();
};

export const ActionButtons = ({
  appointment,
  disabled = false,
}: {
  appointment: BookedAppointmentDto;
  disabled: boolean;
}) => {
  const [date] = appointment.scheduledTime.toISOString().split("T");
  const searchParams = new URLSearchParams();

  const scheduledDate = new Date(appointment.scheduledTime);
  const [hours, minutes] = scheduledDate.toLocaleTimeString().split(":");

  searchParams.set("date", date);
  searchParams.set("time", `${hours}:${minutes}`);

  let href = `/appointment/${appointment.professional.professionalId}/${appointment.appointmentId}?${searchParams.toString()}`;

  if (appointment.familyMember.familyMemberId) {
    href = href + `&familyMemberId=${appointment.familyMember.familyMemberId}`;
  }

  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        className="btn-base-300 btn btn-h-8 btn-round border-base-300 text-opacity-60 hover:bg-base-300 w-full shrink border-2 hover:text-black"
        disabled={disabled}
        onClick={() => openModal("cancel_modal", appointment.appointmentId)}
      >
        Cancel
      </button>
      {!disabled ? (
        <Link
          className="btn btn-outline btn-primary btn-h-8 btn-round bg-opacity-40 w-full shrink border-none bg-white"
          href={href}
        >
          Reschedule
        </Link>
      ) : (
        <button
          className="btn-base-300 btn btn-h-8 btn-round border-base-300 text-opacity-60 hover:bg-base-300 w-full shrink border-2 hover:text-black"
          disabled={disabled}
        >
          Reschedule
        </button>
      )}
    </div>
  );
};

export const ReviewButton = ({
  appointmentId,
  disabled = false,
}: {
  appointmentId: number;
  disabled: boolean;
}) => {
  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        className="btn btn-outline btn-primary btn-h-8 btn-round bg-opacity-40 w-full shrink border-none bg-white"
        disabled={disabled}
        onClick={() => openModal("review_modal", appointmentId)}
      >
        Review
      </button>
    </div>
  );
};
