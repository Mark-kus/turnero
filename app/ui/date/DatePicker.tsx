import React from "react";
import DateList from "./DateList";
import Image from "next/image";

import leftThinArrow from "@public/arrow/thin/left.svg";
import rightThinArrow from "@public/arrow/thin/right.svg";

const DatePicker = () => {
  return (
    <section className="flex w-2/3 max-w-md flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-6 text-3xl leading-none">Seleccione una fecha</h2>
      <div role="tablist" className="tabs w-full justify-between">
        <button role="tab" className="tab p-0 text-primary">
          <span className="mr-1">
            <Image
              src={leftThinArrow}
              alt="Left thin arrow"
              width={6}
              height={6}
            />
          </span>
          Diciembre
        </button>
        <button
          role="tab"
          className="tab tab-active p-0 text-lg font-bold text-primary"
        >
          Enero
        </button>
        <button role="tab" className="tab items-center p-0 text-primary">
          Febrero
          <span className="ml-1">
            <Image
              src={rightThinArrow}
              alt="Right thin arrow"
              width={6}
              height={6}
            />
          </span>
        </button>
      </div>
      <DateList />
    </section>
  );
};

export default DatePicker;
