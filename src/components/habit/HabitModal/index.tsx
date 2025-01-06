import { useState } from "react";

import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import {
  getDayFromNumber,
  getFormatMinutes,
  getFormatMinutesWithMeridiem,
} from "@/utils/time";
import TimePicker from "@/components/TimePicker";
import Modal from "@/components/Modal";

import { HabitModalSubmitProps } from "./types";

interface HabitModalProps {
  modalTitle: string;
  modalId: string;
  modalRef: React.RefObject<HTMLDialogElement>;

  title?: string;
  repeatDays?: Array<number>;
  startTimeMinutes?: number;
  endTimeMinutes?: number;
  repeatIntervalMinutes?: number;
  extraButton?: React.ReactElement;

  isLoading?: boolean;

  onSubmit: (param: HabitModalSubmitProps) => void;
  onCancel: () => void;
}

const TIME_INTERVALS = [
  15, 30, 60, 90, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720,
];

export default function HabitModal({
  title: originTitle,
  repeatDays: originRepeatDays,
  startTimeMinutes: originStartTimeMinutes,
  endTimeMinutes: originEndTimeMinutes,
  repeatIntervalMinutes: originRepeatIntervalMinutes,
  modalRef,
  modalTitle,
  modalId,
  isLoading,
  onSubmit,
  onCancel,
  extraButton,
}: HabitModalProps) {
  const [title, setTitle] = useState<string>(originTitle || "");
  const [repeatDays, setRepeatDays] = useState<Array<number>>(
    originRepeatDays || Array.from({ length: 7 }, () => 0)
  );
  const [startTimeMinutes, setStartTimeMinutes] = useState<number>(
    originStartTimeMinutes || 720
  );
  const [endTimeMinutes, setEndTimeMinutes] = useState<number>(
    originEndTimeMinutes || 1080
  );
  const [repeatIntervalMinutes, setRepeatIntervalMinutes] = useState<number>(
    originRepeatIntervalMinutes || 60
  );

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

  const handleSubmit = () => {
    onSubmit({
      title,
      startTimeMinutes,
      endTimeMinutes,
      repeatIntervalMinutes,
      repeatDays,
    });
  };

  const count =
    Math.floor((endTimeMinutes - startTimeMinutes) / repeatIntervalMinutes) + 1;

  const isDisabled = () => {
    return (
      startTimeMinutes >= endTimeMinutes ||
      repeatDays.every((v) => v === 0) ||
      !title
    );
  };

  return (
    <Modal
      id={modalId}
      ref={modalRef}
      title={modalTitle}
      buttons={
        <>
          <button
            onClick={handleSubmit}
            className="btn btn-primary flex-1"
            disabled={isLoading || isDisabled()}
          >
            {isLoading ? "저장 중..." : "확인"}
          </button>
          <button
            onClick={onCancel}
            className="btn flex-1"
            disabled={isLoading}
          >
            취소
          </button>

          {extraButton}
        </>
      }
    >
      <AutoResizeTextarea
        value={title}
        required
        placeholder={"습관 이름을 입력하세요."}
        onChange={(value) => setTitle(value)}
      />
      {!title ? (
        <p className="text-error text-sm ml-2">* 습관 이름을 입력해주세요.</p>
      ) : (
        <></>
      )}

      <div className="flex flex-col gap-2 mt-2">
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

        <div>
          <p className="my-2 font-semibold">습관 시작 시간</p>
          <TimePicker
            minutes={startTimeMinutes}
            onChange={setStartTimeMinutes}
          />
        </div>

        <div>
          <p className="my-2 font-semibold">습관 종료 시간</p>
          <TimePicker
            isMidnightSelectable
            minutes={endTimeMinutes}
            onChange={setEndTimeMinutes}
          />
        </div>

        {startTimeMinutes >= endTimeMinutes ? (
          <p className="text-error text-sm ml-2">
            * 시작 시간보다 종료 시간이 이르거나, 같을 수 없어요.
          </p>
        ) : (
          <></>
        )}

        <div>
          <p className="my-2 font-semibold">습관 간격</p>

          <select
            value={repeatIntervalMinutes}
            className="select w-full select-bordered"
            onChange={(e) =>
              setRepeatIntervalMinutes(parseInt(e.target.value) ?? 0)
            }
          >
            {TIME_INTERVALS.map((value) => {
              return (
                <option key={value} value={value}>
                  {getFormatMinutes(value)}마다
                </option>
              );
            })}
          </select>

          {count > 0 ? (
            <div className="text-sm mb-2 font-semibold mr-1 mt-2">
              <p className="mb-2">
                반복 요일마다 <span className="text-primary">총 {count}번</span>
                의 습관을 진행할 예정이에요.
              </p>
              <ul className="list-inside ml-2">
                {Array.from({ length: count }).map((v, i) => {
                  return (
                    <li className="list-item list-disc" key={i}>
                      {getFormatMinutesWithMeridiem(
                        startTimeMinutes + i * repeatIntervalMinutes
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="text-sm ml-2 mt-2">
              이러면 습관이 한번도 진행되지 않아요.
              <br /> 시간대를 넓혀보거나, 습관 간격을 줄여보는건 어떨까요?
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
