import { Link } from "react-router-dom";
import Routes from "../../constants/routes";

export default function Dashboard() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-3">
        <span className="font-bold">금주 대시보드</span>
      </h1>

      <h2 className="mb-3 font-semibold text-primary">2024.03.07~2024.03.12</h2>

      <div className="flex flex-col mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-semibold">투두 목록</h2>
          <p>이번주 총 25개의 투두를 성공적으로 완료했어요.</p>
        </div>

        <div tabIndex={0} className="collapse collapse-plus border">
          <div className="collapse-title">완료한 투두 목록 확인하기</div>
          <div className="collapse-content">
            <ul className="flex flex-col gap-3 shadow-md py-3 px-3 rounded-md bg-white">
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
          <h2 className="text-2xl font-semibold mb-3">루틴 목록</h2>
          <ul>
            <ul>
              <li className="card card-bordered card-compact shadow-md mb-2">
                <div className="card-body">
                  <div className="flex">
                    <div className="flex-1">
                      <h2 className="card-title text-lg">
                        미라클 모닝 루틴
                        <div className="badge badge-sm badge-outline">
                          이번주 80% 완료
                        </div>
                      </h2>
                      <p>매주 월, 화, 수, 목, 금</p>
                    </div>
                  </div>

                  <ul className="flex gap-2">
                    <li className="flex items-center gap-2">
                      <span>월</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-400">화</span>
                      <div className="badge badge-sm badge-outline mr-2">
                        스킵
                      </div>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>수</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>목</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>금</span>
                      <input type="checkbox" checked />
                    </li>
                  </ul>

                  <Link to={`/${Routes.ROUTINE_REPORT}${1}`}>
                    <button className="btn btn-outline btn-sm mt-3">
                      루틴 상세 대시보드
                    </button>
                  </Link>
                </div>
              </li>

              <li className="card card-bordered card-compact shadow-md mb-2">
                <div className="card-body">
                  <div className="flex">
                    <div className="flex-1">
                      <h2 className="card-title text-lg">
                        미라클 저녁 루틴
                        <div className="badge badge-sm badge-outline">
                          이번주 100% 완료
                        </div>
                      </h2>
                      <p>매주 월, 화, 수, 목, 금</p>
                    </div>
                  </div>

                  <ul className="flex gap-2">
                    <li className="flex items-center gap-2">
                      <span>월</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>화</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>수</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>목</span>
                      <input type="checkbox" checked />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>금</span>
                      <input type="checkbox" checked />
                    </li>
                  </ul>

                  <Link to={`/${Routes.ROUTINE_REPORT}${1}`}>
                    <button className="btn btn-outline btn-sm mt-3">
                      루틴 상세 대시보드
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">습관 목록</h2>
          <ul>
            <li className="card card-bordered card-compact mb-2 shadow-md">
              <div className="card-body">
                <div className="">
                  <div className="card-title text-lg">
                    <h2>물 마시기</h2>
                    <div className="badge badge-sm badge-outline">
                      이번주 30% 완료
                    </div>
                  </div>

                  <p>매주 월/화/수/목/금, 2시간마다 반복</p>

                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <span>월</span>
                      <ul className="flex gap-1">
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                      </ul>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>화</span>
                      <ul className="flex gap-1">
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                      </ul>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>수</span>
                      <ul className="flex gap-1">
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                      </ul>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>목</span>
                      <ul className="flex gap-1">
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          checked
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs checkbox-primary"
                        />
                      </ul>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>금</span>
                      <ul className="flex gap-1">
                        <input
                          type="checkbox"
                          checked
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
                    </li>
                  </ul>
                </div>

                <div className="card-actions">
                  <Link to={`/${Routes.HABIT_REPORT}${1}`}>
                    <button className="btn btn-sm btn-outline">
                      습관 상세 대시보드
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
