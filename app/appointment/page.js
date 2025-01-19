import React, { Suspense } from "react";
import AppointmentForm from "../ui/forms/Appointment";
import SpecialistList from "../ui/SpecialistList";
import Modal from "../ui/modals/Confirmed";
import { fetchInsurances, fetchSpecialties } from "../lib/data";
import AppointmentsListSkeleton from "../ui/skeletons/SpecialistsListSkeleton";

const ProfessionalsSearch = async () => {
  await fetchInsurances();
  await fetchSpecialties();
  return (
    <main className="m-10 flex justify-between gap-10">
      <AppointmentForm />
      <Suspense fallback={<AppointmentsListSkeleton />}>
        <SpecialistList />
      </Suspense>
      <Modal />
    </main>
  );
};

export default ProfessionalsSearch;
