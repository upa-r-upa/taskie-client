import { create } from "zustand";

import { UserData } from "@/api/generated";

interface AuthState {
  user: UserData | null;

  isAccessTokenRefreshing: boolean;

  getIsLoggedIn: () => boolean;
  setUser: (value: UserData | null) => void;
  setIsAccessTokenRefreshing: (value: boolean) => void;

  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAccessTokenRefreshing: true,

  getIsLoggedIn: () => !!get().user,
  setUser: (value) => set(() => ({ user: value })),
  setIsAccessTokenRefreshing: (value) =>
    set(() => ({ isAccessTokenRefreshing: value })),
  clearAuthState: () =>
    set(() => ({ user: null, isAccessTokenRefreshing: false })),
}));
