"use server";

import { prisma } from "@/lib/services/prisma";
import bcrypt from "bcrypt";

type CreateEmployeeInput = {
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "USER";
  phone: string;
  daily_work_hours: number;
  daily_work_minutes: number;
};

export async function createEmployee(data: CreateEmployeeInput) {
  try {
    const password = await bcrypt.hash(data.password, 10);

    await prisma.employee.create({
      data: {
        email: data.email,
        name: data.name,
        password: password,
        role: data.role,
        phone: data.phone,
        daily_work_hours: data.daily_work_hours,
        daily_work_minutes: data.daily_work_minutes,
      },
    });
  } catch (error) {}
}

