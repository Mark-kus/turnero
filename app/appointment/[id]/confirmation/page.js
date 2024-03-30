import React from "react";
import ConfirmationPanel from "@/app/ui/ConfirmationPanel";

const Confirmation = () => {
  return (
    <section className="mx-auto my-10 flex w-1/2 flex-col items-start rounded-md bg-neutral p-8">
      <h1 className="mb-4 mt-2 text-3xl leading-none">
        Estás solicitando un turno con
      </h1>
      <ConfirmationPanel />
    </section>
  );
};

export default Confirmation;
