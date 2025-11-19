import React, { useState } from "react";
import { addProducts } from "../../services/addProduct";
import "../../css/createProducts.css";

export default function CreateProducto({ openForm, closeForm }) {
  const [nombre, setNombre] = useState("");
  const [precio_hoy, setPrecioHoy] = useState("");
  const [precio_semana_1, setPrecioSemana1] = useState("");
  const [precio_semana_2, setPrecioSemana2] = useState("");
  const [precio_semana_3, setPrecioSemana3] = useState("");
  const [precio_1_mes, setPrecio1Mes] = useState("");
  const [precio_11_24, setPrecio1124] = useState("");

  if (openForm) {
    return (
      <section
        className="productos-create-section"
        onClick={() => {
          closeForm();
        }}
      >
        <form
          className="productos-form-create"
          onClick={(event) => event.stopPropagation()}
          onSubmit={() => {
            addProducts(
              event,
              nombre,
              precio_hoy,
              precio_semana_1,
              precio_semana_2,
              precio_semana_3,
              precio_1_mes,
              precio_11_24
            );

            closeForm();
          }}
        >
          <p>Crear un producto</p>
          <input
            type="text"
            placeholder="Escribí el nombre del producto"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio de hoy"
            value={precio_hoy}
            onChange={(event) => setPrecioHoy(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio de hace 1 semana"
            value={precio_semana_1}
            onChange={(event) => setPrecioSemana1(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio de hace 2 semanas"
            value={precio_semana_2}
            onChange={(event) => setPrecioSemana2(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio de hace 3 semanas"
            value={precio_semana_3}
            onChange={(event) => setPrecioSemana3(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio de hace 1 mes"
            value={precio_1_mes}
            onChange={(event) => setPrecio1Mes(event.target.value)}
          />

          <input
            type="number"
            placeholder="Escribí el precio del 11/24"
            value={precio_11_24}
            onChange={(event) => setPrecio1124(event.target.value)}
          />

          <div className="btn-form">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </section>
    );
  }
}
