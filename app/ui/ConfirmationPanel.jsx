"use client";
import Card from "@/app/ui/card/Card";
import CardSquaredImage from "@/app/ui/card/CardSquaredImage";
import React from "react";
import Link from "next/link";
import { appointment, specialists } from "@/app/seeds";
import SpecialistInformation from "@/app/ui/card/SpecialistInformation";
import PatientInformation from "@/app/ui/card/PatientInformation";
import { useRouter } from "next/navigation";

const ConfirmationPanel = () => {
  const router = useRouter();
  const [hours, minutes] = appointment.datetime.time.toString().match(/.{2}/g);

  return (
    <div>
      <div className="w-full">
        <h2 className="mb-2 mt-4">Dentist</h2>
        <Card
          leftSlot={<CardSquaredImage />}
          rightSlot={
            <div className="m-4">
              <SpecialistInformation person={specialists[0]} />
            </div>
          }
        />
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
        <Card
          leftSlot={<CardSquaredImage />}
          rightSlot={
            <div className="m-4">
              <PatientInformation person={appointment.patient} />
              <Link
                href={"/appointment"}
                className="btn-round btn-base-300 btn mt-2 h-8 min-h-8 border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
              >
                The appointment is for a family member
              </Link>
            </div>
          }
        />
      </div>
      <div className="mt-32 flex w-full justify-center gap-4">
        <button
          onClick={() => router.back()}
          className="btn-round btn-h-10 btn btn-primary w-full shrink border-none bg-white text-primary hover:text-primary-content"
        >
          Go back
        </button>
        <button className={"btn-h-10 btn-round btn btn-primary w-full shrink"}>
          Confirm appointment
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPanel;
