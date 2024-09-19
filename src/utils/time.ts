import dayjs from "dayjs";

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

export function getDateWithoutTime(date: Date = new Date()): Date {
  return dayjs(date).startOf("day").toDate();
}

export function isToday(date: string | Date): boolean {
  const targetDate = dayjs(date);
  return targetDate.isSame(dayjs(), "date");
}

export function getFormatTime(date: string | Date): string {
  const targetDate = dayjs(date);
  const hour = targetDate.hour();
  const minute = targetDate.minute();

  if (hour === 0 && minute === 0) {
    return "";
  }

  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${period} ${formattedHour}:${formattedMinute}`;
}

export function getFormatDay(day: number): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return days[day];
}

export function getFormatDayList(days: Array<number>): string {
  const result = days.map((day) => getFormatDay(day)).join(", ");

  return result;
}

export function formatDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export function dateToUTC(date: Date): string {
  return dayjs(date).utc().toISOString();
}

export function formatDateToUTC(date: Date): string {
  return dayjs(date).utc().format("YYYY-MM-DD");
}

export function convertUtcToKst(utcDate: string): Date {
  const kstDate = dayjs.utc(utcDate).tz("Asia/Seoul");
  return kstDate.toDate();
}
