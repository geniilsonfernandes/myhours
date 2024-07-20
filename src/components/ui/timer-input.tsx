import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useCallback, useEffect, useRef, useState } from "react";

const timerInputVariants = cva(
  "h-20 w-20 rounded-sm bg-gray-100 p-1 text-center text-4xl border border-gray-100 focus:outline-primary focus:ring-1 focus:ring-primary",
  {
    variants: {
      variant: {
        default: "text-slate-500",
        valid: "text-green-500",
        invalid: "text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type onChangeProps = {
  hours: string;
  minutes: string;
  timestamp: number;
};

type TimerInputProps = {
  value?: {
    hours: string;
    minutes: string;
  };
  onChange?: (e: onChangeProps) => void;
  variant?: "valid" | "invalid" | "default";
};

const TimerInput = ({ variant, onChange, value }: TimerInputProps) => {
  const [values, setValues] = useState({
    hours: value?.hours || "",
    minutes: value?.minutes || "",
  });
  const inputRefHours = useRef<HTMLInputElement>(null);
  const inputRefMinutes = useRef<HTMLInputElement>(null);

  const reFofus = (focusTo: "hours" | "minutes") => {
    focusTo === "hours"
      ? inputRefHours.current?.focus()
      : inputRefMinutes.current?.focus();
  };

  const onChangeHours = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumbers = value.replace(/[^0-9]/g, "");

      if (+onlyNumbers >= 24) {
        return;
      }

      if (value.length > 2) {
        reFofus("minutes");
        return;
      }

      setValues((prev) => ({ ...prev, hours: onlyNumbers }));
    },
    [],
  );

  const onChangeMinutes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      if (+onlyNumbers > 59) {
        return;
      }
      if (value.length > 2) {
        inputRefMinutes.current?.blur();
        return;
      }

      if (value.length === 0) {
        reFofus("hours");
      }

      setValues((prev) => ({ ...prev, minutes: value }));
    },
    [],
  );

  useEffect(() => {
    onChange &&
      onChange({
        hours: values.hours,
        minutes: values.minutes,
        timestamp: +values.hours * 60 * 60 + +values.minutes * 60,
      });
  }, [values, onChange]);

  return (
    <div className="flex items-center gap-2 text-slate-500">
      <input
        type="number"
        className={cn(timerInputVariants({ variant }))}
        placeholder="00"
        value={values.hours}
        ref={inputRefHours}
        onChange={onChangeHours}
        onBlur={(e) => {
          if (e.target.value.length === 1) {
            setValues((prev) => ({ ...prev, hours: `0${e.target.value}` }));
            return;
          }
        }}
      />
      <span className="text-4xl">:</span>
      <input
        type="number"
        className={cn(timerInputVariants({ variant }))}
        placeholder="00"
        ref={inputRefMinutes}
        onChange={onChangeMinutes}
        value={values.minutes}
        onBlur={(e) => {
          if (e.target.value.length === 1) {
            setValues((prev) => ({ ...prev, minutes: `0${e.target.value}` }));
            return;
          }
        }}
      />
      <div className="flex h-20 flex-col justify-between text-xs">
        <button
          disabled
          className={cn(
            "h-[38px] w-14 rounded-sm px-2 focus:outline-primary focus:ring-1 focus:ring-primary",
            {
              "bg-gray-100": +values.hours < 12,
            },
          )}
        >
          AM
        </button>
        <button
          disabled
          className={cn(
            "h-[38px] w-14 rounded-sm px-2 focus:outline-primary focus:ring-1 focus:ring-primary",
            {
              "bg-gray-100": +values.hours >= 12,
            },
          )}
        >
          PM
        </button>
      </div>
    </div>
  );
};

export default TimerInput;
