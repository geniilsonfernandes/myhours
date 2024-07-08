"use client";

import TimerRow from "@/components/timer-row";
import UserPicker from "@/components/user-picker";
import WeekPick, { WeekPickRange } from "@/components/week-pick";
import useWeekDays from "@/hooks/useWeekDays";
import { IWorklog } from "@/types/models";

import axios from "axios";
import { endOfWeek, format, startOfWeek } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof axios.get>) =>
  axios.get(...args).then((res) => res.data);

const Main = () => {
  const [selectedWeek, setSelectedWeek] = useState<WeekPickRange>({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const weekDays = useWeekDays(selectedWeek);

  const { data, isLoading } = useSWR(
    `/api/worklog?from=${format(selectedWeek.from, "yyyy-MM-dd")}&to=${format(
      selectedWeek.to,
      "yyyy-MM-dd",
    )}`,
    fetcher,
    {
      onSuccess(data, key, config) {
        console.log(data);
      },
    },
  );

  const findLog = (day: string) => {
    const findLog = data?.logs?.find(
      (log: IWorklog) => dayjs(log.date).format("YYYY-MM-DD") === day,
    );

    return {
      ...findLog,
    };
  };

  console.log(weekDays);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <WeekPick
          onWeekChange={(from, to) => {
            setSelectedWeek({ from, to });
          }}
        />
        <UserPicker label="Jussara viana" />
      </div>
      <div className="grid grid-cols-1 gap-6">
        {!isLoading &&
          weekDays.map(({ day, weekDay }) => {
            if (weekDay === "sabado" || weekDay === "domingo") return null;
            return (
              <TimerRow
                key={day}
                day={day}
                log={findLog(day)}
                disabled={weekDay === "Saturday" || weekDay === "Sunday"}
              />
            );
          })}
      </div>
    </>
  );
};

export default Main;
