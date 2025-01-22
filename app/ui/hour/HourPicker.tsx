import React from "react";
import HourList from "./HourList";

const HourPicker = () => {
  return (
    <section className="flex w-full flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-4 text-3xl leading-none">Seleccione un horario</h2>
      <HourList />
    </section>
  );
};

export default HourPicker;
