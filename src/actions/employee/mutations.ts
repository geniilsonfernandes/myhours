"use server";

import { prisma } from "@/lib/services/prisma";

export async function createEmployee(data: {
  username: string;
  password: string;
  email: string;
}) {
  try {
    await prisma.employee.create({
      data: {
        name: data.username,
        password: data.password,
        email: data.password,
        role: "USER",
        phone: "123456789",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
