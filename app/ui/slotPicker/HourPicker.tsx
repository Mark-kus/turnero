import { fetchAvailableSlots } from "@/app/lib/data";
import React from "react";
import NoResults from "@/app/ui/NoResults";
import HourOptions from "@/app/ui/slotPicker/HourOptions";
import { ISODate } from "@/app/types";

const HourPicker = async ({
  professional_id,
  date,
}: {
  professional_id: number;
  date: ISODate;
}) => {
  const { morningSlots, afternoonSlots } =
    await fetchAvailableSlots(professional_id, date);

  if (!morningSlots.length && !afternoonSlots.length) {
    return (
      <NoResults>
        <h2 className="mt-4 font-bold">No hay horarios disponibles</h2>
        <p className="mb-4 text-sm">Por favor, seleccioná otro día.</p>
      </NoResults>
    );
  }

  return (
    <section className="flex w-full flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-4 text-3xl leading-none">Seleccione un horario</h2>
      <div className="max-h-2xl w-full overflow-y-auto">
        <HourOptions
          morningSlots={morningSlots}
          afternoonSlots={afternoonSlots}
        />
      </div>
    </section>
  );
};

export default HourPicker;
