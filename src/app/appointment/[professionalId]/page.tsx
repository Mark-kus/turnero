import React from "react";

import ScheduleForm from "@/professional/components/schedule/ScheduleForm";
import ConfirmationPanel from "@/professional/components/appointment/ConfirmationPanel";
import {DateUtils} from "@/shared/utils/DateUtils";
import {DateOnly} from "@/shared/types/common";
import FamilyMemberForm from "@/patient/components/family-member/FamilyMemberForm";

const {getDateOnlyByFullDate} = DateUtils;

const AppointmentDatetime = ({
  params,
  searchParams,
}: {
  params: {
    professionalId: string;
  };
  searchParams: {
    date: DateOnly;
    time: string;
    familyMember: string;
  };
}) => {
  const date = searchParams?.date || getDateOnlyByFullDate(new Date());
  const time = searchParams?.time || "";
  const familyMemberId = searchParams?.familyMember
    ? parseInt(searchParams?.familyMember)
    : undefined;

  const professionalId = parseInt(params.professionalId);

  return (
    <main className="m-10 flex justify-center">
      <section className="w-full" id="schedule-form">
        <h1 className="mb-8 text-3xl">Pick your appointment</h1>
        <ScheduleForm date={date} professionalId={professionalId} time={time} />
      </section>
      <section className="bg-base-200 hidden p-4 md:max-w-4xl" id="confirmation-panel">
        <h1 className="mt-2 mb-4 text-3xl leading-none">Estás solicitando un turno con</h1>
        <ConfirmationPanel
          date={date}
          familyMemberId={familyMemberId}
          professionalId={professionalId}
          time={time}
        />
      </section>
      <section className="hidden" id="family-member-form">
        <FamilyMemberForm />
      </section>
    </main>
  );
};

export default AppointmentDatetime;
