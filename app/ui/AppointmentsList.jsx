"use client";
import Link from "next/link";
import { appointments } from "@/app/seeds";
import AppointmentInformation from "@/app/ui/card/AppointmentInformation";
import Card from "@/app/ui/card/Card";
import CardRoundedImage from "@/app/ui/card/CardRoundedImage";
import React from "react";

const AppointmentsList = () => {
  return (
    <>
      <section>
        <h3 className="mb-4 font-semibold">Appointments coming soon</h3>
        <ul className="grid grid-cols-3 space-x-4">
          {appointments.coming.map((appointment, index) => {
            return (
              <li key={index}>
                <Card
                  className={"bg-base-200 p-2"}
                  leftSlot={<CardRoundedImage />}
                  rightSlot={
                    <div className="m-2 w-full">
                      <AppointmentInformation appointment={appointment} />
                      <div className="mt-4 flex w-full gap-2">
                        <button
                          disabled={
                            appointment.content.confirmation === "Denied"
                          }
                          onClick={() =>
                            document.getElementById("cancel_modal").showModal()
                          }
                          className="btn-round btn-h-8 btn-base-300 btn w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
                        >
                          Cancel
                        </button>
                        <Link
                          href={`/appointment/1/reschedule`}
                          className="btn-round btn-h-8 btn btn-outline btn-primary w-full shrink border-none bg-white bg-opacity-40"
                        >
                          Reschedule
                        </Link>
                      </div>
                    </div>
                  }
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h3 className="mb-4 font-semibold">Due appointments</h3>
        <ul className="grid grid-cols-3 space-x-4">
          {appointments.due.map((appointment, index) => {
            return (
              <li key={index}>
                <Card
                  className={"bg-base-200 p-2"}
                  leftSlot={<CardRoundedImage />}
                  rightSlot={
                    <div className="m-2 w-full">
                      <AppointmentInformation appointment={appointment} />
                      <div className="mt-4 flex w-full gap-2">
                        <button
                          onClick={() =>
                            document.getElementById("delete_modal").showModal()
                          }
                          className="btn-round btn-h-8 btn-base-300 btn w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            document.getElementById("review_modal").showModal()
                          }
                          className="btn-round btn-h-8 btn btn-outline btn-primary w-full shrink border-none bg-white bg-opacity-40"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  }
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default AppointmentsList;
