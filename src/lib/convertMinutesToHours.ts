export function convertMinutesToHours(minutes?: number) {
  if (!minutes) return "-";
  if (minutes < 0) return `-`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ч. ${remainingMinutes} мин.`;
}
