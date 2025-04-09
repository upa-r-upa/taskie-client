import { Fragment } from "react/jsx-runtime";

import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";

import TodoItem from "./TodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

export default function TodoList({
  todoList,
  onTodoClick,
  onTodoCheck,
}: Props) {
  if (todoList.length === 0) {
    return (
      <EmptyCard label="할 일">해야하는 일을 하나씩 추가해보세요.</EmptyCard>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 pt-0 h-[470px] overflow-y-auto">
        {todoList.map((item) => {
          return (
            <Fragment key={item.id}>
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
