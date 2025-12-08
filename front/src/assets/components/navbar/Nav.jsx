import perfilImg from "../../img/perfil.svg";
import "../../css/navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Options from "./Options";
import { obtenerDelSessionStorage } from "../../utils/localStorage";

export default function Nav() {
  const [openOption, setOpenOptions] = useState(false);

  const admin = obtenerDelSessionStorage("datosUsuario");

  return (
    <>
      <nav className="nav-bar-section">
        <div className="nav-bar-perfil">
          <NavLink
            onClick={() => {
              setOpenOptions(!openOption);
            }}
            className="btn-options"
          >
            {admin ? (
              <img src="https://images7.memedroid.com/images/UPLOADED667/6888ec184589a.jpeg" />
            ) : (
              <img style={{ padding: "5px" }} src={perfilImg} alt="" />
            )}
          </NavLink>
          <div className="nav-bar-perfil_name">
            <p>Bienvenido de nuevo,</p>
            {admin ? <p>Admin</p> : <p>Usuario</p>}
          </div>
        </div>
        {openOption ? <Options setOpenOptions={setOpenOptions} /> : ""}
      </nav>
    </>
  );
}
