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

export default function Products_admin({ listaDeProductos, onProductUpdate }) {
  const [productos, setProductos] = useState(listaDeProductos);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    setProductos(listaDeProductos);
  }, [listaDeProductos]);

  const listToShow = handleSearch(search, productos || []);

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
            onProductUpdate={onProductUpdate}
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

          {listToShow.length > 0 ? (
            <>
              {listToShow.map((producto, index) => {
                const {
                  nombre,
                  precio_hoy,
                  precio_1_semana,
                  precio_2_semanas,
                  precio_3_semanas,
                  precio_4_semanas,
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
                            handleDelete(producto, onProductUpdate);
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
                            value={precio_1_semana}
                            onChange={(event) =>
                              handleChange(
                                index,
                                "precio_1_semana",
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
                            value={precio_2_semanas}
                            onChange={(event) =>
                              handleChange(
                                index,
                                "precio_2_semanas",
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
                            value={precio_3_semanas}
                            onChange={(event) =>
                              handleChange(
                                index,
                                "precio_3_semanas",
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
                            value={precio_4_semanas}
                            onChange={(event) =>
                              handleChange(
                                index,
                                "precio_4_semanas",
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
            </>
          ) : (
            ""
          )}
        </section>
      </section>
    </>
  );
}
