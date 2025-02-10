import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import CancelModal from "@/app/ui/modals/CancelModal";
import ReviewModal from "@/app/ui/modals/ReviewModal";

import BookedAppointmentsSkeleton from "@/app/ui/skeletons/BookedAppointmentsSkeleton";
import NoResults from "@/app/ui/NoResults";

import defaultProfile from "@public/default/profile.svg";
import ComingOptionsButtons from "@/app/ui/booked/ComingOptionsButtons";
import DueOptionsButtons from "@/app/ui/booked/DueOptionsButtons";
import { fetchBookedAppointments } from "@/app/lib/data";
import AppointmentData from "@/app/ui/appointment/AppointmentData";

const SuspensedBookedAppointments = async () => {
  const { dueAppointments, comingAppointments } =
    await fetchBookedAppointments();

  if (!comingAppointments.length && !dueAppointments.length) {
    return (
      <NoResults>
        <h2 className="mt-4 font-bold">Todavía no tenés turnos agendados</h2>
        <p className="mb-4 text-sm">
          Para atenderte, agendá un turno con un médico.
        </p>
        <Link href="/appointment" className="btn btn-primary w-2/3">
          Ir a agendar turno
        </Link>
      </NoResults>
    );
  }

  return (
    <>
      {!!comingAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Appointments coming soon</h3>
          <ul className="grid grid-cols-3 gap-4">
            {comingAppointments.map((appointment, index) => {
              return (
                <li key={index}>
                  <div
                    className={"card card-side rounded-none bg-base-200 p-2"}
                  >
                    <figure>
                      <Image
                        src={appointment.patient.avatarUrl ?? defaultProfile}
                        alt="Profile image"
                        width={100}
                        height={100}
                        className="mb-auto mt-2"
                      />
                      <div className="divider divider-horizontal m-1"></div>
                    </figure>
                    <div className="m-2 w-full">
                      <AppointmentData appointment={appointment} />
                      <ComingOptionsButtons
                        disabled={appointment.status === 5}
                        appointment={appointment}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {!!dueAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Due appointments</h3>
            <ul className="grid grid-cols-3 gap-4">
            {dueAppointments.map((appointment, index) => {
              return (
                <li key={index}>
                  <div
                    className={"card card-side rounded-none bg-base-200 p-2"}
                  >
                    <figure>
                      <Image
                        src={appointment.patient.avatarUrl ?? defaultProfile}
                        alt="Profile image"
                        width={100}
                        height={100}
                        className="mb-auto mt-2"
                      />
                      <div className="divider divider-horizontal m-1"></div>
                    </figure>
                    <div className="m-2 w-full">
                      <AppointmentData appointment={appointment} />
                      <DueOptionsButtons
                        disabled={Boolean(appointment.rating)}
                        appointment_id={appointment.appointmentId}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

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

      <Suspense fallback={<BookedAppointmentsSkeleton />}>
        <SuspensedBookedAppointments />
      </Suspense>

      <ReviewModal />
      <CancelModal />
    </main>
  );
};

export default BookedAppointments;
