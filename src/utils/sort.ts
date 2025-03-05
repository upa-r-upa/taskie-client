import { getWeek } from "@/utils/time";
import { RoutinePublic } from "@/api/generated";

const isCompletedRoutine = (routine: RoutinePublic): boolean => {
  return routine.routine_elements.some(
    ({ is_skipped, completed_at }) => is_skipped || completed_at
  );
};

export function sortRoutines(
  routines: RoutinePublic[],
  date: Date
): RoutinePublic[] {
  const today = getWeek(date);

  return routines.slice().sort((a, b) => {
    const aActive = a.repeat_days.includes(today);
    const bActive = b.repeat_days.includes(today);
    const aCompleted = isCompletedRoutine(a);
    const bCompleted = isCompletedRoutine(b);

    const aGroup = aCompleted ? 2 : aActive ? 0 : 1;
    const bGroup = bCompleted ? 2 : bActive ? 0 : 1;

    if (aGroup !== bGroup) {
      return aGroup - bGroup;
    }

    const aUpdated = new Date(a.updated_at).getTime();
    const bUpdated = new Date(b.updated_at).getTime();

    return bUpdated - aUpdated;
  });
}
