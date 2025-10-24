import { create } from "zustand";
import type { AuthStateStore } from "../types/Auth";
import apiClient from "../api/apiProducts";

//  Creación del store
export const useAuthStore = create<AuthStateStore>((set) => ({
  status: "not-authenticated",
  user: null,
  error: null,

  checkingAuthentication: async ({ email, password }) => {
    set({ status: "checking" });
    try {
      const { data } = await apiClient.post("/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.data.token);
      set({ status: "authenticated", user: data.data.user, error: null });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      set({ status: "not-authenticated", user: null, error });
    }
  },

  checkAuthToken: async () => {
    const token = localStorage.getItem("token");
    console.log({ token });
    if (!token) {
      set({ status: "not-authenticated", user: null });
      return;
    }
    set({ status: "checking" });    
    try {
      const { data } = await apiClient.get("/user");
      localStorage.setItem("token", data.data.token);
      set({ status: "authenticated", user: data.data.user, error: null });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      set({ status: "not-authenticated", user: null, error });
    }
  },

  logout: () => {
    console.log("logout llamado");
    localStorage.removeItem("token");
    set({ status: "not-authenticated", user: null });
  },
}));
