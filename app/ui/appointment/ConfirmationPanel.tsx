import React from "react";
import Image from "next/image";
import defaultProfile from "@public/default/profile.svg";
import AppointmentConfirmationNavigation from "@/app/ui/appointment/AppointmentConfirmationNavigation";
import { fetchPremakeAppointment } from "@/app/lib/data";
import { capitalizeAll, getAge, getDaysOfWeek } from "@/app/lib/utils";
import DateTimePanel from "@/app/ui/appointment/DateTimePanel";
import { AppointmentData, ISODate } from "@/app/types";
import FamilyMemberButton from "@/app/ui/additional/FamilyMemberButton";

const ConfirmationPanel = async ({
  professional_id,
  appointment_id,
  additional_id,
  date,
  time,
}: {
  professional_id: number;
  appointment_id?: number;
  additional_id?: number;
  date: ISODate;
  time: string;
}) => {
  const { professional, patient, additional } = await fetchPremakeAppointment(
    professional_id,
    additional_id,
  );

  const professionalFullName = `${professional.firstName} ${professional.lastName}`;
  const patientFullName = additional?.name
    ? additional.name
    : `${patient.firstName} ${patient.lastName}`;
  const patientAge = additional?.age
    ? additional.age
    : patient.birthdate
      ? getAge(patient.birthdate)
      : "";
  const patientIdentificationNumber = additional?.identificationNumber
    ? additional.identificationNumber
    : patient.identificationNumber;

  const appointmentData: AppointmentData = {
    account_id: patient.patientId,
    additional_id: additional_id ?? null,
    professional_id,
    appointment_id: appointment_id ?? null,
    scheduled_time: new Date(`${date}T${time}`),
  };

  return (
    <div className="relative">
      <div className="w-full">
        <h2 className="mb-2 mt-4">Professional</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <figure>
              <Image
                src={professional.avatarUrl ?? defaultProfile}
                alt="Profile image"
                className="flex h-full w-32 items-center justify-center rounded-lg border-2 border-base-300"
                width={128}
                height={128}
              />
            </figure>
          </div>

          <div className="w-full bg-base-300 p-4">
            <div>
              <p className="font-medium">
                {professionalFullName}, {getAge(professional.birthdate)}
              </p>
              <ul>
                <li className="text-sm">
                  Health insurance: {capitalizeAll(professional.insurances)}
                </li>
                <li className="text-sm">
                  Specialties: {capitalizeAll(professional.specialties)}
                </li>
                <li className="text-sm">
                  Location: {capitalizeAll(professional.location)}
                </li>
                <li className="text-sm">
                  Available:{" "}
                  {capitalizeAll(getDaysOfWeek(professional.daysOfWeek))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <DateTimePanel date={date} time={time} />
      <div className="w-full">
        <h2 className="mb-2 mt-4">Patient</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <figure>
              <Image
                src={patient.avatarUrl ?? defaultProfile}
                alt="Profile image"
                className="flex h-full w-36 items-center justify-center rounded-lg border-2 border-base-300"
                width={144}
                height={144}
              />
            </figure>
          </div>
          <div className="w-full bg-base-300 p-4">
            <div>
              <p className="font-medium">
                {patientFullName}
                {patientAge ? `, ${patientAge}` : ""}
              </p>
              <ul>
                {patientIdentificationNumber && (
                  <li className="text-sm">ID: {patientIdentificationNumber}</li>
                )}
                <li className="text-sm">
                  Health insurance:{" "}
                  {patient.insurances
                    ? capitalizeAll(patient.insurances)
                    : "None"}
                </li>
                {patient.phone && (
                  <li className="text-sm">Phone number: {patient.phone}</li>
                )}
                <li className="text-sm">Contact email: {patient.email}</li>
              </ul>
            </div>
            <FamilyMemberButton disabled={Boolean(additional)} />
          </div>
        </div>
      </div>
      <AppointmentConfirmationNavigation appointmentData={appointmentData} />
    </div>
  );
};

export default ConfirmationPanel;
