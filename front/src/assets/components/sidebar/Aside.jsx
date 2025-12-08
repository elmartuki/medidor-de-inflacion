import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/aside.css";
import dash from "../../img/dashboard.svg";
import product from "../../img/category.svg";
import week from "../../img/calendar.svg";
import menu from "../../img/menu.svg";

export default function Aside() {
  const [openAside, setOpenAside] = useState(true);

  const achicado = !openAside;

  return (
    <>
      <button className="menu-btn" onClick={() => setOpenAside(!openAside)}>
        <img src={menu} alt="Abrir/Cerrar menú" />
      </button>

      <aside className={achicado ? "aside-minimized" : ""}>
        <div className="aside-title">
          <button className="menu-btn" onClick={() => setOpenAside(!openAside)}>
            <img src={menu} alt="Cerrar menú" />
          </button>

          {!achicado && <p>Opciones</p>}
        </div>
        <div className="aside-elements">
          <NavLink to="/">
            <img src={dash} alt="" />

            {!achicado && "Dashboard"}
          </NavLink>
          <NavLink to="/admin">
            <img src={product} alt="" />

            {!achicado && "Productos"}
          </NavLink>
          <NavLink to="/weeks">
            <img src={week} alt="" />

            {!achicado && "Semanas"}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
