import React, {Children, Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/default/profile.svg";

import CancelModal from "@/app/ui/modals/CancelModal";
import ReviewModal from "@/app/ui/modals/ReviewModal";
import BookedAppointmentsSkeleton from "@/app/ui/skeletons/BookedAppointmentsSkeleton";
import NoResults from "@/app/ui/NoResults";
import ComingOptionsButtons from "@/app/ui/booked/ComingOptionsButtons";
import DueOptionsButtons from "@/app/ui/booked/DueOptionsButtons";
import {fetchBookedAppointments} from "@/app/lib/data";
import AppointmentData from "@/app/ui/appointment/AppointmentData";

const SuspensedBookedAppointments = async () => {
  const {dueAppointments, comingAppointments} = await fetchBookedAppointments();

  if (!comingAppointments.length && !dueAppointments.length) {
    return (
      <NoResults>
        <h2 className="mt-4 font-bold">Todavía no tenés turnos agendados</h2>
        <p className="mb-4 text-sm">Para atenderte, agendá un turno con un médico.</p>
        <Link className="btn btn-primary w-2/3" href="/appointment">
          Ir a agendar turno
        </Link>
      </NoResults>
    );
  }

  const getServerAppointmentTime = (date: Date) => {
    const [hours, minutes] = date.toLocaleTimeString().split(":");

    return `${hours}:${minutes}`;
  };

  return (
    <>
      {!!comingAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Appointments coming soon</h3>
          <FadeInGrid>
            {comingAppointments.map((appointment, index) => {
              const serverAppointmentTime = getServerAppointmentTime(
                new Date(appointment.scheduledTime),
              );

              return (
                <div key={index}>
                  <div className="card card-side bg-base-200 rounded-none p-2">
                    <figure>
                      <Image
                        alt="Profile image"
                        className="mt-2 mb-auto"
                        height={100}
                        src={appointment.patient.avatarUrl ?? defaultProfile}
                        width={100}
                      />
                      <div className="divider divider-horizontal m-1" />
                    </figure>
                    <div className="m-2 w-full">
                      <AppointmentData
                        appointment={appointment}
                        serverAppointmentTime={serverAppointmentTime}
                      />
                      <ComingOptionsButtons
                        appointment={appointment}
                        disabled={appointment.status === 5}
                        serverAppointmentTime={serverAppointmentTime}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </FadeInGrid>
        </section>
      )}
      {!!dueAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Due appointments</h3>
          <FadeInGrid>
            {dueAppointments.map((appointment, index) => {
              const serverAppointmentTime = getServerAppointmentTime(
                new Date(appointment.scheduledTime),
              );

              return (
                <div key={index}>
                  <div className="card card-side bg-base-200 rounded-none p-2">
                    <figure>
                      <Image
                        alt="Profile image"
                        className="mt-2 mb-auto"
                        height={100}
                        src={appointment.patient.avatarUrl ?? defaultProfile}
                        width={100}
                      />
                      <div className="divider divider-horizontal m-1" />
                    </figure>
                    <div className="m-2 w-full">
                      <AppointmentData
                        appointment={appointment}
                        serverAppointmentTime={serverAppointmentTime}
                      />
                      <DueOptionsButtons
                        appointment_id={appointment.appointmentId}
                        disabled={Boolean(appointment.rating)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </FadeInGrid>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo.
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

function FadeInGrid({children}: {children: React.ReactNode[]}) {
  return (
    <div className="grid w-full grid-cols-3 justify-between gap-6">
      {Children.toArray(children).map((child, idx) => (
        <div
          key={idx}
          style={{
            opacity: 0,
            animation: `fadeInUp 0.5s ease-out forwards ${idx * 100}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default BookedAppointments;
