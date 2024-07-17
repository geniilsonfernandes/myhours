import { IUser } from "@/types/user";
type LocalStorageUser = {
  getUser: () => IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
};

const localStorageUtil: LocalStorageUser = {
  getUser() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");

      if (user) {
        return JSON.parse(user);
      }

      return null;
    }
  },
  setUser(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem("user");
  },
};

export default localStorageUtil;
