"use client"
import React from "react";

const Delete = () => {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box rounded-none bg-neutral">
        <h3 className="text-2xl font-medium">
          Are you sure you want to delete the appointment?
        </h3>
        <p className="pt-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => document.getElementById("delete_modal").close()}
            className="btn-round btn-h-10 btn btn-outline btn-primary w-full shrink border-none bg-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => document.getElementById("delete_modal").close()}
            className={`btn-h-10 btn-round btn btn-primary w-full shrink font-medium`}
          >
            Delete appointment
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Delete;
