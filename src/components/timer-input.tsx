"use client";

import { ChangeEvent, useRef, useState } from "react";

type TimerInputProps = {
  label?: string;
  onChange?: (value: number) => void;
  errorMessage?: string;
};

const formatToInt = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatToHHMM = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
const TimerInput = ({ label, onChange, errorMessage }: TimerInputProps) => {
  const [value, setValue] = useState<string>("00:00");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSpanClick = () => {
    inputRef?.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(formatToInt(value), "valor decimal");
    const formattedValue = formatToHHMM(formatToInt(value));
    console.log(formattedValue, "valor formatado");

    setValue(value);

    if (onChange) {
      onChange(formatToInt(value));
    }
  };

  const isPMorAM = (value: string) => {
    const [hours, _] = value.split(":").map(Number);
    return hours >= 12;
  };

  return (
    <div className="relative">
      <label htmlFor={label} className="text-sm text-slate-500">
        {label}
      </label>
      <div className="relative mt-2 flex min-w-48 text-slate-500">
        <input
          type="time"
          id={label}
          className="bg block w-28 flex-1 rounded-none rounded-s-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          required
        />
        <span className="pointer-events-none absolute right-14 top-2/4 -translate-y-2/4 text-xs">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          onClick={handleSpanClick}
          className="rounded-s-0 inline-flex items-center rounded-e-md border border-s-0 border-gray-300 bg-gray-200 px-3 text-sm text-slate-500 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
        >
          {isPMorAM(value) ? "PM" : "AM"}
        </span>
      </div>
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default TimerInput;
