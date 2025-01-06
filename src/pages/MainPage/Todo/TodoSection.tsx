import { useMutation } from "@tanstack/react-query";

import { todoApi } from "@/api/client";
import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime } from "@/utils/time";
import { useMessageStore } from "@/state/useMessageStore";
import useModal from "@/hooks/useModal";
import useModalWithState from "@/hooks/useModalWithState";

import { TodoModalSubmitProps, TodoUpdateInputParameter } from "../types";

import TodoModal from "./TodoModal";
import TodoList from "./TodoList";

interface Props {
  date: Date;
  todoList: Array<TodoPublic>;

  fetchData: () => void;
}

export default function TodoSection({ date, todoList, fetchData }: Props) {
  const addMessage = useMessageStore((state) => state.addMessage);

  const {
    modalRef: addModalRef,
    isModalOpened: isCreateTodoModalOpened,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();

  const {
    modalRef: updateModalRef,
    modalState: selectedTodo,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModalWithState<TodoPublic>();

  const handleAddTodoSubmit = (todo: TodoModalSubmitProps) => {
    createTodoMutation.mutate({
      content: todo.content,
      title: todo.title,
      order: 0,
      target_date: todo.targetDate.toISOString(),
    });
  };

  const createTodoMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      closeAddModal();
      closeUpdateModal();
      fetchData();
    },
    onError: () => {
      addMessage({
        message: "투두 추가에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleTodoUpdateSuccess = () => {
    closeUpdateModal();
    fetchData();
  };

  const updateTodoMutation = useMutation({
    mutationFn: (input: TodoUpdateInputParameter) =>
      todoApi.updateTodo(input.id, input.update),
    onSuccess: handleTodoUpdateSuccess,
    onError: () => {
      addMessage({
        message: "투두 수정에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleUpdateTodoSubmit = (todo: TodoModalSubmitProps) => {
    if (!selectedTodo) {
      return;
    }

    updateTodoMutation.mutate({
      id: selectedTodo.id,
      update: {
        ...todo,
        completed: !!selectedTodo.completed_at,
        target_date: todo.targetDate.toISOString(),
      },
    });
  };

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: handleTodoUpdateSuccess,
    onError: () => {
      addMessage({
        message: "투두 삭제에 실패했습니다.",
        type: "error",
      });
    },
  });

  const renderTodoUpdateModal = (
    todo: TodoPublic | null
  ): JSX.Element | null => {
    if (!todo) return <></>;

    return (
      <TodoModal
        ref={updateModalRef}
        modalTitle="할 일 수정하기"
        modalId="todo-update"
        title={todo.title}
        content={todo.content}
        targetDate={new Date(todo.target_date)}
        onTodoSubmit={handleUpdateTodoSubmit}
        isLoading={updateTodoMutation.isPending || deleteTodoMutation.isPending}
        onCancel={closeUpdateModal}
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

  const renderTodoAddModal = () => {
    return (
      <>
        <TodoModal
          key={isCreateTodoModalOpened ? "open" : "close"}
          modalTitle="할 일 추가하기"
          modalId="todo-add"
          title={""}
          content={""}
          targetDate={getDateWithoutTime(date)}
          ref={addModalRef}
          onTodoSubmit={handleAddTodoSubmit}
          isLoading={createTodoMutation.isPending}
          onCancel={closeAddModal}
        />
      </>
    );
  };

  const handleUpdateTodoChecked = (todo: TodoPublic, checked: boolean) => {
    updateTodoMutation.mutate({
      id: todo.id,
      update: {
        ...todo,
        completed: checked,
      },
    });
  };

  return (
    <>
      <TodoList
        todoList={todoList}
        onAddTodoClick={openAddModal}
        onTodoCheck={handleUpdateTodoChecked}
        onTodoClick={openUpdateModal}
      />

      {renderTodoUpdateModal(selectedTodo)}
      {renderTodoAddModal()}
    </>
  );
}
