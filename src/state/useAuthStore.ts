import { create } from "zustand";

import { UserData } from "@/api/generated";

interface AuthState {
  token: string | null;
  user: UserData | null;

  isAccessTokenRefreshing: boolean;

  getIsLoggedIn: () => boolean;
  setToken: (value: string | null) => void;
  setTokenWithUser: (token: string, user: UserData) => void;
  setUser: (value: UserData | null) => void;
  setIsAccessTokenRefreshing: (value: boolean) => void;

  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAccessTokenRefreshing: true,

  getIsLoggedIn: () => !!get().token,
  setToken: (value) => set(() => ({ token: value })),
  setUser: (value) => set(() => ({ user: value })),
  setTokenWithUser: (token, user) => set(() => ({ token, user })),
  setIsAccessTokenRefreshing: (value) =>
    set(() => ({ isAccessTokenRefreshing: value })),
  clearAuthState: () =>
    set(() => ({ token: null, user: null, isAccessTokenRefreshing: false })),
}));
