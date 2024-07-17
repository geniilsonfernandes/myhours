import SessionButton from "@/components/session-button";
import TimerView from "@/components/timer-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useClock from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import useWorkSession from "@/services/query/useWorkSession";
import authStore from "@/services/store/auth";
import { formatDate } from "@/utils/dates";
import { format } from "date-fns";
import { Clock, CornerRightDown, CornerRightUp, Utensils } from "lucide-react";

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
  const {
    data: workSession,
    isFetching,
    isLoading,
  } = useWorkSession({
    day: format(selectedDay, "yyyy-MM-dd"),
  });

  return (
    <Card className={cn("gap-6 sm:flex-row sm:items-center")}>
      <div
        className="flex w-full items-center justify-between"
        aria-label="log header"
      >
        <TimerView
          label={formatDate(selectedDay, "ddd")}
          value={selectedDay ? formatDate(selectedDay, "DD MMMM") : ""}
        />
        <div className="mt-1 flex items-center gap-1">
          <Clock className="text-slate-500" size={16} />
          <p className="text-sm text-slate-500">{formattedTime}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <SessionButton
          isLoading={isFetching || isLoading}
          disabled={isFetching || isLoading}
          label="Entrada"
          showClock
          value={workSession?.log?.start_time}
          icon={<CornerRightDown className="text-slate-500" />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="start_time"
        />
        <SessionButton
          isLoading={isFetching || isLoading}
          disabled={isFetching || isLoading}
          label="Intervalo"
          color="blue"
          value={workSession?.log?.break_start}
          icon={<Utensils />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="break_start"
        />
        <SessionButton
          isLoading={isFetching || isLoading}
          disabled={isFetching || isLoading}
          label="Fim Intervalo"
          color="blue"
          value={workSession?.log?.break_end}
          icon={<Utensils />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="break_end"
        />
        <SessionButton
          isLoading={isFetching || isLoading}
          disabled={isFetching || isLoading}
          label="Saida"
          color="red"
          value={workSession?.log?.end_time}
          icon={<CornerRightUp className="text-slate-500" />}
          log_id={workSession?.log?.id}
          user_id={user?.id}
          date_id={date_id}
          key_id="end_time"
        />
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between gap-2 sm:justify-start">
        <Button>Adicionar falta</Button>
        <Button variant="ghost">Adicionar observação</Button>
      </div>
    </Card>
  );
};

export default SessionDay;
