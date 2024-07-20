"use client";


import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeekPick, { WeekPickRange } from "@/components/week-pick";
import useWorkSessions from "@/services/query/useWorkSessions";

import { endOfWeek, format, startOfWeek } from "date-fns";
import { CalendarCheck, CalendarRange } from "lucide-react";
import { useState } from "react";
import SessionDay from "./session-day";
import WeekDays from "./week-days";

const Main = () => {
  const [tab, setTab] = useState<"week" | "day">("day");
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const [selectDay, setSelectDay] = useState<Date>(new Date());

  const { data, isLoading, isFetching } = useWorkSessions({
    from: format(selectedWeek.from, "yyyy-MM-dd"),
    to: format(selectedWeek.to, "yyyy-MM-dd"),
  });

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Tabs defaultValue={"week"} value={tab} className="w-full">
            <TabsList>
              <TabsTrigger
                value="day"
                onClick={() => setTab("day")}
                className="text-zinc-600 dark:text-zinc-200"
              >
                <CalendarCheck size={18} className="mr-2" /> Hoje
              </TabsTrigger>
              <TabsTrigger
                value="week"
                onClick={() => setTab("week")}
                className="text-zinc-600 dark:text-zinc-200"
              >
                <CalendarRange size={18} className="mr-2" /> Semana
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <WeekPick
            onWeekChange={(from, to) => {
              setSelectedWeek({ from, to });
            }}
            onDayChange={setSelectDay}
            mode={tab === "week" ? "range" : "single"}
          />
        </div>
      </div>
      {tab === "week" ? (
        <WeekDays
          selectedWeek={selectedWeek}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      ) : (
        <SessionDay
          selectedDay={selectDay}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default Main;
