import EmptyCard from "./EmptyCard";

interface Props {
  onModalOpen?: () => void;
}

export default function HabitInformation({ onModalOpen }: Props) {
  return (
    <EmptyCard label="습관">
      <div>
        <div className="text-sm text-gray-500">
          <p>
            습관은 <b>하루에 여러번 반복되는 일</b>을<br /> 편리하게 관리할 수
            있어요.
          </p>
          <p className="mt-1">
            주기적으로 반복되는 할 일이라고
            <br /> 생각하면 편해요.
          </p>
        </div>

        <button
          className="btn btn-primary btn-outline mt-2"
          onClick={onModalOpen}
        >
          습관 추가하기
        </button>
      </div>
    </EmptyCard>
  );
}
