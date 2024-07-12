"use client";

import { IUser } from "@/types/user";
import { create } from "zustand";
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
  authStore.setState({
    user: JSON.parse(localStorage.getItem("user") || "{}"),
  });
}

export default authStore;
