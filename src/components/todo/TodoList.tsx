import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";

import TodoItem from "./TodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;

  selectedTodoId?: number;
}

export default function TodoList({
  todoList,
  onTodoClick,
  onTodoCheck,
  selectedTodoId,
}: Props) {
  if (todoList.length === 0) {
    return (
      <EmptyCard label="할 일">해야하는 일을 하나씩 추가해보세요.</EmptyCard>
    );
  }

  return (
    <div className="space-y-2">
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onTodoClick={onTodoClick}
          onTodoCheck={onTodoCheck}
          isSelected={selectedTodoId === item.id}
        />
      ))}
    </div>
  );
}
