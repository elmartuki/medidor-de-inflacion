import { useState } from "react";
import "../../css/productsCards.css";

export default function ArticlesCards({ productos }) {
  const [valor1, setValor1] = useState("precio_1_semana");
  const [filtrarPor, setFiltrarPor] = useState("");
  const [openFilter1, setOpenfilter1] = useState(false);
  const [openFilter2, setOpenfilter2] = useState(false);

  let productosFiltrados = [...productos];

  if (filtrarPor) {
    productosFiltrados.sort((a, b) => {
      const variacionA = ((a.precio_hoy - a[valor1]) / a[valor1]) * 100;

      const variacionB = ((b.precio_hoy - b[valor1]) / b[valor1]) * 100;

      if (filtrarPor === "menor") {
        return variacionA - variacionB;
      } else if (filtrarPor === "mayor") {
        return variacionB - variacionA;
      }
      return 0;
    });
  }
  const arrayDeOcho = Array.from({ length: 40 });

  const isLoading = productos.length === 0;

  if (!isLoading) {
    return (
      <>
        <p className="productos-section_title">Listado de productos</p>
        <div className="productos-section-btn">
          <button onClick={() => setOpenfilter1(!openFilter1)}>
            Filtrar por variacion
          </button>
          <button onClick={() => setOpenfilter2(!openFilter2)}>
            Filtrar por
          </button>
          <button
            onClick={() => {
              setValor1("precio_1_semana"),
                setFiltrarPor(""),
                setOpenfilter1(false),
                setOpenfilter2(false);
            }}
          >
            Restablecer
          </button>
        </div>
        {openFilter1 ? (
          <div className="productos-section-filter-1">
            <button
              className={valor1 === "precio_1_semana" ? "active" : ""}
              onClick={() => {
                setValor1("precio_1_semana"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 1 semana
            </button>
            <button
              className={valor1 === "precio_2_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_2_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 2 semanas
            </button>
            <button
              className={valor1 === "precio_3_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_3_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 3 semanas
            </button>
            <button
              className={valor1 === "precio_4_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_4_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 1 mes
            </button>
            <button
              className={valor1 === "precio_11_24" ? "active" : ""}
              onClick={() => {
                setValor1("precio_11_24"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 11/2024
            </button>
          </div>
        ) : (
          ""
        )}
        {openFilter2 ? (
          <div className="productos-section-filter-2">
            <button
              className={filtrarPor === "menor" ? "active" : ""}
              onClick={() => {
                setFiltrarPor("menor");
                setOpenfilter2(false);
              }}
            >
              Menor a mayor
            </button>
            <button
              className={filtrarPor === "mayor" ? "active" : ""}
              onClick={() => {
                setFiltrarPor("mayor");
                setOpenfilter2(false);
              }}
            >
              Mayor a menor
            </button>
          </div>
        ) : (
          ""
        )}

        <section className="productos-section">
          {productosFiltrados.map((producto, index) => {
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
              ((producto.precio_hoy - producto[valor1]) / producto[valor1]) *
              100;

            return (
              <article
                key={index}
                className={
                  variacion > 20
                    ? "productos-card_fuego"
                    : variacion > 0
                    ? "productos-card_positive"
                    : variacion === 0
                    ? "productos-card_cero"
                    : variacion <= -20
                    ? "productos-card_piano"
                    : "productos-card_negative"
                }
              >
                <div className="productos-card_emoji">
                  {variacion < -20 ? (
                    <p>🎹</p>
                  ) : variacion > 20 ? (
                    <p>🔥</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="productos-card_name-price">
                  <p className="text-fade-in">{nombre}</p>
                  <p className="text-fade-in">${precio_hoy}</p>
                </div>
                <div className="productos-card_variacion">
                  <p className="text-fade-in">
                    {variacion.toFixed(2)}% - Ult. 7 dias
                  </p>
                  <p className="text-fade-in">
                    Precio anterior: ${producto[valor1]}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </>
    );
  } else {
    return (
      <>
        <p className="productos-section_title">Listado de productos</p>
        <div className="productos-section-btn">
          <button onClick={() => setOpenfilter1(!openFilter1)}>
            Filtrar por variacion
          </button>
          <button onClick={() => setOpenfilter2(!openFilter2)}>
            Filtrar por
          </button>
          <button
            onClick={() => {
              setValor1("precio_1_semana"),
                setFiltrarPor(""),
                setOpenfilter1(false),
                setOpenfilter2(false);
            }}
          >
            Restablecer
          </button>
        </div>
        {openFilter1 ? (
          <div className="productos-section-filter-1">
            <button
              className={valor1 === "precio_1_semana" ? "active" : ""}
              onClick={() => {
                setValor1("precio_1_semana"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 1 semana
            </button>
            <button
              className={valor1 === "precio_2_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_2_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 2 semanas
            </button>
            <button
              className={valor1 === "precio_3_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_3_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 3 semanas
            </button>
            <button
              className={valor1 === "precio_4_semanas" ? "active" : ""}
              onClick={() => {
                setValor1("precio_4_semanas"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 1 mes
            </button>
            <button
              className={valor1 === "precio_11_24" ? "active" : ""}
              onClick={() => {
                setValor1("precio_11_24"), setOpenfilter1(false);
              }}
            >
              Variacion vs. 11/2024
            </button>
          </div>
        ) : (
          ""
        )}
        {openFilter2 ? (
          <div className="productos-section-filter-2">
            <button
              className={filtrarPor === "menor" ? "active" : ""}
              onClick={() => {
                setFiltrarPor("menor");
                setOpenfilter2(false);
              }}
            >
              Menor a mayor
            </button>
            <button
              className={filtrarPor === "mayor" ? "active" : ""}
              onClick={() => {
                setFiltrarPor("mayor");
                setOpenfilter2(false);
              }}
            >
              Mayor a menor
            </button>
          </div>
        ) : (
          ""
        )}

        <section className="productos-section">
          {arrayDeOcho.map((index) => {
            return (
              <article key={index} className="productos-card_cero">
                <div className="productos-card_emoji"></div>
                <div className="productos-card_name-price">
                  <p className="loading-data"></p>
                  <p className="loading-data"></p>
                </div>
                <div className="productos-card_variacion">
                  <p className="loading-data"></p>
                  <p className="loading-data"></p>
                </div>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
