"use client";

const DueOptionsButtons = () => {
  const openModal = (id: string) => {
    const cancelModal = document.getElementById(id) as HTMLDialogElement;
    cancelModal.showModal();
  };

  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        onClick={() => openModal("review_modal")}
        className="btn btn-outline btn-primary btn-h-8 btn-round w-full shrink border-none bg-white bg-opacity-40"
      >
        Review
      </button>
    </div>
  );
};

export default DueOptionsButtons;
