"use client";

import { IUser } from "@/types/user";
import { create } from "zustand";
import localStorageUtil from "./localStorageUtil";
type State = {
  user: IUser | null;
};

type Action = {
  setUser: (user: IUser) => void;
  logout: () => void;
};

const authStore = create<State & Action>((set) => ({
  user: null,
  setUser: (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

if (typeof window !== "undefined") {
  const user = localStorageUtil.getUser();

  if (user) {
    authStore.setState({ user });
  }
}

export default authStore;
