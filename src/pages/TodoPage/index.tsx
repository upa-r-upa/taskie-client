import { useMutation, useQuery } from "@tanstack/react-query";
import { BsPlusLg } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import { queryClient, todoApi } from "@/api/client";
import {
  formatConditionalDate,
  formatDate,
  getDateWithoutTime,
  getFormatTime,
  isSameDate,
} from "@/utils/time";
import Loading from "@/components/Loading";
import EmptyCard from "@/components/EmptyCard";
import { TodoPublic } from "@/api/generated";
import { useMessageStore } from "@/state/useMessageStore";

import {
  TodoModalSubmitProps,
  TodoUpdateInputParameter,
} from "../MainPage/types";
import TodoModal from "../MainPage/Todo/TodoModal";

export default function TodoPage() {
  const { isLoading, data: todoList } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      todoApi.getTodoList(
        1000,
        undefined,
        false,
        "2000-01-01",
        formatDate(new Date())
      ),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });
  const { isLoading: doneTodoListIsLoading, data: doneTodoList } = useQuery({
    queryKey: ["todos", "done"],
    queryFn: () =>
      todoApi.getTodoList(
        1000,
        undefined,
        true,
        "2000-01-01",
        formatDate(new Date())
      ),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  const fetchData = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["todos"],
    });
  };

  const renderTodoList = (list: Array<TodoPublic>) => {
    if (list.length === 0) {
      return <EmptyCard label="할 일" />;
    }

    return list.map((item, i) => {
      const date = item.target_date;
      const formattedDate = getFormatTime(date);
      const beforeTodo = i >= 1 ? list[i - 1] : null;
      const isTitleVisible =
        !beforeTodo ||
        (beforeTodo && !isSameDate(beforeTodo?.target_date, item.target_date));

      if (item.completed_at) {
        return (
          <li key={item.id} className="list-none">
            {isTitleVisible ? (
              <p className="font-semibold mb-2">
                {formatConditionalDate(item.target_date)}
              </p>
            ) : (
              <></>
            )}

            <div className="mb-2 px-4 card-bordered rounded-md flex items-center h-10">
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
            </div>
          </li>
        );
      } else {
        return (
          <li key={item.id} className="list-none">
            {isTitleVisible ? (
              <p className="font-semibold text-lg mb-2 mt-4">
                {formatConditionalDate(item.target_date)}
              </p>
            ) : (
              <></>
            )}
            <div className="mb-2 px-4 card-bordered rounded-md flex items-center h-16">
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
            </div>
          </li>
        );
      }
    });
  };

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
    if (!todo) return null;

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold mb-3">할 일 목록</h1>

      {renderTodoList(todoList?.data || [])}

      <button
        onClick={handleAddTodoButtonClick}
        className="btn btn-circle btn-md btn-primary absolute right-0 top-0 shadow-lg"
      >
        <BsPlusLg />
      </button>

      <div className="collapse collapse-arrow card-bordered shadow-sm mt-6 bg-slate-50">
        <input type="radio" name="done-todos" defaultChecked={false} />
        <div className="collapse-title text-lg font-medium">
          완료한 투두 목록
        </div>
        {doneTodoListIsLoading ? (
          <Loading />
        ) : (
          <div className="collapse-content bg-white py-2">
            {renderTodoList(doneTodoList?.data || [])}
          </div>
        )}
      </div>

      {renderTodoUpdateModal(selectedTodo)}
      {renderTodoAddModal()}
    </div>
  );
}
