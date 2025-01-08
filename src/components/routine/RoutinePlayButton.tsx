import { BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Routes from "@/constants/routes";

interface Props {
  routineId: number;
}

export default function RoutinePlayButton({ routineId }: Props) {
  return (
    <Link to={`/${Routes.RoutinePlay}${routineId}`}>
      <button className="btn btn-sm btn-circle btn-outline btn-primary">
        <BsFillPlayFill />
      </button>
    </Link>
  );
}
