import React from "react";
import DateList from "./DateList";

const DatePicker = () => {
  return (
    <section className="flex w-2/3 max-w-md flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-4 text-3xl leading-none">Seleccione una fecha</h2>
      <DateList />
    </section>
  );
};

export default DatePicker;
