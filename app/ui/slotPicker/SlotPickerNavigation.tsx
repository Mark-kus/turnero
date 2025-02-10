"use client";

import { ISODate } from "@/app/types";
import Link from "next/link";
import React from "react";

const SlotPickerNavigation = ({ date, time }: { date: ISODate; time: string }) => {
  const handleNext = () => {
    document.querySelector("#schedule-form")?.classList.add("hidden");
    document.querySelector("#confirmation-panel")?.classList.remove("hidden");
  };

  return (
    <div className="mt-4 flex w-full justify-end gap-4">
      <Link
        href="/appointment"
        className="btn btn-h-10 btn-round w-80 border-none bg-primary-content bg-opacity-40 text-primary"
      >
        Go back
      </Link>
      <button
        onClick={handleNext}
        disabled={!date || !time}
        className="btn btn-primary btn-h-10 btn-round w-80 border-none font-medium"
      >
        Continue
      </button>
    </div>
  );
};

export default SlotPickerNavigation;
