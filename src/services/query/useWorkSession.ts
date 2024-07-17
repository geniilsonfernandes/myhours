import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getWorkSession, WorkSession } from "../endpoints/workSessionService";
import queryClient from "../http";

type workSessions = {
  day: string;
};

const useWorkSession = ({
  day,
}: workSessions): UseQueryResult<WorkSession | undefined> => {
  return useQuery({
    queryKey: ["worklog", day],
    queryFn: () => getWorkSession(day),
  });
};

export const updateSession = async () => {
  queryClient.invalidateQueries({
    queryKey: ["worklog"],
  });
};

export default useWorkSession;
