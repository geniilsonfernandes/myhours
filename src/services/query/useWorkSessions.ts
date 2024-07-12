import { useQuery } from "@tanstack/react-query";
import { getWorkSessions } from "../endpoints/workSessionsService";
import queryClient from "../http";

type workSessions = {
  from: string;
  to: string;
};

const useWorkSessions = (selectedWeek: workSessions) => {
  return useQuery({
    queryKey: ["worklog", selectedWeek.from],
    queryFn: () => getWorkSessions(selectedWeek.from, selectedWeek.to),
  });
};

export const updateSessions = async () => {
  queryClient.invalidateQueries({
    queryKey: ["worklog"],
  });
};

export default useWorkSessions;
