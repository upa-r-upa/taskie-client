export interface Habit {
  id: number;
  title: string;
  start_time_minutes: Array<number>;
  repeat_days: Array<number>;
}
