"use client";

import React from "react";
import Link from "next/link";

const ConfirmedModal = () => {
  const closeModal = () => {
    const cancelModal = document.getElementById("confirmed_modal") as HTMLDialogElement;

    cancelModal.close();
  };

  return (
    <dialog className="modal" id="confirmed_modal">
      <div className="modal-box bg-neutral rounded-none">
        <h3 className="text-2xl font-medium">Your appointment is confirmed</h3>
        <p className="pt-2 text-xs">
          You&apos;ll have to wait for the dentist confirmation via email. You can also check your
          appointment status in “View appointment”.
        </p>
        <div className="flex gap-4 pt-6">
          <button
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
            onClick={closeModal}
          >
            Pick a new appointment
          </button>
          <Link
            className="btn btn-primary btn-h-10 btn-round w-full shrink font-medium"
            href="/appointment/booked"
            onClick={closeModal}
          >
            View my appointments
          </Link>
        </div>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ConfirmedModal;
