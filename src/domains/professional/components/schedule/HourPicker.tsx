import NoResults from "@/shared/components/NoResults";
import HourOptions from "@/professional/components/schedule/HourOptions";
import {DateOnly} from "@/shared/types/common";
import {VercelProfessionalReadModel} from "@/professional/adapters/vercel-professional.readmodel";

const repository = new VercelProfessionalReadModel();

const HourPicker = async ({
  professionalId,
  date,
  appointmentId,
}: {
  professionalId: number;
  date: DateOnly;
  appointmentId?: number;
}) => {
  const {morningSlots, afternoonSlots} = await repository.getProfessionalAvailability(
    professionalId,
    date,
    appointmentId,
  );

  if (!morningSlots.length && !afternoonSlots.length) {
    return (
      <NoResults>
        <h2 className="mt-4 font-bold">No hay horarios disponibles</h2>
        <p className="mb-4 text-sm">Por favor, seleccioná otro día.</p>
      </NoResults>
    );
  }

  return (
    <section className="bg-neutral flex w-full flex-col items-start rounded-md p-8">
      <h2 className="mb-4 text-3xl leading-none">Seleccione un horario</h2>
      <div className="max-h-2xl w-full overflow-y-auto">
        {!!morningSlots.length && (
          <div className="w-full">
            <h4 className="mt-2 mb-2">Morning</h4>
            <HourOptions slots={morningSlots} />
          </div>
        )}
        {!!afternoonSlots.length && (
          <div className="w-full">
            <h4 className="mt-6 mb-2">Afternoon</h4>
            <HourOptions slots={afternoonSlots} />
          </div>
        )}
      </div>
    </section>
  );
};

export default HourPicker;
