import { useQuery } from "@tanstack/react-query";

import TodoSection from "./TodoSection";
import HabitSection from "./HabitSection";
import RoutineSection from "./RoutineSection";
import { queryClient, taskApi } from "../../api/client";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/time";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";

function MainPage() {
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const { isLoading, data } = useQuery({
    queryKey: ["tasks", formatDate(targetDate)],
    queryFn: () => taskApi.getAllDailyTask(formatDate(targetDate)),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  };

  const handleValueChange = (value: DateValueType) => {
    if (!value?.startDate) {
      return;
    }

    setTargetDate(value.startDate);
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

        <TodoSection
          todoList={data?.data?.todo_list || []}
          fetchData={refetch}
        />
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">습관</h2>
        <HabitSection
          habitList={data?.data?.habit_list || []}
          fetchData={refetch}
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
