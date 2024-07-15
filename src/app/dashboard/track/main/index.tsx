"use client";

import TimerRow from "@/components/timer-row";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPicker from "@/components/user-picker";
import WeekPick, { WeekPickRange } from "@/components/week-pick";
import useWeekDays from "@/hooks/useWeekDays";
import useWorkSessions from "@/services/query/useWorkSessions";
import authStore from "@/services/store/auth";
import { formatDate } from "@/utils/dates";

import { endOfWeek, format, startOfWeek } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const Main = () => {
  const { user } = authStore();
  const [tab, setTab] = useState<"week" | "day">("week");
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });

  const weekDays = useWeekDays(selectedWeek);

  const { data, isLoading, isFetching } = useWorkSessions({
    from: format(selectedWeek.from, "yyyy-MM-dd"),
    to: format(selectedWeek.to, "yyyy-MM-dd"),
  });

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row">
          <WeekPick
            onWeekChange={(from, to) => {
              setSelectedWeek({ from, to });
            }}
          />
          <UserPicker label={user?.name} />
        </div>
        <div className="flex items-center gap-4">
          {isFetching && <LoaderCircle className="animate-spin" size={16} />}
          <Tabs defaultValue={"week"} value={tab}>
            <TabsList>
              <TabsTrigger
                value="week"
                onClick={() => setTab("week")}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Semana
              </TabsTrigger>
              <TabsTrigger
                value="day"
                onClick={() => setTab("day")}
                className="text-zinc-600 dark:text-zinc-200"
              >
                Dia
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {tab === "week" ? (
        <div className="grid grid-cols-1 gap-2">
          {weekDays.map(({ day, weekDay }) => {
            if (weekDay === "sábado" || weekDay === "domingo") {
              return null;
            }
            return (
              <TimerRow
                sessions={data}
                key={day}
                day={day}
                fetching={isFetching}
                isLoading={isLoading}
                from={format(selectedWeek.from, "yyyy-MM-dd")}
                disabled={weekDay === "sábado" || weekDay === "domingo"}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {weekDays.map(({ day, weekDay }) => {
            if (
              formatDate(day, "yyyy-MM-dd") !==
              formatDate(new Date(), "yyyy-MM-dd")
            ) {
              return null;
            }
            return (
              <TimerRow
                sessions={data}
                key={day}
                day={day}
                fetching={isFetching}
                isLoading={isLoading}
                from={format(selectedWeek.from, "yyyy-MM-dd")}
                disabled={weekDay === "sábado" || weekDay === "domingo"}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Main;
