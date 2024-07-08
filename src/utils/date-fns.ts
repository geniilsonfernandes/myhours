import { formatInTimeZone } from "date-fns-tz";

// // Configurando a semana para começar na segunda-feira
// setDefaultOptions({ weekStartsOn: 1 });

const timeZone = "UTC"; // ou use seu fuso horário local, como 'America/Sao_Paulo'

export const formatDate = (date: Date | string) =>
  formatInTimeZone(date, timeZone, "yyyy-MM-dd");

export const formatMonth = (date: Date) => {
  return formatInTimeZone(date, timeZone, "dd MMM");
};
