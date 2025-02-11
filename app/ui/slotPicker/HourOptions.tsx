"use client";

import React from "react";

import { AvailableSlot } from "@/app/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getLocalTimeByUTCTime } from "@/app/lib/utils";

const HourOptions = ({
  morningSlots,
  afternoonSlots,
}: {
  morningSlots: AvailableSlot[];
  afternoonSlots: AvailableSlot[];
}) => {
  const searchParams = useSearchParams();
  const selectedSlot = searchParams.get("time");

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSlotClick = (slot: string) => {
    const newQueryParams = new URLSearchParams(searchParams.toString());
    newQueryParams.set("time", slot);

    replace(`${pathname}?${newQueryParams.toString()}`, { scroll: false });
  };

  return (
    <>
      {!!morningSlots.length && (
        <div className="w-full">
          <h4 className="mb-2 mt-2">Morning</h4>
          <ul className="columns-3 space-y-4">
            {morningSlots.map((slot) => {
              const localSlot = getLocalTimeByUTCTime(slot);
              return (
                <li key={`${localSlot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      selectedSlot === localSlot && "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(localSlot)}
                  >
                    {localSlot}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!!afternoonSlots.length && (
        <div className="w-full">
          <h4 className="mb-2 mt-6">Afternoon</h4>
          <ul className="columns-3 space-y-4">
            {afternoonSlots.map((slot) => {
              const localSlot = getLocalTimeByUTCTime(slot);
              return (
                <li key={`${localSlot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      selectedSlot === localSlot && "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(localSlot)}
                  >
                    {localSlot}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default HourOptions;
