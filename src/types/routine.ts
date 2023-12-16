export interface Routine {
  id: number;
  title: string;
  start_time_minutes: number;
  repeat_days: Array<number>;
  routine_elements: Array<RoutineElement>;
}

export interface RoutineElement {
  id: number;
  title: string;
  duration_minutes: number;
}
