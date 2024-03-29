import React from "react";

const Review = () => {
  return (
    <dialog id="review_modal" className="modal">
      <div className="modal-box rounded-none bg-neutral">
        <h3 className="text-2xl font-medium">Leave your review</h3>
        <p className="py-2 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="rating rating-sm my-2 w-full gap-1 rounded-md border-2 border-primary bg-white p-2">
          <input
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star-2 bg-primary"
          />
        </div>
        <textarea
          className="textarea textarea-primary w-full border-2 text-sm"
          placeholder="Observations..."
          rows={5}
        ></textarea>
        <div className="flex gap-4 pt-6">
          <button
            onClick={() => document.getElementById("review_modal").close()}
            className="btn-round btn-h-10 btn btn-outline btn-primary w-full shrink border-none bg-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => document.getElementById("review_modal").close()}
            className={`btn-h-10 btn-round btn btn-primary w-full shrink font-medium`}
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
