"use client";

import { cn } from "@/lib/utils";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const textColor = {
    valid: "text-green-500",
    invalid: "text-red-500",
    default: "text-slate-500",
    isError: "text-red-500",
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-md bg-slate-100 p-2 px-4",
        textColor[isError ? "isError" : variant || "default"],
      )}
    >
      <label htmlFor={label} className="text-[12px] text-slate-500">
        {label}
      </label>

      <div className="relative flex items-center gap-2">
        <input
          type={isMobile ? "time" : "text"}
          className="text-md w-full bg-transparent focus:outline-none focus:ring-0"
          disabled={isLoading}
          {...props}
          ref={inputRef}
        />
        {isLoading && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <LoaderCircle className="animate-spin" size={16} />
          </span>
        )}
        {isError && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleAlert size={16} />
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
