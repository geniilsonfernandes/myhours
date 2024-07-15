"use client";

import { cn } from "@/lib/utils";
import { WorkSession } from "@/services/endpoints/workSessionsService";
import authStore from "@/services/store/auth";
import { WorkLog } from "@/types/models";
import {
  calculateExtraTime,
  calculateTotalWorking,
  minutesToTimeString,
} from "@/utils";
import { formatDate } from "@/utils/dates";
import { Hourglass, Timer } from "lucide-react";
import LogInputForm from "./log-input-form";
import TimerView from "./timer-view";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

type TimerRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
  isLoading?: boolean;
  fetching?: boolean;
  from?: string;
  sessions?: WorkSession;
};

const TimerRow = ({
  day,
  disabled,
  isLoading,
  sessions,
  fetching,
}: TimerRowProps) => {
  const { user } = authStore((state) => state);
  const date_id = formatDate(day, "YYYY-MM-DD");
  const log = sessions?.logs[date_id] || null;

  return (
    <div
      className={cn(
        "gap-6 rounded-lg bg-white p-4 shadow-lg shadow-slate-100 sm:flex-row sm:items-center",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div
        className="flex w-full items-center justify-between"
        aria-label="log header"
      >
        <TimerView
          label={formatDate(day, "ddd")}
          value={day ? formatDate(day, "DD MMMM") : ""}
        />
        <Badge
          className="inline-flex items-center gap-2 text-cyan-500"
          variant={"secondary"}
        >
          <Timer size={16} />
          {minutesToTimeString(
            user?.daily_work_hours! + user?.daily_work_minutes!,
          )}{" "}
          Horas por dia{" "}
        </Badge>
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
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100/50 text-green-500">
                <Hourglass strokeWidth={1} />
              </span>
              <TimerView
                label="tempo trabalhado"
                value={calculateTotalWorking({
                  break_end: log?.break_end || 0,
                  break_start: log?.break_start || 0,
                  end_time: log?.end_time || 0,
                  start_time: log?.start_time || 0,
                })}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100/50 text-cyan-500">
                <Timer strokeWidth={1} />
              </span>
              <TimerView
                label="tempo extra"
                value={calculateExtraTime({
                  break_end: log?.break_end || 0,
                  break_start: log?.break_start || 0,
                  end_time: log?.end_time || 0,
                  start_time: log?.start_time || 0,
                })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerRow;
