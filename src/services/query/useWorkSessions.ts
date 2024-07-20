import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWorkSessions, WorkSession } from "../endpoints/workSessionsService";
import queryClient from "../http";

type workSessions = {
  from: string;
  to: string;
  user_id?: string;
};

const useWorkSessions = (
  selectedWeek: workSessions,
): UseQueryResult<WorkSession | undefined> => {
  return useQuery({
    queryKey: ["worklog", selectedWeek.from],
    queryFn: () =>
      getWorkSessions(selectedWeek.from, selectedWeek.to, selectedWeek.user_id),
  });
};

export const updateSessions = async () => {
  queryClient.invalidateQueries({
    queryKey: ["worklog"],
  });
};

export default useWorkSessions;
