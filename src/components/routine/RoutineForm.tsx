import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RoutineFormSchema, RoutineTodoSchema } from "@/hooks/useRoutineForm";

import AutoResizeTextarea from "../AutoResizeTextarea";
import TimePicker from "../ui/time-picker";
import CheckableWeekList from "../CheckableWeekList";
import { Button } from "../ui/button";

import RoutineTodoList from "./RoutineTodoList";
import ConfirmRoutineDelete from "./ConfirmRoutineDelete";

interface Props {
  form: RoutineFormSchema;
  isLoading: boolean;

  submitButtonLabel: string;

  onSubmit: () => void;
  onTodoDelete: (index: number) => void;
  onTodoCreate: (title: string, minutes: number) => void;
  onTodoUpdate: (
    index: number,
    key: keyof RoutineTodoSchema,
    value: string | number
  ) => void;

  onRoutineDelete?: () => void;
  deletable?: boolean;
}

export default function RoutineForm({
  form,
  isLoading,
  submitButtonLabel,
  onSubmit,
  onRoutineDelete,
  onTodoDelete,
  onTodoCreate,
  onTodoUpdate,
  deletable = false,
}: Props) {
  const navigate = useNavigate();

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  console.log(form.getValues().todoList);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>

              <FormControl>
                <AutoResizeTextarea
                  autoFocus
                  placeholder="루틴 이름을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTimeMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>시작 시간</FormLabel>
              <FormDescription>
                루틴을 시작할 목표 시간을 지정하세요.
              </FormDescription>

              <FormControl>
                <div>
                  <TimePicker
                    totalMinutes={field.value}
                    onTotalMinutesChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeatDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>반복 요일</FormLabel>
              <FormDescription>
                루틴을 진행할 요일을 지정하세요.
              </FormDescription>

              <FormControl>
                <CheckableWeekList
                  weekList={field.value}
                  onWeekChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="todoList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>할 일 목록 ({field.value.length}개)</FormLabel>

              <FormControl>
                <div>
                  <RoutineTodoList
                    routineTodoList={field.value}
                    setRoutineTodoList={(val) => form.setValue("todoList", val)}
                    onTodoDelete={onTodoDelete}
                    onTodoCreate={onTodoCreate}
                    onTitleUpdate={(idx, val) =>
                      onTodoUpdate(idx, "title", val)
                    }
                    onDurationMinutesUpdate={(idx, val) =>
                      onTodoUpdate(idx, "durationMinutes", val)
                    }
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {deletable && onRoutineDelete && (
          <div className="flex-col flex gap-2">
            <p className="text-sm">설정</p>

            <ConfirmRoutineDelete onDeleteConfirm={onRoutineDelete} />
          </div>
        )}

        <div className="py-3 sm:py-0 flex flex-col sm:flex-row gap-2 justify-end">
          <Button disabled={isLoading} type="submit">
            {submitButtonLabel}
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={handleCancelButtonClick}
          >
            취소하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
