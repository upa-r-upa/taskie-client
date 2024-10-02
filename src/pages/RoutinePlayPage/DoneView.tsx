import { NavLink } from "react-router-dom";
import Routes from "../../constants/routes";
import { RoutinePublic } from "../../api/generated";

interface Props {
  routine: RoutinePublic;

  goToInitialStep: () => void;
}

export default function DoneView({ routine, goToInitialStep }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        <span>{routine.title} 루틴을 완료했어요.</span>
      </h1>

      <div className="mt-4">
        <p className="text-lg">
          루틴 진행률 <br />
          <span className="font-bold text-xl">100%</span>
        </p>
        <progress className="progress w-4/6 shadow-sm" value={100} max="100" />
        <p className="text-lg mt-2">
          진행 시간 <br />
          <span className="font-bold text-xl">35분 05초</span>
        </p>

        <button
          onClick={goToInitialStep}
          className="mt-4 btn w-full btn-primary"
        >
          다시 진행하기
        </button>

        <NavLink to={`/${Routes.MAIN}`}>
          <button className="mt-4 btn w-full btn-primary btn-outline">
            홈으로
          </button>
        </NavLink>
      </div>
    </div>
  );
}
