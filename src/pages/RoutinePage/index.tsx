import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { routineApi } from "@/api/client";
import RoutineList from "@/components/routine/RoutineList";

export default function RoutinePage() {
  const [date] = useState<Date>(() => new Date());

  const { isLoading, data } = useQuery({
    queryKey: ["routines"],
    queryFn: () => routineApi.getRoutineList(),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  return (
    <>
      <h1 className="text-2xl font-semibold mb-3">루틴 목록</h1>

      {!isLoading && <RoutineList date={date} routineList={data?.data || []} />}
    </>
  );
}
