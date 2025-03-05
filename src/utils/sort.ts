import { getWeek } from "@/utils/time";
import { HabitWithLog, RoutinePublic } from "@/api/generated";

const isCompletedRoutine = (routine: RoutinePublic): boolean => {
  return routine.routine_elements.some(
    ({ is_skipped, completed_at }) => is_skipped || completed_at
  );
};

export function sortRoutines(
  routines: Array<RoutinePublic>,
  date: Date
): Array<RoutinePublic> {
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

const isCompletedHabit = (habit: HabitWithLog): boolean => {
  const {
    end_time_minutes,
    start_time_minutes,
    repeat_time_minutes,
    log_list,
  } = habit;

  const count = Math.max(
    Math.floor((end_time_minutes - start_time_minutes) / repeat_time_minutes),
    0
  );
  const isDone = log_list.length !== 0 && count <= log_list.length;

  return isDone;
};

export function sortHabits(
  habits: Array<HabitWithLog>,
  date: Date
): Array<HabitWithLog> {
  const today = getWeek(date);

  return habits.slice().sort((a, b) => {
    const aActive = a.repeat_days.includes(today);
    const bActive = b.repeat_days.includes(today);
    const aCompleted = isCompletedHabit(a);
    const bCompleted = isCompletedHabit(b);

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
