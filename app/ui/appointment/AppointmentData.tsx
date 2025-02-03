import { APPOINTMENT_STATUS } from "@/app/constants";
import { getAppointmentStatus } from "@/app/lib/utils";
import { BookedAppointment } from "@/app/types";

const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

export default function AppointmentData({
  appointment,
}: {
  appointment: BookedAppointment;
}) {
  const statusClass = [
    "text-yellow-600",
    "text-green-600",
    "text-red-600",
    "text-blue-600",
    "text-red-600",
  ];

  const getTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
  };

  const getDateAndTime = (date: Date, time: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const { hours, minutes } = getTime(time);
    return `${formattedDate} - ${hours}:${minutes}hs`;
  };

  return (
    <div>
      <p className="mb-2 w-full font-medium leading-none">
        {getDateAndTime(new Date(appointment.date), appointment.time)}
      </p>
      <ul className="text-sm">
        <li>
          Professional:{" "}
          {getFullName(
            appointment.professional.firstName,
            appointment.professional.lastName,
          )}
        </li>
        <PatientInfo
          patient={appointment.patient}
          additional={appointment.additional}
        />
        <li>Location: {appointment.location}</li>
        <li>
          Professional confirmation:{" "}
          <span className={statusClass[appointment.status]}>
            {getAppointmentStatus(appointment.status)}
          </span>
        </li>
      </ul>
    </div>
  );
}

function PatientInfo({
  patient,
  additional,
}: {
  patient: { firstName: string; lastName: string };
  additional?: { firstName: string; lastName: string };
}) {
  return (
    <li>
      Patient:{" "}
      {additional ? (
        <>
          {getFullName(additional.firstName, additional.lastName)} -{" "}
          <span className="text-purple-600">Miembro familiar</span>
        </>
      ) : (
        getFullName(patient.firstName, patient.lastName)
      )}
    </li>
  );
}
