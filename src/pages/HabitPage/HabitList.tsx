import { useMutation } from "@tanstack/react-query";

import { HabitPublic, HabitWithLog } from "@/api/generated";
import {
  getWeek,
  parseRepeatDays,
  parseRepeatDaysToServerFormat,
} from "@/utils/time";
import useModalWithState from "@/hooks/useModalWithState";
import useModal from "@/hooks/useModal";
import HabitModal from "@/components/HabitModal";
import HabitInformation from "@/components/HabitInformation";
import { habitsApi } from "@/api/client";
import { useMessageStore } from "@/state/useMessageStore";
import { HabitModalSubmitProps } from "@/components/HabitModal/types";

import { HabitUpdateInputParameter } from "../MainPage/types";

import ActiveHabit from "./ActivatedHabit";
import DisabledHabit from "./DisabledHabit";

interface Props {
  date: Date;
  habitList: HabitWithLog[];

  reloadHabitList: () => void;
}

export default function HabitList({ date, habitList, reloadHabitList }: Props) {
  const addMessage = useMessageStore((state) => state.addMessage);

  const achieveHabitMutation = useMutation({
    mutationFn: habitsApi.achieveHabit,
    onSuccess: reloadHabitList,
    onError: () => {
      addMessage({
        message: "습관 달성 요청에 실패했습니다.",
        type: "error",
      });
    },
  });

  const createHabitMutation = useMutation({
    mutationFn: habitsApi.createHabit,
    onSuccess: () => {
      closeCreateModal();
      reloadHabitList();
    },
    onError: () => {
      addMessage({
        message: "습관 추가에 실패했습니다.",
        type: "error",
      });
    },
  });

  const {
    modalRef: updateModalRef,
    modalState: selectedHabit,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModalWithState<HabitPublic>();
  const {
    modalRef: createModalRef,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const renderHabitList = (list: Array<HabitWithLog>) => {
    if (!list.length) {
      return <HabitInformation onModalOpen={openCreateModal} />;
    }

    return list.map((data) => {
      const activateDay = getWeek(date) === data.near_weekday;

      if (activateDay) {
        return (
          <ActiveHabit
            key={data.id}
            habit={data}
            onHabitChecked={() => achieveHabitMutation.mutate(data.id)}
            onHabitClick={() => openUpdateModal(data)}
          />
        );
      } else {
        return (
          <DisabledHabit
            key={data.id}
            habit={data}
            onHabitClick={() => openUpdateModal(data)}
          />
        );
      }
    });
  };

  const handleAddHabitSubmit = (params: HabitModalSubmitProps) => {
    createHabitMutation.mutate({
      title: params.title,
      start_time_minutes: params.startTimeMinutes,
      end_time_minutes: params.endTimeMinutes,
      repeat_days: parseRepeatDaysToServerFormat(params.repeatDays),
      repeat_time_minutes: params.repeatIntervalMinutes,
    });
  };

  const updateHabitMutation = useMutation({
    mutationFn: (input: HabitUpdateInputParameter) =>
      habitsApi.updateHabit(input.id, input.update),
    onSuccess: () => {
      closeUpdateModal();
      reloadHabitList();
    },
    onError: () => {
      addMessage({
        message: "습관 수정에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleUpdateHabitSubmit = (params: HabitModalSubmitProps) => {
    if (!selectedHabit) return;

    updateHabitMutation.mutate({
      id: selectedHabit.id,
      update: {
        title: params.title,
        start_time_minutes: params.startTimeMinutes,
        end_time_minutes: params.endTimeMinutes,
        repeat_days: parseRepeatDaysToServerFormat(params.repeatDays),
        repeat_time_minutes: params.repeatIntervalMinutes,
        activated: true,
      },
    });
  };

  const deleteHabitMutation = useMutation({
    mutationFn: habitsApi.deleteHabit,
    onSuccess: () => {
      closeUpdateModal();
      reloadHabitList();
      addMessage({
        message: "습관을 삭제했습니다.",
      });
    },
    onError: () => {
      addMessage({
        message: "습관 삭제에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleHabitDeleteClick = (id: number) => {
    deleteHabitMutation.mutate(id);
  };

  return (
    <>
      <ul className="flex flex-col">{renderHabitList(habitList)}</ul>
      {habitList.length && (
        <button
          onClick={openCreateModal}
          className="btn btn-primary btn-outline btn-sm mt-2"
        >
          습관 추가하기
        </button>
      )}

      <HabitModal
        modalRef={createModalRef}
        onCancel={closeCreateModal}
        onSubmit={handleAddHabitSubmit}
        modalId="habit-add-modal"
        modalTitle="습관 추가하기"
      />

      {selectedHabit && (
        <HabitModal
          modalRef={updateModalRef}
          onCancel={closeUpdateModal}
          onSubmit={handleUpdateHabitSubmit}
          modalId="habit-update-modal"
          modalTitle="습관 수정하기"
          title={selectedHabit.title}
          startTimeMinutes={selectedHabit.start_time_minutes}
          endTimeMinutes={selectedHabit.end_time_minutes}
          repeatIntervalMinutes={selectedHabit.repeat_time_minutes}
          repeatDays={parseRepeatDays(selectedHabit.repeat_days)}
          extraButton={
            <button
              disabled={deleteHabitMutation.isPending}
              onClick={() => handleHabitDeleteClick(selectedHabit.id)}
              className="btn btn-error"
            >
              삭제하기
            </button>
          }
        />
      )}
    </>
  );
}
