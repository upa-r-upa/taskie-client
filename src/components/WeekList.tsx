import { getDayFromNumber } from "@/utils/time";

interface Props {
  weekList: number[];

  className?: string;
  WeekClassName?: string;

  onWeekClick?: (week: number) => void;
}

export default function WeekList({
  weekList,
  className,
  WeekClassName,
  onWeekClick,
}: Props) {
  return (
    <ul className={`flex gap-1 ${className}`}>
      {weekList.map((data, i) => {
        return (
          <li
            key={i}
            onClick={() => onWeekClick?.(data)}
            className={`card-bordered rounded-full px-1 border-gray-300 ${WeekClassName}`}
          >
            {getDayFromNumber(data)}
          </li>
        );
      })}
    </ul>
  );
}
