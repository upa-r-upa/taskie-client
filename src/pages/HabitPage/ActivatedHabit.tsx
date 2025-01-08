import { HabitWithLog } from "@/api/generated";
import WeekList from "@/components/WeekList";
import {
  convertMinutesToHours,
  getFormatMinutesWithMeridiem,
  getTimeDifferenceFromNow,
} from "@/utils/time";

interface Props {
  habit: HabitWithLog;

  onHabitClick: () => void;
  onHabitChecked: () => void;
}

export default function ActivatedHabit({
  habit,
  onHabitClick,
  onHabitChecked,
}: Props) {
  const {
    repeat_days,
    repeat_time_minutes,
    title,
    end_time_minutes,
    start_time_minutes,
    log_list,
  } = habit;

  const count =
    Math.ceil((end_time_minutes - start_time_minutes) / repeat_time_minutes) +
    1;
  const done = count <= log_list.length;

  return (
    <li className="card card-bordered card-compact mb-2 shadow-md order-1">
      <div className="card-body flex flex-row items-center">
        <div className="flex-1 overflow-hidden" onClick={onHabitClick}>
          <span className="badge badge-primary badge-sm">
            {convertMinutesToHours(repeat_time_minutes)} 주기
          </span>

          <div className="card-title text-lg">
            <h2
              className={
                done
                  ? "line-through overflow-hidden text-gray-400 text-ellipsis text-nowrap"
                  : "text-ellipsis overflow-hidden text-nowrap"
              }
            >
              {title}
            </h2>
          </div>

          <WeekList weekList={repeat_days} className="mt-1" />

          {done ? (
            <p className="text-primary text-xs mt-1">
              오늘 총 {count}번의 습관을 모두 완료했어요!
            </p>
          ) : (
            <>
              <p className="my-1 font-semibold">
                {getFormatMinutesWithMeridiem(start_time_minutes)}~
                {getFormatMinutesWithMeridiem(end_time_minutes)}
              </p>

              <p>
                {log_list.length > 0 &&
                  `${convertMinutesToHours(getTimeDifferenceFromNow(log_list[0].completed_at))} 전에 실천했어요.`}
              </p>

              <div>
                <p className="text-primary text-xs mt-1">
                  {log_list.length > 0
                    ? `오늘 총 ${count}번 중 ${log_list.length}번 완료!`
                    : "지금 습관을 실천해보세요!"}
                </p>
              </div>
            </>
          )}

          {log_list.length > 0 && (
            <progress
              className="progress progress-primary w-56"
              value={(log_list.length / count) * 100}
              max="100"
            />
          )}
        </div>

        <input
          type="checkbox"
          disabled={done}
          className="checkbox checkbox-primary checkbox-md"
          checked={done}
          onChange={onHabitChecked}
        />
      </div>
    </li>
  );
}
