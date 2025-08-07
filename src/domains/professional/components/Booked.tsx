import {Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/default/profile.svg";

import NoResults from "@/shared/components/NoResults";
import {VercelAppointmentReadModel} from "@/professional/adapters/vercel-appointment.readmodel";
import {ActionButtons, ReviewButton} from "@/professional/components/BookedButtons";
import {
  capitalize,
  getAppointmentStatusIndex,
  getAppointmentStatusString,
} from "@/shared/utils/format";
import {BookedAppointmentDto} from "@/professional/dtos/booked-appointment.dto";

const readmodel = new VercelAppointmentReadModel();

const Grid = ({children}: {children: React.ReactNode}) => {
  return <div className="grid w-full grid-cols-3 justify-between gap-6">{children}</div>;
};

const FadeInGridItem = ({children}: {children: React.ReactNode}) => {
  return <div style={{opacity: 0, animation: "fadeInUp 0.5s ease-out forwards"}}>{children}</div>;
};

const CardRoot = ({children}: {children: React.ReactNode}) => {
  return <div className="card card-side bg-base-200 rounded-none p-2">{children}</div>;
};

const CardImage = ({src, alt}: {src: string; alt: string}) => {
  return (
    <figure className="w-16">
      <Image alt={alt} className="mt-2 mb-auto h-12 w-12" height={48} src={src} width={48} />
    </figure>
  );
};

const statusClass = [
  "text-yellow-600",
  "text-green-600",
  "text-red-600",
  "text-blue-600",
  "text-red-600",
];

function CardInfo({appointment}: {appointment: BookedAppointmentDto}) {
  const scheduledDate = new Date(appointment.scheduledTime);
  const [hours, minutes] = scheduledDate.toLocaleTimeString().split(":");

  const formattedDate = scheduledDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <p className="mb-2 w-full leading-none font-medium">
        {formattedDate} - {hours}:{minutes}hs
      </p>
      <ul className="text-sm">
        <li>
          Professional:{" "}
          {capitalize(`${appointment.professional.firstName} ${appointment.professional.lastName}`)}
        </li>
        <li>
          Patient:{" "}
          {appointment.familyMember.name ? (
            <>
              {appointment.familyMember.name} -{" "}
              <span className="text-purple-600">Miembro familiar</span>
            </>
          ) : (
            `${appointment.patient.firstName} ${appointment.patient.lastName}`
          )}
        </li>
        <li>Location: {capitalize(appointment.provider.location)}</li>
        <li>
          Professional confirmation:{" "}
          <span className={statusClass[appointment.status - 1]}>
            {getAppointmentStatusString(appointment.status)}
          </span>
        </li>
      </ul>
    </div>
  );
}

export const Card = {
  Root: CardRoot,
  Image: CardImage,
};

const Booked = async () => {
  const {dueAppointments, comingAppointments} = await readmodel.getBookedAppointments();

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

  return (
    <>
      {!!comingAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Appointments coming soon</h3>
          <Grid>
            {comingAppointments.map((appointment, index) => (
              <FadeInGridItem key={index}>
                <CardRoot>
                  <CardImage
                    alt="Profile image"
                    src={appointment.patient.avatarUrl ?? defaultProfile}
                  />
                  <div className="divider divider-horizontal m-1" />
                  <div className="m-2 w-full">
                    <CardInfo appointment={appointment} />
                    <ActionButtons
                      appointment={appointment}
                      disabled={Boolean(
                        ![
                          getAppointmentStatusIndex("Approved"),
                          getAppointmentStatusIndex("Pending"),
                        ].includes(appointment.status),
                      )}
                    />
                  </div>
                </CardRoot>
              </FadeInGridItem>
            ))}
          </Grid>
        </section>
      )}
      {!!dueAppointments.length && (
        <section>
          <h3 className="mb-4 font-semibold">Due appointments</h3>
          <Grid>
            {dueAppointments.map((appointment, index) => {
              return (
                <FadeInGridItem key={index}>
                  <CardRoot>
                    <CardImage
                      alt="Profile image"
                      src={appointment.patient.avatarUrl ?? defaultProfile}
                    />
                    <div className="divider divider-horizontal m-1" />
                    <div className="m-2 w-full">
                      <CardInfo appointment={appointment} />
                      <ReviewButton
                        appointmentId={appointment.appointmentId}
                        disabled={Boolean(appointment.rating)}
                      />
                    </div>
                  </CardRoot>
                </FadeInGridItem>
              );
            })}
          </Grid>
        </section>
      )}
    </>
  );
};

export const BookedSkeleton = () => {
  return (
    <div>
      {Array.from(new Array(5)).map((_, index) => (
        <div key={index} style={{marginBottom: "20px"}}>
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 w-3/4 rounded-sm bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 rounded-sm bg-gray-200" />
                <div className="h-4 w-5/6 rounded-sm bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const BookedSuspensed = () => {
  return (
    <Suspense fallback={<BookedSkeleton />}>
      <Booked />
    </Suspense>
  );
};

export default Booked;
