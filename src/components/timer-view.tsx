import { cn } from "@/lib/utils";

type TimerViewProps = {
  label?: string;
  value?: string;
  variant?: "positive" | "negative" | "neutral";

  prefix?: string;
  suffix?: string;
};

const TimerView = ({
  label,
  value,
  variant = "neutral",
  prefix,
  suffix,
}: TimerViewProps) => {
  return (
    <div className="flex flex-col pr-8">
      <div className="text-md text-slate-500">{label} </div>
      <div
        className={cn(
          "text-xl font-bold",
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
