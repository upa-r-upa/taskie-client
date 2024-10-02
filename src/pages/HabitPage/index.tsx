import { useQuery } from "@tanstack/react-query";
import { habitsApi, queryClient } from "../../api/client";
import { formatDate } from "../../utils/time";
import Loading from "../../components/Loading";
import HabitList from "./HabitList";

export default function HabitPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["habits"],
    queryFn: () =>
      habitsApi.getHabitList(formatDate(new Date()), 100, undefined, true),
    refetchIntervalInBackground: true,
    refetchInterval: 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  const fetchData = () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">습관</h1>
      <HabitList fetchData={fetchData} habitList={data?.data || []} />
    </div>
  );
}
