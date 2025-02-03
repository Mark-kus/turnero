"use client";

import React from "react";
import DatePicker from "@/app/ui/appointment/DatePicker";
import HourPicker from "@/app/ui/appointment/HourPicker";
import { useRouter } from "next/navigation";

const ScheduleForm = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-4">
        <DatePicker />
        <HourPicker />
      </div>
      <div className="mt-4 self-end">
        <button
          className="btn btn-h-10 btn-round w-80 border-none bg-primary-content bg-opacity-40 text-primary"
          onClick={() => router.back()}
        >
          Go back
        </button>
        <button className="btn btn-primary btn-h-10 btn-round ml-4 w-80 border-none font-medium">
          Continue
        </button>
      </div>
    </>
  );
};

export default ScheduleForm;
