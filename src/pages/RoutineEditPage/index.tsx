import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { routineApi } from "@/api/client";
import Loading from "@/components/Loading";

import EditPage from "./EditPage";

export default function RoutineUpdatePage() {
  const { routineId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["routines", routineId],
    queryFn: () => routineApi.getRoutine(parseInt(routineId!)),
    enabled: !!(routineId && !isNaN(parseInt(routineId))),
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!routineId || isNaN(parseInt(routineId)) || (!isLoading && !data?.data)) {
    return <p>존재하지 않는 루틴이에요.</p>;
  }

  return <EditPage routine={data!.data} />;
}
