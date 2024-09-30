import { useMutation } from "@tanstack/react-query";
import { HabitWithLog } from "../../api/generated";
import EmptyCard from "../../components/EmptyCard";
import {
  convertMinutesToHours,
  getFormatMinutes,
  getTimeDifferenceFromNow,
} from "../../utils/time";
import HabitModal from "./HabitModal";
import { habitsApi } from "../../api/client";
import { useMessageStore } from "../../state/useMessageStore";

interface Props {
  habitList: Array<HabitWithLog>;
  fetchData: () => void;
}

export default function HabitSection({ habitList, fetchData }: Props) {
  const addMessage = useMessageStore((state) => state.addMessage);
  const achieveHabitMutation = useMutation({
    mutationFn: habitsApi.achieveHabit,
    onSuccess: () => {
      fetchData();
    },
    onError: () => {
      addMessage({
        message: "습관 달성 요청에 실패했습니다.",
        type: "error",
      });
    },
  });

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
      const done = count <= data.log_list.length;
      const diffTime = getTimeDifferenceFromNow(data.log_list[0].completed_at);

      return (
        <li
          key={data.id}
          className="card card-bordered card-compact mb-2 shadow-md"
        >
          <div className="card-body flex flex-row items-center">
            <div className="flex-1">
              <span className="badge badge-primary badge-sm">
                {convertMinutesToHours(data.repeat_time_minutes)} 주기
              </span>
              <div className="card-title text-lg overflow-hidden text-ellipsis text-nowrap">
                <h2
                  className={
                    done ? "line-through text-gray-400 flex-1" : "flex-1"
                  }
                >
                  {data.title}
                </h2>
              </div>
              {done ? (
                <p className="text-primary text-xs mt-1">
                  오늘 총 {count}번의 습관을 모두 완료했어요!
                </p>
              ) : (
                <>
                  <p>
                    {data.log_list.length
                      ? `${diffTime}분 전에 실천했어요.`
                      : `${getFormatMinutes(data.start_time_minutes)} 습관 시작이에요.`}
                  </p>
                  <div>
                    <p className="text-primary text-xs mt-1">
                      {data.log_list.length > 0
                        ? `오늘 총 ${count}번 중 ${data.log_list.length}번 완료!`
                        : "지금 습관을 실천해보세요!"}
                    </p>
                  </div>
                </>
              )}
              <progress
                className="progress progress-primary w-56"
                value={(data.log_list.length / count) * 100}
                max="100"
              />
            </div>
            <input
              type="checkbox"
              disabled={done}
              className="checkbox checkbox-primary checkbox-md"
              checked={done}
              onChange={() => {
                achieveHabitMutation.mutate(data.id);
              }}
            />
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <ul>{renderHabitList(habitList)}</ul>
      <HabitModal />
    </>
  );
}
