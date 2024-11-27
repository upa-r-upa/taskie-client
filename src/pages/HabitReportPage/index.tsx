import Calendar from "@/components/Calendar";

export default function HabitReportPage() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-3">
        <span className="font-bold">물 마시기</span> 습관
      </h1>

      <h2 className="text-2xl mb-3 font-semibold">습관 정보</h2>
      <div className="mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">현재 연속 진행일</div>
            <div className="stat-value text-3xl">5일</div>
            <div className="stat-desc">최대 진행일 10일</div>
          </div>
          <div className="stat">
            <div className="stat-title">이번주 완료율</div>
            <div className="stat-value text-3xl">100%</div>
          </div>
          <div className="stat">
            <div className="stat-title">이번 달 완료율</div>
            <div className="stat-value text-3xl">80%</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-6 gap-3">
        <div>
          <h2 className="text-lg font-semibold">진행 요일</h2>
          <p>월, 화, 수, 목, 금</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">시작 시간 및 종료 시간</h2>
          <p>아침 7시 30분부터 저녁 10시까지</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">반복 시간</h2>
          <p>2시간마다 반복</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">시작일</h2>
          <p>2021년 7월 1일부터 시작했어요.</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl mb-3 font-semibold">
          주간 요약<span className="text-base ml-3">5월 6일 ~ 5월 9일</span>
        </h2>

        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">이전 주</button>
          <button className="btn btn-outline btn-sm">다음 주</button>
        </div>

        <div className="mt-3">
          <ul className="flex flex-col gap-3 shadow-md py-3 px-3 rounded-md">
            <li className="flex items-center gap-2">
              <p className="text-lg">월</p>
              <ul className="flex gap-2">
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
              </ul>
            </li>

            <li className="flex items-center gap-2">
              <p className="text-lg">화</p>
              <ul className="flex gap-2">
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
              </ul>
            </li>

            <li className="flex items-center gap-2">
              <p className="text-lg">수</p>
              <ul className="flex gap-2">
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" disabled />
                </li>
                <li>
                  <input type="checkbox" disabled />
                </li>
              </ul>
            </li>

            <li className="flex items-center gap-2">
              <p className="text-lg">목</p>
              <ul className="flex gap-2">
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
                <li>
                  <input type="checkbox" checked disabled />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl mb-3 font-semibold">
          한달 요약<span className="text-base ml-3">3월 1일 ~ 3월 31일</span>
        </h2>
        <Calendar
          className="shadow-md"
          dateContents={[
            { date: 1, highlight: true },
            { date: 5, highlight: true },
            { date: 6, highlight: true },
          ]}
        />
      </div>
    </div>
  );
}
