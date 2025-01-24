import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import TimePicker from "@/components/TimePicker";
import { RoutineItemLocal } from "@/types/routine";

import CheckableWeekList from "../CheckableWeekList";

import RoutineTodoList from "./RoutineTodoList";

interface Props {
  formTitle: string;
  buttons: React.ReactNode;

  title: string;
  startTimeMinutes: number;
  repeatDays: number[];
  todoList: Array<RoutineItemLocal>;

  onTitleChange: (title: string) => void;
  onStartTimeMinutesChange: (startTimeMinutes: number) => void;
  onRepeatDaysChange: (repeatDays: Array<number>) => void;

  onTodoUpdate: (
    index: number,
    key: keyof RoutineItemLocal,
    value: string | number
  ) => void;
  onTodoCreateClick: () => void;
  onTodoDeleteClick: (index: number) => void;
}

export default function RoutineForm({
  buttons,
  formTitle,
  title,
  startTimeMinutes,
  repeatDays,
  todoList,

  onTitleChange,
  onTodoUpdate,
  onTodoDeleteClick,
  onStartTimeMinutesChange,
  onRepeatDaysChange,
  onTodoCreateClick,
}: Props) {
  return (
    <>
      <h1 className="text-xl font-semibold">{formTitle}</h1>

      <div className="mt-4 flex flex-col gap-3">
        <label>
          <p className="font-semibold mb-2 text-lg">루틴 이름</p>
          <AutoResizeTextarea
            placeholder="루틴 이름을 입력하세요."
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />

          {!title && (
            <p className="text-error text-sm ml-2">
              * 루틴 이름을 입력해주세요.
            </p>
          )}
        </label>

        <label className="text-lg">
          <p className="font-semibold mb-2 text-lg">루틴 시작 시간</p>
          <TimePicker
            minutes={startTimeMinutes}
            onChange={onStartTimeMinutesChange}
          />
        </label>

        <div>
          <p className="font-semibold mb-2">반복 요일</p>
          <CheckableWeekList
            weekList={repeatDays}
            onWeekChange={onRepeatDaysChange}
          />

          {repeatDays.every((v) => v === 0) && (
            <p className="text-error text-sm ml-2 mt-2">
              * 반복 요일이 하루라도 있어야 해요.
            </p>
          )}
        </div>

        <div className="text-lg mt-3">
          <p className="font-semibold mb-2">할 일 목록</p>

          <RoutineTodoList
            routineTodoList={todoList}
            onTitleUpdate={(index, title) =>
              onTodoUpdate(index, "title", title)
            }
            onDurationMinutesUpdate={(index, minutes) =>
              onTodoUpdate(index, "duration_minutes", minutes)
            }
            onTodoDeleteClick={onTodoDeleteClick}
          />

          <button className="btn btn-sm mt-3" onClick={onTodoCreateClick}>
            할 일 추가
          </button>
        </div>
      </div>

      <div className="flex items-center mt-5 gap-2">{buttons}</div>
    </>
  );
}
