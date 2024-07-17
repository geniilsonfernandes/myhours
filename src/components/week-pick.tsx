"use client";

import { Calendar } from "@/components/ui/calendar";
import { formatMonth } from "@/utils/date-fns";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
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

  const handleWeekChange = (type: "previous" | "next", e: React.MouseEvent) => {
    e.stopPropagation();

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

  return (
    <div className="flex w-full items-center gap-4">
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border border-input text-sm text-slate-500 sm:w-[250px]">
            <div
              onClick={handleWeekChange.bind(null, "previous")}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
            >
              <ChevronLeft />
            </div>
            <span>
              {mode === "range" ? (
                <>
                  {formatMonth(startOfWeek(selectedWeek?.from))} -{" "}
                  {formatMonth(endOfWeek(selectedWeek?.to))}
                </>
              ) : (
                formatMonth(selectDay)
              )}
            </span>
            <div
              onClick={handleWeekChange.bind(null, "next")}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
            >
              <ChevronRight />
            </div>
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
      <Button onClick={handleSetThisWeek} variant="outline">
        <RotateCcw size={16} className="text-slate-500" />
      </Button>
    </div>
  );
};

export default WeekPick;
