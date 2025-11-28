import "../../css/productsCards.css";

export default function ArticlesCards({ productos }) {
  return (
    <>
      <p className="productos-section_title">Listado de productos</p>
      <section className="productos-section">
        {productos.map((producto) => {
          const {
            nombre,
            precio_hoy,
            precio_1_semana,
            precio_2_semanas,
            precio_3_semanas,
            precio_4_semanas,
            precio_11_24,
          } = producto;

          const variacion =
            ((producto.precio_hoy - producto.precio_1_semana) /
              producto.precio_1_semana) *
            100;

          return (
            <article
              className={
                variacion > 20
                  ? "productos-card_fuego"
                  : variacion > 0
                  ? "productos-card_positive"
                  : variacion > -20
                  ? "productos-card_negative"
                  : "productos-card_piano"
              }
            >
              <div className="productos-card_emoji">
                {variacion < -20 ? <p>🎹</p> : variacion > 20 ? <p>🔥</p> : ""}
              </div>
              <div className="productos-card_name-price">
                <p>{nombre}</p>

                <p>${precio_hoy}</p>
              </div>
              <div className="productos-card_variacion">
                <p>{variacion.toFixed(2)}% - Ult. 7 dias</p>
                <p>Precio anterior: ${precio_1_semana}</p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
