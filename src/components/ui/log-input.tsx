"use client";

import { cn } from "@/lib/utils";
import { isPMorAM } from "@/utils";
import { CircleAlert, Clock, LoaderCircle } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type TimerInputProps = {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errorMessage?: string;
  variant?: "valid" | "invalid" | "default";
  isError?: boolean;
  isLoading?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LogInput = ({
  label,
  errorMessage,
  variant,
  isError = false,
  isLoading = false,
  ...props
}: TimerInputProps) => {
  const textColor = {
    valid: "text-green-500",
    invalid: "text-red-500",
    default: "text-slate-500",
    isError: "text-red-500",
  };

  return (
    <div
      className={cn(
        "flex h-[58px] flex-col rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 sm:w-[200px]",
        textColor[isError ? "isError" : variant || "default"],
      )}
    >
      <label htmlFor={label} className="text-[12px] text-slate-500">
        {label}
      </label>

      <div className="relative mt-1 flex items-center gap-2">
        <input
          type="time"
          className="text-md w-full bg-transparent text-sm focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={props.disabled || isLoading}
          {...props}
        />
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm">
          {isPMorAM(props.value || "00:00")}
        </span>

        <Clock
          size={16}
          className="pointer-events-none invisible absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer sm:visible"
        />
        {isLoading && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin" size={16} />
          </span>
        )}
        {isError && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleAlert
                  size={16}
                  className="absolute right-10 top-1/2 -translate-y-1/2"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{errorMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default LogInput;
