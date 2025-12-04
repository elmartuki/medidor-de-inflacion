import React from "react";
import { useState } from "react";
import "../../css/login.css";
import { guardarEnSessionStorage } from "../../utils/localStorage";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import usserIcon from "../../img/usser.svg";
import passwordIcon from "../../img/password.svg";
import backImg from "../../img/back.svg";
import ErrorModal from "../modal/ErrorModal";
import Confirm from "../modal/Confirm";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
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
      setMessage("Ingresaste correctamente.");
      setOpenModal(true);
      guardarEnSessionStorage("accessKey", accessKey);
      setTimeout(() => {
        setOpenModal(false);
        navigate("/admin");
      }, 3000);
    } else {
      setMessage("Usuario o contraseña incorrecta.");
      setOpenModal(true);

      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    }
  };

  return (
    <>
      <ErrorModal message={message} openModal={openModal} />
      <Confirm message={message} openModal={openModal} />
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
    </>
  );
}
