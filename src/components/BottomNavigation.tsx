import { NavLink } from "react-router-dom";

import {
  BsHouseDoor,
  BsCheck2Square,
  BsListCheck,
  BsCheck2Circle,
} from "react-icons/bs";
import Routes from "../constants/routes";

export default function BottomNavigation() {
  return (
    <div className="btm-nav static border btm-nav-md">
      <button className="[&:has(.active)]:active">
        <NavLink to={`/${Routes.MAIN}`}>
          <span className="block max-w-max mx-auto text-2xl">
            <BsHouseDoor />
          </span>
          <span className="btm-nav-label">Home</span>
        </NavLink>
      </button>

      <button className="[&:has(.active)]:active">
        <NavLink to={`/${Routes.TODO}`}>
          <span className="block max-w-max mx-auto text-2xl">
            <BsCheck2Square />
          </span>
          <span className="btm-nav-label">Todo</span>
        </NavLink>
      </button>

      <button className="[&:has(.active)]:active">
        <NavLink to={`/${Routes.ROUTINE}`}>
          <span className="block max-w-max mx-auto text-2xl">
            <BsListCheck />
          </span>
          <span className="btm-nav-label">Routine</span>
        </NavLink>
      </button>

      <button className="[&:has(.active)]:active">
        <NavLink to={`/${Routes.HABIT}`}>
          <span className="block max-w-max mx-auto text-2xl">
            <BsCheck2Circle />
          </span>
          <span className="btm-nav-label">Habit</span>
        </NavLink>
      </button>
    </div>
  );
}
