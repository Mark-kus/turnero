import React from "react";
import DatePicker from "@/app/ui/slotPicker/DatePicker";
import HourPicker from "@/app/ui/slotPicker/HourPicker";
import SlotPickerNavigation from "@/app/ui/slotPicker/SlotPickerNavigation";
import { ISODate } from "@/app/types";

const ScheduleForm = ({
  professional_id,
  appointment_id,
  date,
  time,
}: {
  professional_id: number;
  appointment_id?: number;
  date: ISODate;
  time: string;
}) => {
  return (
    <>
      <div className="flex gap-4">
        <DatePicker date={date} />
        <HourPicker professional_id={professional_id} date={date} appointment_id={appointment_id} />
      </div>
      <SlotPickerNavigation date={date} time={time} />
    </>
  );
};

export default ScheduleForm;
