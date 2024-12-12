import { useMutation } from "@tanstack/react-query";

import { HabitPublic, HabitWithLog } from "@/api/generated";
import {
  convertMinutesToHours,
  getFormatMinutesWithMeridiem,
  getTimeDifferenceFromNow,
  getWeek,
  parseRepeatDays,
  parseRepeatDaysToServerFormat,
} from "@/utils/time";
import { habitsApi } from "@/api/client";
import { useMessageStore } from "@/state/useMessageStore";
import useModalWithState from "@/hooks/useModalWithState";
import useModal from "@/hooks/useModal";
import { HabitModalSubmitProps } from "@/components/HabitModal/types";
import HabitModal from "@/components/HabitModal";
import WeekList from "@/components/WeekList";
import HabitInformation from "@/components/HabitInformation";

import { HabitUpdateInputParameter } from "../MainPage/types";

interface Props {
  habitList: Array<HabitWithLog>;
  fetchData: () => void;

  fullData?: boolean;
}

export default function HabitList({ habitList, fetchData }: Props) {
  const addMessage = useMessageStore((state) => state.addMessage);
  const achieveHabitMutation = useMutation({
    mutationFn: habitsApi.achieveHabit,
    onSuccess: () => {
      fetchData();
    },
    onError: () => {
      addMessage({
        message: "습관 달성 요청에 실패했습니다.",
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
    if (list.length === 0) {
      return <HabitInformation onModalOpen={openCreateModal} />;
    }

    return list.map((data) => {
      const count =
        Math.ceil(
          (data.end_time_minutes - data.start_time_minutes) /
            data.repeat_time_minutes
        ) + 1;
      const activateDay = getWeek(new Date()) === data.near_weekday;
      const done = count <= data.log_list.length;

      if (activateDay) {
        return (
          <li
            key={data.id}
            className="card card-bordered card-compact mb-2 shadow-md order-1"
          >
            <div className="card-body flex flex-row items-center">
              <div
                className="flex-1 overflow-hidden"
                onClick={() => openUpdateModal(data)}
              >
                <span className="badge badge-primary badge-sm">
                  {convertMinutesToHours(data.repeat_time_minutes)} 주기
                </span>
                <div className="card-title text-lg">
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

                <WeekList weekList={data.repeat_days} className="mt-1" />

                {done ? (
                  <p className="text-primary text-xs mt-1">
                    오늘 총 {count}번의 습관을 모두 완료했어요!
                  </p>
                ) : (
                  <>
                    <p className="my-1 font-semibold">
                      {getFormatMinutesWithMeridiem(data.start_time_minutes)}~
                      {getFormatMinutesWithMeridiem(data.end_time_minutes)}
                    </p>
                    <p>
                      {data.log_list.length ? (
                        `${convertMinutesToHours(getTimeDifferenceFromNow(data.log_list[0].completed_at))} 전에 실천했어요.`
                      ) : (
                        <></>
                      )}
                    </p>
                    <div>
                      <p className="text-primary text-xs mt-1">
                        {data.log_list.length > 0
                          ? `오늘 총 ${count}번 중 ${data.log_list.length}번 완료!`
                          : "지금 습관을 실천해보세요!"}
                      </p>
                    </div>
                  </>
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
      } else {
        return (
          <li
            key={data.id}
            className="card card-bordered card-compact mb-2 shadow-md order-2"
          >
            <div
              className="card-body flex flex-row items-center"
              onClick={() => openUpdateModal(data)}
            >
              <div className="overflow-hidden">
                <span className="badge badge-neutral badge-outline badge-sm">
                  {convertMinutesToHours(data.repeat_time_minutes)} 주기
                </span>
                <div className="card-title text-lg overflow-hidden">
                  <h2
                    className={
                      "text-gray-400 overflow-hidden text-ellipsis text-nowrap"
                    }
                  >
                    {data.title}
                  </h2>
                </div>

                <p>오늘은 실행하는 날이 아니에요.</p>

                <WeekList weekList={data.repeat_days} className="mt-1" />

                <p className="mt-1">
                  {getFormatMinutesWithMeridiem(data.start_time_minutes)}~
                  {getFormatMinutesWithMeridiem(data.end_time_minutes)}
                </p>
              </div>
            </div>
          </li>
        );
      }
    });
  };

  const createHabitMutation = useMutation({
    mutationFn: habitsApi.createHabit,
    onSuccess: () => {
      closeCreateModal();
      fetchData();
    },
    onError: () => {
      addMessage({
        message: "습관 추가에 실패했습니다.",
        type: "error",
      });
    },
  });

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
      fetchData();
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
      fetchData();
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
      {habitList.length ? (
        <button
          onClick={openCreateModal}
          className="btn btn-primary btn-outline btn-sm mt-2"
        >
          습관 추가하기
        </button>
      ) : (
        <></>
      )}

      <HabitModal
        modalRef={createModalRef}
        onCancel={closeCreateModal}
        onSubmit={handleAddHabitSubmit}
        modalId="habit-add-modal"
        modalTitle="습관 추가하기"
      />

      {selectedHabit ? (
        <HabitModal
          modalRef={updateModalRef}
          onCancel={closeUpdateModal}
          onSubmit={handleUpdateHabitSubmit}
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
              onClick={() => handleHabitDeleteClick(selectedHabit.id)}
              className="btn btn-error"
            >
              삭제하기
            </button>
          }
        />
      ) : (
        <></>
      )}
    </>
  );
}
