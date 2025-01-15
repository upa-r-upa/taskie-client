import { Link } from "react-router-dom";

import Routes from "@/constants/routes";
import { cn } from "@/lib/utils";

export default function MainNavigation() {
  return (
    <div className="mr-4 flex px-4">
      <Link to={Routes.Main} className="mr-4 lg:mr-6">
        <span className="font-bold">TASKIE</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          to={Routes.Todo}
          className={cn("transition-colors hover:text-foreground/80")}
        >
          할 일
        </Link>
        <Link
          to={Routes.Routine}
          className={cn("transition-colors hover:text-foreground/80")}
        >
          루틴
        </Link>
        <Link
          to={Routes.Habit}
          className={cn("transition-colors hover:text-foreground/80")}
        >
          습관
        </Link>
      </nav>
    </div>
  );
}
