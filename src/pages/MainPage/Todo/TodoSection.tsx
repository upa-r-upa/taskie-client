import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime } from "@/utils/time";
import TodoList from "@/components/todo/TodoList";
import useTodoMutations from "@/hooks/useTodoMutations";
import { Button } from "@/components/ui/button";

import TodoModal from "./TodoModal";

interface Props {
  date: Date;
  todoList: Array<TodoPublic>;

  reloadTodoList: () => void;
}

export default function TodoSection({ date, todoList, reloadTodoList }: Props) {
  const {
    createModalState,
    updateModalState,
    onAddTodoSubmit,
    onUpdateTodoSubmit,
    onUpdateTodoChecked,
    onDeleteTodo,
    updateTodoMutation,
    deleteTodoMutation,
    createTodoMutation,
  } = useTodoMutations(reloadTodoList);

  const renderTodoUpdateModal = (todo: TodoPublic | null) => {
    return (
      <TodoModal
        deletable
        isOpened={updateModalState.isOpened}
        setIsOpened={updateModalState.setIsOpened}
        submitButtonLabel="할 일 수정하기"
        modalTitle="할 일 수정하기"
        title={todo?.title || ""}
        content={todo?.content || ""}
        targetDate={todo?.target_date ? new Date(todo.target_date) : new Date()}
        onTodoSubmit={onUpdateTodoSubmit}
        isLoading={updateTodoMutation.isPending || deleteTodoMutation.isPending}
        onTodoDelete={onDeleteTodo}
      />
    );
  };

  return (
    <>
      <TodoList
        todoList={todoList}
        onTodoClick={updateModalState.openModal}
        onTodoCheck={onUpdateTodoChecked}
      />

      <Button
        size="lg"
        onClick={createModalState.openModal}
        className="mt-4 w-full"
      >
        할 일 추가하기
      </Button>

      <TodoModal
        isOpened={createModalState.isModalOpened}
        setIsOpened={createModalState.setIsOpened}
        modalTitle="할 일 추가하기"
        targetDate={getDateWithoutTime(date)}
        onTodoSubmit={onAddTodoSubmit}
        isLoading={createTodoMutation.isPending}
        submitButtonLabel="할 일 추가하기"
      />

      {renderTodoUpdateModal(updateModalState.modalState)}
    </>
  );
}
