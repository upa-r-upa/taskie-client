import { RoutineItem } from "@/api/generated";
import { getFormatMinutesWithMeridiem } from "@/utils/time";

interface Props {
  startTimeMinutes: number;
  routineTodoList: Array<RoutineItem>;
}

export default function RoutineTileDescription({
  startTimeMinutes,
  routineTodoList,
}: Props) {
  const calculateTotalRoutineMinutes = (list: Array<RoutineItem>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  return (
    <p>
      {getFormatMinutesWithMeridiem(startTimeMinutes)} | 총{" "}
      {calculateTotalRoutineMinutes(routineTodoList)}분
    </p>
  );
}
