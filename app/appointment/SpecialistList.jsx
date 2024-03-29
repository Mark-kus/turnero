import React from "react";
import Card from "../ui/card/Card";
import CardSquaredImage from "../ui/card/CardSquaredImage";
import Link from "next/link";
import SpecialistInformation from "../ui/card/SpecialistInformation";
import { specialists } from "../seeds";

const SpecialistList = () => {
  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {specialists.map((person, index) => {
        return (
          <Card
            key={index}
            leftSlot={<CardSquaredImage />}
            rightSlot={
              <div className="m-4 flex w-full flex-col">
                <SpecialistInformation person={person} />
                <Link
                  href={`/appointment/${person.id}`}
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
