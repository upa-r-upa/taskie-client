export function getFormatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  const period = hours < 12 ? "오전" : "오후";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const result = `${period} ${formattedHours}:${remainderMinutes
    .toString()
    .padStart(2, "0")}`;

  return result;
}

export function getFormatDay(day: number): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return days[day];
}

export function getFormatDayList(days: Array<number>): string {
  const result = days.map((day) => getFormatDay(day)).join(", ");

  return result;
}
