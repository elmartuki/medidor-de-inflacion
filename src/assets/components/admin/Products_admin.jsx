import { obtenerDelLocalStorage } from "../../utils/localStorage";
import "../../css/productsForm.css";
import "../../css/search.css";
import "../../css/adminpanel.css";
import borrar from "../../img/delete.svg";
import edit from "../../img/edit.svg";
import add from "../../img/add.svg";
import { useEffect, useState } from "react";
import { handleSearch } from "../../services/search";
import { handleChange, handleSubmit } from "../../services/editProduct";
import { handleDelete } from "../../services/deleteProduct";
import CreateProducto from "./CreateProduct";

export default function Products_admin() {
  const [productos, setProductos] = useState(
    obtenerDelLocalStorage("Productos") || []
  );
  const [search, setSearch] = useState("");
  const [editar, setEditar] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    if (!openCreate) {
      setProductos(obtenerDelLocalStorage("Productos") || []);
    }
  }, [openCreate]);

  const listToShow = handleSearch(search, productos);

  return (
    <>
      <section className="admin-panel">
        <section className="product-create-section">
          <button
            className="product-create-btn"
            onClick={() => setOpenCreate(true)}
          >
            <img src={add} alt="" />
          </button>

          <CreateProducto
            openForm={openCreate}
            closeForm={() => setOpenCreate(false)}
          />
        </section>

        <section className="productos-admin-section">
          <p className="productos-section_title">Listado de productos</p>
          <input
            className="search-input"
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar un producto..."
            name=""
            id=""
          />

          {listToShow.map((producto, index) => {
            const {
              nombre,
              precio_hoy,
              precio_semana_1,
              precio_semana_2,
              precio_semana_3,
              precio_1_mes,
              precio_11_24,
            } = producto;

            return (
              <form
                className="productos-form"
                key={index}
                onSubmit={(event) =>
                  handleSubmit(event, index, productos, setProductos)
                }
              >
                <div className="productos-form_name">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "nombre",
                        event.target.value,
                        productos,
                        setProductos
                      )
                    }
                    placeholder="Escribí el nombre del producto"
                  />
                  <div className="btn-form">
                    <button type="submit" className="btn-editar">
                      <img src={edit} alt="" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(nombre, productos, setProductos);
                      }}
                      type="button"
                      className="btn-borrar"
                    >
                      <img src={borrar} alt="" />
                    </button>
                  </div>
                </div>
                <section className="productos-form_inputs-section">
                  <div className="productos-form_inputs">
                    <div>
                      <div className="productos-form_inputs_name">
                        <p>Precio hoy</p>
                      </div>

                      <input
                        type="number"
                        value={precio_hoy}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_hoy",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio de hoy"
                      />
                    </div>

                    <div>
                      <div className="productos-form_inputs_name">
                        <p>Semana 1</p>
                      </div>

                      <input
                        type="number"
                        value={precio_semana_1}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_semana_1",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio de hace 1 semana"
                      />
                    </div>
                  </div>

                  <div className="productos-form_inputs">
                    <div>
                      <div className="productos-form_inputs_name">
                        <p>Semana 2</p>
                      </div>

                      <input
                        type="number"
                        value={precio_semana_2}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_semana_2",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio de hace 2 semanas"
                      />
                    </div>

                    <div>
                      <div className="productos-form_inputs_name">
                        <p>Semana 3</p>
                      </div>

                      <input
                        type="number"
                        value={precio_semana_3}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_semana_3",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio de hace 3 semanas"
                      />
                    </div>
                  </div>
                  <div className="productos-form_inputs">
                    <div>
                      <div className="productos-form_inputs_name">
                        <p>Hace 1 mes</p>
                      </div>

                      <input
                        type="number"
                        value={precio_1_mes}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_1_mes",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio de hace 1 mes"
                      />
                    </div>

                    <div>
                      <div className="productos-form_inputs_name">
                        <p>11/24</p>
                      </div>

                      <input
                        type="number"
                        value={precio_11_24}
                        onChange={(event) =>
                          handleChange(
                            index,
                            "precio_11_24",
                            event.target.value,
                            productos,
                            setProductos
                          )
                        }
                        placeholder="Escribí el precio del 11/24"
                      />
                    </div>
                  </div>
                </section>
              </form>
            );
          })}
        </section>
      </section>
    </>
  );
}
