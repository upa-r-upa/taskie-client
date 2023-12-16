import { Habit } from "../../types/habit";

interface Props {
  habitList: Array<Habit>;
}

export default function TodoSection({ habitList }: Props) {
  const renderHabitList = (habitList: Array<Habit>): JSX.Element[] => {
    return habitList.map((habit) => {
      return (
        <li key={habit.id} className="card card-bordered  card-compact mb-2">
          <div className="card-body">
            <div className=" flex">
              <div className="flex-1">
                <h2 className="card-title text-lg">{habit.title}</h2>
                <p>총 {habit.start_time_minutes.length}번 중 5번 완료</p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-primary">수행하기</button>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return <>{renderHabitList(habitList)}</>;
}
