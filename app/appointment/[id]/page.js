import DatePicker from "@/app/ui/date/DatePicker";
import HourPicker from "@/app/ui/hour/HourPicker";
import React from "react";
import Link from "next/link";

const AppointmentDatetime = () => {
  return (
    <main className="m-10 flex flex-col">
      <h1 className="mb-8 text-3xl">Pick your appointment</h1>
      <div className="flex gap-4">
        <DatePicker />
        <HourPicker />
      </div>
      <div className="mt-4 self-end">
        <Link
          className="btn-h-10 btn-round btn w-80 border-none bg-primary-content bg-opacity-40 text-primary"
          href="/appointment"
        >
          Go back
        </Link>
        <button className="btn-h-10 btn-round btn btn-primary ml-4 w-80 border-none font-medium">
          Continue
        </button>
      </div>
    </main>
  );
};

export default AppointmentDatetime;
