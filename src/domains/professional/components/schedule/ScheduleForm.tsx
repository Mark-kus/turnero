import DatePicker from "@/professional/components/schedule/DatePicker";
import HourPicker from "@/professional/components/schedule/HourPicker";
import SlotPickerNavigation from "@/professional/components/schedule/SlotPickerNavigation";
import {DateOnly} from "@/shared/types/common";

const ScheduleForm = ({
  professionalId,
  appointmentId,
  date,
  time,
}: {
  professionalId: number;
  appointmentId?: number;
  date: DateOnly;
  time: string;
}) => {
  return (
    <>
      <div className="flex gap-4">
        <DatePicker date={date} />
        <HourPicker appointmentId={appointmentId} date={date} professionalId={professionalId} />
      </div>
      <SlotPickerNavigation date={date} time={time} />
    </>
  );
};

export default ScheduleForm;
