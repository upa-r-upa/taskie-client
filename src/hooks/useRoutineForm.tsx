import { useState } from "react";

import { RoutineItemLocal } from "@/types/routine";

const RoutineTodoDefaultTitle = "";
const RoutineTodoDefaultDuration = 5;

interface Props {
  initialTitle?: string;
  initialStartTimeMinutes?: number;
  initialRepeatDays?: number[];
  initialTodoList?: Array<RoutineItemLocal>;
}
export default function useRoutineForm({
  initialTitle = "",
  initialStartTimeMinutes = 540,
  initialRepeatDays = [0, 1, 2, 3, 4],
  initialTodoList = [],
}: Props) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [startTimeMinutes, setStartTimeMinutes] = useState<number>(
    initialStartTimeMinutes
  );
  const [repeatDays, setRepeatDays] =
    useState<Array<number>>(initialRepeatDays);
  const [todoList, setTodoList] =
    useState<Array<RoutineItemLocal>>(initialTodoList);

  const onTodoUpdate = (
    index: number,
    key: keyof RoutineItemLocal,
    value: string | number
  ) => {
    setTodoList((prev) => {
      return prev.map((v, i) =>
        i == index
          ? {
              ...v,
              [key]: value,
            }
          : v
      );
    });
  };

  const onTodoDeleteClick = (index: number) => {
    setTodoList((prev) => {
      return prev.filter((v, i) => i !== index);
    });
  };

  const onTodoCreateClick = () => {
    setTodoList((prev) =>
      prev.concat({
        title: RoutineTodoDefaultTitle,
        duration_minutes: RoutineTodoDefaultDuration,
      })
    );
  };

  const isDisabled = () => {
    return repeatDays.length === 0 || !title;
  };

  return {
    title,
    setTitle,
    startTimeMinutes,
    setStartTimeMinutes,
    repeatDays,
    setRepeatDays,
    todoList,
    onTodoUpdate,
    onTodoDeleteClick,
    onTodoCreateClick,
    isDisabled,
  };
}
