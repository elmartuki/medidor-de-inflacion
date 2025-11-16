import React from "react";
import { NavLink } from "react-router-dom";

export default function Side_bar() {
  return (
    <aside>
      <div>
        <NavLink to="/admin">Productos</NavLink>
        <NavLink to="/weeks">Semanas</NavLink>
      </div>
    </aside>
  );
}
