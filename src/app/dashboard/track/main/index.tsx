"use client";

import TimerRow from "@/components/timer-row";
import UserPicker from "@/components/user-picker";
import WeekPick from "@/components/week-pick";
import { addDays, format, startOfWeek } from "date-fns";
import { useState } from "react";

function generateWeek(start_week: Date): Date[] {
  const weekArray: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startOfWeek(start_week), i);
    weekArray.push(currentDate);
  }
  weekArray.pop();
  weekArray.shift();
  return weekArray;
}

const Main = () => {
  const [week, setWeek] = useState<Date[]>(generateWeek(new Date()));

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <WeekPick
          onWeekChange={(from) => {
            setWeek(generateWeek(from));
          }}
        />
        <UserPicker label="Jussara viana" />
      </div>

      <div>
        {week.map((item) => (
          <TimerRow key={format(item, "yyyy-MM-dd")} date={item} />
        ))}
      </div>
    </>
  );
};

export default Main;
