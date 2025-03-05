import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { habitsApi, queryClient } from "@/api/client";
import { formatDate } from "@/utils/time";
import { Skeleton } from "@/components/ui/skeleton";

import HabitList from "./HabitList";

const fetchHabitList = (date: Date) => {
  const today = formatDate(date);
  return habitsApi.getHabitList(today);
};

const invalidateQueries = () => {
  queryClient.invalidateQueries({
    queryKey: ["tasks"],
  });
  queryClient.invalidateQueries({
    queryKey: ["habits"],
  });
};

export default function HabitPage() {
  const [date] = useState(() => new Date());
  const { isLoading, data } = useQuery({
    queryKey: ["habits"],
    queryFn: () => fetchHabitList(date),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="text-3xl mb-2 tracking-tight">습관</h2>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <HabitList
          date={date}
          reloadHabitList={invalidateQueries}
          habitList={data?.data || []}
        />
      )}
    </div>
  );
}
