"use client";
import React, {useRef} from "react";

import {cancelAppointment} from "@/professional/actions/appointments";

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
      const appointmentId = appointmentIdRef.current.value;

      if (appointmentId !== undefined) {
        cancelAppointment(parseInt(appointmentId));
        closeModal();
      } else {
        console.error("Appointment ID is not set");
      }
    }
  };

  return (
    <dialog ref={cancelModalRef} className="modal" id="cancel_modal">
      <div className="modal-box bg-neutral rounded-none">
        <h3 className="text-2xl font-medium">Are you sure you want to cancel the appointment?</h3>
        <p className="pt-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <input ref={appointmentIdRef} id="appointment_id" type="hidden" />
        <div className="flex gap-4 pt-6">
          <button
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
            onClick={closeModal}
          >
            Go back
          </button>
          <button
            className="btn btn-primary btn-h-10 btn-round w-full shrink font-medium"
            onClick={handleCancel}
          >
            Cancel appointment
          </button>
        </div>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CancelModal;
