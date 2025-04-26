import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface User {
  email: string;
}

interface UserState {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get, api) => ({
      user: null,
      error: null,

      login: (email) => {
        set({ user: { email } });
      },

      logout: () => {
        set({ user: null });
        api.persist.clearStorage();
      },
    }),
    {
      name: 'user-storage',
    }
  )
);