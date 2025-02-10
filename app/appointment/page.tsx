import React, { Suspense } from "react";
import AppointmentSearchForm from "@/app/ui/appointment/AppointmentSearchForm";
import ProfessionalsList from "@/app/ui/appointment/ProfessionalsList";
import AppointmentsListSkeleton from "@/app/ui/skeletons/ProfessionalsListSkeleton";
import Image from "next/image";
import defaultImage from "@public/default/image.svg";
import { ProfessionalsFilters } from "@/app/types";

const ProfessionalsSearch = async ({
  searchParams,
}: {
  searchParams: ProfessionalsFilters;
}) => {
  const specialty = searchParams?.specialty || "";
  const name = searchParams?.name || "";
  const insurance = searchParams?.insurance || "";

  return (
    <main className="m-10 flex justify-between gap-10">
      <section className="hero max-w-xl bg-neutral">
        <div className="hero-content">
          <div className="m-4 max-w-md">
            <h1 className="text-2xl leading-3">Pick your appointment</h1>
            <p className="py-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </p>
            <div className="flex h-36 items-center justify-center rounded-lg border-2 border-base-300">
              <Image
                src={defaultImage}
                alt="Default image"
                width={20}
                height={20}
              />
            </div>
            <AppointmentSearchForm />
          </div>
        </div>
      </section>
      <Suspense
        key={specialty + name + insurance}
        fallback={<AppointmentsListSkeleton />}
      >
        <ProfessionalsList
          specialty={specialty}
          name={name}
          insurance={insurance}
        />
      </Suspense>
    </main>
  );
};

export default ProfessionalsSearch;
