import React from "react";
import DatePicker from "@/app/ui/slotPicker/DatePicker";
import HourPicker from "@/app/ui/slotPicker/HourPicker";
import SlotPickerNavigation from "@/app/ui/slotPicker/SlotPickerNavigation";

const ScheduleForm = ({
  professional_id,
  date,
  time,
}: {
  professional_id: number;
  date: Date;
  time: string;
}) => {
  return (
    <>
      <div className="flex gap-4">
        <DatePicker date={date} />
        <HourPicker professional_id={professional_id} date={date} />
      </div>
      <SlotPickerNavigation date={date} time={time} />
    </>
  );
};

export default ScheduleForm;
