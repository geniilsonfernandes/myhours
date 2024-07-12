import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const formatDate = (date: Date | string, format = "DD/MM/YYYY") => {
  return dayjs(date).format(format);
};



export const getEndOfWeek = (date: Date, format = "DD/MM/YYYY") => {
  return dayjs(date).endOf("week").format(format);
};

export const getStartOfWeek = (date: Date, format = "DD/MM/YYYY") => {
  return dayjs(date).startOf("week").format(format);
};



