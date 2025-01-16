// https://github.com/rudrodip/shadcn-date-time-picker/blob/main/src/components/date-n-time/date-time-picker.tsx

import { Button } from "./button";
import DatePicker from "./date-picker";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface Props {
  date: Date;

  onDateChange: (date: Date) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => 12 - i);

export default function DateTimePicker({ date, onDateChange }: Props) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "오후" ? currentHours + 12 : currentHours - 12
        );
      }
      onDateChange(newDate);
    }
  };

  return (
    <DatePicker date={date} onDateChange={handleDateSelect} showTime>
      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
        <ScrollArea className="">
          <div className="flex sm:flex-col p-2">
            {["오전", "오후"].map((ampm) => (
              <Button
                key={ampm}
                size="icon"
                variant={
                  date &&
                  ((ampm === "오전" && date.getHours() < 12) ||
                    (ampm === "오후" && date.getHours() >= 12))
                    ? "default"
                    : "ghost"
                }
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleTimeChange("ampm", ampm)}
              >
                {ampm}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {hours.map((hour) => (
              <Button
                key={hour}
                size="icon"
                variant={
                  date && date.getHours() % 12 === hour % 12
                    ? "default"
                    : "ghost"
                }
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleTimeChange("hour", hour.toString())}
              >
                {hour}시
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
              <Button
                key={minute}
                size="icon"
                variant={
                  date && date.getMinutes() === minute ? "default" : "ghost"
                }
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleTimeChange("minute", minute.toString())}
              >
                {minute}분
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>
    </DatePicker>
  );
}
