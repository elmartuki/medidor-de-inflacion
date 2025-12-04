import React, { useEffect, useState } from "react";
import "../../css/productsForm.css";
import "../../css/search.css";
import "../../css/adminpanel.css";
import borrar from "../../img/delete.svg";
import edit from "../../img/edit.svg";
import add from "../../img/add.svg";
import { handleSearch } from "../../services/search";
import { handleChange, handleSubmit } from "../../services/editProduct";
import { handleDelete } from "../../services/deleteProduct";
import CreateProducto from "./CreateProduct";
import { updatePriceHistory } from "../../services/moverPrecios";
import Confirm from "../modal/Confirm";
import ModalConfirmar from "../modal/ModalConfirmar";

export default function Products_admin({ listaDeProductos, onProductUpdate }) {
  const [productos, setProductos] = useState(listaDeProductos);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProductos(listaDeProductos);
  }, [listaDeProductos]);

  const handleCreationSuccess = (productName) => {
    setOpenModal(true);
    setMessage(`¡El producto **${productName}** fue creado correctamente! 🎉`);

    setTimeout(() => {
      setOpenModal(false);
      setMessage("");
    }, 3000);
  };

  const handlePriceMove = async () => {
    const cofirmar = confirm("Desea mover los precios?");

    if (cofirmar) {
      await updatePriceHistory(onProductUpdate);
    }
  };

  const handleEditSubmit = async (event, index) => {
    const success = await handleSubmit(
      event,
      index,
      productos,
      onProductUpdate
    );

    if (success) {
      setOpenModal(true);
      setMessage("Este articulo se editó correctamente.");

      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    } else {
      alert("Error al actualizar el producto.");
    }
  };

  const handleOpenDeleteModal = (producto) => {
    setProductoToDelete(producto);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDelete(false);
    if (productoToDelete) {
      await handleDelete(productoToDelete, onProductUpdate);

      setOpenModal(true);
      setMessage(`El producto ${productoToDelete.nombre} fue eliminado.`);

      setTimeout(() => {
        setOpenModal(false);
        setProductoToDelete(null);
      }, 3000);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDelete(false);
    setProductoToDelete(null);
  };

  const listToShow = handleSearch(search, productos || []);

  return (
    <>
      <Confirm openModal={openModal} message={message} />

      <ModalConfirmar
        openConfirmDelente={openConfirmDelete}
        producto={productoToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
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
            onCreationSuccess={handleCreationSuccess}
          />
        </section>

        <section className="productos-admin-section">
          <p className="productos-admin-title">Listado de productos</p>

          <button className="price-move-btn" onClick={handlePriceMove}>
            Mover Precios
          </button>

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
              {listToShow.map((producto) => {
                const indexEnProductos = productos.findIndex(
                  (p) => p._id === producto._id
                );

                if (indexEnProductos === -1) return null;

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
                    key={producto._id}
                    onSubmit={(event) =>
                      handleEditSubmit(event, indexEnProductos)
                    }
                  >
                    <div className="productos-form_name">
                      <input
                        type="text"
                        value={nombre}
                        onChange={(event) =>
                          handleChange(
                            indexEnProductos,
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
                          onClick={() => handleOpenDeleteModal(producto)}
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
                                indexEnProductos,
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
                                indexEnProductos,
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
                                indexEnProductos,
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
                                indexEnProductos,
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
                                indexEnProductos,
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
                                indexEnProductos,
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
