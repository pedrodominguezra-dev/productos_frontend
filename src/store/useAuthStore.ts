import { create } from "zustand";
import type { AuthStateStore } from "../types/Auth";
import apiClient from "../api/apiProducts";
import { handleApiError } from "@/helpers/handleApiErrror";
import { AxiosError } from "axios";

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
      localStorage.setItem("token", data.data.token);
      set({ status: "authenticated", user: data.data.user, error: null });
    } catch (error: unknown) {
      let message =
        "Ha sucedido un error inesprado al verificar las credenciales";
      if (error instanceof AxiosError) {
        message = handleApiError(error);
      }

      localStorage.removeItem("token");
      set({ status: "not-authenticated", user: null, error: message });
    }
  },

  checkAuthToken: async () => {
    const token = localStorage.getItem("token");
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
      let message = "Ha sucedido un error inesperado al comprobar la sesión";
      if (error instanceof AxiosError) {
        message = handleApiError(error);
      }
      localStorage.removeItem("token");
      set({ status: "not-authenticated", user: null, error: message });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ status: "not-authenticated", user: null });
  },
}));
