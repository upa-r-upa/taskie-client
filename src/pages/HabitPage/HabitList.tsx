import { PlusIcon } from "lucide-react";

import { HabitWithLog } from "@/api/generated";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/habit/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";
import { Button } from "@/components/ui/button";
import Habit from "@/components/Habit";

interface Props {
  habitList: Array<HabitWithLog>;
  reloadHabitList: () => void;
}

export default function HabitList({ habitList, reloadHabitList }: Props) {
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
      <Button
        className="flex items-center mb-4"
        variant="outline"
        onClick={createHabitModal.openModal}
      >
        <PlusIcon />
        습관 추가하기
      </Button>

      <ul className="flex flex-col gap-2">
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
