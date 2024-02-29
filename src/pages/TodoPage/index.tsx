import { BsPlusLg, BsTrash } from "react-icons/bs";

export default function TodoPage() {
  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold mb-3">투두 목록</h1>

      <div className="container mb-5">
        <input
          type="text"
          placeholder="검색"
          className="input input-bordered w-full mb-2 input-sm"
        />
        <div className="flex">
          <input
            type="date"
            className="input input-bordered w-full mb-2 mr-2 input-sm"
          />
          <input
            type="date"
            className="input input-bordered w-full mb-2 input-sm"
          />
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">오늘의 투두</h2>
        <ul>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>

          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>

          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">내일 할 일</h2>
        <ul>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>

          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">3월 9일</h2>

        <ul>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">3월 11일</h2>

        <ul>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" />
            <span className="label-text pl-2 flex-1">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">완료한 투두</h2>

        <ul>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" checked />
            <span className="label-text pl-2 flex-1 line-through">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
          <li className="mb-2 flex items-center">
            <input type="checkbox" className="checkbox" checked />
            <span className="label-text pl-2 flex-1 line-through">
              영어 문법 공부 10분 진행하기
            </span>
            <BsTrash />
          </li>
        </ul>
      </div>

      <button className="btn btn-circle btn-md btn-primary absolute right-0 top-0 shadow-lg">
        <BsPlusLg />
      </button>
    </div>
  );
}
