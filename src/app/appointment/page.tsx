import Image from "next/image";
import defaultImage from "@public/default/image.svg";

import AppointmentSearchForm from "@/professional/components/appointment/SearchForm";
import {ResultsSuspended} from "@/professional/components/Results";
import {ProfessionalFilters} from "@/shared/types/professional";

const ProfessionalsSearch = async ({searchParams}: {searchParams: ProfessionalFilters}) => {
  const specialty = searchParams?.specialty || "";
  const name = searchParams?.name || "";
  const insurance = searchParams?.insurance || "";

  return (
    <main className="m-10 flex justify-between gap-10">
      <section className="hero bg-neutral max-w-xl">
        <div className="hero-content">
          <div className="m-4 max-w-md">
            <h1 className="text-2xl leading-3">Pick your appointment</h1>
            <p className="py-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo.
            </p>
            <div className="border-base-300 flex h-36 items-center justify-center rounded-lg border-2">
              <Image alt="Default image" height={20} src={defaultImage} width={20} />
            </div>
            <AppointmentSearchForm />
          </div>
        </div>
      </section>
      <ResultsSuspended insurance={insurance} name={name} specialty={specialty} />
    </main>
  );
};

export default ProfessionalsSearch;
