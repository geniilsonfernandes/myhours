"use client";

import { Calendar } from "@/components/ui/calendar";
import { formatMonth } from "@/utils/date-fns";
import { addDays, endOfWeek, isSameWeek, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type WeekPickRange = {
  from: Date;
  to: Date;
};

type WeekPickProps = {
  onWeekChange?: (from: Date, to: Date) => void;
};

const WeekPick = ({ onWeekChange }: WeekPickProps) => {
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: addDays(new Date(), 4),
  });

  const handleWeekChange = (type: "previous" | "next", e: React.MouseEvent) => {
    e.stopPropagation();
    const draft = {
      from: addDays(selectedWeek.from, type === "previous" ? -7 : 7),
      to: addDays(selectedWeek.to, type === "previous" ? -7 : 7),
    };

    setSelectedWeek(draft);
    onWeekChange?.(draft.from, draft.to);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="inline-flex w-[250px] cursor-pointer items-center justify-between gap-4 rounded-md border border-slate-300 text-sm text-slate-500">
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
                to: addDays(startOfWeek(day), 6),
              });
            }}
            onWeekNumberClick={(weekNumber, dates) => {
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
