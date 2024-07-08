import { WeekPickRange } from "@/components/week-pick";
import dayjs from "dayjs";
import { useMemo } from "react";

const useWeekDays = (selectedWeek: WeekPickRange) => {
  return useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs(selectedWeek.from).add(i, "day").format("YYYY-MM-DD");
      days.push({ day, weekDay: dayjs(day).format("dddd") });
    }
    return days;
  }, [selectedWeek]);
};

export default useWeekDays;
