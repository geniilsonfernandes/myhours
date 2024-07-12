import {
  createTimestamp,
  minutesToTime,
  onBlurFormatTime,
} from "@/shared/format";
import { validateTime } from "@/shared/schema";
import { Controller, useForm } from "react-hook-form";
import LogInput from "./log-input";
import { useToast } from "./ui/use-toast";

import { patchWorkLog } from "@/actions/worklog/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const logSchema = z.object({
  log_time: validateTime,
});

type LogInputFormProps = {
  key_id: "start_time" | "end_time" | "break_start" | "break_end";
  value: number | null;
  date_id: string;
  log_id?: string;
  user_id?: string;
  isLoading?: boolean;
};

const LogInputForm = ({
  key_id,
  value,
  date_id,
  log_id,
  user_id,
  isLoading,
}: LogInputFormProps) => {
  const { toast } = useToast();

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<z.infer<typeof logSchema>>({
    defaultValues: {
      log_time: value !== null ? minutesToTime(value || 0) : "",
    },
    resolver: zodResolver(logSchema),
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof logSchema>) {
    const timestamp = createTimestamp(data.log_time);
    if (timestamp === 0 || timestamp === value) {
      return;
    }

    try {
      await patchWorkLog({
        key_id,
        user_id,
        value: createTimestamp(data.log_time),
        date_id,
        ...(log_id && { log_id: log_id }),
      });

      toast({
        description: "Registro atualizado com sucesso.",
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
    <Controller
      name="log_time"
      control={form.control}
      render={({ field }) => (
        <LogInput
          label="Saída"
          placeholder="00:00"
          value={field.value}
          errorMessage={errors.log_time?.message}
          isLoading={isSubmitting}
          isError={!!errors.log_time}
          onChange={field.onChange}
          onBlur={(e) => {
            if (errors && errors.log_time) {
              toast({
                description: errors.log_time?.message,
                variant: "destructive",
              });
            }
            onBlurFormatTime(e);
            field.onChange(onBlurFormatTime(e));
            form.handleSubmit(onSubmit)();
          }}
        />
      )}
    />
  );
};

export default LogInputForm;
