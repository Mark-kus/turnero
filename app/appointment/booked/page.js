import AppointmentsList from "@/app/ui/AppointmentsList";
import Cancel from "@/app/ui/modals/Cancel";
import Delete from "@/app/ui/modals/Delete";
import Review from "@/app/ui/modals/Review";
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
      <AppointmentsList />
      <Review />
      <Cancel />
      <Delete />
    </main>
  );
};

export default BookedAppointments;
