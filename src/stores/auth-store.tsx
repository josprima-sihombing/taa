import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserDetail } from "@/repositories/user/user-repository";

type User = Pick<UserDetail, "id" | "username" | "email"> & {
  token: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
