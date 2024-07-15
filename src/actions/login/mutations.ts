"use server";

import { encrypt } from "@/lib";
import { prisma } from "@/lib/services/prisma";
import { LoginError } from "@/shared/erros";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginInput = {
  email: string;
  password: string;
};

export async function loginAction({ email, password }: LoginInput) {
  try {
    const finduser = await prisma.employee.findFirst({
      where: {
        email,
      },
    });

    if (!finduser) {
      throw new LoginError("Email ou senha inválidos");
    }

    const comparePassword = await bcrypt.compare(password, finduser.password);

    if (!comparePassword) {
      throw new LoginError("Email ou senha inválidos");
    }

    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({
      user: {
        id: finduser.id,
        name: finduser.name,
        email: finduser.email,
        role: finduser.role,
      },
      expires,
    });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    return {
      user: {
        id: finduser.id,
        name: finduser.name,
        email: finduser.email,
        role: finduser.role,
        daily_work_hours: finduser.daily_work_hours,
        daily_work_minutes: finduser.daily_work_minutes,
      },
    };
  } catch (error) {
    throw new LoginError("Email ou senha inválidos");
  }
  redirect("/");
}

export const logoutAction = async () => {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/login");
};
