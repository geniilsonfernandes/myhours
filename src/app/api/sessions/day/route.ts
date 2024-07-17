import { decrypt } from "@/lib";
import { prisma } from "@/lib/services/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { cookies } from "next/headers";

dayjs.extend(utc);

// const utcDate = toZonedTime(day, "UTC");
// const formattedDate = format(utcDate, "yyyy-MM-dd");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");

  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return Response.json({
      error: "Unauthorized",
    });
  }

  const parsed = await decrypt(session);

  if (!day) {
    return Response.json({
      error: "Missing parameters",
    });
  }

  const response = await prisma.worklog.findMany({
    where: {
      employee_id: parsed.user.id,
      date: {
        gte: new Date(day),
        lte: new Date(day),
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
    log: safeParse[0],
    day: dayjs(day).utc().format("YYYY-MM-DD"),
  });
}
