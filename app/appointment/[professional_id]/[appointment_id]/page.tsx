import React from "react";
import ScheduleForm from "@/app/ui/appointment/ScheduleForm";

const Reschedule = () => {
  return (
    <main className="m-10 flex flex-col">
      <h1 className="mb-8 text-3xl">Reschedule appointment</h1>
      <ScheduleForm />
    </main>
  );
};

export default Reschedule;
