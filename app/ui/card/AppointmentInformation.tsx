import { statusOfAppointment } from "@/app/constants";
import React from "react";

const StatusEnum = ({ status }) => {
  const statusText = statusOfAppointment[status];
  const statusClass = {
    Pending: "text-yellow-600",
    Approved: "text-green-600",
    Denied: "text-red-600",
    Completed: "text-blue-600",
    Cancelled: "text-red-600",
  };

  return <span className={statusClass[statusText]}>{statusText}</span>;
};

const AppointmentInformation = ({ appointment }) => {
  const [hours, minutes] = appointment.datetime.time.toString().match(/.{2}/g);
  const { datetime, content } = appointment;
  return (
    <div>
      <p className="mb-2 w-full font-medium leading-none">
        {datetime.date} - {hours}:{minutes}
      </p>
      <ul className="text-sm">
        <li>Specialist: {content.specialist}</li>
        <li>Patient: {content.patient}</li>
        <li>Location: {content.location}</li>
        <li>
          Specialist confirmation: <StatusEnum status={content.confirmation} />
        </li>
      </ul>
    </div>
  );
};

export default AppointmentInformation;
