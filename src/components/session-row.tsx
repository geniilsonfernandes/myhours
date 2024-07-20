"use client";

import { cn } from "@/lib/utils";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import authStore from "@/services/store/auth";
import { WorkLog } from "@/types/models";
import { formatDate } from "@/utils/dates";
import LogInputForm from "./log-input-form";
import SessionStatus from "./session-status";
import TimerView from "./timer-view";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type SessionRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
  isLoading?: boolean;
  fetching?: boolean;
  from?: string;
  sessions?: WorkSession;
};

const SessionRow = ({
  day,
  disabled,
  isLoading,
  sessions,
  fetching,
}: SessionRowProps) => {
  const { user } = authStore((state) => state);
  const date_id = formatDate(day, "YYYY-MM-DD");
  const log = sessions?.logs[date_id] || null;

  return (
    <Card
      className={cn(
        "gap sm:flex-row sm:items-center",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <CardHeader className="flex flex-col">
        <TimerView
          label={formatDate(day, "ddd")}
          value={day ? formatDate(day, "DD MMMM") : ""}
        />
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="sm flex flex-col gap-4 sm:flex-row">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                className="h-[58px] w-full animate-pulse rounded-lg bg-slate-200 sm:w-[200px]"
                key={i}
              />
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col gap-4 sm:flex-row">
              <LogInputForm
                key_id="start_time"
                value={log?.start_time}
                date_id={day}
                user_id={user?.id}
                log_id={log?.id}
                isLoading={isLoading}
                disabled={fetching}
                log={{
                  start_time: log?.start_time || 0,
                  end_time: log?.end_time || 0,
                  break_start: log?.break_start || 0,
                  break_end: log?.break_end || 0,
                }}
              />
              <LogInputForm
                key_id="break_start"
                value={log?.break_start}
                date_id={day}
                user_id={user?.id}
                log_id={log?.id}
                isLoading={isLoading}
                disabled={fetching}
                log={{
                  start_time: log?.start_time || 0,
                  end_time: log?.end_time || 0,
                  break_start: log?.break_start || 0,
                  break_end: log?.break_end || 0,
                }}
              />
              <LogInputForm
                key_id="break_end"
                value={log?.break_end}
                date_id={day}
                user_id={user?.id}
                log_id={log?.id}
                isLoading={isLoading}
                disabled={fetching}
                log={{
                  start_time: log?.start_time || 0,
                  end_time: log?.end_time || 0,
                  break_start: log?.break_start || 0,
                  break_end: log?.break_end || 0,
                }}
              />
            </div>
            <LogInputForm
              key_id="end_time"
              value={log?.end_time}
              date_id={day}
              user_id={user?.id}
              log_id={log?.id}
              isLoading={isLoading}
              disabled={fetching}
              log={{
                start_time: log?.start_time || 0,
                end_time: log?.end_time || 0,
                break_start: log?.break_start || 0,
                break_end: log?.break_end || 0,
              }}
            />
            <div className="mt-4 flex gap-4 border-slate-200 sm:mt-0 sm:border-l sm:pl-4">
              <SessionStatus
                break_end={log?.break_end}
                break_start={log?.break_start}
                end_time={log?.end_time}
                start_time={log?.start_time}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionRow;
