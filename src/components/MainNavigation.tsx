import { Link, NavLink } from "react-router-dom";

import Routes from "@/constants/routes";
import { cn } from "@/lib/utils";

export default function MainNavigation() {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return cn(
      "transition-colors hover:text-foreground/80",
      isActive ? "text-foreground" : "text-muted-foreground/70"
    );
  };

  return (
    <div className="mr-4 flex">
      <Link to={Routes.Main} className="mr-4 lg:mr-6">
        <span className="font-bold">TASKIE</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <NavLink
          to={Routes.Todo}
          className={({ isActive }) => getLinkClassName({ isActive })}
        >
          할일
        </NavLink>
        <NavLink
          to={Routes.Routine}
          className={({ isActive }) => getLinkClassName({ isActive })}
        >
          루틴
        </NavLink>
        <NavLink
          to={Routes.Habit}
          className={({ isActive }) => getLinkClassName({ isActive })}
        >
          습관
        </NavLink>
      </nav>
    </div>
  );
}
