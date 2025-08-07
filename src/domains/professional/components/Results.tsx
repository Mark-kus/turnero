import {Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@public/default/image.svg";

import NoResults from "@/shared/components/NoResults";
import {ProfessionalFilters} from "@/shared/types/professional";
import {VercelProfessionalReadModel} from "@/professional/adapters/vercel-professional.readmodel";
import {capitalizeAllWords, getDaysOfWeekString} from "@/shared/utils/format";
import {DateUtils} from "@/shared/utils/DateUtils";

const {getAge, getDateOnlyByFullDate} = DateUtils;

const repository = new VercelProfessionalReadModel();

export const Results = async ({specialty, name, insurance}: ProfessionalFilters) => {
  const professionals = await repository.getAllProfessionalsWithProfile({
    specialty,
    name,
    insurance,
  });

  if (!professionals.length) {
    return (
      <NoResults>
        <h3 className="my-4 text-lg">No encontramos resultados para tu búsqueda</h3>
        <p className="text-xs">
          Ingresá otra especialidad, nombre u obra social y volvé a intentar la búsqueda.
        </p>
      </NoResults>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-4 overflow-y-auto">
      {professionals.map((professional, index) => {
        const professionalAge = professional.birthdate ? getAge(professional.birthdate) : null;
        const daysOfWeek = getDaysOfWeekString(professional.daysOfWeek);

        return (
          <li
            key={index}
            className="card card-side bg-base-200 rounded-none"
            style={{
              opacity: 0,
              animation: `fadeInUp 0.5s ease-out forwards ${index * 100}ms`,
            }}
          >
            <div className="bg-gray-100 p-2">
              <div className="border-base-300 flex h-full w-40 items-center justify-center rounded-lg border-2">
                <figure>
                  <Image
                    alt="Profile image"
                    height={20}
                    src={professional.avatarUrl ?? defaultImage}
                    width={20}
                  />
                </figure>
              </div>
            </div>
            <div className="m-4 flex w-full flex-col">
              <div>
                <p className="font-medium">
                  {professional.firstName} {professional.lastName}
                  {professionalAge ? `, ${professionalAge} años` : ""}
                </p>
                <ul>
                  <li className="text-sm">
                    Health insurance: {capitalizeAllWords(professional.insurances) ?? "None"}
                  </li>
                  <li className="text-sm">
                    Specialties: {capitalizeAllWords(professional.specialties)}
                  </li>
                  <li className="text-sm">Location: {capitalizeAllWords(professional.location)}</li>
                  <li className="text-sm">Available: {daysOfWeek}</li>
                </ul>
              </div>
              <Link
                className="btn btn-h-10 btn-round bg-opacity-40 text-primary mt-2 w-full border-none bg-white font-medium"
                href={`/appointment/${professional.professionalId}?date=${getDateOnlyByFullDate(new Date())}`}
              >
                Select
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const ResultsSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {Array.from({length: 3}).map((_, index) => (
        <div key={index} className="card card-side bg-base-200 animate-pulse rounded-none">
          <div className="bg-gray-100 p-2">
            <div className="border-base-300 bg-base-200 flex h-full w-40 items-center justify-center rounded-lg border-2">
              <figure>
                <Image alt="Profile image" height={20} src={defaultImage} width={20} />
              </figure>
            </div>
          </div>
          <div className="m-4 flex w-full flex-col">
            <div>
              <p className="h-6 w-2/4 rounded-sm bg-gray-300" />
              <ul>
                <li className="mt-2 h-4 w-1/4 rounded-sm bg-gray-300" />
                <li className="mt-2 h-4 w-1/3 rounded-sm bg-gray-300" />
                <li className="mt-2 h-4 w-1/4 rounded-sm bg-gray-300" />
                <li className="mt-2 h-4 w-1/5 rounded-sm bg-gray-300" />
              </ul>
            </div>
            <div className="bg-opacity-40 text-primary mt-2 h-10 w-full rounded-sm border-none bg-white font-medium" />
          </div>
        </div>
      ))}
    </section>
  );
};

export const ResultsSuspended = ({specialty, name, insurance}: ProfessionalFilters) => (
  <Suspense fallback={<ResultsSkeleton />}>
    <Results insurance={insurance} name={name} specialty={specialty} />
  </Suspense>
);

export default Results;
