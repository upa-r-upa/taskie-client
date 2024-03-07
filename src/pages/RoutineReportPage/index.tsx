import Calendar from "../../components/Calendar";

export default function RoutineReportPage() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-3">
        <span className="font-bold">미라클 점심</span> 루틴
      </h1>

      <div className="mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">연속 진행일</div>
            <div className="stat-value text-3xl">5일</div>
            <div className="stat-desc">최대 진행일 10일</div>
          </div>
          <div className="stat">
            <div className="stat-title">이번주 완료율</div>
            <div className="stat-value text-3xl">100%</div>
            <div className="stat-desc">5번 중 5번 완료</div>
          </div>
          <div className="stat">
            <div className="stat-title">이번 달 완료율</div>
            <div className="stat-value text-3xl">80%</div>
            <div className="stat-desc">20번 중 16번 완료</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-3">
        <div>
          <h2 className="text-xl font-semibold">진행 요일</h2>
          <p>월, 화, 수, 목, 금</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">시작일</h2>
          <p>2021년 7월 1일부터 시작했어요.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">시작 시각 및 진행 시간</h2>
          <p>아침 7시 30분부터 50분 동안 진행해요.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">평균 소요 시간</h2>
          <p>평균적으로 약 56분 동안 진행해요.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">평균 시작 시간</h2>
          <p>평균적으로 아침 8시 30분에 시작했어요.</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl mb-3 font-semibold">2월 루틴 진행 상황</h2>
        <Calendar
          className="shadow-md"
          dateContents={[
            { date: 1, highlight: true },
            { date: 5, highlight: true },
            { date: 6, highlight: true },
          ]}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl mb-3 font-semibold">루틴 요소</h2>

        <ul>
          <li className="rounded-md py-2 px-2 border border-gray-300 mb-3">
            <div className="flex items-center">
              <div className="ml-1">루틴 요소 1</div>
              <div className="ml-3 badge badge-primary badge-outline">
                5분 소요
              </div>
            </div>

            <div className="mt-2 px-3">
              <div className="flex items-center">
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 달성률</div>
                  <div className="ml-2 text-lg font-bold">80%</div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 소요 시간</div>
                  <div className="ml-2 text-lg font-bold">5분</div>
                </div>
              </div>
            </div>
          </li>

          <li className="rounded-md py-2 px-2 border border-gray-300 mb-3">
            <div className="flex items-center">
              <div className="ml-1">루틴 요소 2</div>
              <div className="ml-3 badge badge-primary badge-outline">
                10분 소요
              </div>
            </div>

            <div className="mt-2 px-3">
              <div className="flex items-center">
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 달성률</div>
                  <div className="ml-2 text-lg font-bold">100%</div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 소요 시간</div>
                  <div className="ml-2 text-lg font-bold">5분</div>
                </div>
              </div>
            </div>
          </li>

          <li className="rounded-md py-2 px-2 border border-gray-300 mb-3">
            <div className="flex items-center">
              <div className="ml-1">루틴 요소 3</div>
              <div className="ml-3 badge badge-primary badge-outline">
                5분 소요
              </div>
            </div>

            <div className="mt-2 px-3">
              <div className="flex items-center">
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 달성률</div>
                  <div className="ml-2 text-lg font-bold">80%</div>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="text-sm text-gray-500">평균 소요 시간</div>
                  <div className="ml-2 text-lg font-bold">5분</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
