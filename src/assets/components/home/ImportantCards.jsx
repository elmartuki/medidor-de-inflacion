import React, { useEffect, useState } from "react";
import "../../css/importantCard.css";
import upArrow from "../..//img/upArrow.svg";
import downArrow from "../..//img/downArrow.svg";
// Importamos la función de cálculo
import { calcularPromediosYVariacionesGlobales } from "../../services/calculateInflacion";
// Importamos el hook para obtener los productos
import { getProducts } from "../../services/getProducts";

/**
 * Función auxiliar para convertir el objeto de variaciones en un array iterable
 * con el formato necesario para el mapeo de las tarjetas.
 * Los nombres (nombre) deben coincidir con tu diseño.
 */
const formatVariations = (variations) => {
  if (!variations) return [];

  // Mapea los resultados de calcularPromediosYVariacionesGlobales
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
  // Obtiene los productos usando el hook (asumimos que devuelve la lista de productos)
  const { productos } = getProducts();
  const [variaciones, setVariaciones] = useState(null); // Estado para guardar el resultado del cálculo

  // Hook para calcular las variaciones cada vez que la lista de productos se actualiza
  useEffect(() => {
    if (productos && productos.length > 0) {
      const { variaciones_globales } =
        calcularPromediosYVariacionesGlobales(productos);
      setVariaciones(variaciones_globales);
    } else {
      setVariaciones(null); // Reinicia o establece a null si no hay productos
    }
  }, [productos]);

  // Si aún no se han calculado las variaciones, muestra un array vacío para evitar errores
  const listToShow = formatVariations(variaciones);

  return (
    <>
      <p className="variaciones-card-title">
        Inflación - Mi canasta frecuente de compras
      </p>
      <section className="variaciones-card-section">
        {/* Mapeamos el listado de variaciones formateado */}
        {listToShow.map((item, index) => {
          const { nombre, variacion } = item;

          // Usamos Math.abs para asegurar que el porcentaje mostrado sea positivo
          // toFixed(2) lo formatea a dos decimales
          const displayVariacion = Math.abs(variacion).toFixed(2);

          return (
            <article
              key={index}
              className={
                // La clase (rojo/verde) se basa en si la variación es negativa o positiva
                variacion < 0
                  ? "variaciones-card-negative" // Rojo para bajada (deflación)
                  : "variaciones-card-positive" // Verde para subida (inflación)
              }
            >
              <div className="variaciones-card_name">
                <p>{nombre}</p>
              </div>
              <div className="variaciones-card_data">
                {/* Lógica condicional para mostrar flecha roja o verde */}
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
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
