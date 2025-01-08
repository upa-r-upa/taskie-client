import { TodoPublic } from "@/api/generated";

import CompletedTodoItem from "./CompletedTodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

export default function CompletedTodoList({
  todoList,
  onTodoCheck,
  onTodoClick,
}: Props) {
  if (todoList.length === 0) {
    return <p className="text-center my-4">완료한 투두 목록이 없어요.</p>;
  }

  return (
    <ul className="space-y-2">
      {todoList.map((item) => (
        <CompletedTodoItem
          key={item.id}
          todo={item}
          isSimple
          onTodoClick={onTodoClick}
          onTodoCheck={onTodoCheck}
        />
      ))}
    </ul>
  );
}
