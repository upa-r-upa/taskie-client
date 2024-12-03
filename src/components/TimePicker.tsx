import React from "react";

import { getFormatMinutesWithMeridiem } from "@/utils/time";

interface TimePickerProps {
  minutes: number;
  onChange: (minutes: number) => void;

  isMidnightSelectable?: boolean;

  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  minutes,
  onChange,
  isMidnightSelectable,
  className,
}) => {
  const generateTimeOptions = (
    isMidnightSelectable: boolean
  ): Array<number> => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(hour * 60);
      times.push(hour * 60 + 30);
    }

    if (isMidnightSelectable) {
      times.push(24 * 60);
    }

    return times;
  };

  const times = generateTimeOptions(!!isMidnightSelectable);

  return (
    <select
      defaultValue={minutes}
      onChange={({ target }) => onChange(parseInt(target.value) ?? 0)}
      className={`select select-bordered w-full ${className}`}
    >
      {times.map((timeOption) => (
        <option key={timeOption} value={timeOption}>
          {getFormatMinutesWithMeridiem(timeOption)}
        </option>
      ))}
    </select>
  );
};

export default TimePicker;
