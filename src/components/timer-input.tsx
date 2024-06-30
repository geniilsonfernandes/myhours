"use client";

import { ChangeEvent, useState } from "react";

type TimerInputProps = {
  label?: string;
  onChange?: (value: string) => void;
};

const TimerInput = ({ label, onChange }: TimerInputProps) => {
  const [value, setValue] = useState<string>("00:00");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);

    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  const isPMorAM = (value: string) => {
    const [hours, _] = value.split(":").map(Number);
    return hours >= 12;
  };

  return (
    <div>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-md relative mt-2 flex items-center gap-1 font-medium text-slate-500">
        <span className="absolute left-2 text-sm">
          {isPMorAM(value) ? "PM" : "AM"}
        </span>
        <input
          type="time"
          className="h-10 rounded-md border border-slate-300 px-2 pl-10 text-right focus:border-blue-500 focus:outline-blue-500"
          placeholder="hh:mm"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default TimerInput;
