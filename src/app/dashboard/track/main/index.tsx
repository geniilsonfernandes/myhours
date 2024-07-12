"use client";

import TimerRow from "@/components/timer-row";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPicker from "@/components/user-picker";
import WeekPick, { WeekPickRange } from "@/components/week-pick";
import useWeekDays from "@/hooks/useWeekDays";
import { IWorklog } from "@/types/models";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { endOfWeek, format, startOfWeek } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";

const fetcher = (...args: Parameters<typeof axios.get>) =>
  axios.get(...args).then((res) => res.data);

const getLogByPeriod = async (from: string, to: string) => {
  const response = await axios.get("/api/worklog", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};

const Main = () => {
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const weekDays = useWeekDays(selectedWeek);

  const { data, isLoading, isPending, refetch } = useQuery({
    queryKey: ["worklog", selectedWeek.from],
    queryFn: () => {
      return getLogByPeriod(
        format(selectedWeek.from, "yyyy-MM-dd"),
        format(selectedWeek.to, "yyyy-MM-dd"),
      );
    },
  });

  const findLog = (day: string) => {
    const findLog = data?.logs?.find(
      (log: IWorklog) => dayjs(log.date).format("YYYY-MM-DD") === day,
    );
    return {
      ...findLog,
    };
  };

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row">
          <WeekPick
            onWeekChange={(from, to) => {
              setSelectedWeek({ from, to });
            }}
          />
          <UserPicker label="Jussara viana" />
        </div>
        <div>
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger
                value="week"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Semana
              </TabsTrigger>
              <TabsTrigger
                value="day"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Dia
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
          <Skeleton className="h-40 w-full animate-pulse rounded-lg bg-slate-300" />
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {weekDays.map(({ day, weekDay }) => {
            if (weekDay === "sábado" || weekDay === "domingo") {
              return null;
            }
            return (
              <TimerRow
                key={day}
                day={day}
                isLoading={isLoading}
                log={findLog(day)}
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
