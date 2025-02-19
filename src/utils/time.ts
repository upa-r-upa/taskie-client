import {
  format,
  differenceInMinutes,
  startOfDay,
  isSameDay,
  addMinutes,
  getDay,
  parseISO,
  isEqual,
  isToday,
  differenceInCalendarDays,
} from "date-fns";
import { ko } from "date-fns/locale";

export type AMPM = "오전" | "오후";

export const Weeks = ["월", "화", "수", "목", "금", "토", "일"];

export function getDayName(day: number): string {
  return day >= 0 && day <= 6 ? Weeks[day] : "존재하지 않는 요일";
}

export function getTimeDifferenceFromNow(date: string): number {
  const targetDate = parseISO(date);
  const now = new Date();
  return differenceInMinutes(now, targetDate);
}

export function getRelativeDateStatus(date: string): "prev" | "today" | "next" {
  const today = new Date();
  const diffDays = differenceInCalendarDays(new Date(date), today);

  if (diffDays === 0) {
    return "today";
  } else if (diffDays < 0) {
    return "prev";
  } else {
    return "next";
  }
}

export function formatRelativeDate(date: string) {
  const today = new Date();

  if (isToday(date)) {
    return "오늘";
  }

  const diff = differenceInCalendarDays(date, today);
  if (diff > 0) {
    return `${diff}일`;
  } else {
    return `+ ${Math.abs(diff)}일`;
  }
}

export function formatSecondsAsDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}초`;
  }

  return formatDuration(Math.round(seconds / 60));
}

export function formatMinutesWithAMPM(minutes: number): string {
  const date = addMinutes(startOfDay(new Date()), minutes);
  return format(date, "a h시 mm분", { locale: ko });
}

export function formatDuration(minutes: number): string {
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

export function getDateWithoutTime(date: Date): Date {
  return startOfDay(date);
}

export function isSameDate(dateA: string, dateB: string): boolean {
  return isSameDay(parseISO(dateA), parseISO(dateB));
}

export function getFormatTime(date: string | Date): string {
  return format(typeof date === "string" ? parseISO(date) : date, "a h:mm", {
    locale: ko,
  });
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateWithTime(date: Date): string {
  return `${formatDate(date)} ${getFormatTime(date)}`;
}

export function isMidnight(date: string): boolean {
  return isEqual(parseISO(date), startOfDay(date));
}

export function formatConditionalDate(date: Date | string): string {
  const inputDate = typeof date === "string" ? parseISO(date) : date;
  const currentYear = new Date().getFullYear();

  return inputDate.getFullYear() === currentYear
    ? format(inputDate, "MM월 dd일 EEEE", { locale: ko })
    : format(inputDate, "yyyy년 MM월 dd일 EEEE", { locale: ko });
}

export function getWeek(date: Date | string): number {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  const day = getDay(parsedDate);
  return day === 0 ? 6 : day - 1;
}
