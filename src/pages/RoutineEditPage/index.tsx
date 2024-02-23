import mock_routine from "../../mock/routine";

const routine = mock_routine[0];

export default function RoutineEditPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">{routine.title} 루틴 수정</h1>

      <div className="mt-4 flex flex-col gap-3">
        <label className="text-lg">
          루틴 이름
          <input
            type="text"
            className="input w-full input-bordered"
            defaultValue={routine.title}
          />
        </label>

        <label className="text-lg">
          루틴 시작 시간
          <input
            type="time"
            className="input w-full input-bordered"
            defaultValue={"09:00"}
          />
        </label>

        <div className="text-lg">
          <p>
            루틴 요일
            <button className="ml-2 btn btn-sm">전체 선택</button>
          </p>

          <div className="flex gap-2">
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">월</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">화</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">수</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">목</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">금</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">토</span>
            </label>
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <span className="ml-1 text-sm">일</span>
            </label>
          </div>
        </div>

        <div className="text-lg">
          <p>할 일 목록</p>

          <ul className="flex px-4 py-4 flex-col gap-2 mt-2 shadow">
            <li className="flex gap-3 items-center p-2 bg-white rounded-lg shadow">
              <input
                type="text"
                className="input w-full input-bordered input-sm"
                defaultValue={"할 일 목록 1"}
              />
              <input
                type="number"
                className="input input-bordered w-16 input-sm"
                defaultValue={30}
              />

              <button className="btn btn-sm">삭제</button>
            </li>

            <li className="flex gap-3 items-center p-2 bg-white rounded-lg shadow">
              <input
                type="text"
                className="input w-full input-bordered input-sm"
                defaultValue={"할 일 목록 2"}
              />
              <input
                type="number"
                className="input input-bordered w-16 input-sm"
                defaultValue={30}
              />

              <button className="btn btn-sm">삭제</button>
            </li>

            <button className="btn btn-sm mt-3">할 일 추가</button>
          </ul>
        </div>
      </div>
    </>
  );
}
