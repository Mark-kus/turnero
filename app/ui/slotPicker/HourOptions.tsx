"use client";

import React from "react";

import { AvailableSlot } from "@/app/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
              return (
                <li key={`${slot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      selectedSlot === slot && "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
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
              return (
                <li key={`${slot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      selectedSlot === slot && "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
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
