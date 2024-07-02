"use client";

import { formatDate } from "@/utils/date-fns";
import { useMemo, useState } from "react";
import TimerInput from "./timer-input";
import TimerView from "./timer-view";

type TimerRowProps = {
  date?: Date;
};

const TimerRow = ({ date }: TimerRowProps) => {
  const [values, setValues] = useState({
    entrada: 0,
    intervalo: 0,
    retorno: 0,
    saida: 0,
  });

  const calculateHoursWorkedAndBalance = useMemo(() => {
    const expectedDailyHours = 8 * 60 + 50; // Tempo diário esperado em minutos (8 horas e 50 minutos)

    // Função para converter minutos para uma string "HH:MM"
    function minutesToTime(minutes: number) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }

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

  return (
    <div className="flex flex-col gap-4 border-b border-slate-300 p-4 sm:flex-row sm:items-center">
      <TimerView
        label={formatDate(date || new Date(), "cccccc")}
        value={date ? formatDate(date, "dd MMM") : ""}
      />

      <div className="grid grid-cols-2-auto-fill gap-4 sm:grid-cols-4-auto-fill">
        <TimerInput
          label="Hora de entrada"
          onChange={(value) => setValues({ ...values, entrada: value })}
        />
        <TimerInput
          label="Intervalo"
          onChange={(value) => setValues({ ...values, intervalo: value })}
        />
        <TimerInput
          label="Retorno do intervalo"
          onChange={(value) => setValues({ ...values, retorno: value })}
        />
        <TimerInput
          label="Hora de saída"
          onChange={(value) => setValues({ ...values, saida: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
