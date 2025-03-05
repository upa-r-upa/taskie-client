import { Weeks } from "@/utils/time";

import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface Props {
  weekList: Array<number>;
  onWeekChange?: (repeatDays: Array<number>) => void;
}

export default function CheckableWeekList({ weekList, onWeekChange }: Props) {
  const toggleList = weekList.map((value) => value.toString());

  const handleValueChange = (values: Array<string>) => {
    onWeekChange?.(values.map((v) => parseInt(v)));
  };

  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={toggleList}
      onValueChange={handleValueChange}
      className="justify-start"
    >
      {Weeks.map((value, idx) => {
        return (
          <ToggleGroupItem
            key={value}
            value={idx.toString()}
            aria-label={value}
          >
            <p>{value}</p>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
