"use server";

import { prisma } from "@/lib/services/prisma";

export type CreateOrUpdateWorkLogInput = {
  employee_id: string;
  date_id: string;
  start_time: number;
  end_time: number;
  break_start: number;
  break_end: number;
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
    throw new Error("Failed to create or update work log");
  }
}

type PatchWorkLogInput = {
  key_id: "start_time" | "end_time" | "break_start" | "break_end";
  value: number;
  date_id: string;
  log_id?: string;
  user_id?: string;
};
export async function patchWorkLog({
  key_id,
  value,
  date_id,
  log_id,
  user_id,
}: PatchWorkLogInput) {
  try {
    const logAlreadyExists = await prisma.worklog.findFirst({
      where: {
        OR: [
          {
            id: log_id || "",
          },
          {
            date: new Date(date_id).toISOString(),
            employee_id: user_id,
          },
        ],
      },
    });

    if (!logAlreadyExists) {
      await prisma.worklog.create({
        data: {
          date: new Date(date_id).toISOString(),
          [key_id]: value,
          employee: {
            connect: {
              id: user_id,
            },
          },
        },
      });
      return {
        message: "Log criado com sucesso",
      };
    }

    await prisma.worklog.update({
      where: {
        id: logAlreadyExists.id || log_id,
      },
      data: {
        [key_id]: value,
      },
    });

    return {
      message: "Log atualizado com sucesso",
    };
  } catch (error) {
    throw new Error("Failed to patch work log");
  }
}