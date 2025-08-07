import React from "react";

import {DateOnly} from "@/shared/types/common";
import FamilyMemberForm from "@/patient/components/family-member/FamilyMemberForm";
import ConfirmationPanel from "@/professional/components/appointment/ConfirmationPanel";
import ScheduleForm from "@/professional/components/schedule/ScheduleForm";
import {DateUtils} from "@/shared/utils/DateUtils";

const {getDateOnlyByFullDate} = DateUtils;

const Reschedule = ({
  params,
  searchParams,
}: {
  params: {
    professionalId: string;
    appointmentId: string;
  };
  searchParams: {
    date: DateOnly;
    time: string;
    familyMemberId: string;
  };
}) => {
  const date = searchParams?.date || getDateOnlyByFullDate(new Date());
  const time = searchParams?.time || "";
  const familyMemberId = searchParams?.familyMemberId
    ? parseInt(searchParams?.familyMemberId)
    : undefined;
  const professionalId = parseInt(params.professionalId);
  const appointmentId = parseInt(params.appointmentId);

  return (
    <main className="m-10 flex justify-center">
      <div className="w-full" id="schedule-form">
        <h1 className="mb-8 text-3xl">Reschedule your appointment</h1>
        <ScheduleForm
          appointmentId={appointmentId}
          date={date}
          professionalId={professionalId}
          time={time}
        />
      </div>
      <div className="bg-base-200 hidden p-4 md:max-w-4xl" id="confirmation-panel">
        <h1 className="mt-2 mb-4 text-3xl leading-none">Estás solicitando un turno con</h1>
        <ConfirmationPanel
          appointmentId={appointmentId}
          date={date}
          familyMemberId={familyMemberId}
          professionalId={professionalId}
          time={time}
        />
      </div>
      <div className="hidden" id="family-member-form">
        <FamilyMemberForm />
      </div>
    </main>
  );
};

export default Reschedule;
