import { HabitWithLog } from "@/api/generated";
import { getWeek, parseRepeatDays } from "@/utils/time";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";

import ActiveHabit from "./ActivatedHabit";
import DisabledHabit from "./DisabledHabit";

interface Props {
  date: Date;
  isLoading: boolean;
  habitList: HabitWithLog[];

  reloadHabitList: () => void;
}

function HabitSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-24 w-48"></div>
      <div className="skeleton h-24"></div>
      <div className="skeleton h-24"></div>
    </div>
  );
}

export default function HabitList({
  isLoading,
  date,
  habitList,
  reloadHabitList,
}: Props) {
  const {
    createHabitModal,
    updateHabitModal,
    achieveHabitMutation,
    deleteHabitMutation,
    createHabit,
    updateHabit,
    deleteHabit,
  } = useHabitMutations({ reloadHabitList });
  const {
    modalState: selectedHabit,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
    modalRef: updateModalRef,
  } = updateHabitModal;
  const {
    closeModal: closeCreateModal,
    openModal: openCreateModal,
    modalRef: createModalRef,
  } = createHabitModal;

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

  return (
    <>
      {isLoading ? (
        <HabitSkeleton />
      ) : (
        <ul className="flex flex-col">{renderHabitList(habitList)}</ul>
      )}

      {habitList.length > 0 && (
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
        onSubmit={createHabit}
        modalId="habit-add-modal"
        modalTitle="습관 추가하기"
      />

      {selectedHabit && (
        <HabitModal
          modalRef={updateModalRef}
          onCancel={closeUpdateModal}
          onSubmit={updateHabit}
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
              onClick={() => deleteHabit(selectedHabit.id)}
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
