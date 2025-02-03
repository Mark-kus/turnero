"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultProfile from "@public/default/profile.svg";

const ConfirmationPanel = () => {
  const router = useRouter();
  const [hours, minutes] = appointment.datetime.time.toString().match(/.{2}/g);

  return (
    <div>
      <div className="w-full">
        <h2 className="mb-2 mt-4">Dentist</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <div className="flex h-full w-40 items-center justify-center rounded-lg border-2 border-base-300">
              <figure>
                <Image
                  src={defaultProfile}
                  alt="Profile image"
                  width={20}
                  height={20}
                />
              </figure>
            </div>
          </div>

          <div className="w-full bg-base-300 p-4">
            <div>
              <p className="font-medium">
                {appointment.professional.name}, {appointment.professional.age}
              </p>
              <ul>
                <li className="text-sm">
                  Health insurance:{" "}
                  {appointment.professional.insurance ?? "None"}
                </li>
                <li className="text-sm">
                  Specialties: {appointment.professional.specialties}
                </li>
                <li className="text-sm">
                  Location: {appointment.professional.location}
                </li>
                <li className="text-sm">
                  Available: {appointment.professional.available}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-full gap-4">
        <div className="w-full">
          <h2 className="mb-2">Date</h2>
          <div className="w-full bg-base-200 py-4 text-center text-sm">
            {appointment.datetime.date}
          </div>
        </div>
        <div className="w-full">
          <h2 className="mb-2">Time</h2>
          <div className="w-full bg-base-200 py-4 text-center text-sm">
            {hours}:{minutes}
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className="mb-2 mt-4">Patient</h2>
        <div className="card card-side rounded-none">
          <div className="bg-[#f7f7f7] p-4">
            <div className="flex h-full w-40 items-center justify-center rounded-lg border-2 border-base-300">
              <figure>
                <Image
                  src={defaultProfile}
                  alt="Profile image"
                  width={20}
                  height={20}
                />
              </figure>
            </div>
          </div>
          <div className="w-full bg-base-300 p-4">
            <div>
              <p className="font-medium">
                {appointment.person.name}, {appointment.person.age}
              </p>
              <ul>
                <li className="text-sm">ID: {appointment.person.idNumber}</li>
                <li className="text-sm">
                  Health insurance: {appointment.person.insurance ?? "None"}
                </li>
                <li className="text-sm">
                  Phone number: {appointment.person.phone}
                </li>
                <li className="text-sm">
                  Contact email: {appointment.person.email}
                </li>
              </ul>
            </div>
            <Link
              href={"/appointment"}
              className="btn-base-300 btn btn-round mt-2 h-8 min-h-8 border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
            >
              The appointment is for a family member
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-32 flex w-full justify-center gap-4">
        <button
          onClick={() => router.back()}
          className="btn btn-primary btn-h-10 btn-round w-full shrink border-none bg-white text-primary hover:text-primary-content"
        >
          Go back
        </button>
        <button className={"btn btn-primary btn-h-10 btn-round w-full shrink"}>
          Confirm appointment
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPanel;
