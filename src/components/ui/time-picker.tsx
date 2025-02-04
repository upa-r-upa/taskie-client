import { useState } from "react";

import { cn } from "@/lib/utils";
import { AMPM } from "@/utils/time";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import TimePickerBase from "./time-picker-base";

interface Props {
  hours?: number;
  minutes?: number;
  ampm?: AMPM;
}

export default function TimePicker(initialValues: Props) {
  const [];

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] md:w-[250px] justify-start text-left font-normal"
          )}
        >
          시간과 분을 선택
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 sm:flex" align="start">
        <TimePickerBase
          hours={hours}
          minutes={minutes}
          ampm={ampm}
          onHoursChange={setHours}
          onMinutesChange={setMinutes}
          onAMPMChange={setAMPM}
        />
      </PopoverContent>
    </Popover>
  );
}
