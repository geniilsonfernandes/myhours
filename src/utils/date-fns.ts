import { format as formatDateFns } from "date-fns";
import { ptBR } from "date-fns/locale";

// // Configurando a semana para começar na segunda-feira
// setDefaultOptions({ weekStartsOn: 1 });

export const formatMonth = (date: Date) => {
  return formatDateFns(date, "dd MMM", { locale: ptBR });
};

export const formatDate = (date: Date, format: string): string => {
  return formatDateFns(date, format, { locale: ptBR });
};
