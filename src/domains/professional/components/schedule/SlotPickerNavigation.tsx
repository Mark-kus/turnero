"use client";

import Link from "next/link";
import React from "react";

import {DateOnly} from "@/shared/types/common";

const SlotPickerNavigation = ({date, time}: {date: DateOnly; time: string}) => {
  const handleNext = () => {
    document.querySelector("#schedule-form")?.classList.add("hidden");
    document.querySelector("#confirmation-panel")?.classList.remove("hidden");
  };

  return (
    <div className="mt-4 flex w-full justify-end gap-4">
      <Link
        className="btn btn-h-10 btn-round bg-primary-content bg-opacity-40 text-primary w-80 border-none"
        href="/appointment"
      >
        Go back
      </Link>
      <button
        className="btn btn-primary btn-h-10 btn-round w-80 border-none font-medium"
        disabled={!date || !time}
        onClick={handleNext}
      >
        Continue
      </button>
    </div>
  );
};

export default SlotPickerNavigation;
