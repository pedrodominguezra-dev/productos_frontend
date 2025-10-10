import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-70 z-50">
      <Loader2 className="animate-spin text-dark w-12 h-12 mb-4" />
      <p className="text-dark text-lg font-medium">Cargando...</p>
    </div>
  );
};
