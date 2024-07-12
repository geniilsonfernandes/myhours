import { z } from "zod";
import { splitTime } from "./format";

export const workSchema = (variant: "hours" | "minutes") => {
  return z
    .string()
    .refine(
      (value) => {
        const removeSuffix = value.replace(/[^0-9]/g, "");
        const minutes = parseInt(removeSuffix, 10);
        return (
          !isNaN(minutes) &&
          (variant === "hours" ? minutes <= 530 : minutes <= 60)
        );
      },
      {
        message: {
          hours: "Por favor, insira um valor entre 0 e 530.",
          minutes: "Por favor, insira um número entre 0 e 60.",
        }[variant],
      },
    )
    .isOptional();
    
};

export const validateTime = z.string().refine(
  (value) => {
    const { hours, minutes } = splitTime(value);

    if (+hours > 23 || +minutes > 59) {
      return false;
    }

    return true;
  },
  {
    message: "Por favor, insira um horário entre 00:00 e 23:59.",
  },
);

export const logsSchema = z.object({
  start_time: validateTime,
  break_start: validateTime,
  break_end: validateTime,
  end_time: validateTime,
});
