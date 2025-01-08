import { useQuery } from "@tanstack/react-query";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

import { queryClient, taskApi } from "@/api/client";
import Loading from "@/components/Loading";
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

  if (isLoading) {
    return <Loading />;
  }

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

        <TodoSection
          date={targetDate}
          todoList={data?.data?.todo_list || []}
          reloadTodoList={refetch}
        />
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">습관</h2>
        <HabitSection
          habitList={data?.data?.habit_list || []}
          reloadHabitList={refetch}
        />
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">루틴</h2>
        <RoutineSection routineList={data?.data?.routine_list || []} />
      </div>
    </>
  );
}

export default MainPage;
