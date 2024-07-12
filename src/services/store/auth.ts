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

const getUser = JSON.parse(localStorage.getItem("user") || "{}");
authStore.setState({ user: getUser });

export default authStore;
