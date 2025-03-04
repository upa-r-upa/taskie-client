import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { routineApi } from "@/api/client";
import { RoutineLogBase } from "@/api/generated";
import { Skeleton } from "@/components/ui/skeleton";

import {
  RoutineAchieveInputParameter,
  RoutinePlayViewSubmitProps,
} from "../MainPage/types";

import PlayView from "./PlayView";

export default function RoutinePlayPage() {
  const navigate = useNavigate();
  const { routineId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => routineApi.getRoutine(parseInt(routineId!)),
    enabled: !!(routineId && !isNaN(parseInt(routineId))),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const achieveRoutine = useMutation({
    mutationFn: (data: RoutineAchieveInputParameter) =>
      routineApi.putRoutineLog(data.id, data.update),
    onSuccess: () => {
      toast.success(`${data?.data.title || "제목 없음"} 루틴을 완료했어요!`);
      navigate(-1);
    },
    onError: () => toast.error("루틴 완료에 실패했습니다."),
  });

  const handleSubmit = (data: RoutinePlayViewSubmitProps) => {
    const updates: Array<RoutineLogBase> = data.routineTodoList.map((data) => {
      return {
        routine_item_id: data.id,
        duration_seconds: data.completed_duration_seconds || 0,
        is_skipped: data.is_skipped,
      };
    });

    achieveRoutine.mutate({
      id: data.id,
      update: {
        logs: updates,
      },
    });
  };

  if (!routineId || isNaN(parseInt(routineId)) || (!isLoading && !data?.data)) {
    return <p>존재하지 않는 루틴이에요.</p>;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-12 w-48 mb-4" />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PlayView routine={data?.data!} onSubmit={handleSubmit} />;
}
