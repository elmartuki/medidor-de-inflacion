import { Route, Routes } from "react-router-dom";
import InitPage from "../pages/InitPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import WeeksPage from "../pages/WeeksPage";
import UsserRoutes from "./UsserRoutes";
import AdminRoutes from "./AdminRoutes";
import Aside from "../components/sidebar/Aside";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />

      <Route path="/" element={<UsserRoutes />}>
        <Route index element={<InitPage />} />

        <Route element={<AdminRoutes />}>
          <Route
            path="admin"
            element={
              <>
                <AdminPage />
              </>
            }
          />

          <Route
            path="weeks"
            element={
              <>
                <WeeksPage />
              </>
            }
          />
        </Route>

        <Route path="*" element={<h1>404 Página no encontrada</h1>} />
      </Route>
    </Routes>
  );
}
