import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/time";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  interval: number;
  onIntervalChange: (interval: number) => void;

  maxInterval?: number;
}

const INTERVAL_OPTIONS = [15, 30, 60, 120, 180, 240, 300, 360, 420, 480, 540];

export default function IntervalDropdown({
  interval,
  onIntervalChange,
  maxInterval = INTERVAL_OPTIONS[INTERVAL_OPTIONS.length - 1],
}: Props) {
  const availableOptions = INTERVAL_OPTIONS.filter(
    (interval) => interval <= maxInterval
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-start text-left font-normal")}
        >
          {formatDuration(interval)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto">
        {availableOptions.length ? (
          availableOptions.map((value) => (
            <DropdownMenuItem
              key={value}
              onClick={() => onIntervalChange(value)}
            >
              {formatDuration(value)}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            시작과 종료 시간을 확인해주세요.
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
