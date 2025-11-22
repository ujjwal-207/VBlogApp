import { create } from "zustand";
import { apiClient } from "@/lib/api";

interface AuthStore {
  user: any | null;
  token: string | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loading: true,

  login: async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      set({ user: res.user, token: res.token });
      return true;
    }

    return false;
  },

  register: async (name, email, password) => {
    const res = await apiClient.post("/auth/register", {
      name,
      email,
      password,
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      set({ user: res.user, token: res.token });
      return true;
    }

    return false;
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  checkAuth: () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      set({ token: savedToken });
    }
    set({ loading: false });
  },
}));

