import { useMutation } from "@tanstack/react-query";
import { HabitPublic, HabitWithLog } from "../../api/generated";
import EmptyCard from "../../components/EmptyCard";
import {
  convertMinutesToHours,
  getFormatMinutesWithMeridiem,
  getTimeDifferenceFromNow,
} from "../../utils/time";
import HabitModal from "./HabitModal";
import { habitsApi } from "../../api/client";
import { useMessageStore } from "../../state/useMessageStore";
import { useEffect, useRef, useState } from "react";
import { HabitModalSubmitProps, HabitUpdateInputParameter } from "./types";

interface Props {
  habitList: Array<HabitWithLog>;
  fetchData: () => void;
}

export default function HabitSection({ habitList, fetchData }: Props) {
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

  const addModalRef = useRef<HTMLDialogElement>(null);
  const updateModalRef = useRef<HTMLDialogElement>(null);

  const [selectedHabit, setSelectedHabit] = useState<HabitPublic | null>(null);
  const [isCreateModalOpened, setIsCreateModalOpened] =
    useState<boolean>(false);

  useEffect(() => {
    if (isCreateModalOpened) addModalRef.current?.showModal();
    else addModalRef.current?.close();
  }, [isCreateModalOpened]);

  useEffect(() => {
    if (selectedHabit) updateModalRef.current?.showModal();
    else updateModalRef.current?.close();
  }, [selectedHabit]);

  const renderHabitList = (list: Array<HabitWithLog>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="습관">
          <div>
            <div className="text-sm text-gray-500">
              <p>
                습관은 <b>하루에 여러번 반복되는 일</b>을<br /> 편리하게 관리할
                수 있어요.
              </p>
              <p className="mt-1">
                주기적으로 반복되는 할 일이라고
                <br /> 생각하면 편해요.
              </p>
            </div>
            <button
              className="btn btn-primary btn-outline mt-2"
              onClick={() => setIsCreateModalOpened(true)}
            >
              습관 추가하기
            </button>
          </div>
        </EmptyCard>
      );
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
            <div className="flex-1" onClick={() => setSelectedHabit(data)}>
              <span className="badge badge-primary badge-sm">
                {convertMinutesToHours(data.repeat_time_minutes)} 주기
              </span>
              <div className="card-title text-lg overflow-hidden text-ellipsis text-nowrap">
                <h2
                  className={
                    done ? "line-through text-gray-400 flex-1" : "flex-1"
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
                <>
                  <p>
                    {data.log_list.length
                      ? `${convertMinutesToHours(getTimeDifferenceFromNow(data.log_list[0].completed_at))} 전에 실천했어요.`
                      : `${getFormatMinutesWithMeridiem(data.start_time_minutes)} 습관 시작이에요.`}
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
    });
  };

  const createHabitMutation = useMutation({
    mutationFn: habitsApi.createHabit,
    onSuccess: () => {
      setIsCreateModalOpened(false);
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
      setSelectedHabit(null);
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
    if (!selectedHabit) {
      return;
    }

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

  const parseRepeatDays = (repeatDays: Array<number>): Array<number> => {
    const result = Array.from({ length: 7 }, (v, i) => i);

    repeatDays.forEach((value) => {
      result[value] = 1;
    });

    return result;
  };

  const parseRepeatDaysToServerFormat = (
    repeatDays: Array<number>
  ): Array<number> => {
    const result: Array<number> = [];

    repeatDays.forEach((value, i) => {
      if (value) {
        result.push(i);
      }
    });

    return result;
  };

  const deleteHabitMutation = useMutation({
    mutationFn: habitsApi.deleteHabit,
    onSuccess: () => {
      setSelectedHabit(null);
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
      <ul>{renderHabitList(habitList)}</ul>
      {habitList.length ? (
        <button
          onClick={() => setIsCreateModalOpened(true)}
          className="btn btn-primary btn-outline btn-sm mt-2"
        >
          습관 추가하기
        </button>
      ) : (
        <></>
      )}

      <HabitModal
        key={isCreateModalOpened ? "open" : "close"}
        modalRef={addModalRef}
        onCancel={() => {
          setIsCreateModalOpened(false);
        }}
        onSubmit={handleAddHabitSubmit}
        modalId="habit-add-modal"
        modalTitle="습관 추가하기"
      />

      {selectedHabit ? (
        <HabitModal
          modalRef={updateModalRef}
          onCancel={() => {
            setSelectedHabit(null);
          }}
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
