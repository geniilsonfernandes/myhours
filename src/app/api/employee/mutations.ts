"use server";

import { prisma } from "@/lib/services/prisma";

export async function createEmployee(data: {
  username: string;
  password: string;
}) {
  try {
    console.log(data);

    await prisma.employee.create({
      data: {
        name: data.username,
        email: data.password,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
