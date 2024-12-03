import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import TimePicker from "@/components/TimePicker";
import { getDayFromNumber } from "@/utils/time";
import { useMessageStore } from "@/state/useMessageStore";
import { queryClient, routineApi } from "@/api/client";
import { RoutineItemBase } from "@/api/generated";

export default function RoutineCreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [startTimeMinutes, setStartTimeMinutes] = useState<number>(540);
  const [repeatDays, setRepeatDays] = useState<Array<number>>(
    Array.from({ length: 7 }, () => 0)
  );
  const [todoList, setTodoList] = useState<Array<RoutineItemBase>>([]);

  const addMessage = useMessageStore((state) => state.addMessage);
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
    onError: () => {
      addMessage({
        message: "루틴 생성에 실패했습니다.",
        type: "error",
      });
    },
  });

  const handleWeekCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setRepeatDays((prev) => {
      return prev.map((v, i) => (i == index ? Number(e.target.checked) : v));
    });
  };

  const renderRepeatDays = (repeatDays: Array<number>) => {
    return Array.from({ length: 7 }, (v, i) => i).map((v) => {
      const matchWeek = repeatDays[v];
      return (
        <label key={v} className="swap swap-indeterminate">
          <input
            type="checkbox"
            checked={!!matchWeek}
            onChange={(e) => handleWeekCheckboxChange(e, v)}
          />

          <div className="swap-on py-1 px-2 card-bordered shadow-sm rounded-badge border-primary text-primary">
            <p>{getDayFromNumber(v)}</p>
          </div>
          <div className="swap-off py-1 px-2 card-bordered shadow-sm rounded-badge bg-slate-50 ">
            <p>{getDayFromNumber(v)}</p>
          </div>
        </label>
      );
    });
  };

  const handleTodoTitleChange = (index: number, value: string) => {
    setTodoList((prev) => {
      return prev.map((v, i) =>
        i == index
          ? {
              ...v,
              title: value,
            }
          : v
      );
    });
  };

  const handleTodoDurationMinutesChange = (index: number, value: number) => {
    setTodoList((prev) => {
      return prev.map((v, i) =>
        i == index
          ? {
              ...v,
              duration_minutes: value,
            }
          : v
      );
    });
  };

  const handleTodoDeleteClick = (index: number) => {
    setTodoList((prev) => {
      return prev.filter((v, i) => i !== index);
    });
  };

  const handleTodoCreateClick = () => {
    setTodoList((prev) =>
      prev.concat({
        title: "",
        duration_minutes: 5,
      })
    );
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

  const handleSubmit = () => {
    createRoutineMutation.mutate({
      title: title,
      start_time_minutes: startTimeMinutes,
      repeat_days: parseRepeatDaysToServerFormat(repeatDays),
      routine_elements: todoList,
    });
  };

  const isDisabled = () => {
    return repeatDays.every((v) => v === 0) || !title;
  };

  return (
    <>
      <h1 className="text-xl font-semibold">루틴 추가하기</h1>

      <div className="mt-4 flex flex-col gap-3">
        <label>
          <p className="font-semibold mb-2 text-lg">루틴 이름</p>
          <AutoResizeTextarea
            placeholder="루틴 이름을 입력하세요."
            required
            value={title}
            onChange={setTitle}
          />
          {!title ? (
            <p className="text-error text-sm ml-2">
              * 습관 이름을 입력해주세요.
            </p>
          ) : (
            <></>
          )}
        </label>

        <label className="text-lg">
          <p className="font-semibold mb-2 text-lg">루틴 시작 시간</p>
          <TimePicker
            minutes={startTimeMinutes}
            onChange={setStartTimeMinutes}
          />
        </label>

        <div>
          <p className="font-semibold mb-2">반복 요일</p>
          <div className="flex gap-2">{renderRepeatDays(repeatDays)}</div>
          {repeatDays.every((v) => v === 0) ? (
            <p className="text-error text-sm ml-2 mt-2">
              * 반복 요일이 하루라도 있어야 해요.
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="text-lg mt-3">
          <p className="font-semibold mb-2">할 일 목록</p>

          <ul className="flex px-4 py-4 flex-col gap-2 mt-2 shadow">
            {todoList.length ? (
              todoList.map((data, i) => {
                return (
                  <li key={i} className="p-2 bg-white rounded-lg shadow">
                    <AutoResizeTextarea
                      value={data.title}
                      placeholder="할 일을 입력해주세요."
                      onChange={(val) => handleTodoTitleChange(i, val)}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="input input-bordered input-sm w-full flex-1"
                        value={data.duration_minutes}
                        placeholder="몇 분동안 진행할 지 입력해주세요."
                        onChange={(e) =>
                          handleTodoDurationMinutesChange(
                            i,
                            e.target.value as unknown as number
                          )
                        }
                      />
                      <p className="text-sm">분</p>
                    </div>

                    <button
                      className="btn btn-sm mt-3 btn-outline btn-error"
                      onClick={() => handleTodoDeleteClick(i)}
                    >
                      삭제하기
                    </button>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-400 text-sm text-center">
                현재 할 일이 없어요. <br />
                아래 버튼을 눌러 할 일을 추가해보세요.
              </p>
            )}

            <button className="btn btn-sm mt-3" onClick={handleTodoCreateClick}>
              할 일 추가
            </button>
          </ul>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isDisabled()}
        className="btn btn-primary mt-5"
      >
        루틴 추가하기
      </button>
    </>
  );
}
