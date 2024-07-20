import { patchWorkLog } from "@/actions/worklog/mutations";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { updateSession } from "@/services/query/useWorkSession";
import { isPMorAM, minutesToTimeString, timeStringToMinutes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TimerInput from "./ui/timer-input";

const logSchema = z.object({
  log_time: z.string(),
});

type SessionButtonProps = {
  showClock?: boolean;
  label?: string;
  color?: "green" | "red" | "blue";
  icon?: JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
  value?: number;
  key_id: "start_time" | "end_time" | "break_start" | "break_end";
  user_id?: string;
  date_id: string;
  log_id?: string;
};

const SessionButton = ({
  showClock = false,
  isLoading,
  label,
  color = "green",
  disabled = false,
  icon,
  value = 0,
  key_id,
  user_id,
  date_id,
  log_id,
}: SessionButtonProps) => {
  const { toast } = useToast();

  const colors = {
    bg: {
      green: "bg-green-100",
      red: "bg-red-100",
      blue: "bg-blue-100",
    },
  };

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<z.infer<typeof logSchema>>({
    defaultValues: {
      log_time: minutesToTimeString(value),
    },
    resolver: zodResolver(logSchema),
    mode: "onChange",
  });

  async function onSubmit({ log_time }: z.infer<typeof logSchema>) {
    const timestamp = timeStringToMinutes(log_time);

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
      await updateSession();
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

  const time = minutesToTimeString(value);

  const labels = {
    start_time: "Entrada",
    end_time: "Saída",
    break_start: "Inicio do intervalo",
    break_end: "Fim do intervalo",
  };

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <button
          className={cn(
            "flex flex-col justify-between gap-12 rounded-lg border border-slate-200 p-4 text-slate-500 hover:bg-slate-50",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
          )}
        >
          <div className="flex items-center gap-4 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </span>
            <h3 className="text-sm font-medium">{labels[key_id]}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {isLoading ? (
                <span>
                  <LoaderCircle className="animate-spin" size={16} />
                </span>
              ) : (
                <span className="capitalize text-slate-500">
                  {time ? `${time} ${isPMorAM(time)}` : "clique para definir"}
                </span>
              )}{" "}
            </span>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Confime o horário da sessão</DrawerTitle>
          <DrawerDescription>
            Você pode alterar o horário a qualquer momento
          </DrawerDescription>

          <DrawerClose asChild className="absolute right-4 top-4">
            <Button variant="outline">
              <X size={16} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="my-8 mt-10 flex items-center justify-center gap-4 text-left">
          <Controller
            control={form.control}
            name="log_time"
            render={({ field }) => (
              <TimerInput
                value={{
                  hours: time.substring(0, 2),
                  minutes: time.substring(3, 5),
                }}
                onChange={({ hours, minutes }) => {
                  field.onChange(`${hours}:${minutes}`);
                }}
              />
            )}
          />
        </div>

        <DrawerFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>Salvar</>
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SessionButton;
