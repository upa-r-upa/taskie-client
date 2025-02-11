import { HabitWithLog } from "@/api/generated";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/habit/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";
import { Button } from "@/components/ui/button";

import Habit from "./Habit";

interface Props {
  habitList: Array<HabitWithLog>;
  reloadHabitList: () => void;

  fullData?: boolean;
}

export default function HabitSection({ habitList, reloadHabitList }: Props) {
  const {
    createHabitModal,
    updateHabitModal,
    achieveHabitMutation,
    deleteHabitMutation,
    createHabit,
    updateHabit,
    deleteHabit,
  } = useHabitMutations({ reloadHabitList });

  const { modalState: selectedHabit } = updateHabitModal;

  return (
    <>
      <ul>
        {habitList.length === 0 ? (
          <HabitInformation />
        ) : (
          habitList.map((habit) => (
            <Habit
              key={habit.id}
              habit={habit}
              onHabitClick={() => updateHabitModal.openModal(habit)}
              onHabitAchieve={() => achieveHabitMutation.mutate(habit.id)}
            />
          ))
        )}
      </ul>

      <Button
        size="lg"
        onClick={createHabitModal.openModal}
        className="mt-4 w-full"
      >
        습관 추가하기
      </Button>

      <HabitModal
        onSubmit={createHabit}
        modalTitle="습관 추가하기"
        submitButtonLabel="추가하기"
        isOpened={createHabitModal.isModalOpened}
        setIsOpened={createHabitModal.closeModal}
      />

      {selectedHabit && (
        <HabitModal
          modalTitle="습관 수정하기"
          submitButtonLabel="수정하기"
          isOpened={updateHabitModal.isOpened}
          setIsOpened={updateHabitModal.setIsOpened}
          onSubmit={updateHabit}
          title={selectedHabit.title}
          startTimeMinutes={selectedHabit.start_time_minutes}
          endTimeMinutes={selectedHabit.end_time_minutes}
          repeatIntervalMinutes={selectedHabit.repeat_time_minutes}
          repeatDays={selectedHabit.repeat_days}
        />
      )}
    </>
  );
}
