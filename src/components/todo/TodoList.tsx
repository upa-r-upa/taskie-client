import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";
import { ScrollArea } from "@/components/ui/scroll-area";

import TodoItem from "./TodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onTodoClick: (todoId: number) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;

  selectedTodoId: number | null;
}

export default function TodoList({
  todoList,
  onTodoClick,
  onTodoCheck,
  selectedTodoId,
}: Props) {
  if (todoList.length === 0) {
    return (
      <EmptyCard label="할 일" classNames="flex-1">
        해야하는 일을 하나씩 추가해보세요.
      </EmptyCard>
    );
  }

  return (
    <ScrollArea className="flex-1 mb-4 w-full">
      <div className="w-full pr-3">
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
      </div>
    </ScrollArea>
  );
}
