import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import igual from "../../img/igual.svg";
import "../../css/productStats.css";
import { variacionConverter } from "../../services/variacion";
import {
  productoQueMasAumento,
  productoQueMasBajo,
  productoVariants,
} from "../../services/productosStats";

import { calcularVariacionIntermensualGlobal } from "../../services/calculateInflacion.js";
import {
  calcularTasaAcumulada,
  calcularPromediosYVariacionesGlobales,
} from "../../services/calculateInflacion.js";
import { useEffect, useState } from "react";

export default function Stats({ productos }) {
  const [variacionIntermensual, setVariacionIntermensual] = useState(0);

  const { variacion, total_hoy } = variacionConverter(
    productos,
    "precio_hoy",
    "precio_1_semana"
  );

  const { productoAumento, porcentajeAumento } =
    productoQueMasAumento(productos);

  const { productoBajada, porcentajeBajada } = productoQueMasBajo(productos);

  const { productosQueSubieron, productosQueBajaron } =
    productoVariants(productos);

  useEffect(() => {
    async function obtenerVariacionMensual() {
      if (productos && productos.length > 0) {
        try {
          const resultado = await calcularVariacionIntermensualGlobal(
            productos,

            calcularPromediosYVariacionesGlobales,
            calcularTasaAcumulada
          );

          setVariacionIntermensual(resultado.variacion_intermensual_global);
        } catch (error) {
          console.error("Error al obtener la variación intermensual:", error);
          setVariacionIntermensual(0);
        }
      }
    }
    obtenerVariacionMensual();
  }, [productos]);

  const esCero = variacionIntermensual === 0;
  const esNegativa = variacionIntermensual < 0;
  const valorIntermensual = variacionIntermensual.toFixed(2);

  return (
    <section className="stats_section">
      <article
        className={
          variacion === 0
            ? "stats-card-cero"
            : variacion > 0
            ? "stats-card-positive"
            : "stats-card-negative"
        }
      >
        <div className="stats-card_title">
          <div>
            <p>Costo total del carrito: </p>
          </div>
          <div>
            <p className="costo-total">${total_hoy.toFixed(2)}</p>
          </div>
        </div>
        <div className="stats-card_data">
          <div>
            <div>
              {variacion === 0 ? (
                <img src={igual} alt="Sin variación" />
              ) : (
                <img
                  src={variacion < 0 ? downArrow : upArrow}
                  alt={variacion < 0 ? "Baja" : "Sube"}
                />
              )}
              <p>{variacion.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </article>

      <article
        className={
          esCero
            ? "stats-card-cero"
            : esNegativa
            ? "stats-card-negative"
            : "stats-card-positive"
        }
      >
        <div className="stats-card_title">
          <p>Variacion Intermensual</p>
        </div>
        <div className="stats-card_data">
          <img
            src={esCero ? igual : esNegativa ? downArrow : upArrow}
            alt={esCero ? "Sin variación" : esNegativa ? "Baja" : "Sube"}
          />
          <p>{valorIntermensual}%</p>
        </div>
      </article>

      <article className="stats-card-positive">
        <p>Producto que mas aumentó:</p>
        <div className="stats-card_title">
          <p className="stats-card_title_product">{productoAumento.nombre}</p>
        </div>

        <div className="stats-card_data">
          <img src={upArrow} alt="" />
          <p>{porcentajeAumento.toFixed(2)}%</p>
        </div>
      </article>

      <article className="stats-card-negative">
        <p>Producto que mas bajó:</p>
        <div className="stats-card_title">
          <p className="stats-card_title_product">{productoBajada.nombre}</p>
        </div>

        <div className="stats-card_data">
          <img src={downArrow} alt="" />
          <p>{porcentajeBajada.toFixed(2)}%</p>
        </div>
      </article>

      <article
        className={
          productosQueBajaron === productosQueSubieron
            ? "stats-card-cero"
            : productosQueBajaron > productosQueSubieron
            ? "stats-card-negative"
            : "stats-card-positive"
        }
      >
        <div className="stats-card_title">
          <p>Productos que subieron/bajaron</p>
        </div>
        <div className="stats-card_data">
          <img src={upArrow} alt="" />
          <p>{productosQueSubieron}</p>
          <img src={downArrow} alt="" />
          <p>{productosQueBajaron}</p>
        </div>
      </article>
    </section>
  );
}
