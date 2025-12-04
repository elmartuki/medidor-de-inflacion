import { BASEURL } from "../db/connectURL";

export async function handleDelete(producto, onProductUpdate) {
  const productoID = producto._id;

  try {
    const response = await fetch(`${BASEURL}/api/productos/${productoID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      if (onProductUpdate) {
        await onProductUpdate();
      }
    } else {
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
  }
}
