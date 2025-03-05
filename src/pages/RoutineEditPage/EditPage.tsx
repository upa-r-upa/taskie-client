import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { queryClient, routineApi } from "@/api/client";
import { RoutinePublic, RoutineUpdateInput } from "@/api/generated";
import useRoutineForm from "@/hooks/useRoutineForm";
import RoutineForm from "@/components/routine/RoutineForm";

interface Props {
  routine: RoutinePublic;
}

export default function EditPage({ routine }: Props) {
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
  } = useRoutineForm({
    initialTitle: routine.title,
    initialRepeatDays: routine.repeat_days,
    initialStartTimeMinutes: routine.start_time_minutes,
    initialTodoList: routine.routine_elements,
  });

  const refetchData = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["routines"],
    });
    queryClient.invalidateQueries({
      queryKey: ["routine"],
    });
  };

  const createRoutineMutation = useMutation({
    mutationFn: (data: RoutineUpdateInput) =>
      routineApi.updateRoutine(routine.id, data),
    onSuccess: () => {
      refetchData();
      navigate(-1);
    },
    onError: () => toast.error("루틴 수정에 실패했습니다."),
  });

  const handleSubmit = () => {
    createRoutineMutation.mutate({
      title: title,
      start_time_minutes: startTimeMinutes,
      repeat_days: repeatDays,
      routine_elements: todoList,
    });
  };

  const deleteRoutineMutation = useMutation({
    mutationFn: routineApi.deleteRoutine,
    onSuccess: () => {
      toast.success("루틴을 삭제했습니다."), refetchData();
      navigate(-1);
    },
    onError: () => toast.error("루틴 삭제에 실패했습니다."),
  });

  const handleRoutineDeleteClick = () => {
    deleteRoutineMutation.mutate(routine.id);
  };

  return (
    <>
      <RoutineForm
        formTitle="루틴 수정하기"
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
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn w-20"
            >
              취소
            </button>
            <button
              disabled={deleteRoutineMutation.isPending}
              onClick={handleRoutineDeleteClick}
              className="btn btn-error"
            >
              삭제하기
            </button>
            <button
              onClick={handleSubmit}
              disabled={isDisabled() || deleteRoutineMutation.isPending}
              className="btn btn-primary flex-1"
            >
              루틴 수정하기
            </button>
          </>
        }
      />
    </>
  );
}
