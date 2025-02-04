"use client";

import React from "react";

const DateTimePanel = ({ date, time }: { date: Date; time: string }) => {
  if (!date || !time) {
    // TODO: Check if its neccessary to handle this case
    // document.querySelector("#schedule-form")?.classList.remove("hidden");
    // document.querySelector("#confirmation-panel")?.classList.add("hidden");
  }

  const parsedDate = new Date(date);

  return (
    <div className="mt-4 flex w-full gap-4">
      <div className="w-full">
        <h2 className="mb-2">Date</h2>
        <div className="w-full bg-base-300 py-4 text-center text-sm">
          {new Date(
            parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000,
          ).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </div>
      </div>
      <div className="w-full">
        <h2 className="mb-2">Time</h2>
        <div className="w-full bg-base-300 py-4 text-center text-sm">
          {time}
        </div>
      </div>
    </div>
  );
};

export default DateTimePanel;
