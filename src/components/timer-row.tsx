"use client";

import { createWorkLog } from "@/actions/worklog/mutations";
import { WorkLog } from "@/types/models";
import { debounce } from "@/utils";
import { formatDate } from "@/utils/dates";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TimerInput from "./timer-input";
import TimerView from "./timer-view";
import { useToast } from "./ui/use-toast";

type TimerRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
};

const workSchema = z.object({
  entrada: z.string(),
  intervalo: z.string(),
  retorno: z.string(),
  saida: z.string(),
});

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

const TimerRow = ({ day, log, disabled }: TimerRowProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof workSchema>>({
    defaultValues: {
      entrada: log?.start_time ? minutesToTime(log?.start_time) : "00:00",
      intervalo: log?.break_start ? minutesToTime(log?.break_start) : "00:00",
      retorno: log?.break_end ? minutesToTime(log?.break_end) : "00:00",
      saida: log?.end_time ? minutesToTime(log?.end_time) : "00:00",
    },
  });

  const [values, setValues] = useState({
    entrada: 0,
    intervalo: 0,
    retorno: 0,
    saida: 0,
  });

  const calculateHoursWorkedAndBalance = useMemo(() => {
    const expectedDailyHours = 8 * 60 + 50; // Tempo diário esperado em minutos (8 horas e 50 minutos)

    const entrada = values.entrada;
    const intervalo = values.intervalo;
    const retorno = values.retorno;
    const saida = values.saida;

    // Calcular horas trabalhadas
    const morningWorkMinutes = intervalo - entrada;
    const afternoonWorkMinutes = saida - retorno;
    const totalWorkMinutes = morningWorkMinutes + afternoonWorkMinutes;

    // Calcular saldo
    const balanceMinutes = totalWorkMinutes - expectedDailyHours;

    return {
      totalWorked: minutesToTime(totalWorkMinutes),
      balance: minutesToTime(Math.abs(balanceMinutes)),
      balanceType: balanceMinutes >= 0 ? "positive" : "negative",
    } as const;
  }, [values]);

  async function onSubmit(data: z.infer<typeof workSchema>) {
    const createTimestamp = (time: string) => {
      if (!time) return 0;

      const [hours, minutes] = time.split(":");
      return Number(hours) * 60 + Number(minutes);
    };
    // end_time

    try {
      await createWorkLog({
        break_end: createTimestamp(data.retorno),
        break_start: createTimestamp(data.intervalo),
        start_time: createTimestamp(data.entrada),
        end_time: createTimestamp(data.saida),
        total_working_hours: 100,
        employee_id: "e91890a3-3b61-4ce6-b2cb-0ccd9cd2d645",
        date_id: day,
        ...(log?.id && { id: log.id }),
      });

      toast({
        description: log?.id
          ? "Registro atualizado com sucesso."
          : "Registro criado com sucesso.",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: "Ocorreu um erro no registro.",
        title: "Erro",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="w-32">
        <TimerView
          label={formatDate(day, "ddd")}
          value={day ? formatDate(day, "DD MMMM") : ""}
        />
      </div>

      <div className="grid grid-cols-2-auto-fill gap-4 sm:grid-cols-4-auto-fill">
        <Controller
          control={form.control}
          name="entrada"
          render={({ field }) => (
            <TimerInput
              label="Entrada"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              onBlur={debounce(form.handleSubmit(onSubmit), 1000)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="intervalo"
          render={({ field }) => (
            <TimerInput
              label="Intervalo"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              onBlur={debounce(form.handleSubmit(onSubmit), 1000)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="retorno"
          render={({ field }) => (
            <TimerInput
              label="Retorno"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              onBlur={debounce(form.handleSubmit(onSubmit), 1000)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="saida"
          render={({ field }) => (
            <TimerInput
              label="Saida"
              onChange={(value) => field.onChange(value)}
              value={field.value}
              onBlur={debounce(form.handleSubmit(onSubmit), 1000)}
            />
          )}
        />
      </div>
      <div className="flex gap-4 sm:justify-end">
        <TimerView
          label="Horas trabalhadas"
          prefix="H"
          value={calculateHoursWorkedAndBalance.totalWorked}
        />
        <TimerView
          label="Saldo do dia"
          prefix="H"
          value={calculateHoursWorkedAndBalance.balance}
          variant={calculateHoursWorkedAndBalance.balanceType}
        />
      </div>
    </div>
  );
};

export default TimerRow;
