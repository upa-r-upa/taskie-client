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
