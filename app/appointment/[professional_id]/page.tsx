import React from "react";
import ScheduleForm from "@/app/ui/appointment/ScheduleForm";
import ConfirmationPanel from "@/app/ui/appointment/ConfirmationPanel";
import { getISODate } from "@/app/lib/utils";
import { ISODate } from "@/app/types";
import AdditionalForm from "@/app/ui/additional/AdditionalForm";

const AppointmentDatetime = ({
  params,
  searchParams,
}: {
  params: {
    professional_id: string;
  };
  searchParams: {
    date: ISODate;
    time: string;
    additional_id: string;
  };
}) => {
  // TODO: Prohibit past dates
  const date = searchParams?.date || getISODate(new Date());
  const time = searchParams?.time || "";
  const additional_id = searchParams?.additional_id ? parseInt(searchParams?.additional_id) : undefined;
  const professional_id = parseInt(params.professional_id);

  return (
    <main className="m-10 flex justify-center">
      <div id="schedule-form" className="w-full">
        <h1 className="mb-8 text-3xl">Pick your appointment</h1>
        <ScheduleForm
          professional_id={professional_id}
          date={date}
          time={time}
        />
      </div>
      <div
        className="hidden bg-base-200 p-4 md:max-w-4xl"
        id="confirmation-panel"
      >
        <h1 className="mb-4 mt-2 text-3xl leading-none">
          Estás solicitando un turno con
        </h1>
        <ConfirmationPanel
          professional_id={professional_id}
          additional_id={additional_id}
          date={date}
          time={time}
        />
      </div>
      <div id="additional-form" className="hidden">
        <AdditionalForm />
      </div>
    </main>
  );
};

export default AppointmentDatetime;
