import { useAuthStore } from "../store/useAuthStore";
import { Button } from "./ui/button";

export const Header = () => {
  const { logout } = useAuthStore();
  return (
    <header className="w-full p-4 border-b border-b-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h2 className="font-semibold text-xl">Productos</h2>

        <Button variant="outline" size="sm" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
