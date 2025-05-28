import {
  RoutineItem,
  RoutineLogPutInput,
  TodoUpdateInput,
} from "@/api/generated";

export interface TodoModalSubmitProps {
  title: string;
  targetDate: Date;
  completed: boolean;

  content?: string;
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
