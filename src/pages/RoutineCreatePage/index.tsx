import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { queryClient, routineApi } from "@/api/client";
import useRoutineForm from "@/hooks/useRoutineForm";
import { parseRepeatDaysToServerFormat } from "@/utils/time";
import RoutineForm from "@/components/routine/RoutineForm";

export default function RoutineCreatePage() {
  const navigate = useNavigate();

  const {
    title,
    repeatDays,
    startTimeMinutes,
    todoList,

    setTitle,
    setStartTimeMinutes,
    setRepeatDays,

    onTodoCreateClick,
    onTodoDeleteClick,
    onTodoUpdate,
    isDisabled,
  } = useRoutineForm({});

  const createRoutineMutation = useMutation({
    mutationFn: routineApi.createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["routines"],
      });
      navigate(-1);
    },
    onError: () => toast.error("루틴 생성에 실패했습니다."),
  });

  const handleSubmit = () => {
    createRoutineMutation.mutate({
      title: title,
      start_time_minutes: startTimeMinutes,
      repeat_days: parseRepeatDaysToServerFormat(repeatDays),
      routine_elements: todoList,
    });
  };

  return (
    <>
      <RoutineForm
        formTitle="루틴 추가하기"
        title={title}
        startTimeMinutes={startTimeMinutes}
        repeatDays={repeatDays}
        todoList={todoList}
        onTitleChange={setTitle}
        onStartTimeMinutesChange={setStartTimeMinutes}
        onTodoCreateClick={onTodoCreateClick}
        onTodoDeleteClick={onTodoDeleteClick}
        onRepeatDaysChange={setRepeatDays}
        onTodoUpdate={onTodoUpdate}
        buttons={
          <>
            <button onClick={() => navigate(-1)} className="btn flex-1">
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={isDisabled()}
              className="btn btn-primary flex-[2]"
            >
              루틴 추가하기
            </button>
          </>
        }
      />
    </>
  );
}
