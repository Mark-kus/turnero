"use client";
import { leaveReview } from "@/app/lib/actions/appointments";
import { Rating } from "@/app/types";
import React, { useState } from "react";

const Review = () => {
  const [rating, setRating] = useState<Rating>(5);
  const [comment, setComment] = useState<string | undefined>();

  const closeModal = () => {
    const cancelModal = document.getElementById(
      "review_modal",
    ) as HTMLDialogElement;
    cancelModal.close();
  };

  const handleSubmit = () => {
    const appointment_id = (
      document.getElementById("appointment_id") as HTMLInputElement
    ).value;
    if (appointment_id !== undefined) {
      leaveReview({
        rating,
        comment,
        appointment_id: parseInt(appointment_id),
      });
      closeModal();
    } else {
      console.error("Appointment ID is not set");
    }
  };

  return (
    <dialog id="review_modal" className="modal">
      <div className="modal-box rounded-none bg-neutral">
        <h3 className="text-2xl font-medium">Leave your review</h3>
        <p className="py-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="rating rating-sm my-2 w-full gap-1 rounded-md border-2 border-primary bg-white p-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-primary"
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
        ></textarea>
        <input id="appointment_id" type="hidden" />
        <div className="flex gap-4 pt-6">
          <button
            onClick={closeModal}
            className="btn btn-outline btn-primary btn-h-10 btn-round w-full shrink border-none bg-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`btn btn-primary btn-h-10 btn-round w-full shrink font-medium`}
          >
            Confirm review
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Review;
