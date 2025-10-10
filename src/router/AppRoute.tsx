import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../pages/auth/LoginPage";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { ProductsPage } from "../pages/products/ProductsPage";

export const AppRoute = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Loading />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/*" element={<Navigate to={"/products"} />} />
        </>
      ) : (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
