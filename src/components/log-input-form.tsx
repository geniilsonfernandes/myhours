import { patchWorkLog } from "@/actions/worklog/mutations";
import { updateSessions } from "@/services/query/useWorkSessions";
import { minutesToTimeString, timeStringToMinutes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isMobile } from "react-device-detect";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import LogInput from "./ui/log-input";
import { useToast } from "./ui/use-toast";

const logSchema = z.object({
  log_time: z.string(),
});

type LogInputFormProps = {
  key_id: "start_time" | "end_time" | "break_start" | "break_end";
  value: number | null;
  date_id: string;
  log_id?: string;
  user_id?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "end" | "start" | "break";
  log: {
    start_time: number;
    end_time: number;
    break_start: number;
    break_end: number;
  };
};

const LogInputForm = ({
  key_id,
  value,
  date_id,
  log_id,
  disabled,
  user_id,
  log,
}: LogInputFormProps) => {
  const { toast } = useToast();

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<z.infer<typeof logSchema>>({
    defaultValues: {
      log_time: minutesToTimeString(value || 0),
    },
    resolver: zodResolver(logSchema),
    mode: "onChange",
  });

  async function onSubmit({ log_time }: z.infer<typeof logSchema>) {
    const timestamp = timeStringToMinutes(log_time);

    if (key_id === "start_time" && timestamp > log?.end_time) {
      toast({
        description: "A hora de entrada deve ser maior que a hora de saida.",
        title: "Erro",
        variant: "destructive",
      });
      form.setError("log_time", {
        message: "A hora de entrada deve ser maior que a hora de saida.",
      });
      return;
    }

    if (key_id === "end_time" && timestamp < log?.start_time) {
      toast({
        description: "A hora de entrada deve ser maior que a hora de saida.",
        title: "Erro",
        variant: "destructive",
      });
      form.setError("log_time", {
        message: "A hora de entrada deve ser maior que a hora de saida.",
      });
      return;
    }

    if (key_id === "break_start" && timestamp > log?.break_end) {
      toast({
        description:
          "A hora de entrada deve ser maior que a hora de inicio do intervalo.",
        title: "Erro",
        variant: "destructive",
      });
      form.setError("log_time", {
        message:
          "A hora de entrada deve ser maior que a hora de inicio do intervalo.",
      });
      return;
    }

    if (key_id === "break_end" && timestamp < log?.break_start) {
      toast({
        description:
          "A hora de entrada deve ser maior que a hora de inicio do intervalo.",
        title: "Erro",
        variant: "destructive",
      });
      form.setError("log_time", {
        message:
          "A hora de entrada deve ser maior que a hora de inicio do intervalo.",
      });
      return;
    }

    if (log_time === "" || timestamp === value) {
      return;
    }

    try {
      await patchWorkLog({
        key_id,
        user_id,
        value: timestamp,
        date_id,
        ...(log_id && { log_id: log_id }),
      });
      await updateSessions();
      toast({
        description: "Registro atualizado com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Ocorreu um erro no registro.",
        title: "Erro",
        variant: "destructive",
      });
    }
  }

  const labels = {
    start_time: "Entrada",
    end_time: "Saída",
    break_start: "Inicio do intervalo",
    break_end: "Fim do intervalo",
  };

  return (
    <Controller
      name="log_time"
      control={form.control}
      render={({ field }) => (
        <LogInput
          label={labels[key_id]}
          placeholder="00:00"
          value={field.value}
          errorMessage={errors.log_time?.message}
          isLoading={isSubmitting}
          disabled={disabled}
          isError={!!errors.log_time}
          {...(isMobile
            ? {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value);
                  form.handleSubmit(onSubmit)();
                },
              }
            : {
                onChange: field.onChange,
                onBlur: form.handleSubmit(onSubmit),
              })}
        />
      )}
    />
  );
};

export default LogInputForm;
