import { BASEURL } from "../db/connectURL";

export async function handleSubmit(event, index, productos, onProductUpdate) {
  event.preventDefault();

  const productoAEditar = productos[index];
  const productoID = productoAEditar._id;

  const datosActualizados = productoAEditar;

  try {
    const response = await fetch(`${BASEURL}/api/productos/${productoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    });

    const data = await response.json();

    if (response.ok) {
      if (onProductUpdate) {
        await onProductUpdate();
      }
      return true;
    } else {
      console.error("Error del servidor:", data);
      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servicor", error);
    alert("Error al conectar con el servidor");
    return false;
  }
}

export const handleChange = (index, campo, valor, productos, setProductos) => {
  const nuevosProductos = [...productos];
  const valorFinal = campo.startsWith("precio_") ? Number(valor) : valor;
  nuevosProductos[index][campo] = valorFinal;
  setProductos(nuevosProductos);
};
