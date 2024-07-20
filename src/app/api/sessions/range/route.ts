import { decrypt } from "@/lib";
import { prisma } from "@/lib/services/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { cookies } from "next/headers";

dayjs.extend(utc);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const user_id = searchParams.get("user_id");

  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return Response.json({
      error: "Unauthorized",
    });
  }

  const parsed = await decrypt(session);

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
      employee_id: user_id ? user_id : parsed.user.id,
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
