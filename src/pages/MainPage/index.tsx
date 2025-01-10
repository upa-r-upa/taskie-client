import { useQuery } from "@tanstack/react-query";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

import { queryClient, taskApi } from "@/api/client";
import { formatDate } from "@/utils/time";

import TodoSection from "./Todo/TodoSection";
import HabitSection from "./Habit/HabitSection";
import RoutineSection from "./Routine/RoutineSection";

function MainPage() {
  const [targetDate, setTargetDate] = useState<Date>(() => new Date());

  const formattedDate = formatDate(targetDate);

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

  const handleValueChange = (value: DateValueType) => {
    const date = value?.startDate;
    if (date) setTargetDate(date);
  };

  return (
    <>
      <Datepicker
        i18n="ko"
        asSingle={true}
        useRange={false}
        displayFormat="YYYY년 MM월 DD일"
        value={{
          endDate: targetDate,
          startDate: targetDate,
        }}
        placeholder="날짜를 지정해주세요."
        popoverDirection="down"
        onChange={handleValueChange}
        inputClassName="input input-bordered w-full text-sm input-md "
      />

      <div className="container my-5">
        <h2 className="text-xl mb-2">할 일</h2>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="skeleton h-10 w-28"></div>
            <div className="skeleton h-10"></div>
            <div className="skeleton h-10"></div>
          </div>
        ) : (
          <TodoSection
            date={targetDate}
            todoList={data?.data?.todo_list || []}
            reloadTodoList={refetch}
          />
        )}
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">습관</h2>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="skeleton h-12"></div>
            <div className="skeleton h-12"></div>
          </div>
        ) : (
          <HabitSection
            habitList={data?.data?.habit_list || []}
            reloadHabitList={refetch}
          />
        )}
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">루틴</h2>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="skeleton h-20"></div>
            <div className="skeleton h-20"></div>
          </div>
        ) : (
          <RoutineSection routineList={data?.data?.routine_list || []} />
        )}
      </div>
    </>
  );
}

export default MainPage;
