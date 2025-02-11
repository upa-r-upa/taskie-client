import { useEffect, useState } from "react";
import { AlarmClock, Clock10 } from "lucide-react";

import { cn } from "@/lib/utils";
import { AMPM } from "@/utils/time";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import TimePickerBase from "./time-picker-base";

interface Props {
  totalMinutes: number;

  onTotalMinutesChange?: (totalMinutes: number) => void;
}

export default function TimePicker({
  totalMinutes,
  onTotalMinutesChange,
}: Props) {
  const initialHours = Math.floor(totalMinutes / 60) % 12 || 12;
  const initialMins = totalMinutes % 60;
  const initialAMPM = totalMinutes < 720 ? "오전" : "오후";

  const [hours, setHours] = useState<number>(initialHours);
  const [mins, setMins] = useState<number>(initialMins);
  const [ampm, setAMPM] = useState<AMPM>(initialAMPM);

  useEffect(() => {
    if (!onTotalMinutesChange) return;

    const newTotalMinutes =
      (ampm === "오후" ? 12 * 60 : 0) + (hours % 12) * 60 + mins;
    onTotalMinutesChange(newTotalMinutes);
  }, [hours, mins, ampm, onTotalMinutesChange]);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] md:w-[250px] justify-start text-left font-normal"
          )}
        >
          <AlarmClock />
          {ampm} {hours}시 {mins.toString().padStart(2, "0")}분
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 sm:flex" align="start">
        <TimePickerBase
          hours={hours}
          minutes={mins}
          ampm={ampm}
          onHoursChange={setHours}
          onMinutesChange={setMins}
          onAMPMChange={setAMPM}
        />
      </PopoverContent>
    </Popover>
  );
}
