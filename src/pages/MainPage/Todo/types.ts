import { TodoPublic } from "@/api/generated";

export interface TodoItemProps {
  todo: TodoPublic;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}
