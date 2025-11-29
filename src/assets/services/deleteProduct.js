export async function handleDelete(producto, onProductUpdate) {
  const productoID = producto._id;

  const confirmar = confirm(
    `¿Estás seguro que querés eliminar el producto ${producto.nombre}?`
  );

  if (confirmar) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/productos/${productoID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Se eliminó el producto correctamente");

        if (onProductUpdate) {
          await onProductUpdate();
        }
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      alert("Error al conectar con el servidor");
    }
  }
}
