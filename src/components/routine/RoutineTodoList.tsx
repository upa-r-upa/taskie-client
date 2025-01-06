import { RoutineItemLocal } from "@/types/routine";

import AutoResizeTextarea from "../AutoResizeTextarea";

interface Props {
  routineTodoList: Array<RoutineItemLocal>;

  onTitleUpdate?: (index: number, title: string) => void;
  onDurationMinutesUpdate?: (index: number, durationMinutes: number) => void;
  onTodoDeleteClick?: (index: number) => void;
}

export default function RoutineTodoList({
  routineTodoList,
  onTitleUpdate,
  onDurationMinutesUpdate,
  onTodoDeleteClick,
}: Props) {
  if (!routineTodoList.length) {
    return (
      <ul className="px-4 py-4 mt-2 shadow">
        <p className="text-gray-400 text-sm text-center">
          현재 할 일이 없어요. <br />
          아래 버튼을 눌러 할 일을 추가해보세요.
        </p>
      </ul>
    );
  }

  return (
    <ul className="flex px-4 py-4 flex-col gap-2 mt-2 shadow">
      {routineTodoList.map((data, i) => {
        return (
          <li key={i} className="p-2 bg-white rounded-lg shadow">
            <AutoResizeTextarea
              value={data.title}
              placeholder="할 일을 입력해주세요."
              onChange={(val) => onTitleUpdate?.(i, val)}
            />

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="input input-bordered input-sm w-full flex-1"
                value={data.duration_minutes}
                placeholder="몇 분동안 진행할 지 입력해주세요."
                onChange={(e) =>
                  onDurationMinutesUpdate?.(i, Number(e.target.value))
                }
              />
              <p className="text-sm">분</p>
            </div>

            <button
              className="btn btn-sm mt-3 btn-outline btn-error"
              onClick={() => onTodoDeleteClick?.(i)}
            >
              삭제하기
            </button>
          </li>
        );
      })}
    </ul>
  );
}
