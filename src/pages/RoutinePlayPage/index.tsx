import { useState } from "react";
import ThumbnailView from "./ThumbnailView";
import PlayView from "./PlayView";
import { useMutation, useQuery } from "@tanstack/react-query";
import { routineApi } from "@/api/client";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import {
  RoutineAchieveInputParameter,
  RoutinePlayViewSubmitProps,
} from "../MainPage/types";
import { useMessageStore } from "@/state/useMessageStore";
import { RoutineLogBase } from "@/api/generated";

type PlayViewStepType = 0 | 1;

export default function RoutinePlayPage() {
  const navigate = useNavigate();
  const { routineId } = useParams();

  const addMessage = useMessageStore((state) => state.addMessage);

  const [playViewStep, setPlayViewStep] = useState<PlayViewStepType>(0);

  const { isLoading, data } = useQuery({
    queryKey: ["routine", routineId],
    queryFn: () => routineApi.getRoutine(parseInt(routineId!)),
    enabled: !!(routineId && !isNaN(parseInt(routineId))),
    refetchOnWindowFocus: true,
    retry: false,
  });

  const achieveRoutine = useMutation({
    mutationFn: (data: RoutineAchieveInputParameter) =>
      routineApi.putRoutineLog(data.id, data.update),
    onSuccess: () => {
      addMessage({
        type: "success",
        message: `${data?.data.title || "루틴"}을 완료했어요!`,
      });
      navigate(-1);
    },
    onError: () => {
      addMessage({
        message: "루틴 완료에 실패했습니다.",
        type: "error",
      });
    },
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
    return <Loading />;
  }

  const renderStepView = () => {
    switch (playViewStep) {
      case 0:
        return (
          <ThumbnailView
            routine={data!.data}
            goToNextStep={() => setPlayViewStep(1)}
          />
        );
      case 1:
        return <PlayView routine={data!.data} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return <>{renderStepView()}</>;
}
