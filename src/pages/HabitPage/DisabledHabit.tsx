import { HabitPublic } from "@/api/generated";
import WeekList from "@/components/WeekList";
import { formatDuration, formatMinutesWithAMPM } from "@/utils/time";

interface Props {
  habit: HabitPublic;

  onHabitClick: () => void;
}

export default function DisabledHabit({ habit, onHabitClick }: Props) {
  const {
    repeat_time_minutes,
    title,
    repeat_days,
    start_time_minutes,
    end_time_minutes,
  } = habit;

  return (
    <li className="card card-bordered card-compact mb-2 shadow-md">
      <div
        className="card-body flex flex-row items-center"
        onClick={onHabitClick}
      >
        <div className="overflow-hidden">
          <span className="badge badge-neutral badge-outline badge-sm">
            {formatDuration(repeat_time_minutes)} 주기
          </span>
          <div className="card-title text-lg overflow-hidden">
            <h2
              className={
                "text-gray-400 overflow-hidden text-ellipsis text-nowrap"
              }
            >
              {title}
            </h2>
          </div>

          <p>오늘은 실행하는 날이 아니에요.</p>

          <WeekList weekList={repeat_days} className="mt-1" />

          <p className="mt-1">
            {formatMinutesWithAMPM(start_time_minutes)}~
            {formatMinutesWithAMPM(end_time_minutes)}
          </p>
        </div>
      </div>
    </li>
  );
}
