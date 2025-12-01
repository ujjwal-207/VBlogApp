import { create } from "zustand";
import { apiClient } from "@/lib/api";
import Cookies from "js-cookie";

interface AuthStore {
  user: any | null;
  token: string | null;
  loading: boolean;
  isInitialized: boolean; 
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const getInitialToken = () => {
  if (typeof window === 'undefined') return null;
  return Cookies.get("token") || localStorage.getItem("token");
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: getInitialToken(),
  loading: false,
  isInitialized: false,

  login: async (email, password) => {
    try {
      set({ loading: true });
      const res = await apiClient.post("/auth/login", { email, password });
      if (res.token) {
        Cookies.set("token", res.token, { 
          expires: 7,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production'
        });
        localStorage.setItem("token", res.token);
        set({ user: res.user, token: res.token, loading: false, isInitialized: true });
        return true;
      }
      set({ loading: false });
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      set({ loading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true });
      const res = await apiClient.post("/auth/register", {
        name,
        email,
        password,
      });
      if (res.token) {
        Cookies.set("token", res.token, { 
          expires: 7,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        });
        localStorage.setItem("token", res.token);
        set({ user: res.user, token: res.token, loading: false, isInitialized: true });
        return true;
      }
      set({ loading: false });
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    Cookies.remove("token",{ path: '/' });
    set({ user: null, token: null, isInitialized: true });
  },

  checkAuth: async () => {
    const savedToken = Cookies.get("token") || localStorage.getItem("token");
    
    if (savedToken) {
      set({ token: savedToken, isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },
}));
