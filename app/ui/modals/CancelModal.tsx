"use client";
import React from "react";

const CancelModal = () => {
  const closeModal = () => {
    const cancelModal = document.getElementById(
      "cancel_modal",
    ) as HTMLDialogElement;
    cancelModal.close();
  };

  return (
    <dialog id="cancel_modal" className="modal">
      <div className="modal-box rounded-none bg-neutral">
        <h3 className="text-2xl font-medium">
          Are you sure you want to cancel the appointment?
        </h3>
        <p className="pt-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex gap-4 pt-6">
          <button
            onClick={closeModal}
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
          >
            Go back
          </button>
          <button
            onClick={closeModal}
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
