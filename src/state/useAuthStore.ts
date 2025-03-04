import { create } from "zustand";

import { UserData } from "@/api/generated";

interface AuthState {
  token: string | null;
  user: UserData | null;

  isAccessTokenRefreshing: boolean;

  getIsLoggedIn: () => boolean;
  setToken: (token: string | null) => void;
  setUser: (value: UserData | null) => void;
  setIsAccessTokenRefreshing: (value: boolean) => void;

  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAccessTokenRefreshing: true,

  setToken: (token) => set(() => ({ token: token })),
  getIsLoggedIn: () => !!get().user,
  setUser: (value) => set(() => ({ user: value })),
  setIsAccessTokenRefreshing: (value) =>
    set(() => ({ isAccessTokenRefreshing: value })),
  clearAuthState: () =>
    set(() => ({ user: null, isAccessTokenRefreshing: false })),
}));
