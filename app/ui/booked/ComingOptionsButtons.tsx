"use client";

import Link from "next/link";

const ComingOptionsButtons = ({
  disableDelete,
}: {
  disableDelete: boolean;
}) => {
  const openModal = (id: string) => {
    const cancelModal = document.getElementById(id) as HTMLDialogElement;
    cancelModal.showModal();
  };

  return (
    <div className="mt-4 flex w-full gap-2">
      <button
        disabled={disableDelete}
        onClick={() => openModal("cancel_modal")}
        className="btn-base-300 btn btn-h-8 btn-round w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
      >
        Cancel
      </button>
      <Link
        href={`/appointment/1/schedule/1`}
        className="btn btn-outline btn-primary btn-h-8 btn-round w-full shrink border-none bg-white bg-opacity-40"
      >
        Reschedule
      </Link>
    </div>
  );
};

export default ComingOptionsButtons;
