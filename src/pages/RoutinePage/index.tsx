import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { routineApi } from "@/api/client";
import RoutineList from "@/components/routine/RoutineList";
import { Button } from "@/components/ui/button";
import Routes from "@/constants/routes";

import RoutineSkeleton from "./RoutineSkeleton";

export default function RoutinePage() {
  const [date] = useState<Date>(() => new Date());

  const { isLoading, data } = useQuery({
    queryKey: ["routines"],
    queryFn: () => routineApi.getRoutineList(),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-3xl mb-2 font-bold tracking-tight">루틴</h2>

      <Link to={`/${Routes.RoutineCreate}`}>
        <Button
          className="w-max mt-2 mb-4 flex items-center "
          variant="outline"
        >
          <PlusIcon />
          루틴 추가하러 가기
        </Button>
      </Link>

      {isLoading ? (
        <RoutineSkeleton />
      ) : (
        <RoutineList date={date} routineList={data?.data || []} />
      )}
    </div>
  );
}
