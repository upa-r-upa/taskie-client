import { useQuery } from "@tanstack/react-query";
import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";

import TodoList from "@/components/todo/TodoList";
import CompletedTodoList from "@/components/todo/CompletedTodoList";
import useTodoMutations from "@/hooks/useTodoMutations";
import { queryClient, todoApi } from "@/api/client";
import { getDateWithoutTime } from "@/utils/time";
import { TodoPublic } from "@/api/generated";
import { API_REFETCH_INTERVAL } from "@/constants/api";

import TodoModal from "../MainPage/Todo/TodoModal";

function TodoLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-10 w-28"></div>
      <div className="skeleton h-10"></div>
      <div className="skeleton h-10"></div>
    </div>
  );
}

export default function TodoPage() {
  const [date] = useState(() => new Date());

  const { isLoading, data: todoList } = useQuery({
    queryKey: ["todos"],
    queryFn: () => todoApi.getTodoList(),
    refetchIntervalInBackground: true,
    refetchInterval: API_REFETCH_INTERVAL,
  });
  const { isLoading: doneTodoListIsLoading, data: doneTodoList } = useQuery({
    queryKey: ["todos", "done"],
    queryFn: () => todoApi.getTodoList(undefined, undefined, true),
    refetchIntervalInBackground: true,
    refetchInterval: API_REFETCH_INTERVAL,
  });

  const reloadTodoList = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["todos"],
    });
  };

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
    <div className="relative pb-4">
      <h1 className="text-2xl font-semibold mb-3">할 일 목록</h1>

      {isLoading ? (
        <TodoLoadingSkeleton />
      ) : (
        <TodoList
          isGrouped
          todoList={todoList?.data || []}
          onAddTodoClick={createModalState.openModal}
          onTodoClick={updateModalState.openModal}
          onTodoCheck={onUpdateTodoChecked}
        />
      )}

      <button onClick={createModalState.openModal} className="float-btn">
        <BsPlusLg />
        할일 추가하기
      </button>

      <div className="collapse collapse-arrow card-bordered shadow-sm mt-6 bg-slate-50">
        <input type="radio" name="done-todos" defaultChecked={false} />
        <div className="collapse-title text-lg font-medium">
          완료한 할일 목록
        </div>

        <div className="p-2 bg-white">
          {doneTodoListIsLoading ? (
            <TodoLoadingSkeleton />
          ) : (
            <CompletedTodoList
              todoList={doneTodoList?.data || []}
              onTodoCheck={onUpdateTodoChecked}
              onTodoClick={updateModalState.openModal}
            />
          )}
        </div>
      </div>

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
    </div>
  );
}
