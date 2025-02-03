import React from "react";
import ScheduleForm from "@/app/ui/appointment/ScheduleForm";
import ConfirmationPanel from "@/app/ui/appointment/ConfirmationPanel";

const AppointmentDatetime = () => {
  return (
    <main className="m-10 flex flex-col">
      <div>
        <h1 className="mb-8 text-3xl">Pick your appointment</h1>
        <ScheduleForm />
      </div>
      <div>
        <h1 className="mb-4 mt-2 text-3xl leading-none">
          Estás solicitando un turno con
        </h1>
        <ConfirmationPanel />
      </div>
    </main>
  );
};

export default AppointmentDatetime;
