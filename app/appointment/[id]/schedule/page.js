import React from "react";
import ScheduleForm from "@/app/ui/forms/Schedule";

const AppointmentDatetime = () => {
  return (
    <main className="m-10 flex flex-col">
      <h1 className="mb-8 text-3xl">Pick your appointment</h1>
      <ScheduleForm />
    </main>
  );
};

export default AppointmentDatetime;
