import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/aside.css";

export default function Aside() {
  return (
    <aside>
      <div className="aside-title">
        <p>Admin Panel</p>
      </div>
      <div className="aside-elements">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/admin">Productos</NavLink>
        <NavLink to="/weeks">Semanas</NavLink>
      </div>
    </aside>
  );
}
