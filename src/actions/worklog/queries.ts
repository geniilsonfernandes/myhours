"use server";

import { prisma } from "@/lib/services/prisma";
import { parseISO } from "date-fns";
import dayjs from "dayjs";

type CreateWorkLogInput = {
  start_week_date: string;
  end_week_date: string;
};

export async function getWeekWorkLogs({
  start_week_date,
  end_week_date,
}: CreateWorkLogInput) {
  const data = await prisma.worklog.findMany({
    where: {
      date: {
        lte: parseISO(end_week_date),
        gte: parseISO(start_week_date),
      },
    },
  });

  const timeZone = "UTC"; // Ou o fuso horário que você deseja usar

  const safeParse = data.map((log) => {
    return {
      ...log,

      date: dayjs(log.date).format("YYYY-MM-DD").toString(),

      updatedAt: log.updated_at.toISOString(),
      createdAt: log.created_at.toISOString(),
    };
  });

  return {
    logs: safeParse,
    start_week_date,
    end_week_date,
  };
}
