"use client";

import { cn } from "@/lib/utils";
import { WorkLog } from "@/types/models";
import { formatDate } from "@/utils/dates";
import LogInputForm from "./log-input-form";
import TimerView from "./timer-view";

type TimerRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
  isLoading?: boolean;
  from?: string;
};

const TimerRow = ({ day, log, disabled, isLoading }: TimerRowProps) => {
  const user_id = "31888f10-11a3-4701-bde6-efd0b9e8264a";

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

      <div className="sm mt-4 flex gap-4">
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
    </div>
  );
};

export default TimerRow;
