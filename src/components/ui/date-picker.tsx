import { CalendarIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate, formatDateWithTime } from "@/utils/time";

interface Props {
  date: Date;

  showTime?: boolean;
  isSimple?: boolean;

  onDateChange: (date: Date) => void;
}

export default function DatePicker({
  date,
  showTime,
  isSimple,
  onDateChange,
  children,
}: Props & PropsWithChildren) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            isSimple && "w-[200px] text-sm"
          )}
        >
          {!isSimple && <CalendarIcon />}

          {date ? (
            showTime ? (
              formatDateWithTime(date)
            ) : (
              formatDate(date)
            )
          ) : (
            <span>날짜를 선택해주세요.</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 sm:flex" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => onDateChange(date!)}
          initialFocus
        />
        {children}
      </PopoverContent>
    </Popover>
  );
}
