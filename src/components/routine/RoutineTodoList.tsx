import { RoutineTodoSchema } from "@/hooks/useRoutineForm";

import NumberSpinner from "../NumberSpinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import RoutineTodoAddButton from "./RoutineTodoAddButton";

interface Props {
  routineTodoList: Array<RoutineTodoSchema>;
  setRoutineTodoList: (todoList: Array<RoutineTodoSchema>) => void;

  onTodoCreate: (title: string, durationMinutes: number) => void;
  onTitleUpdate: (index: number, title: string) => void;
  onDurationMinutesUpdate: (index: number, durationMinutes: number) => void;
  onTodoDelete: (index: number) => void;
}

export default function RoutineTodoList({
  routineTodoList,
  onTodoCreate,
  onTitleUpdate,
  onDurationMinutesUpdate,
  onTodoDelete,
}: Props) {
  return (
    <div className="text-sm flex flex-col gap-5">
      {routineTodoList.length === 0 ? (
        <div className="text-muted-foreground p-6 border rounded-md">
          <p>현재 할 일 목록이 비었어요.</p>
          <p>추가 버튼을 눌러서 할 일을 추가해보세요.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {routineTodoList.map((data, i) => {
            return (
              <div
                key={i}
                className="rounded-md border p-4 flex flex-col sm:flex-row gap-3"
              >
                <div>
                  <NumberSpinner
                    min={1}
                    max={999}
                    initialValue={data.durationMinutes}
                    onChange={(e) => onDurationMinutesUpdate(i, e)}
                  />
                </div>

                <div className="flex-1 flex gap-2">
                  <Input
                    className="text-sm flex-1"
                    placeholder="할 일을 입력하세요."
                    value={data.title}
                    onChange={(e) => onTitleUpdate(i, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    className="self-end sm:w-max sm:ml-auto"
                    onClick={() => onTodoDelete(i)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <RoutineTodoAddButton onTodoCreate={onTodoCreate} />
    </div>
  );
}
