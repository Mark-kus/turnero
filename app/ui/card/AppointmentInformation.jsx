import { getColorByConfirmation } from "@/app/lib/utils";
import React from "react";

const PENDING = "Pending";
const APPROVED = "Approved";
const DENIED = "Denied";
const COMPLETED = "Completed";
const CANCELLED = "Cancelled";

const StatusEnum = ({ status }) => {
  if (status === PENDING) {
    return <span className="text-yellow-600">Waiting</span>;
  }
  if (status === APPROVED) {
    return <span className="text-green-600">Approved</span>;
  }
  if (status === DENIED) {
    return <span className="text-red-600">Denied</span>;
  }
  if (status === COMPLETED) {
    return <span className="text-blue-600">Completed</span>;
  }
  if (status === CANCELLED) {
    return <span className="text-red-600">Cancelled</span>;
  }
  return <span>{status}</span>;
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
