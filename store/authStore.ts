import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;

  // Authentication / account
  email?: string;
  mobile?: string;

  // Profile
  fullName?: string;
  gender?: string;
  birthDate?: string;

  // Address
  division?: string;
  district?: string;
  area?: string;
  address?: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      login: (token, user) =>
        set({
          token,
          user,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isLoggedIn: false,
        }),

      updateProfile: (profile) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...profile,
              }
            : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
