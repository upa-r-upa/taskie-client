import { useQuery } from "@tanstack/react-query";

import { routineApi } from "@/api/client";

import RoutineList from "./RoutineList";

export default function RoutinePage() {
  const { isLoading, data } = useQuery({
    queryKey: ["routines"],
    queryFn: () => routineApi.getRoutineList(),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold mb-3">루틴 목록</h1>

      <RoutineList isLoading={isLoading} routineList={data?.data || []} />
    </div>
  );
}
