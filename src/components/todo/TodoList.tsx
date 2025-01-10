import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";
import { formatConditionalDate, isSameDate } from "@/utils/time";

import CompletedTodoItem from "./CompletedTodoItem";
import IncompleteTodoItem from "./IncompleteTodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onAddTodoClick: () => void;
  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;

  isGrouped?: boolean;
}

export default function TodoList({
  todoList,
  onAddTodoClick,
  onTodoClick,
  onTodoCheck,
  isGrouped,
}: Props) {
  if (todoList.length === 0) {
    return (
      <EmptyCard label="할 일">
        <button
          onClick={onAddTodoClick}
          className="btn btn-primary btn-outline"
        >
          할 일 추가하기
        </button>
      </EmptyCard>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {todoList.map((item, i) => {
          const beforeTodo = i > 0 ? todoList[i - 1] : null;
          const isTitleVisible =
            (beforeTodo &&
              !isSameDate(beforeTodo.target_date, item.target_date)) ||
            !beforeTodo;

          return (
            <>
              {isGrouped && isTitleVisible && (
                <p className="font-semibold mb-2">
                  {formatConditionalDate(item.target_date)}
                </p>
              )}

              {item.completed_at ? (
                <CompletedTodoItem
                  key={item.id}
                  todo={item}
                  onTodoClick={onTodoClick}
                  onTodoCheck={onTodoCheck}
                />
              ) : (
                <IncompleteTodoItem
                  key={item.id}
                  todo={item}
                  onTodoClick={onTodoClick}
                  onTodoCheck={onTodoCheck}
                />
              )}
            </>
          );
        })}
      </ul>
    </>
  );
}
