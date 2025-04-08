import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { queryClient, taskApi } from "@/api/client";
import { formatConditionalDate, formatDate } from "@/utils/time";
import DatePicker from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import TodoSection from "./Todo/TodoSection";
import HabitSection from "./Habit/HabitSection";
import RoutineSection from "./Routine/RoutineSection";

function MainPage() {
  const [date, setDate] = useState<Date>(() => new Date());

  const formattedDate = formatDate(date);

  const { isLoading, data } = useQuery({
    queryKey: ["tasks", formattedDate],
    queryFn: () => taskApi.getAllDailyTask(formattedDate),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  };

  return (
    <>
      <div className="block sm:flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl tracking-tight">Daily task</h2>
          <p className="text-muted-foreground text-sm mt-1 mb-3">
            {formatConditionalDate(date)}의 태스크를 확인해보세요.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <DatePicker date={date} onDateChange={setDate} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Card className="p-4 sm:h-[600px]">
          <CardHeader className="p-0">
            <CardTitle>할 일</CardTitle>
          </CardHeader>
          <CardContent className="p-0 py-4 gap-4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TodoSection
                  date={date}
                  todoList={data?.data?.todo_list || []}
                  reloadTodoList={refetch}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 sm:p-6 h-max overflow-hidden">
            <CardHeader className="p-0">
              <CardTitle>루틴</CardTitle>
            </CardHeader>

            <CardContent className="p-0 py-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <RoutineSection
                  date={date}
                  routineList={data?.data?.routine_list || []}
                />
              )}
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6 h-max overflow-hidden">
            <CardHeader className="p-0">
              <CardTitle>습관</CardTitle>
            </CardHeader>

            <CardContent className="p-0 py-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <HabitSection
                  date={date}
                  habitList={data?.data?.habit_list || []}
                  reloadHabitList={refetch}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default MainPage;
