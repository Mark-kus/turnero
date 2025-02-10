"use client";

const DueOptionsButtons = ({
  appointment_id,
  disabled = false,
}: {
  appointment_id: number;
  disabled: boolean;
}) => {
  const openModal = (id: string) => {
    const reviewModal = document.getElementById(id) as HTMLDialogElement;
    const input = reviewModal.querySelector(
      "#appointment_id",
    ) as HTMLInputElement;
    
    input.value = appointment_id.toString();

    reviewModal.showModal();
  };

  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        onClick={() => openModal("review_modal")}
        disabled={disabled}
        className="btn btn-outline btn-primary btn-h-8 btn-round w-full shrink border-none bg-white bg-opacity-40"
      >
        Review
      </button>
    </div>
  );
};

export default DueOptionsButtons;
