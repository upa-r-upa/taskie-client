import EmptyCard from "../EmptyCard";

interface Props {}

export default function HabitInformation({}: Props) {
  return (
    <EmptyCard label="습관">
      <div className="text-sm text-gray-500">
        <p>습관은 하루에 여러번 반복되는 일을 편리하게 관리할 수 있어요.</p>
        <p className="mt-1">주기적으로 반복되는 할 일이라고 생각하면 편해요.</p>
      </div>
    </EmptyCard>
  );
}
