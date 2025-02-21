import { getWeek } from "@/utils/time";
import EmptyCard from "@/components/EmptyCard";
import { RoutinePublic } from "@/api/generated";
import Routine from "@/components/routine/Routine";

interface Props {
  date: Date;
  routineList: Array<RoutinePublic>;
}

export default function RoutineList({ date, routineList }: Props) {
  const renderRoutineList = (list: Array<RoutinePublic>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="루틴">
          다양한 할 일들을 루틴으로 묶어서 관리해보세요.
        </EmptyCard>
      );
    }

    return list.map((routine) => {
      const isActivated = routine.repeat_days.includes(getWeek(date));

      return (
        <Routine key={routine.id} routine={routine} disabled={!isActivated} />
      );
    });
  };

  return (
    <ul className="flex flex-col gap-2">{renderRoutineList(routineList)}</ul>
  );
}
