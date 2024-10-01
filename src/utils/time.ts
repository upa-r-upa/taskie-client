import dayjs from "dayjs";

const weeks = ["월", "화", "수", "목", "금", "토", "일"];

export function getDayFromNumber(week: number): string {
  return week >= 0 && week <= 7 ? weeks[week] : "존재하지 않는 요일";
}

export function getTimeDifferenceFromNow(dateString: string): number {
  const targetDate = dayjs(dateString);
  const now = dayjs();

  const diffInMinutes = now.diff(targetDate, "minute");

  return diffInMinutes;
}

export function convertMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}시간 `;
  }

  if (remainingMinutes > 0 || (remainingMinutes === 0 && !hours)) {
    result += `${remainingMinutes}분`;
  }

  return result.trim();
}

export function getFormatMinutesWithMeridiem(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  const period = hours < 12 ? "오전" : hours >= 24 ? "익일 오전" : "오후";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const result = `${period} ${formattedHours}시 ${remainderMinutes
    .toString()
    .padStart(2, "0")}분`;

  return result;
}

export function getFormatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;

  let result = "";

  if (hours) {
    result += `${hours}시간`;
  }

  if (remainderMinutes) {
    result += ` ${remainderMinutes.toString().padStart(2, "0")}분`;
  }

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
