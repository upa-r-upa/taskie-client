import { TodoPublic } from "@/api/generated";
import EmptyCard from "@/components/EmptyCard";

import CompletedTodoItem from "./CompletedTodoItem";
import IncompleteTodoItem from "./IncompleteTodoItem";

interface Props {
  todoList: Array<TodoPublic>;

  onAddTodoClick: () => void;
  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

export default function TodoList({
  todoList,
  onAddTodoClick,
  onTodoClick,
  onTodoCheck,
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
        {todoList.map((item) => {
          if (item.completed_at) {
            return (
              <CompletedTodoItem
                key={item.id}
                todo={item}
                onTodoClick={onTodoClick}
                onTodoCheck={onTodoCheck}
              />
            );
          } else {
            return (
              <IncompleteTodoItem
                key={item.id}
                todo={item}
                onTodoClick={onTodoClick}
                onTodoCheck={onTodoCheck}
              />
            );
          }
        })}
      </ul>

      {todoList.length ? (
        <button
          onClick={onAddTodoClick}
          className="btn btn-primary btn-outline btn-sm"
        >
          할 일 추가하기
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
