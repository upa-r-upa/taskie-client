import { HabitWithLog } from "@/api/generated";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/habit/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";
import { Button } from "@/components/ui/button";
import { getWeek } from "@/utils/time";

import Habit from "../../../components/Habit";

interface Props {
  date: Date;
  habitList: Array<HabitWithLog>;

  reloadHabitList: () => void;
}

export default function HabitSection({
  date,
  habitList,
  reloadHabitList,
}: Props) {
  const {
    createHabitModal,
    updateHabitModal,
    achieveHabitMutation,
    createHabit,
    updateHabit,
    deleteHabit,
  } = useHabitMutations({ reloadHabitList });

  const { visibleState: selectedHabit } = updateHabitModal;

  return (
    <>
      <ul className="flex flex-col gap-2">
        {habitList.length === 0 ? (
          <HabitInformation />
        ) : (
          habitList.map((habit) => {
            const isActivated = habit.repeat_days.includes(getWeek(date));

            return (
              <Habit
                key={habit.id}
                habit={habit}
                isActive={isActivated}
                onHabitClick={() => updateHabitModal.openModal(habit)}
                onHabitAchieve={() => achieveHabitMutation.mutate(habit.id)}
              />
            );
          })
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
          deletable
          modalTitle="습관 수정하기"
          submitButtonLabel="수정하기"
          isOpened={updateHabitModal.isOpened}
          setIsOpened={updateHabitModal.setIsOpened}
          onModalInvisible={updateHabitModal.invisibleModal}
          initialHabit={selectedHabit}
          onSubmit={updateHabit}
          onHabitDelete={() => deleteHabit(selectedHabit.id)}
        />
      )}
    </>
  );
}
