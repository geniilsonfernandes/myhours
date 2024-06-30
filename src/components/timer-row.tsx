"use client";

import { useMemo, useState } from "react";
import TimerInput from "./timer-input";
import TimerView from "./timer-view";

const TimerRow = () => {
  const [values, setValues] = useState({
    entrada: "00:00",
    intervalo: "00:00",
    retorno: "00:00",
    saida: "00:00",
  });

  const calculateHoursWorkedAndBalance = useMemo(() => {
    const expectedDailyHours = 8 * 60 + 50; // Tempo diário esperado em minutos (8 horas e 50 minutos)

    // Função para converter uma string de tempo "HH:MM" para minutos
    function timeToMinutes(time: string) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }

    // Função para converter minutos para uma string "HH:MM"
    function minutesToTime(minutes: number) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }

    const entrada = timeToMinutes(values.entrada);
    const intervalo = timeToMinutes(values.intervalo);
    const retorno = timeToMinutes(values.retorno);
    const saida = timeToMinutes(values.saida);

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
      <TimerView label="Seg" value="2 Jul" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
