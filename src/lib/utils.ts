import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isPMorAM = (value: string) => {
  const [hours, _] = value.split(":").map(Number);
  return hours >= 12;
};
