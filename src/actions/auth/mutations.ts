"use server";

import { signIn, signOut } from "@/auth";

type LoginInput = {
  email: string;
  password: string;
};

export const loginAction = async ({ email, password }: LoginInput) => {
  console.log(email, password);

  const user = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return user;
};

export const logoutAction = async () => {
  const user = await signOut();
  return user;
};
