import { HabitWithLog } from "@/api/generated";
import {
  convertMinutesToHours,
  getFormatMinutesWithMeridiem,
  getTimeDifferenceFromNow,
  parseRepeatDays,
} from "@/utils/time";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";
import { Button } from "@/components/ui/button";

interface Props {
  habitList: Array<HabitWithLog>;
  reloadHabitList: () => void;

  fullData?: boolean;
}

export default function HabitSection({ habitList, reloadHabitList }: Props) {
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
    isModalOpened: isCreateModalOpened,
  } = createHabitModal;

  const renderUncompletedHabitCount = (habit: HabitWithLog, count: number) => {
    return (
      <>
        <p>
          {habit.log_list.length
            ? `${convertMinutesToHours(getTimeDifferenceFromNow(habit.log_list[0].completed_at))} 전에 실천했어요.`
            : `${getFormatMinutesWithMeridiem(habit.start_time_minutes)} 습관 시작이에요.`}
        </p>

        <div>
          <p className="text-primary text-xs mt-1">
            {habit.log_list.length > 0
              ? `오늘 총 ${count}번 중 ${habit.log_list.length}번 완료!`
              : "지금 습관을 실천해보세요!"}
          </p>
        </div>
      </>
    );
  };

  const renderHabitList = (list: Array<HabitWithLog>) => {
    if (!list.length) {
      return <HabitInformation onModalOpen={openCreateModal} />;
    }

    return list.map((data) => {
      const count =
        Math.ceil(
          (data.end_time_minutes - data.start_time_minutes) /
            data.repeat_time_minutes
        ) + 1;
      const done = count <= data.log_list.length;

      return (
        <li
          key={data.id}
          className="card card-bordered card-compact mb-2 shadow-md"
        >
          <div className="card-body flex flex-row items-center">
            <div
              className="flex-1 overflow-hidden"
              onClick={() => openUpdateModal(data)}
            >
              <span className="badge badge-primary badge-sm">
                {convertMinutesToHours(data.repeat_time_minutes)} 주기
              </span>
              <div className="card-title text-lg overflow-hidden text-ellipsis text-nowrap">
                <h2
                  className={
                    done
                      ? "line-through overflow-hidden text-gray-400 text-ellipsis text-nowrap"
                      : "text-ellipsis overflow-hidden text-nowrap"
                  }
                >
                  {data.title}
                </h2>
              </div>

              {done ? (
                <p className="text-primary text-xs mt-1">
                  오늘 총 {count}번의 습관을 모두 완료했어요!
                </p>
              ) : (
                renderUncompletedHabitCount(data, count)
              )}

              {data.log_list.length ? (
                <progress
                  className="progress progress-primary w-56"
                  value={(data.log_list.length / count) * 100}
                  max="100"
                />
              ) : (
                <></>
              )}
            </div>

            <input
              type="checkbox"
              disabled={done}
              className="checkbox checkbox-primary checkbox-md"
              checked={done}
              onChange={() => {
                achieveHabitMutation.mutate(data.id);
              }}
            />
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <ul>{renderHabitList(habitList)}</ul>

      <Button size="lg" onClick={openCreateModal} className="mt-4 w-full">
        습관 추가하기
      </Button>

      <HabitModal
        key={isCreateModalOpened ? "open" : "close"}
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
          modalId="habit-add-modal"
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
