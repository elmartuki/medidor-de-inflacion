import React from "react";
import { useState } from "react";

export default function Registro() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const datosIngresados = { usuario: usuario, password: password };

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosIngresados),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Se creo la cuenta correctamente");
      } else {
        alert("Error al crear la cuenta");
      }
    } catch (error) {
      console.error("Error al conectar con el servicor");
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={(event) => setUsuario(event.target.value)}
          type="text"
          placeholder="Ingrese un usuario"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="Ingrese una contraseña"
        />
        <button>enviar</button>
      </form>
    </section>
  );
}
