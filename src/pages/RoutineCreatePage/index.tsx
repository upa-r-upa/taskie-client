import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { queryClient, routineApi } from "@/api/client";
import useRoutineForm from "@/hooks/useRoutineForm";
import RoutineForm from "@/components/routine/RoutineForm";

export default function RoutineCreatePage() {
  const navigate = useNavigate();

  const { form, onTodoDelete, onTodoCreate, onTodoUpdate } = useRoutineForm({});

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
    const values = form.getValues();

    createRoutineMutation.mutate({
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

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-3xl mb-2 tracking-tight">루틴 추가하기</h2>

      <div>
        <RoutineForm
          form={form}
          onSubmit={handleSubmit}
          isLoading={createRoutineMutation.isPending}
          submitButtonLabel="루틴 추가하기"
          onTodoCreate={onTodoCreate}
          onTodoDelete={onTodoDelete}
          onTodoUpdate={onTodoUpdate}
        />
      </div>
    </div>
  );
}
