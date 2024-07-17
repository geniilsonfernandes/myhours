import SessionRow from "@/components/session-row";
import { WeekPickRange } from "@/components/week-pick";
import useWeekDays from "@/hooks/useWeekDays";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import { format } from "date-fns";

type WeekDaysProps = {
  selectedWeek: WeekPickRange;
  data?: WorkSession;
  isLoading: boolean;
  isFetching: boolean;
};
const WeekDays = ({
  selectedWeek,
  data,
  isLoading,
  isFetching,
}: WeekDaysProps) => {
  const weekDays = useWeekDays(selectedWeek);
  return (
    <div className="grid grid-cols-1 gap-2">
      {weekDays.map(({ day, weekDay }) => {
        if (weekDay === "sábado" || weekDay === "domingo") {
          return null;
        }
        return (
          <SessionRow
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
  );
};

export default WeekDays;
