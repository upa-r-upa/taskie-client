import React from "react";

interface TimePickerProps {
  hour: number;
  minutes: number;
  onChange: (hour: number, minutes: number) => void;

  className?: string;
}

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}시 00분`);
    times.push(`${hour.toString().padStart(2, "0")}시 30분`);
  }
  return times;
};

const times = generateTimeOptions();

const TimePicker: React.FC<TimePickerProps> = ({
  hour,
  minutes,
  onChange,
  className,
}) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newHour, newMinutes] = e.target.value
      .split("시")
      .map((part) => part.trim());
    const parsedHour = parseInt(newHour, 10);
    const parsedMinutes = parseInt(newMinutes.replace("분", ""), 10);

    onChange(parsedHour, parsedMinutes);
  };

  return (
    <div>
      <select
        defaultValue={`${hour.toString().padStart(2, "0")}시 ${minutes}분`}
        onChange={handleTimeChange}
        className={`select select-bordered w-full ${className}`}
      >
        {times.map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
