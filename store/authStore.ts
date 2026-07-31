import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  emailOrMobile: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;

  division: string;
  district: string;
  area: string;
  address: string;
}

interface AuthStore {
  user: User | null;

  isLoggedIn: boolean;

  login: (user: User) => void;
  logout: () => void;

  updateProfile: (profile: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user: User) =>
        set({
          user,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      updateProfile: (profile: Partial<User>) =>
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
