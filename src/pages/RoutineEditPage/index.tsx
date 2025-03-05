import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { routineApi } from "@/api/client";
import { Skeleton } from "@/components/ui/skeleton";
import NotFoundRoutine from "@/components/routine/NotFoundRoutine";

import EditPage from "./EditPage";

export default function RoutineUpdatePage() {
  const { routineId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["routines", routineId],
    queryFn: () => routineApi.getRoutine(parseInt(routineId!)),
    enabled: !!(routineId && !isNaN(parseInt(routineId))),
    refetchOnWindowFocus: true,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!routineId || isNaN(parseInt(routineId)) || (!isLoading && !data?.data)) {
    return <NotFoundRoutine />;
  }

  return <EditPage routine={data!.data} />;
}
