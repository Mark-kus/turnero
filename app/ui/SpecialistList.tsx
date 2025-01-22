import React from "react";
import Card from "./card/Card";
import CardSquaredImage from "./card/CardSquaredImage";
import Link from "next/link";
import SpecialistInformation from "./card/SpecialistInformation";
import NoResults from "./NoResults";
import { fetchProfessionals } from "../lib/data";

const SpecialistList = async ({ specialty, name, insurance }: {
  specialty: string;
  name: string;
  insurance: string;
}) => {
  const professionals = await fetchProfessionals(specialty, name, insurance);

  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {!!professionals.length ? (
        professionals.map((person, index) => {
          return (
            <Card
              key={index}
              className={"bg-base-200"}
              leftSlot={<CardSquaredImage />}
              rightSlot={
                <div className="m-4 flex w-full flex-col">
                  <SpecialistInformation person={person} />
                  <Link
                    href={`/appointment/${person.id}/schedule`}
                    className="btn btn-h-10 btn-round mt-2 w-full border-none bg-white bg-opacity-40 font-medium text-primary"
                  >
                    Select
                  </Link>
                </div>
              }
            />
          );
        })
      ) : (
        <NoResults>
          <h3 className="my-4 text-lg">
            No encontramos resultados para tu búsqueda
          </h3>
          <p className="text-xs">
            Ingresá otra especialidad, nombre u obra social y volvé a intentar
            la bpusqueda.
          </p>
        </NoResults>
      )}
    </section>
  );
};

export default SpecialistList;
