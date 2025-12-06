import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import igual from "../../img/igual.svg";
import volver from "../../img/volver.svg";
import siguente from "../../img/siguiente.svg";
import "../../css/productStats.css";
import { variacionConverter } from "../../services/variacion.js";
import { useVariacionMensual } from "../../services/useVariacionMensual.js";
import { useEffect, useState } from "react";
import { titulos, variacion1, variacion2 } from "../../constants/variacion.js";
import { getSemanas } from "../../services/getSemanas.js";

export default function PrincipalCards({ productos }) {
  const { semanas } = getSemanas();
  const [semanaIndice, setSemanaIndice] = useState(0);
  const variacionIntermensual = useVariacionMensual(productos);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (semanas.length > 0) {
      const indiceInicial = semanas.length - 4;
      setSemanaIndice(indiceInicial);
    }
  }, [semanas]);

  const objetoSemanaActual = semanas[semanaIndice];
  const nombreSemana = objetoSemanaActual?.semana;

  const { variacion, total_hoy } = variacionConverter(
    productos,
    variacion1[indice],
    variacion2[indice]
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
          <div className="btn-back">
            <button
              onClick={() => {
                setIndice(Math.max(0, indice - 1));
              }}
            >
              <img src={volver} alt="" />
            </button>
          </div>
          <div className="btn-next">
            <button
              onClick={() => {
                setIndice(Math.min(4, indice + 1));
              }}
            >
              <img src={siguente} alt="" />
            </button>
          </div>

          <div className="stats-card_title">
            <div>
              <p>Costo total del carrito: </p>
            </div>
          </div>
          <p>{titulos[indice]}</p>
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
          <p style={{ fontSize: "16px" }} className="stats-card_data-vs">
            En comparación de la {nombreSemana}
          </p>
        </article>
      </section>
    </>
  );
}
