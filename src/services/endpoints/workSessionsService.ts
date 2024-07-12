// services/worklogService.ts
import axiosInstance from "./axiosInstance";

export interface SessionsResponse {
  logs: Sessions[];
  range: SessionsRange;
}

export interface Sessions {
  id: string;
  date: string;
  start_time: number;
  end_time?: number;
  break_start: number;
  break_end?: number;
  total_working_hours: number;
  created_at: string;
  updated_at: string;
  employee_id: string;
  updatedAt: string;
  createdAt: string;
}

export interface SessionsRange {
  from: string;
  to: string;
}

export interface WorkSession {
  logs: Record<string, Sessions>;
  range: SessionsRange;
}

export const getWorkSessions = async (
  from: string,
  to: string,
): Promise<WorkSession | undefined> => {
  try {
    const { data } = await axiosInstance.get<SessionsResponse>("/worklog", {
      params: { from, to },
    });

    const dates: Record<string, Sessions> = {};
    data.logs.forEach((log) => {
      if (!dates[log.date]) {
        dates[log.date] = log;
      }
    });

    return { logs: dates, range: data.range };
  } catch (error) {
    throw error;
  }
};
