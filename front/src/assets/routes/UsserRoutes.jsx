import Aside from "../components/sidebar/Aside";
import { Outlet } from "react-router-dom";

export default function UsserRoutes() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Aside />
        <Outlet />
      </div>
    </>
  );
}
