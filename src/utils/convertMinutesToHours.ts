function convertMinutesToHours(totalMinutes = 0) {
  // Calculate hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Return the formatted string
  return `${hours}h:${minutes}m`;
}

export default convertMinutesToHours;
