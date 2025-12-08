import React, { useEffect, useState } from "react";
import "../../css/importantCard.css";
import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import igual from "../../img/igual.svg";
import { calcularPromediosYVariacionesGlobales } from "../../services/calculateInflacion";

import { getProducts } from "../../services/getProducts";

import {
  productoQueMasAumento,
  productoQueMasBajo,
  productoVariants,
} from "../../services/productosStats";
import { variacionesTitulosLoading } from "../../constants/skeleton";

const formatVariations = (variations) => {
  if (!variations) return [];

  return [
    {
      nombre: "Variación respecto hace 1 semana",
      variacion: variations.variacion_1_semana,
    },
    {
      nombre: "Variación respecto hace 2 semanas",
      variacion: variations.variacion_2_semanas,
    },
    {
      nombre: "Variación respecto hace 3 semanas",
      variacion: variations.variacion_3_semanas,
    },
    {
      nombre: "Variación mensual",
      variacion: variations.variacion_mensual,
    },
    {
      nombre: "Variación respecto al 11/24",
      variacion: variations.variacion_11_24,
    },
  ];
};

export default function ImportantCards() {
  const { productos } = getProducts();
  const [variaciones, setVariaciones] = useState(null);

  const { productoAumento, porcentajeAumento } =
    productoQueMasAumento(productos);
  const { productoBajada, porcentajeBajada } = productoQueMasBajo(productos);
  const { productosQueSubieron, productosQueBajaron } =
    productoVariants(productos);

  useEffect(() => {
    if (productos && productos.length > 0) {
      const { variaciones_globales } =
        calcularPromediosYVariacionesGlobales(productos);
      setVariaciones(variaciones_globales);
    } else {
      setVariaciones(null);
    }
  }, [productos]);

  const listToShow = formatVariations(variaciones);

  const isLoading = variaciones === null;

  if (!isLoading) {
    return (
      <>
        <section className="variaciones-card-section">
          {listToShow.map((item, index) => {
            const { nombre, variacion } = item;

            const esCero = variacion === 0;
            const esNegativa = variacion < 0;
            const displayVariacion = Math.abs(variacion).toFixed(2);

            return (
              <article
                key={index}
                className={
                  esCero
                    ? "variaciones-card-cero"
                    : esNegativa
                    ? "variaciones-card-negative"
                    : "variaciones-card-positive"
                }
              >
                <div className="variaciones-card_name">
                  <p>{nombre}</p>
                </div>

                <div className="variaciones-card_data">
                  {esCero ? (
                    <>
                      <img className="igual" src={igual} alt="igual" />
                      <p className="text-fade-in">{displayVariacion}%</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={esNegativa ? downArrow : upArrow}
                        alt={esNegativa ? "Bajó" : "Subió"}
                      />
                      <p className="text-fade-in">{displayVariacion}%</p>
                    </>
                  )}
                </div>
              </article>
            );
          })}

          <article className="variaciones-card-positive">
            <div className="variaciones-card_name">
              <p>Producto que más aumentó:</p>
            </div>
            <p>{productoAumento.nombre}</p>
            <div className="variaciones-card_data">
              <img src={upArrow} alt="Subió" />
              <p className="text-fade-in">{porcentajeAumento.toFixed(2)}%</p>
            </div>
          </article>

          <article className="variaciones-card-negative">
            <div className="variaciones-card_name">
              <p>Producto que más bajó:</p>
            </div>
            <p>{productoBajada.nombre}</p>
            <div className="variaciones-card_data">
              <img src={downArrow} alt="Bajó" />
              <p className="text-fade-in">{porcentajeBajada.toFixed(2)}%</p>
            </div>
          </article>

          <article
            className={
              productosQueBajaron === productosQueSubieron
                ? "variaciones-card-cero"
                : productosQueBajaron > productosQueSubieron
                ? "variaciones-card-negative"
                : "variaciones-card-positive"
            }
          >
            <div className="variaciones-card_name">
              <p>Productos que subieron/bajaron</p>
            </div>
            <div className="variaciones-card_data">
              <img src={upArrow} alt="Subieron" />
              <p className="text-fade-in">{productosQueSubieron}</p>
              <img src={downArrow} alt="Bajaron" />
              <p className="text-fade-in">{productosQueBajaron}</p>
            </div>
          </article>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="variaciones-card-section">
          {variacionesTitulosLoading.map((titulo, index) => {
            return (
              <article key={index} className="variaciones-card-cero">
                <div className="variaciones-card_name">
                  <p>{titulo.titulo}</p>
                </div>

                <div className="variaciones-card_data">
                  <img className="igual" src={igual} alt="igual" />
                  <p className="loading-data">..%</p>
                </div>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
