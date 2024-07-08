import { prisma } from "@/lib/services/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return Response.json({
      error: "Missing parameters",
    });
  }

  const range = {
    from: new Date(from),
    to: new Date(to),
  };

  const response = await prisma.worklog.findMany({
    where: {
      date: {
        gte: range.from,
        lte: range.to,
      },
    },
  });

  const safeParse = response.map((log) => {
    return {
      ...log,
      date: dayjs(log.date).utc().format("YYYY-MM-DD"),
      updatedAt: log.updated_at.toISOString(),
      createdAt: log.created_at.toISOString(),
    };
  });

  return Response.json({
    logs: safeParse,
    range,
  });
}
