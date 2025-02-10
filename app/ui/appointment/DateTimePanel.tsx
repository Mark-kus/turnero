"use client";

import { getDateByISODate } from "@/app/lib/utils";
import { ISODate } from "@/app/types";
import React, { useEffect } from "react";

const DateTimePanel = ({ date, time }: { date: ISODate; time: string }) => {
  useEffect(() => {
    const isShowingPanel = document
      .querySelector("#confirmation-panel")
      ?.classList.contains("hidden");

    if (isShowingPanel && !time && !date) {
      document.querySelector("#schedule-form")?.classList.remove("hidden");
      document.querySelector("#confirmation-panel")?.classList.add("hidden");
    }
  }, [date, time]);

  const parsedDate = getDateByISODate(date);
  const dateText = parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mt-4 flex w-full gap-4">
      <div className="w-full">
        <h2 className="mb-2">Date</h2>
        <div className="w-full bg-base-300 py-4 text-center text-sm">
          {dateText}
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
