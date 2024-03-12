// import { Habit } from "../../types/habit";

import { Link } from "react-router-dom";

import Routes from "../../constants/routes";

// import habitList from "../../mock/habit";

export default function HabitPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">습관과 반복 일정</h1>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">하루 습관</h2>
        <ul>
          <li className="card card-bordered card-compact mb-2 shadow-md">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>물 마시기</h2>
                  <div className="badge badge-outline badge-primary badge-sm">
                    오늘
                  </div>
                </div>

                <p>매주 월/화/수/목/금, 2시간마다 반복</p>

                <div className="mt-2">
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
                  <p className="text-primary text-xs">
                    오늘 총 6번 중 5번 완료
                  </p>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-primary">수행하기</button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <Link to={`/${Routes.HABIT_REPORT}${1}`}>
                  <button className="btn btn-sm btn-info btn-outline">
                    대시보드
                  </button>
                </Link>
              </div>
            </div>
          </li>

          <li className="card card-bordered card-compact mb-2 shadow-md">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>목 스트레칭 해주기</h2>
                  <div className="badge badge-outline badge-primary badge-sm">
                    오늘
                  </div>
                </div>

                <p>매주 월/화/수/목/금, 2시간마다 반복</p>

                <div className="mt-2">
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
                  <p className="text-primary text-xs">
                    오늘 총 6번 중 5번 완료
                  </p>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-primary">수행하기</button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>

          <li className="card card-bordered card-compact mb-2">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>컨퍼런스 일정 확인하기</h2>
                </div>

                <p>매주 토/일 5시간마다 반복</p>
                <p className="text-primary text-xs mt-2">
                  오늘은 수행 날이 아니에요.
                </p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-outline">수정하기</button>
              </div>
            </div>
          </li>

          <li className="card card-bordered card-compact mb-2">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>강아지 스트레칭 시키기</h2>
                </div>

                <p>매주 토/일 8시간마다 반복</p>

                <p className="text-primary text-xs mt-2">
                  오늘은 수행 날이 아니에요.
                </p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">반복 일정</h2>
        <ul>
          <li className="card card-bordered card-compact mb-2 shadow-md">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>오븐 닦기</h2>
                  <div className="badge badge-outline badge-primary badge-sm">
                    오늘
                  </div>
                </div>
                <p className="text-primary text-sm">아직 완료되지 않았어요.</p>

                <p>2주에 한 번, 오전 9시에 수행해요.</p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-primary">수행하기</button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>

          <li className="card card-bordered card-compact mb-2 shadow-md">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>전자레인지 닦기</h2>
                  <div className="badge badge-outline badge-sm badge-primary">
                    오늘
                  </div>
                  <div className="badge badge-outline badge-sm badge-error">
                    +3일 경과
                  </div>
                </div>
                <p className="text-primary text-sm">아직 완료되지 않았어요.</p>

                <p>2주에 한 번, 오전 9시에 수행해요.</p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-primary">수행하기</button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>

          <li className="card card-bordered card-compact mb-2">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>옷장 정리하기</h2>
                </div>

                <p className="text-primary text-sm mb-2">
                  완료했어요!
                  <br />
                  <span className="font-bold">다음 반복은 3일 뒤에요. </span>
                </p>

                <p>한달에 한 번, 오후 10시에 수행해요.</p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-outline btn-primary">
                  일찍 수행하기
                </button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>
          <li className="card card-bordered card-compact mb-2">
            <div className="card-body">
              <div className="">
                <div className="card-title text-lg">
                  <h2>차 세차하기</h2>
                </div>

                <p className="text-primary text-sm mb-2">
                  완료했어요!
                  <br />
                  <span className="font-bold">다음 반복은 2주 뒤에요. </span>
                </p>

                <p>2주에 한 번, 오후 6시에 수행해요.</p>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-outline btn-primary">
                  일찍 수행하기
                </button>
                <button className="btn btn-sm btn-outline">수정하기</button>
                <button className="btn btn-sm btn-info btn-outline">
                  대시보드
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
