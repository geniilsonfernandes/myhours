import SessionButton from "@/components/session-button";
import SessionStatus from "@/components/session-status";
import TimerView from "@/components/timer-view";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useClock from "@/hooks/useClock";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import useWorkSession from "@/services/query/useWorkSession";
import authStore from "@/services/store/auth";
import { formatDate } from "@/utils/dates";
import { format } from "date-fns";
import { CornerRightDown, CornerRightUp, Utensils } from "lucide-react";

type SessionDayProps = {
  selectedDay: Date;
  data?: WorkSession;
  isLoading: boolean;
  isFetching: boolean;
};

const SessionDay = ({ selectedDay }: SessionDayProps) => {
  const { user } = authStore((state) => state);
  const { formattedTime } = useClock();
  const date_id = formatDate(selectedDay, "YYYY-MM-DD");
  const { data: workSession, isLoading } = useWorkSession({
    day: format(selectedDay, "yyyy-MM-dd"),
  });

  return (
    <Card className="gap-6 sm:flex-row sm:items-center">
      <CardHeader>
        <TimerView
          label={formatDate(selectedDay, "ddd")}
          value={selectedDay ? formatDate(selectedDay, "DD MMMM") : ""}
        />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <SessionButton
          isLoading={isLoading}
          disabled={isLoading}
          label="Entrada"
          value={workSession?.log?.start_time}
          icon={<CornerRightDown size={18} />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="start_time"
        />
        <SessionButton
          isLoading={isLoading}
          disabled={isLoading}
          label="Intervalo"
          color="blue"
          value={workSession?.log?.break_start}
          icon={<Utensils size={18} />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="break_start"
        />
        <SessionButton
          isLoading={isLoading}
          disabled={isLoading}
          label="Fim Intervalo"
          color="blue"
          value={workSession?.log?.break_end}
          icon={<Utensils size={18} />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="break_end"
        />
        <SessionButton
          isLoading={isLoading}
          disabled={isLoading}
          label="Saida"
          color="red"
          value={workSession?.log?.end_time}
          icon={<CornerRightUp size={18} />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="end_time"
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <SessionStatus
          break_end={workSession?.log?.break_end}
          break_start={workSession?.log?.break_start}
          start_time={workSession?.log?.start_time}
          end_time={workSession?.log?.end_time}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default SessionDay;
