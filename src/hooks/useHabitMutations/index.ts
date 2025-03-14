import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { habitsApi } from "@/api/client";
import { HabitPublic } from "@/api/generated";
import { HabitModalSubmitProps } from "@/components/habit/HabitModal";
import { sendEvent } from "@/lib/analytics";

import useModalWithState from "../useModalWithState";
import useModal from "../useModal";

import { HabitUpdateInputParameter } from "./types";

interface Props {
  reloadHabitList: () => void;
}

export default function useHabitMutations({ reloadHabitList }: Props) {
  const updateHabitModal = useModalWithState<HabitPublic>();
  const { visibleState: selectedHabit, closeModal: closeUpdateModal } =
    updateHabitModal;
  const createHabitModal = useModal();
  const { closeModal: closeCreateModal } = createHabitModal;
  const achieveHabitMutation = useMutation({
    mutationFn: habitsApi.achieveHabit,
    onSuccess: () => {
      sendEvent("Habit", "Achieve", "Success");
      reloadHabitList();
      toast.success(`습관을 성공적으로 달성했어요.`);
    },
    onError: (error: AxiosError) => {
      sendEvent("Habit", "Achieve", "Error", error.response?.status || 0);
      toast.error("습관 달성 요청에 실패했습니다.");
    },
  });

  const createHabitMutation = useMutation({
    mutationFn: habitsApi.createHabit,
    onSuccess: () => {
      sendEvent("Habit", "Create", "Success");
      closeCreateModal();
      reloadHabitList();
    },
    onError: (error: AxiosError) => {
      sendEvent("Habit", "Create", "Error", error.response?.status || 0);
      toast.error("습관 추가에 실패했습니다.");
    },
  });

  const updateHabitMutation = useMutation({
    mutationFn: (input: HabitUpdateInputParameter) =>
      habitsApi.updateHabit(input.id, input.update),
    onSuccess: () => {
      sendEvent("Habit", "Update", "Success");
      closeUpdateModal();
      reloadHabitList();
    },
    onError: (error: AxiosError) => {
      sendEvent("Habit", "Update", "Error", error.response?.status || 0);
      toast.error("습관 수정에 실패했습니다.");
    },
  });

  const deleteHabitMutation = useMutation({
    mutationFn: habitsApi.deleteHabit,
    onSuccess: () => {
      sendEvent("Habit", "Delete", "Success");
      closeUpdateModal();
      reloadHabitList();

      toast.success("습관을 삭제했습니다.");
    },
    onError: () => toast.error("습관 삭제에 실패했습니다."),
  });

  const createHabit = (params: HabitModalSubmitProps) => {
    createHabitMutation.mutate({
      title: params.title,
      start_time_minutes: params.startTimeMinutes,
      end_time_minutes: params.endTimeMinutes,
      repeat_days: params.repeatDays,
      repeat_time_minutes: params.repeatIntervalMinutes,
    });
  };

  const updateHabit = (params: HabitModalSubmitProps) => {
    if (!selectedHabit) return;

    updateHabitMutation.mutate({
      id: selectedHabit.id,
      update: {
        title: params.title,
        start_time_minutes: params.startTimeMinutes,
        end_time_minutes: params.endTimeMinutes,
        repeat_days: params.repeatDays,
        repeat_time_minutes: params.repeatIntervalMinutes,
        activated: true,
      },
    });
  };

  const deleteHabit = (id: number) => {
    deleteHabitMutation.mutate(id);
  };

  return {
    createHabit,
    updateHabit,
    deleteHabit,
    achieveHabitMutation,
    createHabitMutation,
    updateHabitMutation,
    deleteHabitMutation,
    updateHabitModal,
    createHabitModal,
  };
}
