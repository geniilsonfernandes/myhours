// services/worklogService.ts
import { Session } from "@/types/session";
import axiosInstance from "./axiosInstance";

export interface SessionResponse {
  log: Session;
  day: string;
}

export interface WorkSession extends SessionResponse {}

const ENDPOINT = "/sessions/day";

export const getWorkSession = async (
  day: string,
): Promise<SessionResponse | undefined> => {
  try {
    const { data } = await axiosInstance.get<SessionResponse>(ENDPOINT, {
      params: { day },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
