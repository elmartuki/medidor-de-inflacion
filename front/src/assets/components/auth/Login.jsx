import React from "react";
import { useState } from "react";
import "../../css/login.css";
import { guardarEnSessionStorage } from "../../utils/localStorage";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import usserIcon from "../../img/usser.svg";
import passwordIcon from "../../img/password.svg";
import backImg from "../../img/back.svg";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const datosIngresados = { usuario: usuario, password: password };

    const ADMIN_USSER = import.meta.env.VITE_ADMIN_USSER;

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (
      datosIngresados.usuario == ADMIN_USSER &&
      datosIngresados.password == ADMIN_PASSWORD
    ) {
      const accessKey = { puedeIngresar: true };
      navigate("/admin");
      guardarEnSessionStorage("accessKey", accessKey);
    } else {
      alert("No se pudio ingresar correctamente");
    }
  };

  return (
    <section className="login-section">
      <div className="login-more-info">
        <div className="back-button">
          <NavLink to={"/"}>
            <img src={backImg} alt="" />
            Volver
          </NavLink>
        </div>
      </div>
      <div className="login-form-section">
        <form className="login-form" action="" onSubmit={handleSubmit}>
          <p className="login-form">Admin login</p>
          <p className="login-form_description">
            Bievenido, ingrese los siguietes datos para iniciar al panel de
            administracion
          </p>
          <label htmlFor="">Usuario</label>
          <div className="input-container">
            <img src={usserIcon} alt="" />
            <input
              onChange={(event) => setUsuario(event.target.value)}
              type="text"
              placeholder="Ingrese el nombre de usuario"
            />
          </div>

          <label htmlFor="">Contraseña</label>
          <div className="input-container">
            <img src={passwordIcon} alt="" />
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Ingrese la contraseña"
            />
          </div>

          <button>Iniciar Sesión</button>
        </form>
      </div>
    </section>
  );
}
