import { Link } from "react-router-dom";
import {
  BsFillPlayFill,
  BsPlusLg,
  BsSkipEndFill,
  BsThreeDotsVertical,
  BsToggle2Off,
  BsToggle2On,
  BsTrash,
} from "react-icons/bs";

import routineList from "../../mock/routine";
import Routes from "../../constants/routes";

import {
  getFormatDayList,
  getFormatMinutesWithMeridiem,
} from "../../utils/time";
import { Routine, RoutineElement } from "../../types/routine";

export default function RoutinePage() {
  const calculateTotalRoutineMinutes = (list: Array<RoutineElement>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const renderActivatedRoutineOptionButtonList = (routineId: number) => {
    return (
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
          <BsThreeDotsVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu menu-sm shadow bg-base-100 rounded-box w-44"
        >
          <li>
            <Link to={`/${Routes.ROUTINE_EDIT}${routineId}`}>
              <BsThreeDotsVertical />
              수정하기
            </Link>
          </li>

          <li className="flex">
            <p>
              <BsToggle2Off />
              비활성화 하기
            </p>
          </li>
        </ul>
      </div>
    );
  };

  const renderRoutineOptionButtonList = (routineId: number) => {
    return (
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
          <BsThreeDotsVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu menu-sm shadow bg-base-100 rounded-box w-44"
        >
          <li>
            <Link to={`/${Routes.ROUTINE_EDIT}${routineId}`}>
              <BsThreeDotsVertical />
              수정하기
            </Link>
          </li>

          <li className="flex">
            <p>
              <BsToggle2On />
              활성화 하기
            </p>
          </li>

          <li className="text-error flex">
            <p>
              <BsTrash />
              삭제 하기
            </p>
          </li>
        </ul>
      </div>
    );
  };

  const renderTodayRoutineList = (list: Array<Routine>) => {
    return list.map((routine) => (
      <li
        key={routine.id}
        className="card card-bordered card-compact shadow-md mb-2"
      >
        <Link to={`/${Routes.ROUTINE_REPORT}${routine.id}`}>
          <div className="card-body">
            <div className="flex">
              <div className="flex-1">
                <h2 className="card-title text-lg">{routine.title}</h2>
                <p>매주 {getFormatDayList(routine.repeat_days)}</p>
                <p>
                  {getFormatMinutesWithMeridiem(routine.start_time_minutes)} |{" "}
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

                {renderActivatedRoutineOptionButtonList(routine.id)}
              </div>
            </div>

            <div className="badge badge-sm badge-outline">100% 완료</div>
          </div>
        </Link>
      </li>
    ));
  };

  const renderRoutineList = (list: Array<Routine>) => {
    return list.map((routine) => (
      <li key={routine.id} className="card card-bordered card-compact mb-2">
        <div className="card-body">
          <div className="flex">
            <div className="flex-1">
              <h2 className="card-title text-lg">{routine.title}</h2>
              <p>매주 {getFormatDayList(routine.repeat_days)}</p>
              <p>
                {getFormatMinutesWithMeridiem(routine.start_time_minutes)} |{" "}
                {calculateTotalRoutineMinutes(routine.routine_elements)}분 동안
                진행
              </p>
            </div>

            <div className="card-actions">
              <Link to={`/${Routes.ROUTINE_PLAY}${routine.id}`}>
                <button className="btn btn-sm btn-circle btn-outline">
                  <BsFillPlayFill />
                </button>
              </Link>

              {renderActivatedRoutineOptionButtonList(routine.id)}
            </div>
          </div>
        </div>
      </li>
    ));
  };

  const renderDisabledRoutineList = (list: Array<Routine>) => {
    return list.map((routine) => (
      <li key={routine.id} className="car card-bordered card-compact mb-2">
        <div className="card-body">
          <div className="flex">
            <div className="flex-1 text-gray-400">
              <h2 className="card-title text-lg">{routine.title}</h2>
              <p>매주 {getFormatDayList(routine.repeat_days)}</p>
              <p>
                {getFormatMinutesWithMeridiem(routine.start_time_minutes)} |{" "}
                {calculateTotalRoutineMinutes(routine.routine_elements)}분 동안
                진행
              </p>
            </div>

            {renderRoutineOptionButtonList(routine.id)}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold mb-3">루틴 목록</h1>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">오늘의 루틴</h2>
        <ul>{renderTodayRoutineList(routineList)}</ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">기타 루틴</h2>
        <ul>{renderRoutineList(routineList)}</ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">비활성화 루틴</h2>
        <ul>{renderDisabledRoutineList(routineList)}</ul>
      </div>

      <button className="btn btn-circle btn-md btn-primary absolute right-0 top-0 shadow-lg">
        <BsPlusLg />
      </button>
    </div>
  );
}
