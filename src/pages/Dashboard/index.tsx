export default function Dashboard() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-3">
        <span className="font-bold">이번주 대시보드</span>
      </h1>

      <h2 className="text-2xl mb-3 font-semibold">2024.03.07~2024.03.12</h2>

      <div className="flex flex-col mb-6 gap-3">
        <div>
          <h2 className="text-lg font-semibold">이번주 완료 투두 목록</h2>
          <p>이번주 총 25개의 투두를 성공적으로 완료했어요.</p>
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-plus border border-base-300 bg-base-200"
        >
          <div className="collapse-title">이번주 투두 목록 확인하기</div>
          <div className="collapse-content">
            <ul className="flex flex-col gap-3 shadow-md py-3 px-3 rounded-md">
              <li className="py-1 px-1">
                <p className="text-lg">3월 5일 (월요일)</p>
                <ul className="flex gap-2 flex-col">
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>아침 운동</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>점심 산책</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>저녁 운동</span>
                  </li>
                </ul>
              </li>

              <li className="py-1 px-1">
                <p className="text-lg">3월 6일 (화요일)</p>
                <ul className="flex gap-2 flex-col">
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>아침 운동</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>점심 산책</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>저녁 운동</span>
                  </li>
                </ul>
              </li>

              <li className="py-1 px-1">
                <p className="text-lg">3월 7일 (수요일)</p>
                <ul className="flex gap-2 flex-col">
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>아침 운동</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>점심 산책</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>저녁 운동</span>
                  </li>
                </ul>
              </li>

              <li className="py-1 px-1">
                <p className="text-lg">3월 8일 (목요일)</p>
                <ul className="flex gap-2 flex-col">
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>아침 운동</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>점심 산책</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>저녁 운동</span>
                  </li>
                </ul>
              </li>

              <li className="py-1 px-1">
                <p className="text-lg">3월 9일 (금요일)</p>
                <ul className="flex gap-2 flex-col">
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>아침 운동</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>점심 산책</span>
                  </li>
                  <li className="flex gap-2">
                    <input type="checkbox" checked disabled />
                    <span>저녁 운동</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">이번주 루틴 목록</h2>
          <ul></ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">이번주 습관 목록</h2>
          <ul></ul>
        </div>
      </div>
    </div>
  );
}
