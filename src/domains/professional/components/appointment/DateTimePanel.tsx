"use client";

import React, {useEffect} from "react";

import {DateOnly} from "@/shared/types/common";
import {DateUtils} from "@/shared/utils/DateUtils";

const {getFullDateByDateOnly} = DateUtils;

const DateTimePanel = ({date, time}: {date: DateOnly; time: string}) => {
  useEffect(() => {
    const isShowingPanel = document
      .querySelector("#confirmation-panel")
      ?.classList.contains("hidden");

    if (isShowingPanel && !time && !date) {
      document.querySelector("#schedule-form")?.classList.remove("hidden");
      document.querySelector("#confirmation-panel")?.classList.add("hidden");
    }
  }, [date, time]);

  const parsedDate = getFullDateByDateOnly(date);
  const dateText = parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mt-4 flex w-full gap-4">
      <div className="w-full">
        <h2 className="mb-2">Date</h2>
        <div className="bg-base-300 w-full py-4 text-center text-sm">{dateText}</div>
      </div>
      <div className="w-full">
        <h2 className="mb-2">Time</h2>
        <div className="bg-base-300 w-full py-4 text-center text-sm">{time}</div>
      </div>
    </div>
  );
};

export default DateTimePanel;
