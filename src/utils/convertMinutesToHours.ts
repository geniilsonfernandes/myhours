function convertMinutesToHours(totalMinutes = 0) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h:${minutes}m`;
}

export default convertMinutesToHours;
