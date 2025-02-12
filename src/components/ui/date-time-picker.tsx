// https://github.com/rudrodip/shadcn-date-time-picker/blob/main/src/components/date-n-time/date-time-picker.tsx

import DatePicker from "./date-picker";
import TimePickerBase from "./time-picker-base";

interface Props {
  date: Date;

  onDateChange: (date: Date) => void;
}

export default function DateTimePicker({ date, onDateChange }: Props) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleHoursChange = (hours: number) => {
    const newDate = new Date(date);
    newDate.setHours((hours % 12) + (newDate.getHours() >= 12 ? 12 : 0));

    onDateChange(newDate);
  };

  const handleMinutesChange = (minutes: number) => {
    const newDate = new Date(date);
    newDate.setMinutes(minutes);

    onDateChange(newDate);
  };

  const handleAMPMChange = (ampm: string) => {
    const newDate = new Date(date);
    const currentHours = newDate.getHours();

    newDate.setHours(ampm === "오후" ? currentHours + 12 : currentHours - 12);
    onDateChange(newDate);
  };

  return (
    <DatePicker date={date} onDateChange={handleDateSelect} showTime>
      <TimePickerBase
        ampm={date.getHours() >= 12 ? "오후" : "오전"}
        hours={date.getHours()}
        minutes={date.getMinutes()}
        onAMPMChange={handleAMPMChange}
        onHoursChange={handleHoursChange}
        onMinutesChange={handleMinutesChange}
      />
    </DatePicker>
  );
}
