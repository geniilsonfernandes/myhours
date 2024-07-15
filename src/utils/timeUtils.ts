export const timeStringToMinutes = (time: string) => {
  const onlyNumbers = time.replace(/[^0-9]/g, "");
  const match = onlyNumbers.match(/^(\d{1,2})(\d{0,9999})$/);

  if (!match) {
    return 0;
  }
  let [_, hours, minutes] = match;
  return Number(hours) * 60 + Number(minutes);
};

export const minutesToTimeString = (minutes?: number) => {
  if (!minutes) {
    return "";
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const isPMorAM = (value: string) => {
  const [hours, _] = value.split(":").map(Number);
  return hours >= 12 ? "PM" : "AM";
};

type log = {
  break_end: number;
  break_start: number;
  end_time: number;
  start_time: number;
};

export const calculateExtraTime = ({
  break_end,
  break_start,
  end_time,
  start_time,
}: log) => {
  const expectedTime = 480;

  let break_time;
  if (break_start > 0 && break_end > 0) {
    break_time = break_end - break_start;
  } else {
    break_time = 0;
  }

  const total = end_time - start_time - break_time;

  if (expectedTime >= total) {
    return "00:00";
  }

  if (end_time < start_time) {
    return "00:00";
  }

  return minutesToTimeString(total - expectedTime);
};

export const calculateTotalWorking = ({
  break_end,
  break_start,
  end_time,
  start_time,
}: log) => {
  let break_time;
  if (break_start > 0 && break_end > 0) {
    break_time = break_end - break_start;
  } else {
    break_time = 0;
  }

  if (end_time < start_time) {
    return "00:00";
  }

  const total = end_time - start_time - break_time;

  return minutesToTimeString(total);
};
