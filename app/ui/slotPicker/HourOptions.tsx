"use client";

import React from "react";

import { ProfessionalAvailability } from "@/app/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const calculateSlots = (availability: ProfessionalAvailability) => {
  const slots = [];
  const convertTimeToNumber = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const startTime = convertTimeToNumber(availability.startTime);
  const endTime = convertTimeToNumber(availability.endTime);
  const slotCount = Math.floor(
    (endTime - startTime) / (availability.slotDuration * 60),
  );
  for (let i = 0; i < slotCount; i++) {
    const currentTime = startTime + i * (availability.slotDuration * 60);
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    slots.push(formattedTime);
  }
  return slots;
};

const HourOptions = ({
  morningAvailabilities,
  afternoonAvailabilities,
}: {
  morningAvailabilities: ProfessionalAvailability[];
  afternoonAvailabilities: ProfessionalAvailability[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSlotClick = (slot: string) => {
    const newQueryParams = new URLSearchParams(searchParams.toString());
    newQueryParams.set("time", slot);

    replace(`${pathname}?${newQueryParams.toString()}`, { scroll: false });
  };

  return (
    <>
      {!!morningAvailabilities.length && (
        <div className="w-full">
          <h4 className="mb-2 mt-2">Morning</h4>
          <ul className="columns-3 space-y-4">
            {morningAvailabilities.map((availability) => {
              const slots = calculateSlots(availability);
              return slots.map((slot) => (
                <li key={`${availability.startTime}-${slot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      searchParams.get("time") === slot &&
                      "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
                  </button>
                </li>
              ));
            })}
          </ul>
        </div>
      )}
      {!!afternoonAvailabilities.length && (
        <div className="w-full">
          <h4 className="mb-2 mt-6">Afternoon</h4>
          <ul className="columns-3 space-y-4">
            {afternoonAvailabilities.map((availability) => {
              const slots = calculateSlots(availability);
              return slots.map((slot) => (
                <li key={`${availability.startTime}-${slot}`}>
                  <button
                    className={`btn btn-outline btn-primary btn-round h-20 w-full border-none font-medium ${
                      searchParams.get("time") === slot &&
                      "bg-primary !text-white"
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
                  </button>
                </li>
              ));
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default HourOptions;
