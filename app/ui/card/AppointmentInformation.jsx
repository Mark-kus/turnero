import { getColorByConfirmation } from "@/app/lib/utils";
import React from "react";

const AppointmentInformation = ({ appointment }) => {
  const [hours, minutes] = appointment.datetime.time.toString().match(/.{2}/g);
  const color = getColorByConfirmation(appointment.content.confirmation);
  const { datetime, content } = appointment;

  return (
    <div>
      <p className="mb-2 w-full font-medium leading-none">
        {datetime.date} - {hours}:{minutes}
      </p>
      <ul>
        <li className="text-sm">Specialist: {content.specialist}</li>
        <li className="text-sm">Patient: {content.patient}</li>
        <li className="text-sm">Location: {content.location}</li>
        <li className="text-sm">
          Specialist confirmation:{" "}
          <span className={`text-[${color}]`}>{content.confirmation}</span>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentInformation;
