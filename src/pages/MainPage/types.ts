import { TodoUpdateInput } from "../../api/generated";

export interface TodoModalSubmitProps {
  title: string;
  content: string;
  targetDate: Date;
}

export interface TodoUpdateInputParameter {
  id: number;
  update: TodoUpdateInput;
}

export interface HabitModalSubmitProps {
  title: string;
  startTimeMinutes: number;
  endTimeMinutes: number;
  repeatIntervalMinutes: number;
  repeatDays: Array<number>;
}
