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

  const { form, onTodoCreate, onTodoDelete, onTodoUpdate } = useRoutineForm({
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

  const updateRoutineMutation = useMutation({
    mutationFn: (data: RoutineUpdateInput) =>
      routineApi.updateRoutine(routine.id, data),
    onSuccess: () => {
      refetchData();
      navigate(-1);
    },
    onError: () => toast.error("루틴 수정에 실패했습니다."),
  });

  const handleSubmit = () => {
    const values = form.getValues();

    updateRoutineMutation.mutate({
      title: values.title,
      start_time_minutes: values.startTimeMinutes,
      repeat_days: values.repeatDays,
      routine_elements: values.todoList.map((v) => ({
        id: v.id,
        title: v.title,
        duration_minutes: v.durationMinutes,
      })),
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
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-3xl mb-2 tracking-tight">루틴 수정하기</h2>

      <div>
        <RoutineForm
          deletable
          form={form}
          onSubmit={handleSubmit}
          isLoading={updateRoutineMutation.isPending}
          submitButtonLabel="루틴 수정하기"
          onRoutineDelete={handleRoutineDeleteClick}
          onTodoCreate={onTodoCreate}
          onTodoDelete={onTodoDelete}
          onTodoUpdate={onTodoUpdate}
        />
      </div>
    </div>
  );
}
