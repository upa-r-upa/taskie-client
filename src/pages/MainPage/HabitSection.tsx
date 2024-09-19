import { HabitWithLog } from "../../api/generated";
import EmptyCard from "../../components/EmptyCard";

interface Props {
  habitList: Array<HabitWithLog>;
}

export default function TodoSection({ habitList }: Props) {
  const renderHabitList = (list: Array<HabitWithLog>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="습관">
          <button className="btn btn-primary btn-outline">습관 추가하기</button>
        </EmptyCard>
      );
    }

    return list.map((data) => {
      const count = Math.ceil(
        (data.end_time_minutes - data.start_time_minutes) /
          data.repeat_time_minutes
      );
      const checkboxes = Array.from({ length: count }, (_, index) => index);

      return (
        <li
          key={data.id}
          className="card card-bordered card-compact mb-2 shadow-md"
        >
          <div className="card-body">
            <div className="">
              <div className="card-title text-lg">
                <h2>{data.title}</h2>
              </div>

              <div>
                <ul className="flex gap-1">
                  {checkboxes.map((i) => {
                    return (
                      <input
                        key={i}
                        type="checkbox"
                        className="checkbox checkbox-xs checkbox-primary"
                        checked={
                          data.log_list.length
                            ? data.log_list.length > i
                            : false
                        }
                      />
                    );
                  })}
                </ul>

                <p className="text-primary text-xs mt-1">
                  {data.log_list.length > 0
                    ? `오늘 총 ${count}번 중 ${data.log_list.length}번 완료!`
                    : "지금 습관을 실천해보세요!"}
                </p>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };
  return <ul>{renderHabitList(habitList)}</ul>;
}
