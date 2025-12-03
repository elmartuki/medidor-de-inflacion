import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import igual from "../../img/igual.svg";
import "../../css/productStats.css";
import { variacionConverter } from "../../services/variacion.js";

import { useVariacionMensual } from "../../services/useVariacionMensual.js";

export default function PrincipalCards({ productos }) {
  const variacionIntermensual = useVariacionMensual(productos);

  const { variacion, total_hoy } = variacionConverter(
    productos,
    "precio_hoy",
    "precio_1_semana"
  );

  const esCero = variacionIntermensual === 0;
  const esNegativa = variacionIntermensual < 0;
  const valorIntermensual = variacionIntermensual.toFixed(2);

  const variacionSemanal = variacion.toFixed(2);
  const esCeroSemanal = variacion === 0;
  const esNegativaSemanal = variacion < 0;

  return (
    <>
      <div className="stats-tittle">
        <p>Panel de precios</p>
        <p>Resumen de precios y variaciones.</p>
      </div>

      <section className="stats_section">
        <article
          className={
            esCeroSemanal
              ? "stats-card-cero"
              : esNegativaSemanal
              ? "stats-card-negative"
              : "stats-card-positive"
          }
        >
          <div className="stats-card_title">
            <div>
              <p>Costo total del carrito</p>
            </div>
          </div>
          <p className="costo-total">${total_hoy.toFixed(2)}</p>
          <div className="stats-card_data">
            <div>
              <div>
                {esCeroSemanal ? (
                  <img src={igual} alt="Sin variación" />
                ) : (
                  <img
                    src={esNegativaSemanal ? downArrow : upArrow}
                    alt={esNegativaSemanal ? "Baja" : "Sube"}
                  />
                )}
                <p>{variacionSemanal}%</p>
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
            <img src={esCero ? igual : esNegativa ? downArrow : upArrow} />
            <p>{valorIntermensual}%</p>
          </div>
          <p className="stats-card_data-vs">
            <img src={esCero ? igual : esNegativa ? downArrow : upArrow} />
            En comparacion del mes anterior
          </p>
        </article>
      </section>
    </>
  );
}
