"use client";

import { cn } from "@/lib/utils";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import { WorkLog } from "@/types/models";
import { formatDate } from "@/utils/dates";
import LogInputForm from "./log-input-form";
import TimerView from "./timer-view";
import { Skeleton } from "./ui/skeleton";

type TimerRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
  isLoading?: boolean;
  from?: string;
  sessions?: WorkSession;
};

const TimerRow = ({
  day,

  disabled,
  isLoading,
  sessions,
}: TimerRowProps) => {
  const user_id = "31888f10-11a3-4701-bde6-efd0b9e8264a";

  const date_id = formatDate(day, "YYYY-MM-DD");

  const log = sessions?.logs[date_id] || null;
  return (
    <div
      className={cn(
        "gap-6 rounded-lg bg-white p-4 shadow-lg shadow-slate-100 sm:flex-row sm:items-center",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="" aria-label="log header">
        <TimerView
          label={formatDate(day, "ddd")}
          value={day ? formatDate(day, "DD MMMM") : ""}
        />
      </div>

      {isLoading && (
        <div className="sm mt-4 flex flex-col gap-4 sm:flex-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              className="h-[58px] w-full animate-pulse rounded-lg bg-slate-200 sm:w-[200px]"
              key={i}
            />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col gap-4 sm:flex-row">
            <LogInputForm
              key_id="start_time"
              value={log?.start_time === 0 ? 0 : log?.start_time || null}
              date_id={day}
              user_id={user_id}
              log_id={log?.id}
              isLoading={isLoading}
            />
            <LogInputForm
              key_id="break_start"
              value={log?.break_start === 0 ? 0 : log?.break_start || null}
              date_id={day}
              user_id={user_id}
              log_id={log?.id}
              isLoading={isLoading}
            />
            <LogInputForm
              key_id="break_end"
              value={log?.break_end === 0 ? 0 : log?.break_end || null}
              date_id={day}
              user_id={user_id}
              log_id={log?.id}
              isLoading={isLoading}
            />
            <LogInputForm
              key_id="end_time"
              value={log?.end_time === 0 ? 0 : log?.end_time || null}
              date_id={day}
              user_id={user_id}
              log_id={log?.id}
              isLoading={isLoading}
            />
          </div>
          <div>....</div>
        </div>
      )}
    </div>
  );
};

export default TimerRow;
