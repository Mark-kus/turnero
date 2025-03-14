import { capitalize, getAppointmentStatus } from "@/app/lib/utils";
import { BookedAppointment } from "@/app/types";

const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

export default function AppointmentData({
  appointment,
  serverAppointmentTime,
}: {
  appointment: BookedAppointment;
  serverAppointmentTime: string;
}) {
  const statusClass = [
    "text-yellow-600",
    "text-green-600",
    "text-red-600",
    "text-blue-600",
    "text-red-600",
  ];

  const getDateAndTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `${formattedDate} - ${serverAppointmentTime}hs`;
  };

  return (
    <div>
      <p className="mb-2 w-full leading-none font-medium">
        {getDateAndTime(new Date(appointment.scheduledTime))}
      </p>
      <ul className="text-sm">
        <li>
          Professional:{" "}
          {capitalize(
            getFullName(
              appointment.professional.firstName,
              appointment.professional.lastName,
            ),
          )}
        </li>
        <PatientInfo
          patient={appointment.patient}
          additional={appointment.additional}
        />
        <li>Location: {capitalize(appointment.location)}</li>
        <li>
          Professional confirmation:{" "}
          <span className={statusClass[appointment.status - 1]}>
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
  additional: { name: string | null };
}) {
  return (
    <li>
      Patient:{" "}
      {additional.name ? (
        <>
          {additional.name} -{" "}
          <span className="text-purple-600">Miembro familiar</span>
        </>
      ) : (
        getFullName(patient.firstName, patient.lastName)
      )}
    </li>
  );
}
