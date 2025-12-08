import Nav from "../components/navbar/Nav";
import Aside from "../components/sidebar/Aside";
import { Outlet } from "react-router-dom";

export default function UsserRoutes() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Nav />
        <Aside />
        <Outlet />
      </div>
    </>
  );
}
