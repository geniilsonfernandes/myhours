"use client";

import { createWorkLog } from "@/actions/worklog/mutations";
import {
  createTimestamp,
  minutesToTime,
  onBlurFormatTime,
} from "@/shared/format";
import { logsSchema } from "@/shared/schema";
import { WorkLog } from "@/types/models";
import { formatDate } from "@/utils/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TimerInput from "./timer-log";
import TimerView from "./timer-view";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type TimerRowProps = {
  day: string;
  log?: WorkLog;
  disabled?: boolean;
};

const TimerRow = ({ day, log, disabled }: TimerRowProps) => {
  const { toast } = useToast();

  const {
    formState: { errors },
    ...form
  } = useForm<z.infer<typeof logsSchema>>({
    defaultValues: {
      start_time: minutesToTime(log?.start_time || 0),
      break_start: minutesToTime(log?.break_start || 0),
      break_end: minutesToTime(log?.break_end || 0),
      end_time: minutesToTime(log?.end_time || 0),
    },
    resolver: zodResolver(logsSchema),
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof logsSchema>) {
    try {
      await createWorkLog({
        start_time: createTimestamp(data.start_time),
        break_start: createTimestamp(data.break_start),
        break_end: createTimestamp(data.break_end),
        end_time: createTimestamp(data.break_end),
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
    <div className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-lg shadow-slate-100 sm:flex-row sm:items-center">
      <div className="">
        <TimerView
          label={formatDate(day, "ddd")}
          value={day ? formatDate(day, "DD MMMM") : ""}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Controller
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <TimerInput
              label="Entrada"
              isError={!!errors.start_time}
              errorMessage={errors.start_time?.message}
              placeholder="00:00"
              value={field.value}
              onChange={field.onChange}
              onBlur={(e) => {
                if (errors && errors.start_time) {
                  toast({
                    description: errors.start_time?.message,
                    variant: "destructive",
                  });
                }
                onBlurFormatTime(e);
                field.onChange(onBlurFormatTime(e));
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="break_start"
          render={({ field }) => (
            <TimerInput
              label="Pausa"
              isError={!!errors.break_start}
              errorMessage={errors.break_start?.message}
              placeholder="00:00"
              value={field.value}
              onChange={field.onChange}
              onBlur={(e) => {
                if (errors && errors.break_start) {
                  toast({
                    description: errors.break_start?.message,
                    variant: "destructive",
                  });
                }
                onBlurFormatTime(e);
                field.onChange(onBlurFormatTime(e));
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="break_end"
          render={({ field }) => (
            <TimerInput
              label="Pausa"
              isError={!!errors.break_end}
              errorMessage={errors.break_end?.message}
              placeholder="00:00"
              value={field.value}
              onChange={field.onChange}
              onBlur={(e) => {
                if (errors && errors.break_end) {
                  toast({
                    description: errors.break_end?.message,
                    variant: "destructive",
                  });
                }
                onBlurFormatTime(e);
                field.onChange(onBlurFormatTime(e));
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <TimerInput
              label="Saída"
              isError={!!errors.end_time}
              errorMessage={errors.end_time?.message}
              placeholder="00:00"
              value={field.value}
              onChange={field.onChange}
              onBlur={(e) => {
                if (errors && errors.end_time) {
                  toast({
                    description: errors.end_time?.message,
                    variant: "destructive",
                  });
                }
                onBlurFormatTime(e);
                field.onChange(onBlurFormatTime(e));
              }}
            />
          )}
        />
      </div>
      <Button className="ml-2" onClick={() => form.handleSubmit(onSubmit)()}>
        Salvar
      </Button>
    </div>
  );
};

export default TimerRow;
