"use client";

import { Calendar } from "@/components/ui/calendar";
import { formatMonth } from "@/utils/date-fns";
import { addDays, endOfWeek, isSameWeek, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type WeekPickRange = {
  from: Date;
  to: Date;
};

type WeekPickProps = {
  onWeekChange?: (from: Date, to: Date) => void;
  weekPickRange?: WeekPickRange;
  selectedWeek?: WeekPickRange;
};

const WeekPick = ({ onWeekChange }: WeekPickProps) => {
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });

  const handleWeekChange = (type: "previous" | "next", e: React.MouseEvent) => {
    e.stopPropagation();
    const draft = {
      from: addDays(selectedWeek.from, type === "previous" ? -7 : 7),
      to: addDays(selectedWeek.to, type === "previous" ? -7 : 7),
    };

    onWeekChange?.(draft.from, draft.to);
    setSelectedWeek(draft);
  };

  const handleSetThisWeek = () => {
    onWeekChange?.(startOfWeek(new Date()), endOfWeek(new Date()));
    setSelectedWeek({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    });
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Button
        onClick={handleSetThisWeek}
        className="border border-slate-300 p-4"
        variant="outline"
      >
        <Home strokeWidth={1} size={16} />
      </Button>
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border border-slate-300 text-sm text-slate-500 sm:w-[250px]">
            <div
              onClick={handleWeekChange.bind(null, "previous")}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
            >
              <ChevronLeft strokeWidth={1} />
            </div>
            <span>
              {formatMonth(startOfWeek(selectedWeek?.from ?? new Date()))} -{" "}
              {formatMonth(endOfWeek(selectedWeek?.to ?? new Date()))}
            </span>
            <div
              onClick={handleWeekChange.bind(null, "next")}
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
            >
              <ChevronRight strokeWidth={1} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            modifiers={{
              selected: selectedWeek,
            }}
            onDayClick={(day, modifiers) => {
              if (modifiers.selected) {
                return;
              }
              onWeekChange?.(startOfWeek(day), endOfWeek(day));
              setSelectedWeek({
                from: startOfWeek(day),
                to: endOfWeek(day),
              });
            }}
            onWeekNumberClick={(_, dates) => {
              if (
                selectedWeek?.from &&
                isSameWeek(dates[0], selectedWeek.from)
              ) {
                return;
              }

              onWeekChange?.(
                startOfWeek(dates[0]),
                endOfWeek(dates[dates.length - 1]),
              );
              setSelectedWeek({
                from: startOfWeek(dates[0]),
                to: endOfWeek(dates[dates.length - 1]),
              });
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WeekPick;
