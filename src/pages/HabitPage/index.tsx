import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { habitsApi, queryClient } from "@/api/client";
import { formatDate } from "@/utils/time";
import Loading from "@/components/Loading";

import HabitList from "./HabitList";

const fetchHabitList = (date: Date) => {
  const today = formatDate(date);
  return habitsApi.getHabitList(today, 100, undefined, true);
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
    <div>
      <h1 className="text-2xl font-semibold mb-3">습관</h1>
      <HabitList
        reloadHabitList={invalidateQueries}
        isLoading={isLoading}
        habitList={data?.data || []}
        date={date}
      />
    </div>
  );
}
