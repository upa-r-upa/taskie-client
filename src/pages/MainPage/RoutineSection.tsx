import { BsFillPlayFill, BsSkipEndFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Routine, RoutineElement } from "../../types/routine";
import { getFormatDayList, getFormatMinutes } from "../../utils/time";
import Routes from "../../constants/routes";
import EmptyCard from "../../components/EmptyCard";

interface Props {
  routineList: Array<Routine>;
}

export default function RoutineSection({ routineList }: Props) {
  const calculateTotalRoutineMinutes = (list: Array<RoutineElement>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const renderRoutineList = (list: Array<Routine>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="루틴">
          <button className="btn btn-primary btn-outline">루틴 추가하기</button>
        </EmptyCard>
      );
    }

    return list.map((routine) => {
      return (
        <li
          key={routine.id}
          className="card card-bordered card-compact shadow-md mb-2"
        >
          <div className="card-body">
            <div className="flex">
              <div className="flex-1">
                <h2 className="card-title text-lg">{routine.title}</h2>
                <p>매주 {getFormatDayList(routine.repeat_days)}</p>
                <p>
                  {getFormatMinutes(routine.start_time_minutes)} |{" "}
                  {calculateTotalRoutineMinutes(routine.routine_elements)}분
                  동안 진행
                </p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-circle btn-primary">
                  <BsSkipEndFill />
                </button>

                <Link to={`/${Routes.ROUTINE_PLAY}${routine.id}`}>
                  <button className="btn btn-sm btn-circle btn-outline btn-primary">
                    <BsFillPlayFill />
                  </button>
                </Link>
              </div>
            </div>

            <div className="badge badge-sm badge-outline">100% 완료</div>
          </div>
        </li>
      );
    });
  };

  return <ul>{renderRoutineList(routineList)}</ul>;
}
