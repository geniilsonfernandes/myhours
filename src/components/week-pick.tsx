"use client";

import { Calendar } from "@/components/ui/calendar";
import { formatMonth } from "@/utils/date-fns";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import MonthControl from "./month-control";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type WeekPickRange = {
  from: Date;
  to: Date;
};

type WeekPickProps = {
  onWeekChange?: (from: Date, to: Date) => void;
  onDayChange?: (day: Date) => void;

  mode?: "single" | "range";
};

const WeekPick = ({
  onWeekChange,
  mode = "range",
  onDayChange,
}: WeekPickProps) => {
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const [selectDay, setSelectDay] = useState<Date>(new Date());

  const handleWeekChange = (type: "previous" | "next") => {
    const days =
      mode === "range"
        ? type === "previous"
          ? -7
          : 7
        : type === "previous"
          ? -1
          : 1;

    const draft = {
      from: addDays(selectedWeek.from, type === "previous" ? days : days),
      to: addDays(selectedWeek.to, type === "previous" ? days : days),
    };
    const newDay = addDays(selectDay, type === "previous" ? days : days);
    setSelectDay(newDay);
    onWeekChange?.(draft.from, draft.to);
    setSelectedWeek(draft);
    onDayChange?.(newDay);
  };

  const handleSetThisWeek = () => {
    onWeekChange?.(startOfWeek(new Date()), endOfWeek(new Date()));
    setSelectedWeek({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    });
    onDayChange?.(new Date());

    setSelectDay(new Date());
  };

  const dateformated =
    mode === "range"
      ? `
        ${formatMonth(startOfWeek(selectedWeek?.from))} -
        ${formatMonth(endOfWeek(selectedWeek?.to))}
      `
      : formatMonth(selectDay);

  return (
    <div className="flex w-full items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-[350px]">
            <MonthControl
              dateformated={dateformated}
              handleWeekChange={handleWeekChange}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            modifiers={{
              ...(mode === "range"
                ? { selected: selectedWeek }
                : {
                    selectDay: selectDay,
                  }),
            }}
            selected={selectDay}
            onDayClick={(day, modifiers) => {
              if (modifiers.selected) {
                return;
              }

              onDayChange?.(day);

              setSelectDay(day);
              onWeekChange?.(startOfWeek(day), endOfWeek(day));
              setSelectedWeek({
                from: startOfWeek(day),
                to: endOfWeek(day),
              });
            }}
          />
        </PopoverContent>
      </Popover>
      <Button
        onClick={handleSetThisWeek}
        className="h-14 w-14 bg-white hover:bg-slate-100"
      >
        <RotateCcw size={16} className="text-slate-500" />
      </Button>
    </div>
  );
};

export default WeekPick;
