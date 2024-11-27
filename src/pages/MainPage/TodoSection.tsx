import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { todoApi } from "@/api/client";
import TodoModal from "./TodoModal";
import { TodoPublic } from "@/api/generated";
import { getDateWithoutTime, getFormatTime, isToday } from "@/utils/time";
import { useMessageStore } from "@/state/useMessageStore";
import EmptyCard from "@/components/EmptyCard";
import { TodoModalSubmitProps, TodoUpdateInputParameter } from "./types";

interface Props {
  todoList: Array<TodoPublic>;

  fetchData: () => void;
}

export default function TodoSection({ todoList, fetchData }: Props) {
  const updateModalRef = useRef<HTMLDialogElement>(null);
  const addModalRef = useRef<HTMLDialogElement>(null);

  const [selectedTodo, setSelectedTodo] = useState<TodoPublic | null>(null);
  const [isCreateTodoModalOpened, setIsCreateTodoModalOpened] =
    useState<boolean>(false);

  const addMessage = useMessageStore((state) => state.addMessage);

  useEffect(() => {
    if (selectedTodo) {
      updateModalRef.current?.showModal();
    } else {
      updateModalRef.current?.close();
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (isCreateTodoModalOpened) {
      addModalRef.current?.showModal();
    } else {
      addModalRef.current?.close();
    }
  });

  const handleCreateTodoSuccess = () => {
    setIsCreateTodoModalOpened(false);
    setSelectedTodo(null);

    fetchData();
  };

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
    onSuccess: handleCreateTodoSuccess,
    onError: () => {
      addMessage({
        message: "투두 추가에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleUpdateModalClose = () => {
    addModalRef.current?.close();
    setSelectedTodo(null);
  };

  const handleUpdateTodoSuccess = () => {
    handleUpdateModalClose();

    fetchData();
  };

  const updateTodoMutation = useMutation({
    mutationFn: (input: TodoUpdateInputParameter) =>
      todoApi.updateTodo(input.id, input.update),
    onSuccess: handleUpdateTodoSuccess,
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
    onSuccess: handleUpdateTodoSuccess,
    onError: () => {
      addMessage({
        message: "투두 삭제에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleTodoDeleteClick = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const renderTodoUpdateModal = (
    todo: TodoPublic | null
  ): JSX.Element | null => {
    if (!todo) return <></>;

    return (
      <TodoModal
        modalTitle="할 일 수정하기"
        modalId="todo-update"
        title={todo.title}
        content={todo.content}
        targetDate={new Date(todo.target_date)}
        modalRef={updateModalRef}
        onTodoSubmit={handleUpdateTodoSubmit}
        isLoading={updateTodoMutation.isPending || deleteTodoMutation.isPending}
        onCancel={handleUpdateModalClose}
        extraButton={
          <button
            disabled={deleteTodoMutation.isPending}
            onClick={() => handleTodoDeleteClick(todo.id)}
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
          targetDate={getDateWithoutTime()}
          modalRef={addModalRef}
          onTodoSubmit={handleAddTodoSubmit}
          isLoading={createTodoMutation.isPending}
          onCancel={() => setIsCreateTodoModalOpened(false)}
        />
      </>
    );
  };

  const handleAddTodoButtonClick = () => {
    setIsCreateTodoModalOpened(true);
  };

  const handleClickTodo = (todo: TodoPublic) => {
    setSelectedTodo(todo);
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

  const renderTodoList = (list: Array<TodoPublic>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="할 일">
          <button
            onClick={handleAddTodoButtonClick}
            className="btn btn-primary btn-outline"
          >
            할 일 추가하기
          </button>
        </EmptyCard>
      );
    }

    return list.map((item) => {
      const date = item.target_date;
      const formattedDate = isToday(date) ? getFormatTime(date) : "";

      if (item.completed_at) {
        return (
          <li
            key={item.id}
            className="mb-2 px-4 card-bordered rounded-md flex items-center h-16"
          >
            <div
              className="flex-1 overflow-hidden"
              onClick={() => handleClickTodo(item)}
            >
              {item.title ? (
                <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap line-through">
                  {item.title}
                </p>
              ) : (
                <p className="text-gray-400 line-through">이름이 없습니다.</p>
              )}
              <div className="flex">
                {item.content && (
                  <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <input
                type="checkbox"
                checked={true}
                className="checkbox checkbox-primary checkbox-sm rounded-full"
                onChange={({ target: { checked } }) =>
                  handleUpdateTodoChecked(item, checked)
                }
              />
            </div>
          </li>
        );
      } else {
        return (
          <li
            key={item.id}
            className="mb-2 px-4 card-bordered rounded-md flex items-center h-16"
          >
            <div
              className="flex-1 overflow-hidden"
              onClick={() => handleClickTodo(item)}
            >
              {formattedDate && (
                <p className="text-xs whitespace-nowrap">{formattedDate}</p>
              )}
              {item.title ? (
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.title}
                </p>
              ) : (
                <p className="text-gray-400">이름이 없습니다.</p>
              )}
              <div className="flex">
                {item.content && (
                  <p className="text-xs text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.content}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 ml-4">
              <input
                type="checkbox"
                checked={!!item.completed_at}
                className="checkbox checkbox-primary checkbox-sm rounded-full"
                onChange={({ target: { checked } }) =>
                  handleUpdateTodoChecked(item, checked)
                }
              />
            </div>
          </li>
        );
      }
    });
  };

  return (
    <ul className="space-y-2">
      {renderTodoList(todoList)}

      {todoList.length ? (
        <button
          onClick={handleAddTodoButtonClick}
          className="btn btn-primary btn-outline btn-sm"
        >
          할 일 추가하기
        </button>
      ) : (
        <></>
      )}

      {renderTodoUpdateModal(selectedTodo)}
      {renderTodoAddModal()}
    </ul>
  );
}
