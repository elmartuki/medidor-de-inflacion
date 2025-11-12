import React from "react";
import { productos } from "../db/products";
import "../css/productsCards.css";

export default function ArticlesCards() {
  return (
    <>
      <p className="productos-section_title">Listado de productos</p>
      <section className="productos-section">
        {productos.map((producto) => {
          const {
            nombre,
            precio_hoy,
            precio_semana_1,
            precio_semana_2,
            precio_semana_3,
            precio_1_mes,
            precio_11_24,
          } = producto;

          const variacion =
            ((producto.precio_hoy - producto.precio_semana_1) /
              producto.precio_semana_1) *
            100;

          console.log(variacion);

          return (
            <article
              className={
                variacion < 0
                  ? "productos-card_negative"
                  : "productos-card_positive"
              }
            >
              <div className="productos-card_name-price">
                <p>{nombre}</p>

                <p>${precio_hoy}</p>
              </div>
              <div className="productos-card_variacion">
                <p>{variacion.toFixed(2)}% - Ult. 7 dias</p>
                <p>Precio anterior: ${precio_semana_1}</p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
