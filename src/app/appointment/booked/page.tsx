import {BookedSuspensed} from "@/professional/components/Booked";
import CancelModal from "@/shared/components/modals/CancelModal";
import ReviewModal from "@/shared/components/modals/ReviewModal";

const BookedAppointments = () => {
  return (
    <main className="m-10 space-y-8">
      <section>
        <h1 className="mb-4 text-3xl">Your appointments</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo.
        </p>
      </section>

      <BookedSuspensed />

      <ReviewModal />
      <CancelModal />
    </main>
  );
};

export default BookedAppointments;
