import { Navigate, Outlet } from "react-router-dom";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export default function AdminRoutes() {
  const isAdmin = obtenerDelSessionStorage("accessKey");

  if (isAdmin?.puedeIngresar === true) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/auth"} replace />;
  }
}
