import upArrow from "../../img/upArrow.svg";
import downArrow from "../../img/downArrow.svg";
import "../../css/productStats.css";
import { variacionConverter } from "../../services/variacion";
import {
  productoQueMasAumento,
  productoQueMasBajo,
  productoVariants,
} from "../../services/productosStats";

export default function Stats({ productos }) {
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

  return (
    <section className="stats_section">
      <article
        className={
          variacion < 0 ? "stats-card-negative" : "stats-card-positive"
        }
      >
        <div className="stats-card_title">
          <p>Costo total del carrito: ${total_hoy.toFixed(2)}</p>{" "}
        </div>
        <div className="stats-card_data">
          <div>
            {variacion < 0 ? (
              <img src={downArrow} alt="" />
            ) : (
              <img src={upArrow} alt="" />
            )}
            <p>{variacion.toFixed(2)}%</p>
          </div>
        </div>
      </article>

      <article
        className={
          productosQueBajaron > productosQueSubieron
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

      <article
        className={
          variacion < 0 ? "stats-card-negative" : "stats-card-positive"
        }
      >
        <div className="stats-card_title">
          <p>Variacion Intermensual</p>
        </div>
        <div className="stats-card_data">
          <img src={downArrow} alt="" />
          <p>-2%</p>
        </div>
      </article>

      <article className="stats-card-positive">
        <div className="stats-card_title">
          <p>Producto que mas aumento</p>
        </div>

        <p>{productoAumento.nombre}</p>
        <div className="stats-card_data">
          <img src={upArrow} alt="" />
          <p>{porcentajeAumento.toFixed(2)}%</p>
        </div>
      </article>

      <article className="stats-card-negative">
        <div className="stats-card_title">
          <p>Producto que mas bajó</p>
        </div>

        <p>{productoBajada.nombre}</p>
        <div className="stats-card_data">
          <img src={downArrow} alt="" />
          <p>{porcentajeBajada.toFixed(2)}%</p>
        </div>
      </article>
    </section>
  );
}
