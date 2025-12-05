import { BASEURL } from "../db/connectURL";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export async function handleSubmit(event, index, productos, onProductUpdate) {
  event.preventDefault();

  const productoAEditar = productos[index];
  const productoID = productoAEditar._id;

  const datosActualizados = { ...productoAEditar };
  delete datosActualizados._id;
  delete datosActualizados.updatedAt;

  const token = obtenerDelSessionStorage("token");

  if (!token) {
    console.error(
      "Token no encontrado. Debes iniciar sesion como administrador para poder hacer peticiones"
    );
    return false;
  }


  try {
    const response = await fetch(`${BASEURL}/api/productos/${productoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  let valorFinal = valor;

  if (campo.startsWith("precio_")) {
    const numeroConvertido = Number(valor);

    if (isNaN(numeroConvertido)) {
      valorFinal = valor;
    } else {
      valorFinal = numeroConvertido;
    }
  }

  nuevosProductos[index][campo] = valorFinal;
  setProductos(nuevosProductos);
};
