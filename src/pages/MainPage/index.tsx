import todoList from "../../mock/todo";
import routineList from "../../mock/routine";
import habitList from "../../mock/habit";

import TodoSection from "./TodoSection";
import HabitSection from "./HabitSection";
import RoutineSection from "./RoutineSection";

function MainPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-3">오늘 하루</h1>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">투두</h2>
        <ul>
          <TodoSection todoList={todoList} />
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">습관</h2>
        <ul>
          <HabitSection habitList={habitList} />
        </ul>
      </div>

      <div className="container mb-5">
        <h2 className="text-xl mb-2">루틴</h2>
        <ul>
          <RoutineSection routineList={routineList} />
        </ul>
      </div>
    </>
  );
}

export default MainPage;
