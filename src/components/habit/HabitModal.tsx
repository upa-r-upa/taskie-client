export interface HabitModalSubmitProps {
  title: string;
  startTimeMinutes: number;
  endTimeMinutes: number;
  repeatIntervalMinutes: number;
  repeatDays: Array<number>;
}

import { useMemo } from "react";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import Modal, { ModalOpenProps } from "@/components/ui/modal";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CheckableWeekList from "@/components/CheckableWeekList";
import TimePicker from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import IntervalDropdown from "@/components/IntervalDropdown";
import { HabitUpdateInput } from "@/api/generated";

interface HabitModalProps {
  modalTitle: string;
  deletable?: boolean;
  submitButtonLabel?: string;
  isLoading?: boolean;

  initialHabit?: HabitUpdateInput;

  onSubmit: (param: HabitModalSubmitProps) => void;
  onHabitDelete?: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "습관 이름을 입력하세요."),
  repeatDays: z.array(z.number()).min(1, "반복 요일이 하루라도 있어야 해요."),
  startTimeMinutes: z.number(),
  endTimeMinutes: z.number(),
  repeatIntervalMinutes: z.number(),
});

export default function HabitModal({
  isOpened,
  setIsOpened,
  deletable,
  submitButtonLabel,
  modalTitle,

  initialHabit,
  isLoading,

  onSubmit,
  onHabitDelete,
  onModalInvisible,
}: HabitModalProps & ModalOpenProps) {
  const defaultHabit = useMemo(
    () => ({
      title: initialHabit?.title || "",
      repeatDays: initialHabit?.repeat_days || [0, 1, 2, 3, 4],
      startTimeMinutes: initialHabit?.start_time_minutes || 720,
      endTimeMinutes: initialHabit?.end_time_minutes || 1080,
      repeatIntervalMinutes: initialHabit?.repeat_time_minutes || 60,
    }),
    [initialHabit]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultHabit,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLoading) return;

    const count = Math.floor(
      (values.endTimeMinutes - values.startTimeMinutes) /
        values.repeatIntervalMinutes
    );

    if (count <= 0) {
      return toast.error(
        "시작 시간과 종료 시간, 반복 간격을 확인해주세요. 현재는 알림이 울리지 않아요."
      );
    }

    onSubmit({
      ...values,
    });
  };

  const watchedStartTimeMinutes = useWatch({
    name: "startTimeMinutes",
    control: form.control,
  });
  const watchedEndTimeMinutes = useWatch({
    name: "endTimeMinutes",
    control: form.control,
  });
  const watchedRepeatInterval = useWatch({
    name: "repeatIntervalMinutes",
    control: form.control,
  });

  const isTimeInvalid = watchedStartTimeMinutes >= watchedEndTimeMinutes;
  const habitCount = Math.max(
    Math.floor(
      (watchedEndTimeMinutes - watchedStartTimeMinutes) / watchedRepeatInterval
    ),
    0
  );

  return (
    <Modal
      isOpened={isOpened}
      title={modalTitle}
      setIsOpened={setIsOpened}
      onModalInvisible={onModalInvisible}
      onModalOpen={() => form.reset(defaultHabit)}
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
                <FormLabel>이름</FormLabel>

                <FormControl>
                  <AutoResizeTextarea
                    autoFocus
                    placeholder="습관 이름을 입력하세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repeatDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>반복 요일</FormLabel>

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
            name="startTimeMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">시작 시간</FormLabel>

                <FormControl>
                  <TimePicker
                    totalMinutes={field.value}
                    onTotalMinutesChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTimeMinutes"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="block">종료 시간</FormLabel>

                  <FormControl>
                    <TimePicker
                      totalMinutes={field.value}
                      onTotalMinutesChange={field.onChange}
                    />
                  </FormControl>

                  {isTimeInvalid && (
                    <FormMessage>
                      종료 시간보다 시작 시간이 빨라야 해요.
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="repeatIntervalMinutes"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="block">반복 간격</FormLabel>

                  <FormControl>
                    <IntervalDropdown
                      interval={field.value}
                      onIntervalChange={field.onChange}
                    />
                  </FormControl>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      시작 시간과 종료 시간 이내에는 습관을 실행할 수 있도록
                      알림이 울려요.
                    </p>
                    <p>시작 시간부터 알림이 가고, 간격마다 다시 알려드려요.</p>

                    <p className="mt-1">
                      현재 설정대로면,{" "}
                      <span className="text-foreground">총 {habitCount}번</span>{" "}
                      울릴거에요.
                    </p>
                  </div>

                  {habitCount === 0 && (
                    <FormMessage>
                      이렇게 설정하면, 한번도 울리지 않아요. 다시 설정해보세요.
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />

          {deletable && (
            <div className="flex-col flex gap-2">
              <p className="text-sm">설정</p>
              <Button
                type="button"
                variant="outline"
                className="w-max !text-destructive border-destructive"
                onClick={onHabitDelete}
              >
                <TrashIcon />
                습관 삭제하기
              </Button>
            </div>
          )}

          <div className="py-3 sm:py-0 flex flex-col sm:flex-row gap-2 justify-end">
            <Button
              className="w-full sm:w-auto"
              disabled={isLoading || isTimeInvalid || habitCount === 0}
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
  );
}
