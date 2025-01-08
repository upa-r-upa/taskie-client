import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime } from "@/utils/time";
import TodoList from "@/components/todo/TodoList";
import useTodoMutations from "@/hooks/useTodoMutations";

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
    updateTodoMutation,
    deleteTodoMutation,
    createTodoMutation,
  } = useTodoMutations(reloadTodoList);

  const renderTodoUpdateModal = (todo: TodoPublic | null) => {
    if (!todo) return;

    return (
      <TodoModal
        ref={updateModalState.modalRef}
        modalTitle="할 일 수정하기"
        modalId="todo-update"
        title={todo.title}
        content={todo.content}
        targetDate={new Date(todo.target_date)}
        onTodoSubmit={onUpdateTodoSubmit}
        isLoading={updateTodoMutation.isPending || deleteTodoMutation.isPending}
        onCancel={updateModalState.closeModal}
        extraButton={
          <button
            disabled={deleteTodoMutation.isPending}
            onClick={() => deleteTodoMutation.mutate(todo.id)}
            className="btn btn-error"
          >
            삭제하기
          </button>
        }
      />
    );
  };

  return (
    <>
      <TodoList
        todoList={todoList}
        onAddTodoClick={createModalState.openModal}
        onTodoClick={updateModalState.openModal}
        onTodoCheck={onUpdateTodoChecked}
      />

      <TodoModal
        ref={createModalState.modalRef}
        key={createModalState.isModalOpened ? "open" : "close"}
        modalTitle="할 일 추가하기"
        modalId="todo-create"
        targetDate={getDateWithoutTime(date)}
        onTodoSubmit={onAddTodoSubmit}
        isLoading={createTodoMutation.isPending}
        onCancel={createModalState.closeModal}
      />

      {renderTodoUpdateModal(updateModalState.modalState)}
    </>
  );
}
