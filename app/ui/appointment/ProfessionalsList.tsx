import React from "react";
import Link from "next/link";
import NoResults from "@/app/ui/NoResults";
import { fetchProfessionals } from "@/app/lib/data";
import Image from "next/image";
import defaultImage from "@public/default/image.svg";
import { capitalizeAll, getDayName } from "@/app/lib/utils";
import { NumberedDayOfWeek, ProfessionalsFilters } from "@/app/types";

const ProfessionalsList = async ({
  specialty,
  name,
  insurance,
}: ProfessionalsFilters) => {
  const professionals = await fetchProfessionals({
    specialty,
    name,
    insurance,
  });

  const getProfessionalAge = (birthdate: Date): string => {
    return `${new Date().getFullYear() - new Date(birthdate).getFullYear()} años`;
  };

  const getDaysOfWeek = (daysOfWeek: string): string => {
    return daysOfWeek
      .split(", ")
      .map((dayOfWeek) => {
        const parsedDayOfWeek = parseInt(dayOfWeek) as NumberedDayOfWeek;
        return getDayName(parsedDayOfWeek);
      })
      .join(", ");
  };

  if (!!professionals.length) {
    return (
      <NoResults>
        <h3 className="my-4 text-lg">
          No encontramos resultados para tu búsqueda
        </h3>
        <p className="text-xs">
          Ingresá otra especialidad, nombre u obra social y volvé a intentar la
          búsqueda.
        </p>
      </NoResults>
    );
  }

  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {professionals.map((professional, index) => {
        const professionalAge = getProfessionalAge(professional.birthdate);
        const daysOfWeek = getDaysOfWeek(professional.daysOfWeek);

        return (
          <div
            key={index}
            className={"card card-side rounded-none bg-base-200"}
          >
            <div className="bg-gray-100 p-2">
              <div className="flex h-full w-40 items-center justify-center rounded-lg border-2 border-base-300">
                <figure>
                  <Image
                    src={professional.avatarUrl ?? defaultImage}
                    alt="Profile image"
                    width={20}
                    height={20}
                  />
                </figure>
              </div>
            </div>
            <div className="m-4 flex w-full flex-col">
              <div>
                <p className="font-medium">
                  {professional.firstName} {professional.lastName},{" "}
                  {professionalAge}
                </p>
                <ul>
                  <li className="text-sm">
                    Health insurance:{" "}
                    {capitalizeAll(professional.insurances) ?? "None"}
                  </li>
                  <li className="text-sm">
                    Specialties: {capitalizeAll(professional.specialties)}
                  </li>
                  <li className="text-sm">
                    Location: {capitalizeAll(professional.location)}
                  </li>
                  <li className="text-sm">Available: {daysOfWeek}</li>
                </ul>
              </div>
              <Link
                href={`/appointment/${professional.professionalId}`}
                className="btn btn-h-10 btn-round mt-2 w-full border-none bg-white bg-opacity-40 font-medium text-primary"
              >
                Select
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProfessionalsList;
