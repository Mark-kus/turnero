"use client";
import { cancelAppointment } from "@/app/lib/actions/appointments";
import React, { useRef } from "react";

const CancelModal = () => {
  const cancelModalRef = useRef<HTMLDialogElement>(null);
  const appointmentIdRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    if (cancelModalRef.current) {
      cancelModalRef.current.close();
    }
  };

  const handleCancel = () => {
    if (appointmentIdRef.current) {
      const appointment_id = appointmentIdRef.current.value;
      if (appointment_id !== undefined) {
        cancelAppointment(parseInt(appointment_id));
        closeModal();
      } else {
        console.error("Appointment ID is not set");
      }
    }
  };

  return (
    <dialog id="cancel_modal" className="modal" ref={cancelModalRef}>
      <div className="modal-box rounded-none bg-neutral">
        <h3 className="text-2xl font-medium">
          Are you sure you want to cancel the appointment?
        </h3>
        <p className="pt-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <input id="appointment_id" type="hidden" ref={appointmentIdRef} />
        <div className="flex gap-4 pt-6">
          <button
            onClick={closeModal}
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
          >
            Go back
          </button>
          <button
            onClick={handleCancel}
            className={`btn btn-primary btn-h-10 btn-round w-full shrink font-medium`}
          >
            Cancel appointment
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CancelModal;
