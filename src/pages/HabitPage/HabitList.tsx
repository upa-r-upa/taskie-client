import { BsPlusLg } from "react-icons/bs";

import { HabitWithLog } from "@/api/generated";
import { getWeek } from "@/utils/time";
import HabitModal from "@/components/habit/HabitModal";
import HabitInformation from "@/components/habit/HabitInformation";
import useHabitMutations from "@/hooks/useHabitMutations";

import ActiveHabit from "./ActivatedHabit";
import DisabledHabit from "./DisabledHabit";

interface Props {
  date: Date;
  isLoading: boolean;
  habitList: HabitWithLog[];

  reloadHabitList: () => void;
}

function HabitSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-24 w-48"></div>
      <div className="skeleton h-24"></div>
      <div className="skeleton h-24"></div>
    </div>
  );
}

export default function HabitList({
  isLoading,
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

  const renderHabitList = (list: Array<HabitWithLog>) => {
    if (!list.length) {
      return <HabitInformation />;
    }

    return list.map((data) => {
      const activateDay = getWeek(date) === data.near_weekday;

      return activateDay ? (
        <ActiveHabit
          key={data.id}
          habit={data}
          onHabitChecked={() => achieveHabitMutation.mutate(data.id)}
          onHabitClick={() => updateHabitModal.openModal(data)}
        />
      ) : (
        <DisabledHabit
          key={data.id}
          habit={data}
          onHabitClick={() => updateHabitModal.openModal(data)}
        />
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <HabitSkeleton />
      ) : (
        <ul className="flex flex-col">{renderHabitList(habitList)}</ul>
      )}

      <button onClick={createHabitModal.openModal} className="float-btn">
        <BsPlusLg />
        습관 추가하기
      </button>

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
