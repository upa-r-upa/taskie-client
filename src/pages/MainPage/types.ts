import {
  RoutineItem,
  RoutineLogPutInput,
  TodoUpdateInput,
} from "@/api/generated";

export interface TodoModalSubmitProps {
  title: string;
  content: string;
  targetDate: Date;
  completed: boolean;
}

export interface TodoUpdateInputParameter {
  id: number;
  update: TodoUpdateInput;
}

export interface RoutinePlayViewSubmitProps {
  id: number;
  routineTodoList: Array<RoutineItem>;
}

export interface RoutineAchieveInputParameter {
  id: number;
  update: RoutineLogPutInput;
}
