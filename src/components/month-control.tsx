import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MonthControlProps = {
  dateformated: string;
  handleWeekChange: (type: "previous" | "next") => void;
  className?: string;
};

const MonthControl = ({
  dateformated,
  handleWeekChange,
  className,
}: MonthControlProps) => {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between gap-2 rounded-lg bg-white px-2 text-slate-500 shadow-lg shadow-slate-100",
        className,
      )}
    >
      <button
        onClick={handleWeekChange.bind(null, "previous")}
        className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
      >
        <ChevronLeft />
      </button>
      <span className="min-w-52 whitespace-nowrap text-center text-sm font-medium">
        {dateformated}
      </span>
      <button
        onClick={handleWeekChange.bind(null, "next")}
        className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthControl;
