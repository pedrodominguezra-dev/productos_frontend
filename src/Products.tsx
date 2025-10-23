import { BrowserRouter } from "react-router";
import { AppRoute } from "./router/AppRoute";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Loading } from "./components/Loading";

export const Products = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AppRoute />
        <Toaster position="top-center" richColors />
      </Suspense>
    </BrowserRouter>
  );
};
