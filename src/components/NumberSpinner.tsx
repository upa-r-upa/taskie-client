import { useState } from "react";

import { Input } from "./ui/input";

interface Props {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;

  onChange?: (value: number) => void;
}

export default function NumberSpinner({
  initialValue = 0,
  min = 0,
  max = 9999,
  step = 1,
  placeholder = "",
  onChange,
}: Props) {
  const [value, setValue] = useState<string>(initialValue.toString());

  const updateValue = (value: string) => {
    setValue(value);
    onChange?.(getNumericValue(value));
  };

  const getNumericValue = (value: string) => {
    const numeric = parseInt(value, 10);
    return isNaN(numeric) ? 0 : numeric;
  };

  const handleDecrement = () => {
    const numeric = getNumericValue(value);
    const newValue = Math.max(numeric - step, min);
    updateValue(newValue.toString());
  };

  const handleIncrement = () => {
    const numeric = getNumericValue(value);
    const newValue = Math.min(numeric + step, max);
    updateValue(newValue.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target.value);
  };

  const handleBlur = () => {
    if (
      value === "" ||
      isNaN(parseInt(value, 10)) ||
      parseInt(value, 10) < min
    ) {
      updateValue(min.toString());
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="px-2 py-1.5 border rounded"
        onClick={handleDecrement}
      >
        –
      </button>
      <Input
        type="number"
        className="w-14 text-sm text-center"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="px-2 py-1.5 border rounded"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
