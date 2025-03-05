import { useState } from "react";

import NumberSpinner from "../NumberSpinner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface Props {
  onTodoCreate: (title: string, durationMinutes: number) => void;
}

export default function RoutineTodoAddButton({ onTodoCreate }: Props) {
  const [minutes, setMinutes] = useState<number>(5);
  const [title, setTitle] = useState<string>("");

  const handleTodoAddClick = () => {
    onTodoCreate(title, minutes);

    setTitle("");
  };

  const disabled = minutes === 0 || title.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>할 일 추가하기</CardTitle>
        <CardDescription>
          할 일과 목표 시간을 지정해서 추가해보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm flex flex-col sm:flex-row gap-3">
          <div>
            <p className="text-xs mb-2">목표 시간 (분단위)</p>
            <NumberSpinner
              min={1}
              max={999}
              initialValue={minutes}
              onChange={setMinutes}
            />
          </div>

          <div className="flex-1">
            <p className="text-xs mb-2">할 일</p>
            <Input
              className="text-sm flex-1"
              placeholder="할 일을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button
            className="w-full self-end sm:w-max sm:ml-auto"
            disabled={disabled}
            onClick={handleTodoAddClick}
            type="button"
          >
            할 일 추가하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
