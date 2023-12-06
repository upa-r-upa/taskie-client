import { BsFillPlayFill } from "react-icons/bs";

const hobbies = ["습관 1", "습관 2", "습관 3"];

const todos = ["투두 1", "투두 2", "투두 3"];

const routines = ["루틴 1", "루틴 2", "루틴 3"];

function MainPage() {
  const renderRoutines = (list: Array<string>) => {
    return list.map((routine: string, index: number) => (
      <li key={index} className="border px-2 py-2 border-slate-300 mb-2">
        <div className="flex items-center">
          <h2 className="mr-3">{routine}</h2>
          <button className="btn btn-sm btn-circle text-2xl">
            <BsFillPlayFill />
          </button>
        </div>
      </li>
    ));
  };

  const renderTodos = (list: Array<string>) => {
    return list.map((todo, index) => {
      return (
        <li key={index} className="mb-2">
          <label className="flex items-center">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="label-text pl-2">{todo}</span>
          </label>
        </li>
      );
    });
  };

  const renderDoneTodos = (list: Array<string>) => {
    return list.map((todo, index) => {
      return (
        <li key={index} className="mb-2">
          <label className="flex items-center">
            <input type="checkbox" checked className="checkbox checkbox-sm" />
            <span className="label-text pl-2 line-through">{todo}</span>
          </label>
        </li>
      );
    });
  };

  return (
    <>
      <div className="font-sans">
        <div className="container mx-auto max-w-md px-2 py-2">
          <div className="container mb-7">
            <h1 className="text-xl font-semibold">루틴 목록</h1>

            <ul className="mt-2">{renderRoutines(routines)}</ul>
          </div>

          <div className="container mb-5">
            <h1 className="text-xl font-semibold">습관 목록</h1>
            <div className="mt-2 px-2">
              <ul>{renderTodos(hobbies)}</ul>
            </div>
          </div>

          <div className="container mb-5">
            <h1 className="text-xl font-semibold">할 일 목록</h1>
            <div className="mt-2 px-2">
              <ul>{renderTodos(todos)}</ul>
            </div>
          </div>

          <div className="container ">
            <h1 className="text-xl font-semibold">완료된 일정 목록</h1>
            <div className="mt-2 px-2">
              <ul>{renderDoneTodos(todos)}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
