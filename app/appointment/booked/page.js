import { appointments } from "@/app/seeds";
import AppointmentInformation from "@/app/ui/card/AppointmentInformation";
import Card from "@/app/ui/card/Card";
import CardRoundedImage from "@/app/ui/card/CardRoundedImage";
import React from "react";

const BookedAppointments = () => {
  return (
    <main className="m-10 space-y-8">
      <section>
        <h1 className="mb-4 text-3xl">Your appointments</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo.
        </p>
      </section>
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
                          className="btn-round btn-h-8 btn-base-300 btn w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
                        >
                          Cancel
                        </button>
                        <button className="btn-round btn-h-8 btn btn-outline btn-primary w-full shrink border-none bg-white bg-opacity-40">
                          Reschedule
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
                        <button className="btn-round btn-h-8 btn-base-300 btn w-full shrink border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black">
                          Delete
                        </button>
                        <button className="btn-round btn-h-8 btn btn-outline btn-primary w-full shrink border-none bg-white bg-opacity-40">
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
    </main>
  );
};

export default BookedAppointments;
