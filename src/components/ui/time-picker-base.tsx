// https://github.com/rudrodip/shadcn-date-time-picker/blob/main/src/components/date-n-time/date-time-picker.tsx

import { AMPM } from "@/utils/time";

import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface Props {
  hours: number;
  minutes: number;
  ampm: AMPM;

  onMinutesChange: (hour: number) => void;
  onHoursChange: (hour: number) => void;
  onAMPMChange: (ampm: AMPM) => void;
}
const HourList = Array.from({ length: 12 }, (_, i) => i + 1);

export default function TimePickerBase({
  hours,
  minutes,
  ampm,
  onHoursChange,
  onMinutesChange,
  onAMPMChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
      <ScrollArea>
        <div className="flex sm:flex-col p-2">
          {["오전", "오후"].map((_ampm) => (
            <Button
              key={_ampm}
              size="icon"
              variant={_ampm === ampm ? "default" : "ghost"}
              className="sm:w-full shrink-0 aspect-square"
              onClick={() => onAMPMChange(_ampm as AMPM)}
            >
              {_ampm}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ScrollArea className="w-64 sm:w-auto">
        <div className="flex sm:flex-col p-2">
          {HourList.map((hour) => (
            <Button
              key={hour}
              size="icon"
              variant={hour === (hours % 12 || 12) ? "default" : "ghost"}
              className="sm:w-full shrink-0 aspect-square"
              onClick={() => onHoursChange(hour)}
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
              variant={minutes === minute ? "default" : "ghost"}
              className="sm:w-full shrink-0 aspect-square"
              onClick={() => onMinutesChange(minute)}
            >
              {minute}분
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>
    </div>
  );
}
