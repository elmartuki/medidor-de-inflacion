import { Navigate, Outlet } from "react-router-dom";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export default function AdminRoutes() {
  const datosUsuario = obtenerDelSessionStorage("datosUsuario");

  const esAdmin = datosUsuario && datosUsuario.rol === "admin";

  if (esAdmin) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/auth"} replace />;
  }
}
