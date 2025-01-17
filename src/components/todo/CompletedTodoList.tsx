import { TodoPublic } from "@/api/generated";
import { formatConditionalDate, isSameDate } from "@/utils/time";

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
    return <p className="text-center my-4">완료한 할일 목록이 없어요.</p>;
  }

  return (
    <ul className="space-y-2">
      {todoList.map((item, i) => {
        const beforeTodo = i > 0 ? todoList[i - 1] : null;
        const isTitleVisible =
          (beforeTodo &&
            !isSameDate(beforeTodo.target_date, item.target_date)) ||
          !beforeTodo;

        return (
          <>
            {isTitleVisible && (
              <p className="font-semibold mb-2">
                {formatConditionalDate(item.target_date)}
              </p>
            )}

            <CompletedTodoItem
              key={item.id}
              todo={item}
              isSimple
              onTodoClick={onTodoClick}
              onTodoCheck={onTodoCheck}
            />
          </>
        );
      })}
    </ul>
  );
}
