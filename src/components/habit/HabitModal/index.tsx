import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";

import Modal from "@/components/ui/modal";
import {
  getDayName,
  formatDuration,
  formatMinutesWithAMPM,
} from "@/utils/time";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import CheckableWeekList from "@/components/CheckableWeekList";
import TimePicker from "@/components/ui/time-picker";
import { Button } from "@/components/ui/button";
import usePrevious from "@/hooks/usePrevious";
import IntervalDropdown from "@/components/IntervalDropdown";

import { HabitModalSubmitProps } from "./types";

interface HabitModalProps {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  modalTitle: string;

  title?: string;
  repeatDays?: Array<number>;
  startTimeMinutes?: number;
  endTimeMinutes?: number;
  repeatIntervalMinutes?: number;

  isLoading?: boolean;
  deletable?: boolean;
  submitButtonLabel?: string;

  onSubmit: (param: HabitModalSubmitProps) => void;

  onHabitDelete?: () => void;
}

const formSchema = z.object({
  title: z.string(),
  repeatDays: z.array(z.number()),
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

  title: originTitle = "",
  repeatDays: originRepeatDays = [0, 1, 2, 3, 4],
  startTimeMinutes: originStartTimeMinutes = 720,
  endTimeMinutes: originEndTimeMinutes = 1080,
  repeatIntervalMinutes: originRepeatIntervalMinutes = 60,

  isLoading,

  onSubmit,
  onHabitDelete,
}: HabitModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: originTitle,
      repeatDays: originRepeatDays,
      startTimeMinutes: originStartTimeMinutes,
      endTimeMinutes: originEndTimeMinutes,
      repeatIntervalMinutes: originRepeatIntervalMinutes,
    },
  });

  const previousIsOpened = usePrevious(isOpened);

  useEffect(() => {
    if (isOpened !== previousIsOpened && isOpened) {
      form.reset({
        title: originTitle,
        repeatDays: originRepeatDays,
        startTimeMinutes: originStartTimeMinutes,
        endTimeMinutes: originEndTimeMinutes,
        repeatIntervalMinutes: originRepeatIntervalMinutes,
      });
    }
  }, [
    form,
    isOpened,
    originEndTimeMinutes,
    originRepeatDays,
    originRepeatIntervalMinutes,
    originStartTimeMinutes,
    originTitle,
    previousIsOpened,
  ]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLoading) return;

    onSubmit({
      ...values,
    });
  };

  const getRepeatCount = () => {
    const { startTimeMinutes, endTimeMinutes, repeatIntervalMinutes } =
      form.getValues();
    const times = Math.floor(
      (endTimeMinutes - startTimeMinutes) / repeatIntervalMinutes
    );
    return times < 0 ? 0 : times;
  };

  const repeatCount = getRepeatCount();

  return (
    <Modal isOpened={isOpened} setIsOpened={setIsOpened} title={modalTitle}>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">종료 시간</FormLabel>

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
            name="repeatIntervalMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">반복 간격</FormLabel>

                <FormControl>
                  <IntervalDropdown
                    interval={field.value}
                    onIntervalChange={field.onChange}
                    maxInterval={
                      form.getValues().endTimeMinutes -
                      form.getValues().startTimeMinutes
                    }
                  />
                </FormControl>

                <FormDescription className="flex flex-col gap-2">
                  <p>
                    시작 시간과 종료 시간 이내에, 습관을 실행할 수 있도록 설정한
                    반복 간격마다 알림이 울려요.
                  </p>

                  {repeatCount > 0 ? (
                    <p>
                      현재 설정한 값으론 알림이{" "}
                      <span className="text-foreground">
                        총 {repeatCount}번
                      </span>{" "}
                      울릴거에요.
                    </p>
                  ) : (
                    <div className="text-destructive">
                      <p>현재 설정한 시간을 다시 확인해보세요.</p>
                      <p>현재 설정한 시간으로는 알림이 한번도 울리지 않아요.</p>
                    </div>
                  )}
                </FormDescription>
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
  );
}
