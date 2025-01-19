"use client";
import React from "react";
import Link from "next/link";

const Modal = ({ open, onClose }) => {
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
              onClick={() => document.getElementById("confirmed_modal").close()}
              className="btn-round btn-h-10 btn btn-outline btn-primary w-full shrink border-none bg-white font-medium"
            >
              Pick a new appointment
            </button>
            <Link
              href={"/appointment/booked"}
              className={`btn-h-10 btn-round btn btn-primary w-full shrink font-medium`}
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
