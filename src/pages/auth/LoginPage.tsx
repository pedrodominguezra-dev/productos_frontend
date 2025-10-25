import { useState } from "react";
import { Loader } from "lucide-react";

import type { AuthState } from "../../types/Auth";
import { toast } from "sonner";
import { handleApiError } from "../../helpers/handleApiErrror";
import { useAuthStore } from "../../store/useAuthStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const intialState = {
  email: "pedro.dominguez@gmail.com",
  password: "password123",
};

export default function LoginPage () {
  const [form, setForm] = useState<AuthState>(intialState);
  const { checkingAuthentication, status, error } = useAuthStore(
    (state) => state
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkingAuthentication({
      email: form.email,
      password: form.password,
    });
  };

  if (error) {
    const message = handleApiError(error);
    toast.error(message);
  }

  const { email, password } = form;

  return (
    <div className="w-full h h-screen flex justify-center items-center bg-gray-100">
      <section className="w-[500px]">
        <header className="text-center">
          <h2 className="font-bold text-3xl text-gray-500">Iniciar sesión</h2>
          <p className="text-gray-600">
            Ingresa tus crendenciales para continuar
          </p>
        </header>
        <form
          className="bg-gray-50 p-5 rounded-lg shadow-md mt-5 w-full"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3 mb-5">
            <Label className="">Correo</Label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="space-y-3 mb-5">
            <Label className="">Contraseña</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <Button
            type="submit"
            disabled={status === "checking"}
            className="w-full cursor-pointer"
          >
            {status === "checking" ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Cargando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
};
