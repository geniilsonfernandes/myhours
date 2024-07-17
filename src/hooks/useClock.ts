import { format } from "date-fns";
import { useEffect, useState } from "react";

type UseClock = () => {
  formattedTime: string;
  formattedDate: string;
};

const useClock: UseClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = format(time, "HH:mm");
  const formattedDate = format(time, "yyyy-MM-dd");

  return { formattedTime, formattedDate };
};

export default useClock;
