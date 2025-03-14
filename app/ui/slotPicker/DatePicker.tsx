"use client";

import React, { useState } from "react";
import leftThinArrow from "@public/arrow/thin/left.svg";
import rightThinArrow from "@public/arrow/thin/right.svg";
import { workSans } from "@/app/ui/fonts";
import { capitalize, getDateByISODate, getISODate } from "@/app/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ISODate } from "@/app/types";

const DatePicker = ({ date }: { date: ISODate }) => {
  const [currentMonth, setCurrentMonth] = useState(getDateByISODate(date));
  const [selectedDate, setSelectedDate] = useState(getDateByISODate(date));
  const { replace } = useRouter();
  const pathname = usePathname();

  const previousMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );

  const formatMonth = (date: Date) => {
    return date.toLocaleString("en", { month: "long" });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString("en", { month: "long", year: "numeric" });
  };

  const onDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = getISODate(date);
    replace(`${pathname}?date=${formattedDate}`, { scroll: false });
  };

  return (
    <section className="flex w-2/3 max-w-md flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-6 text-3xl leading-none">Seleccione una fecha</h2>
      <div role="tablist" className="tabs w-full justify-between">
        <button
          role="tab"
          className="tab p-0 text-primary"
          onClick={() => setCurrentMonth(previousMonth)}
        >
          <span className="mr-1">
            <img
              src={leftThinArrow.src}
              alt="Left thin arrow"
              width={6}
              height={6}
            />
          </span>
          {capitalize(formatMonth(previousMonth))}
        </button>
        <button
          role="tab"
          className="tab tab-active p-0 text-lg font-bold text-primary"
        >
          {capitalize(formatMonthYear(currentMonth))}
        </button>
        <button
          role="tab"
          className="tab items-center p-0 text-primary"
          onClick={() => setCurrentMonth(nextMonth)}
        >
          {capitalize(formatMonth(nextMonth))}
          <span className="ml-1">
            <img
              src={rightThinArrow.src}
              alt="Right thin arrow"
              width={6}
              height={6}
            />
          </span>
        </button>
      </div>
      <ul className={`${workSans.className} max-h-2xl w-full overflow-y-auto`}>
        {Array.from(
          {
            length: new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1,
              0,
            ).getDate(),
          },
          (_, day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day + 1,
            );

            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            return (
              <li key={day} className="my-4">
                <button
                  className={`btn btn-outline btn-primary btn-round w-full border-none font-medium ${
                    isSelected && "bg-primary text-white!"
                  }`}
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
