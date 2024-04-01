import React from "react";
import Card from "./card/Card";
import CardSquaredImage from "./card/CardSquaredImage";
import Link from "next/link";
import SpecialistInformation from "./card/SpecialistInformation";
import { fetchProfessionals } from "../lib/data/professionals";

const SpecialistList = async () => {
  const specialists = await fetchProfessionals();

  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {specialists.map((person, index) => {
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
                  className="btn-h-10 btn-round btn mt-2 w-full border-none bg-white bg-opacity-40 font-medium text-primary"
                >
                  Select
                </Link>
              </div>
            }
          />
        );
      })}
    </section>
  );
};

export default SpecialistList;
