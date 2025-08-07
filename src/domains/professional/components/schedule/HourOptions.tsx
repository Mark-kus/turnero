"use client";

import React from "react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

import {DateLocalUtils} from "@/shared/utils/DateLocalUtils";

const {getLocalTimeByUtcTime} = DateLocalUtils;

const HourOptions = ({slots}: {slots: string[]}) => {
  const searchParams = useSearchParams();
  const selectedSlot = searchParams.get("time");

  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSlotClick = (slot: string) => {
    const newQueryParams = new URLSearchParams(searchParams.toString());

    newQueryParams.set("time", slot);

    replace(`${pathname}?${newQueryParams.toString()}`, {scroll: false});
  };

  return (
    <ul className="columns-3 space-y-4">
      {slots.map((slot) => {
        const localSlot = getLocalTimeByUtcTime(slot);

        return (
          <li key={`${localSlot}`}>
            <button
              className={`btn btn-outline btn-primary btn-round focus:bg-primary h-20 w-full border-none font-medium focus:text-white ${
                selectedSlot === localSlot && "bg-primary text-white!"
              }`}
              onClick={() => handleSlotClick(localSlot)}
            >
              {localSlot}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default HourOptions;
