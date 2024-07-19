import { Habit } from "../../types/habit";

interface Props {
  habitList: Array<Habit>;
}

export default function TodoSection({ habitList }: Props) {
  return (
    <ul>
      <li className="card card-bordered card-compact mb-2 shadow-md">
        <div className="card-body">
          <div className="">
            <div className="card-title text-lg">
              <h2>물 마시기</h2>
            </div>

            <div>
              <ul className="flex gap-1">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
              </ul>
              <p className="text-primary text-xs mt-1">
                오늘 총 6번 중 5번 완료
              </p>
            </div>
          </div>
        </div>
      </li>

      <li className="card card-bordered card-compact mb-2 shadow-md">
        <div className="card-body">
          <div className="">
            <div className="card-title text-lg">
              <h2>목 스트레칭 해주기</h2>
            </div>

            <div>
              <ul className="flex gap-1">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-primary"
                />
              </ul>
              <p className="text-primary text-xs mt-1">
                오늘 총 6번 중 5번 완료
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
