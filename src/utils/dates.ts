import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const formatDate = (date: Date | string, format = "DD/MM/YYYY") => {
  return dayjs(date).format(format);
};
