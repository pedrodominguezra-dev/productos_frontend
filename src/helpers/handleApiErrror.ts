import type { ApiErrorResponse } from "@/types/Axios";
import type { AxiosError } from "axios";

export function handleApiError(err: AxiosError<ApiErrorResponse>): string {
  const status = err.response?.status;
  const data = err.response?.data;

  let message = "Ha sucedido un error al registrar la información.";

  switch (status) {
    case 401:
      message = data?.error || "No autenticado, por favor inicia sesión.";
      break;
    case 403:
      message =
        typeof data?.message === "object"
          ? data.message.message ||
            "Acceso restringido, no tienes permisos para realizar esta acción."
          : (data?.message as string) || "Acceso restringido.";
      break;
    case 422:
      message =
        typeof data?.message === "object"
          ? data.message.message || "Existen errores en la información."
          : (data?.message as string) || "Existen errores en la información.";
      break;
    case 500:
      message =
        typeof data?.message === "object"
          ? data.message.error || "Error interno del servidor."
          : (data?.message as string) || "Error interno del servidor.";
      break;
  }

  return message;
}
