import { cn } from "@/lib/utils";

type TimerViewProps = {
  label?: string;
  value?: string | number;
  variant?: "positive" | "negative" | "neutral";

  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
};

const TimerView = ({
  label,
  value,
  variant = "neutral",
  prefix,
  suffix,
  isLoading = false,
}: TimerViewProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-md text-xs capitalize text-slate-500">{label}</div>
      <div
        className={cn(
          "text-md font-semibold",
          variant === "positive" && "text-green-500",
          variant === "negative" && "text-red-500",
          variant === "neutral" && "text-slate-500",
        )}
      >
        {prefix && <span>{prefix} </span>}
        {value}
        {suffix && <span> {suffix}</span>}
      </div>
    </div>
  );
};

export default TimerView;
