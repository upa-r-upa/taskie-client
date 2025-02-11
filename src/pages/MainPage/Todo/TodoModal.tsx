import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/ui/date-time-picker";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import Modal from "@/components/ui/modal";

import { TodoModalSubmitProps } from "../types";

interface TodoBase {
  title: string;
  content?: string;
}

interface TodoModalProps {
  isOpened: boolean;
  submitButtonLabel: string;
  setIsOpened: (open: boolean) => void;

  title: string;
  targetDate: Date;

  initialTodo?: TodoBase;

  isLoading?: boolean;
  deletable?: boolean;

  onTodoSubmit: (todo: TodoModalSubmitProps) => void;
  onModalInvisible?: () => void;
  onTodoDelete?: () => void;
}

const formSchema = z.object({
  targetDate: z.date(),
  title: z.string(),
  content: z.string(),
});

export default function TodoModal({
  isOpened,
  setIsOpened,
  title,
  submitButtonLabel,
  isLoading,
  deletable,
  initialTodo,
  targetDate: originTargetDate,
  onModalInvisible,
  onTodoSubmit,
  onTodoDelete,
}: TodoModalProps) {
  const defaultTodo = useMemo(
    () => ({
      title: initialTodo?.title || "",
      content: initialTodo?.content || "",
    }),
    [initialTodo]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetDate: originTargetDate,
      ...defaultTodo,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLoading) return;

    onTodoSubmit({
      title: values.title,
      content: values.content,
      targetDate: values.targetDate,
    });
  };

  return (
    <>
      <Modal
        isOpened={isOpened}
        onModalInvisible={onModalInvisible}
        onModalOpen={() =>
          form.reset({
            targetDate: originTargetDate,
            ...defaultTodo,
          })
        }
        setIsOpened={setIsOpened}
        title={title}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 sm:space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>

                  <FormControl>
                    <AutoResizeTextarea
                      autoFocus
                      placeholder="오늘의 할 일을 입력해보세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>

                  <FormControl>
                    <Textarea
                      className="min-h-32"
                      placeholder="할 일의 설명을 입력해보세요."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">날짜</FormLabel>

                  <FormControl>
                    <DateTimePicker
                      date={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {deletable && (
              <div className="flex-col flex gap-2">
                <p className="text-sm">설정</p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-max !text-destructive border-destructive"
                  onClick={onTodoDelete}
                >
                  <TrashIcon />할 일 삭제하기
                </Button>
              </div>
            )}

            <div className="py-3 sm:py-0 flex flex-col sm:flex-row gap-2 justify-end">
              <Button
                className="w-full sm:w-auto"
                disabled={isLoading}
                type="submit"
              >
                {submitButtonLabel}
              </Button>
              <Button
                className="w-full sm:w-auto"
                type="button"
                variant={"outline"}
                onClick={() => setIsOpened(false)}
              >
                취소하기
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
}
