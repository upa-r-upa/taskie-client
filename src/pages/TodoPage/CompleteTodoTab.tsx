import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

import { todoApi } from "@/api/client";
import { API_REFETCH_INTERVAL } from "@/constants/api";
import { TodoPublic } from "@/api/generated";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import EmptyCard from "@/components/EmptyCard";
import { formatConditionalDate, isSameDate } from "@/utils/time";
import TodoItem from "@/components/todo/TodoItem";

import TodoSkeleton from "./TodoSkeleton";

interface Props {
  onTodoClick: (todo: TodoPublic) => void;
  onTodoCheck: (todo: TodoPublic, checked: boolean) => void;
}

const LIMIT = 30;

export default function CompleteTodoTab({ onTodoClick, onTodoCheck }: Props) {
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["todos", "complete"],
    queryFn: (params) => todoApi.getTodoList(LIMIT, params.pageParam, true),
    refetchIntervalInBackground: true,
    refetchInterval: API_REFETCH_INTERVAL,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length === LIMIT
        ? allPages.length * LIMIT + 1
        : undefined;
    },
  });

  const { triggerRef } = useIntersectionObserver({
    callback: fetchNextPage,
    enabled: hasNextPage && !isLoading,
  });

  if (isLoading) {
    return <TodoSkeleton />;
  }

  const todoList = data?.pages.flatMap((page) => page.data) || [];

  if (todoList.length === 0) {
    return <EmptyCard label="할 일">완료한 할 일이 아직 없어요.</EmptyCard>;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex flex-col gap-2 overflow-y-auto min-h-0 flex-1">
        {todoList.map((item, i) => {
          if (!item.completed_at) return;

          const beforeTodo = i > 0 ? todoList[i - 1] : null;
          const isTitleVisible =
            (beforeTodo?.completed_at &&
              !isSameDate(beforeTodo.completed_at, item.completed_at)) ||
            !beforeTodo;

          return (
            <Fragment key={item.id}>
              {isTitleVisible && (
                <p className="text-xs ml-1 mt-2">
                  {formatConditionalDate(item.completed_at)}
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

      <div ref={triggerRef} className="h-1" />
    </div>
  );
}
