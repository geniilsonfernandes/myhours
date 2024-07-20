import { calculateExtraTime, calculateTotalWorking } from "@/utils";
import { Hourglass, Timer } from "lucide-react";
import TimerView from "./timer-view";

type SessionStatusProps = {
  break_end?: number;
  break_start?: number;
  end_time?: number;
  start_time?: number;
  isLoading?: boolean;
};

const SessionStatus = ({
  break_end = 0,
  break_start = 0,
  end_time = 0,
  start_time = 0,
  isLoading = false,
}: SessionStatusProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100/50 text-green-500">
          <Hourglass size={18} />
        </span>
        <TimerView
          label="tempo trabalhado"
          value={calculateTotalWorking({
            break_end,
            break_start,
            end_time,
            start_time,
          })}
          isLoading={isLoading}
          fallbackValue="calculando..."
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100/50 text-cyan-500">
          <Timer size={18} />
        </span>
        <TimerView
          label="tempo extra"
          value={calculateExtraTime({
            break_end,
            break_start,
            end_time,
            start_time,
          })}
          isLoading={isLoading}
          fallbackValue="calculando..."
        />
      </div>
    </>
  );
};

export default SessionStatus;
