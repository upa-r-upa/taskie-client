import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RoutineItemLocal } from "@/types/routine";

interface Props {
  initialTitle?: string;
  initialStartTimeMinutes?: number;
  initialRepeatDays?: number[];
  initialTodoList?: Array<RoutineItemLocal>;
}

const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  durationMinutes: z.number(),
});

const formSchema = z.object({
  title: z.string().min(1, "루틴 이름을 입력하세요."),
  startTimeMinutes: z.number(),
  repeatDays: z.array(z.number()).min(1, "반복 요일이 하루라도 있어야 해요."),
  todoList: z.array(todoSchema),
});

export type RoutineTodoSchema = z.infer<typeof todoSchema>;
export type RoutineFormSchema = UseFormReturn<z.infer<typeof formSchema>>;

export default function useRoutineForm({
  initialTitle = "",
  initialStartTimeMinutes = 540,
  initialRepeatDays = [0, 1, 2, 3, 4],
  initialTodoList = [],
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: initialTitle,
      startTimeMinutes: initialStartTimeMinutes,
      repeatDays: initialRepeatDays,
      todoList: initialTodoList.map((data) => ({
        id: data.id,
        durationMinutes: data.duration_minutes,
        title: data.title,
      })),
    },
  });

  const onTodoUpdate = (
    index: number,
    key: keyof RoutineTodoSchema,
    value: string | number
  ) => {
    const { todoList } = form.getValues();
    const nextTodoList = todoList.map((v, i) =>
      i == index
        ? {
            ...v,
            [key]: value,
          }
        : v
    );
    form.setValue("todoList", nextTodoList);
  };

  const onTodoDelete = (index: number) => {
    const { todoList } = form.getValues();
    const nextTodoList = todoList.filter((v, i) => i !== index);
    form.setValue("todoList", nextTodoList);
  };

  const onTodoCreate = (title: string, minutes: number) => {
    const { todoList } = form.getValues();
    const nextTodoList = todoList.concat({
      title: title,
      durationMinutes: minutes,
    });

    form.setValue("todoList", nextTodoList);
  };

  return {
    form,
    onTodoUpdate,
    onTodoDelete,
    onTodoCreate,
  };
}
