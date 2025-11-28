export async function handleSubmit(event, index, productos) {
  event.preventDefault();

  const productoAEditar = productos[index];
  const productoID = productoAEditar._id;

  const datosActualizados = productoAEditar;

  alert(`Producto "${productoAEditar.nombre}" actualizado con éxito`);

  try {
    const response = await fetch(
      `http://localhost:3000/api/productos/${productoID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Se agrego un producto correctamente");
    } else {
      alert("Error al agregar un producto");
    }
  } catch (error) {
    console.error("Error al conectar con el servicor");
    alert("Error al conectar con el servidor");
  }
}

export const handleChange = (index, campo, valor, productos, setProductos) => {
  const nuevosProductos = [...productos];
  nuevosProductos[index][campo] = valor;
  setProductos(nuevosProductos);
};
