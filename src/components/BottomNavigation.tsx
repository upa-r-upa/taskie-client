import { NavLink } from "react-router-dom";
import {
  BsHouseDoor,
  BsCheck2Square,
  BsListCheck,
  BsCheck2Circle,
} from "react-icons/bs";

import Routes from "@/constants/routes";

const NavigationList = [
  {
    to: `/${Routes.Main}`,
    icon: <BsHouseDoor />,
    label: "Home",
  },
  {
    to: `/${Routes.Todo}`,
    icon: <BsCheck2Square />,
    label: "Todo",
  },
  {
    to: `/${Routes.Routine}`,
    icon: <BsListCheck />,
    label: "Routine",
  },
  {
    to: `/${Routes.Habit}`,
    icon: <BsCheck2Circle />,
    label: "Habit",
  },
];

function NavigationItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button aria-label={label} className="[&:has(.active)]:active">
      <NavLink
        to={to}
        className={"flex flex-col items-center justify-center text-gray-500"}
      >
        <span className="block max-w-max mx-auto text-lg">{icon}</span>
        <span className="btm-nav-label text-sm">{label}</span>
      </NavLink>
    </button>
  );
}

export default function BottomNavigation() {
  return (
    <div className="btm-nav btm-nav-sm root-content">
      {NavigationList.map(({ to, icon, label }) => (
        <NavigationItem key={to} to={to} icon={icon} label={label} />
      ))}
    </div>
  );
}
