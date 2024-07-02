import { z } from "zod";

export const workSchema = (variant: "hours" | "minutes") => {
  return z.string().refine(
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
  );
};
