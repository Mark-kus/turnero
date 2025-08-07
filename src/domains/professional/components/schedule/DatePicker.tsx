"use client";

import React, {useState} from "react";
import leftThinArrow from "@public/arrow/thin/left.svg";
import rightThinArrow from "@public/arrow/thin/right.svg";
import {usePathname, useRouter} from "next/navigation";

import {workSans} from "@/shared/styles/fonts";
import {DateOnly} from "@/shared/types/common";
import {DateUtils} from "@/shared/utils/DateUtils";
import {capitalize} from "@/shared/utils/format";

const {getFullDateByDateOnly, getDateOnlyByFullDate} = DateUtils;

const DatePicker = ({date}: {date: DateOnly}) => {
  const [currentMonth, setCurrentMonth] = useState(getFullDateByDateOnly(date));
  const [selectedDate, setSelectedDate] = useState(getFullDateByDateOnly(date));
  const {replace} = useRouter();
  const pathname = usePathname();

  const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  const formatMonth = (date: Date) => {
    return date.toLocaleString("en", {month: "long"});
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString("en", {month: "long", year: "numeric"});
  };

  const onDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = getDateOnlyByFullDate(date);

    replace(`${pathname}?date=${formattedDate}`, {scroll: false});
  };

  return (
    <section className="bg-neutral flex w-2/3 max-w-md flex-col items-start rounded-md p-8">
      <h2 className="mb-6 text-3xl leading-none">Seleccione una fecha</h2>
      <div className="tabs w-full justify-between" role="tablist">
        <button
          className="tab text-primary p-0"
          role="tab"
          onClick={() => setCurrentMonth(previousMonth)}
        >
          <span className="mr-1">
            <img alt="Left thin arrow" height={6} src={leftThinArrow.src} width={6} />
          </span>
          {capitalize(formatMonth(previousMonth))}
        </button>
        <button className="tab tab-active text-primary p-0 text-lg font-bold" role="tab">
          {capitalize(formatMonthYear(currentMonth))}
        </button>
        <button
          className="tab text-primary items-center p-0"
          role="tab"
          onClick={() => setCurrentMonth(nextMonth)}
        >
          {capitalize(formatMonth(nextMonth))}
          <span className="ml-1">
            <img alt="Right thin arrow" height={6} src={rightThinArrow.src} width={6} />
          </span>
        </button>
      </div>
      <ul className={`${workSans.className} max-h-2xl w-full overflow-y-auto`}>
        {Array.from(
          {
            length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate(),
          },
          (_, day) => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day + 1);

            const isSelected = selectedDate?.toDateString() === date.toDateString();

            return (
              <li key={day} className="my-4">
                <button
                  className={`btn btn-outline btn-primary btn-round w-full border-none font-medium ${
                    isSelected && "bg-primary text-white!"
                  }`}
                  disabled={date < new Date() || date.getMonth() !== currentMonth.getMonth()}
                  type="button"
                  onClick={() => onDateSelect(date)}
                >
                  {capitalize(
                    date.toLocaleString("en", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    }),
                  )}
                </button>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
};

export default DatePicker;
