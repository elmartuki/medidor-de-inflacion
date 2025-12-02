import React, { useEffect, useState } from "react";
import "../../css/importantCard.css";
import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import igual from "../../img/igual.svg";
import { calcularPromediosYVariacionesGlobales } from "../../services/calculateInflacion";

import { getProducts } from "../../services/getProducts";

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

  return (
    <>
      <section className="variaciones-card-section">
        {listToShow.map((item, index) => {
          const { nombre, variacion } = item;

          const displayVariacion = Math.abs(variacion).toFixed(2);

          return (
            <article
              key={index}
              className={
                variacion === 0
                  ? "variaciones-card-cero"
                  : variacion > 0
                  ? "variaciones-card-positive"
                  : variacion < 0
                  ? "variaciones-card-negative"
                  : ""
              }
            >
              <div className="variaciones-card_name">
                <p>{nombre}</p>
              </div>
              <div className="variaciones-card_data">
                {variacion === 0 ? (
                  <>
                    <img className="igual" src={igual} alt="igual" />
                    <p>{displayVariacion}%</p>
                  </>
                ) : (
                  <>
                    {variacion < 0 ? (
                      <>
                        <img src={downArrow} alt="Bajó" />
                        <p>{displayVariacion}%</p>
                      </>
                    ) : (
                      <>
                        <img src={upArrow} alt="Subió" />
                        <p>{displayVariacion}%</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
