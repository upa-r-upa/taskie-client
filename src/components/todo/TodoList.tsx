import { Fragment } from "react/jsx-runtime";

import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";
import { formatConditionalDate, isSameDate } from "@/utils/time";

import TodoItem from "./TodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;

  isGrouped?: boolean;
}

export default function TodoList({
  todoList,
  onTodoClick,
  onTodoCheck,
  isGrouped,
}: Props) {
  if (todoList.length === 0) {
    return (
      <EmptyCard label="할 일">해야하는 일을 하나씩 추가해보세요.</EmptyCard>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 pt-0">
        {todoList.map((item, i) => {
          const beforeTodo = i > 0 ? todoList[i - 1] : null;
          const isTitleVisible =
            (beforeTodo &&
              !isSameDate(beforeTodo.target_date, item.target_date)) ||
            !beforeTodo;

          return (
            <Fragment key={item.id}>
              {isGrouped && isTitleVisible && (
                <p className="text-xs ml-1 mt-2">
                  {formatConditionalDate(item.target_date)}
                </p>
              )}

              <TodoItem
                todo={item}
                onTodoClick={onTodoClick}
                onTodoCheck={onTodoCheck}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
