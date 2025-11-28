export async function handleDelete(index, productos) {
  const productoAEliminar = productos[index];
  const productoID = productoAEliminar._id;

  const datosActualizados = productoAEliminar;

  const confirmar = confirm("¿Estás seguro que querés eliminar este producto?");

  if (confirmar) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/productos/${productoID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosActualizados),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Se elimino el producto correctamente");
      } else {
        alert("Error al elimina el producto");
      }
    } catch (error) {
      console.error("Error al conectar con el servicor");
      alert("Error al conectar con el servidor");
    }
  }
}
