import { Link } from "react-router-dom";

import Routes from "@/constants/routes";
import { RoutinePublic } from "@/api/generated";
import { Button } from "@/components/ui/button";
import RoutineList from "@/components/routine/RoutineList";

interface Props {
  date: Date;
  routineList: Array<RoutinePublic>;
}

export default function RoutineSection({ date, routineList }: Props) {
  return (
    <>
      <RoutineList date={date} routineList={routineList} />

      <Link to={`/${Routes.RoutineCreate}`}>
        <Button variant={"outline"} size="lg" className="mt-4 w-full">
          루틴 추가하러 가기
        </Button>
      </Link>
    </>
  );
}
