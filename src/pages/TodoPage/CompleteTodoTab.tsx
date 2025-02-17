import { useInfiniteQuery } from "@tanstack/react-query";

import { todoApi } from "@/api/client";
import TodoList from "@/components/todo/TodoList";
import { Skeleton } from "@/components/ui/skeleton";
import { API_REFETCH_INTERVAL } from "@/constants/api";
import { TodoPublic } from "@/api/generated";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

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

  return (
    <>
      <TodoList
        isGrouped
        todoList={data?.pages.flatMap((page) => page.data) || []}
        onTodoClick={onTodoClick}
        onTodoCheck={onTodoCheck}
      />

      <div ref={triggerRef} className="h-1" />
    </>
  );
}
