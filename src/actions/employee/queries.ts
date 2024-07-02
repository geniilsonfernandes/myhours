"use server";

import { prisma } from "@/lib/services/prisma";

export async function getEmployees() {
  const data = await prisma.employee.findMany();

  return data;
}
