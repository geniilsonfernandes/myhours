export const onBlurFormat = (
  e: React.FocusEvent<HTMLInputElement>,
  prexfix: string,
) => {
  return (e.target.value = `${e.target.value.replace(/\D/g, "")} ${prexfix}`);
};

export const splitTime = (
  time: string,
): { hours: string; minutes: string; suffix: string } => {
  const onlyNumbers = time.replace(/[^0-9]/g, "");
  console.log(onlyNumbers);

  if (onlyNumbers.length === 0) {
    return {
      hours: "",
      minutes: "",
      suffix: "",
    };
  }

  if (onlyNumbers.length === 1) {
    return {
      hours: onlyNumbers.padStart(2, "0"),
      minutes: "00",
      suffix: "AM",
    };
  }

  const match = onlyNumbers.match(/^(\d{1,2})(\d{0,9999})$/);
  const secontMatch = onlyNumbers.match(/^(\d{1})(\d{1})(\d{0,999})$/);

  if (onlyNumbers.length === 3) {
    let [_, first, second, rest] = secontMatch || ["0", "0", "0"];
    first = first.padStart(2, "0");
    const suffix = +first > 12 ? "PM" : "AM";
    return {
      hours: first,
      minutes: `${second}${rest}`,
      suffix,
    };
  }

  let [_, hours, minutes] = match || ["0", "0", "0"];

  minutes = minutes.padStart(2, "0");
  const suffix = +hours > 12 ? "PM" : "AM";

  const regexToGetTwoLastNumbers = /(\d{2})$/;

  return {
    hours,
    minutes: minutes.match(regexToGetTwoLastNumbers)?.[0] || minutes,
    suffix,
  };
};

export const onBlurFormatTime = (e: React.FocusEvent<HTMLInputElement>) => {
  if (!e.target.value) {
    return "";
  }

  const { hours, minutes, suffix } = splitTime(e.target.value);

  return (e.target.value = `${hours}:${minutes} ${suffix}`);
};

export const createTimestamp = (time: string) => {
  const onlyNumbers = time.replace(/[^0-9]/g, "");
  const match = onlyNumbers.match(/^(\d{1,2})(\d{0,9999})$/);

  if (!match) {
    return 0;
  }
  let [_, hours, minutes] = match;
  return Number(hours) * 60 + Number(minutes);
};

export const minutesToTime = (minutes: number) => {
  if (minutes === 0) {
    return "00:00 AM";
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hours > 11 ? "PM" : "AM";
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${suffix}`;
};
