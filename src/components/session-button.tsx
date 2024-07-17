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
import useClock from "@/hooks/useClock";
import { cn } from "@/lib/utils";
import { updateSession } from "@/services/query/useWorkSession";
import { isPMorAM, minutesToTimeString, timeStringToMinutes } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const { formattedTime } = useClock();
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
            "flex flex-col justify-between gap-12 rounded-lg p-4",
            colors.bg[color],
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
          )}
        >
          <div className="text-left">
            <h3 className="text-sm font-medium text-slate-800">
              {labels[key_id]}
            </h3>
            {showClock && (
              <div className="mt-1 flex items-center gap-1">
                <Clock className="text-slate-500" size={16} />
                <p className="text-sm text-slate-500">{formattedTime}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {icon}{" "}
            <span className="text-sm font-medium">
              {isLoading ? (
                <span>
                  <LoaderCircle className="animate-spin" size={16} />
                </span>
              ) : (
                <>
                  {time} {isPMorAM(time)}
                </>
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
          <div className="my-8 mt-10 flex items-center justify-center gap-4 text-left">
            <input
              placeholder="00:00"
              defaultValue={value ? minutesToTimeString(value) : "00:00"}
              type="time"
              className="bg-transparent text-center text-3xl"
              {...form.register("log_time")}
            />

            {isPMorAM("00:00" || "00:00")}
          </div>
        </DrawerHeader>
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
