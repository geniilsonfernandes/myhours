import { updateSession } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: "/dashboard/:path*",
};
