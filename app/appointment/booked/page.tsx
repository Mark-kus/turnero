import AppointmentsList from "@/app/ui/AppointmentsList";
import Cancel from "@/app/ui/modals/Cancel";
import Delete from "@/app/ui/modals/Delete";
import Review from "@/app/ui/modals/Review";
import React from "react";

import { appointments } from "@/app/seeds";
import NoResults from "@/app/ui/NoResults";
import Link from "next/link";

const BookedAppointments = () => {
  return (
    <main className="m-10 space-y-8">
      <section>
        <h1 className="mb-4 text-3xl">Your appointments</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo.
        </p>
      </section>
      {!!appointments.coming.length && !!appointments.due.length ? (
        <AppointmentsList appointments={appointments} />
      ) : (
        <NoResults>
          <h2 className="mt-4 font-bold">Todavía no tenés turnos agendados</h2>
          <p className="mb-4 text-sm">
            Para atenderte, agendá un turno con un médico.
          </p>
          <Link href="/appointment" className="btn btn-primary w-2/3">
            Ir a agendar turno
          </Link>
        </NoResults>
      )}
      <Review />
      <Cancel />
      <Delete />
    </main>
  );
};

export default BookedAppointments;
