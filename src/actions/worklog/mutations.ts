"use server";

import { prisma } from "@/lib/services/prisma";

export type CreateOrUpdateWorkLogInput = {
  employee_id: string;
  date_id: string;
  start_time: number;
  end_time: number;
  break_start: number;
  break_end: number;
  total_working_hours: number;
  id?: string;
};

export async function createWorkLog(data: CreateOrUpdateWorkLogInput) {
  try {
    const findedLog = await prisma.worklog.findFirst({
      where: {
        employee_id: data.employee_id,
        date: new Date(data.date_id).toISOString(),
      },
    });

    console.log(findedLog, "findedLog");

    const workLog = await prisma.worklog.upsert({
      where: {
        id: findedLog?.id || "",
        date: new Date(data.date_id).toISOString(),
        employee_id: data.employee_id,
      },
      update: {
        start_time: data.start_time,
        end_time: data.end_time,
        break_start: data.break_start,
        break_end: data.break_end,
        total_working_hours: data.total_working_hours,
        employee: {
          connect: {
            id: data.employee_id,
          },
        },
      },
      create: {
        start_time: data.start_time,
        end_time: data.end_time,
        break_start: data.break_start,
        break_end: data.break_end,
        total_working_hours: 100,
        date: new Date(data.date_id).toISOString(),
        employee: {
          connect: {
            id: data.employee_id,
          },
        },
      },
    });

    return workLog;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create or update work log");
  }
}
