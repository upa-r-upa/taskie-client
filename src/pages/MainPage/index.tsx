import { useQuery } from "@tanstack/react-query";

import TodoSection from "./TodoSection";
import HabitSection from "./HabitSection";
import RoutineSection from "./RoutineSection";
import { queryClient, taskApi } from "../../api/client";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/time";

function MainPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskApi.getAllDailyTask(formatDate(new Date())),
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

  return (
    <>
      <h1 className="text-2xl font-semibold mb-3">오늘 하루</h1>

      <div className="container mb-5">
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
