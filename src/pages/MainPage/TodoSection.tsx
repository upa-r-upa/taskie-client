import { useEffect, useRef, useState } from "react";

import useMutation from "../../hooks/useMutation";
import { todoApi } from "../../api/client";
import TodoModal from "./TodoModal";
import { TodoBase, TodoPublic } from "../../api/generated";
import { getYMDFormatDate } from "../../utils/time";
import { useMessageStore } from "../../state/useMessageStore";

interface Props {
  todoList: Array<TodoPublic>;
}

export default function TodoSection({ todoList }: Props) {
  const updateModalRef = useRef<HTMLDialogElement>(null);
  const addModalRef = useRef<HTMLDialogElement>(null);

  const addMessage = useMessageStore((state) => state.addMessage);

  const { mutation, isLoading } = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      addModalRef.current?.close();
      addMessage({
        message: "할 일이 추가 되었습니다.",
      });
    },
    onError: () => {
      addMessage({
        message: "투두 추가에 실패했습니다.",
        type: "error",
      });
    },
  });
  const [selectedTodo, setSelectedTodo] = useState<TodoPublic | null>(null);

  useEffect(() => {
    if (!selectedTodo) return;

    updateModalRef.current?.showModal();
  }, [selectedTodo]);

  const handleClickTodo = (todo: TodoPublic) => {
    setSelectedTodo(todo);
  };

  const renderTodoList = (list: Array<TodoPublic>): JSX.Element[] => {
    return list.map((item) => {
      return (
        <li key={item.id} className="mb-2 flex items-center">
          <input type="checkbox" className="checkbox" />
          <span
            onClick={() => handleClickTodo(item)}
            className="label-text pl-2"
          >
            {item.title}
          </span>
        </li>
      );
    });
  };

  const handleAddTodoSubmit = (todo: TodoBase) => {
    mutation(todo);
  };

  const renderTodoUpdateModal = (todo: TodoBase | null): JSX.Element | null => {
    if (!todo) return null;

    return (
      <TodoModal
        modalId="todo-update"
        title={todo.title}
        content={todo.content}
        targetDate={todo.target_date}
        modalRef={updateModalRef}
        onSubmitTodo={(data) => {
          console.log(data);
        }}
      />
    );
  };

  const renderTodoAddModal = () => {
    return (
      <>
        <TodoModal
          modalId="todo-add"
          title={""}
          content={""}
          targetDate={getYMDFormatDate(new Date())}
          modalRef={addModalRef}
          onSubmitTodo={handleAddTodoSubmit}
          isLoading={isLoading}
        />
      </>
    );
  };

  const handleAddTodoButtonClick = () => {
    addModalRef.current?.showModal();
  };

  return (
    <>
      {renderTodoList(todoList)}
      <button
        onClick={handleAddTodoButtonClick}
        className="btn btn-primary btn-outline btn-sm"
      >
        할 일 추가하기
      </button>

      {renderTodoUpdateModal(selectedTodo)}
      {renderTodoAddModal()}
    </>
  );
}
