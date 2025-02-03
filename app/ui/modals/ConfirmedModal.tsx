"use client";
import React from "react";
import Link from "next/link";

const Modal = () => {
  const closeModal = () => {
    const cancelModal = document.getElementById(
      "confirmed_modal",
    ) as HTMLDialogElement;
    cancelModal.close();
  };

  return (
    <>
      <dialog id="confirmed_modal" className="modal">
        <div className="modal-box rounded-none bg-neutral">
          <h3 className="text-2xl font-medium">
            Your appointment is confirmed
          </h3>
          <p className="pt-2 text-xs">
            You&apos;ll have to wait for the dentist confirmation via email. You
            can also check your appointment status in “View appointment”.
          </p>
          <div className="flex gap-4 pt-6">
            <button
              onClick={closeModal}
              className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
            >
              Pick a new appointment
            </button>
            <Link
              href={"/appointment/booked"}
              className={`btn btn-primary btn-h-10 btn-round w-full shrink font-medium`}
            >
              View my appointments
            </Link>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
