"use client";
import React, {useState, useRef} from "react";

import {leaveReview} from "@/professional/actions/appointments";
import {Rating} from "@/shared/types";

const ReviewModal = () => {
  const [rating, setRating] = useState<Rating>(5);
  const [comment, setComment] = useState<string | undefined>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const appointmentIdRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleSubmit = () => {
    if (appointmentIdRef.current) {
      const appointmentId = appointmentIdRef.current.value;

      if (appointmentId !== undefined) {
        leaveReview({
          rating,
          comment,
          appointmentId: parseInt(appointmentId),
        });
        closeModal();
      } else {
        console.error("Appointment ID is not set");
      }
    }
  };

  return (
    <dialog ref={modalRef} className="modal" id="review_modal">
      <div className="modal-box bg-neutral rounded-none">
        <h3 className="text-2xl font-medium">Leave your review</h3>
        <p className="py-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <div className="rating rating-sm border-primary my-2 w-full gap-1 rounded-md border-2 bg-white p-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              className="mask mask-star-2 bg-primary"
              name="rating"
              type="radio"
              onChange={() => setRating(value as Rating)}
            />
          ))}
        </div>
        <textarea
          className="textarea textarea-primary w-full border-2 text-sm"
          placeholder="Observations..."
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input ref={appointmentIdRef} id="appointment_id" type="hidden" />
        <div className="flex gap-4 pt-6">
          <button
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-h-10 btn-round w-full shrink font-medium"
            onClick={handleSubmit}
          >
            Confirm review
          </button>
        </div>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ReviewModal;
