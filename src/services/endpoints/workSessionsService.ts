// services/worklogService.ts
import { Session } from "@/types/session";
import axiosInstance from "./axiosInstance";

export interface SessionsResponse {
  logs: Session[];
  range: SessionsRange;
}

export interface SessionsRange {
  from: string;
  to: string;
}

export interface WorkSession {
  logs: Record<string, Session>;
  range: SessionsRange;
}


const ENDPOINT = "/sessions/range";

function tranformResponse(response: SessionsResponse) {
  const { logs, range } = response;
  const dates: Record<string, Session> = {};
  logs.forEach((log) => {
    if (!dates[log.date]) {
      dates[log.date] = log;
    }
  });
  return { logs: dates, range };
}

export const getWorkSessions = async (
  from: string,
  to: string,
  user_id?: string,
): Promise<WorkSession | undefined> => {
  try {
    const { data } = await axiosInstance.get<SessionsResponse>(ENDPOINT, {
      params: { from, to, user_id },
    });

    return tranformResponse(data);
  } catch (error) {
    throw error;
  }
};
