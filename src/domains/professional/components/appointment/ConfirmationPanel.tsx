import Image from "next/image";
import defaultProfile from "@public/default/profile.svg";

import AppointmentConfirmationNavigation from "@/professional/components/appointment/ConfirmationNavigation";
import DateTimePanel from "@/professional/components/appointment/DateTimePanel";
import {DateOnly} from "@/shared/types/common";
import FamilyMemberButton from "@/patient/components/family-member/FamilyMemberButton";
import {DateUtils} from "@/shared/utils/DateUtils";
import {capitalizeAllWords, getDaysOfWeekString} from "@/shared/utils/format";
import {VercelAppointmentReadModel} from "@/professional/adapters/vercel-appointment.readmodel";

const {getAge} = DateUtils;

const repository = new VercelAppointmentReadModel();

const ConfirmationPanel = async ({
  professionalId,
  appointmentId,
  familyMemberId,
  date,
  time,
}: {
  professionalId: number;
  appointmentId?: number;
  familyMemberId?: number;
  date: DateOnly;
  time: string;
}) => {
  const {professional, patient, familyMember} = await repository.getPremakeAppointment(
    professionalId,
    familyMemberId,
  );

  const professionalFullName = `${professional.firstName} ${professional.lastName}`;
  const patientFullName = familyMember?.name
    ? familyMember.name
    : `${patient.firstName} ${patient.lastName}`;
  const patientAge = familyMember?.age
    ? familyMember.age
    : patient.birthdate
      ? getAge(patient.birthdate)
      : "";
  const patientIdentificationNumber = familyMember?.identificationNumber
    ? familyMember.identificationNumber
    : patient.identificationNumber;

  return (
    <div className="relative">
      <div className="w-full">
        <h2 className="mt-4 mb-2">Professional</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <figure>
              <Image
                alt="Profile image"
                className="border-base-300 flex h-full w-32 items-center justify-center rounded-lg border-2"
                height={128}
                src={professional.avatarUrl ?? defaultProfile}
                width={128}
              />
            </figure>
          </div>

          <div className="bg-base-300 w-full p-4">
            <div>
              <p className="font-medium">
                {professionalFullName}, {getAge(professional.birthdate)}
              </p>
              <ul>
                <li className="text-sm">
                  Health insurance: {capitalizeAllWords(professional.insurances)}
                </li>
                <li className="text-sm">
                  Specialties: {capitalizeAllWords(professional.specialties)}
                </li>
                <li className="text-sm">Location: {capitalizeAllWords(professional.location)}</li>
                <li className="text-sm">
                  Available: {capitalizeAllWords(getDaysOfWeekString(professional.daysOfWeek))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <DateTimePanel date={date} time={time} />
      <div className="w-full">
        <h2 className="mt-4 mb-2">Patient</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <figure>
              <Image
                alt="Profile image"
                className="border-base-300 flex h-full w-36 items-center justify-center rounded-lg border-2"
                height={144}
                src={patient.avatarUrl ?? defaultProfile}
                width={144}
              />
            </figure>
          </div>
          <div className="bg-base-300 w-full p-4">
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
                  {patient.insurances ? capitalizeAllWords(patient.insurances) : "None"}
                </li>
                {patient.phone && <li className="text-sm">Phone number: {patient.phone}</li>}
                <li className="text-sm">Contact email: {patient.email}</li>
              </ul>
            </div>
            <FamilyMemberButton disabled={Boolean(familyMember)} />
          </div>
        </div>
      </div>
      {appointmentId ? (
        <AppointmentConfirmationNavigation
          reschedule={{
            appointmentId: appointmentId,
            scheduledTime: new Date(`${date}T${time}`),
          }}
        />
      ) : (
        <AppointmentConfirmationNavigation
          appointment={{
            accountId: patient.patientId,
            professionalId: professionalId,
            familyMemberId: familyMemberId ?? null,
            scheduledTime: new Date(`${date}T${time}`),
          }}
        />
      )}
    </div>
  );
};

export default ConfirmationPanel;
