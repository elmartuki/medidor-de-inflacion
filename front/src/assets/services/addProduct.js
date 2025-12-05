import { BASEURL } from "../db/connectURL";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export async function addProducts(
  event,
  nombre,
  precio_hoy,
  precio_semana_1,
  precio_semana_2,
  precio_semana_3,
  precio_1_mes,
  precio_11_24,
  onProductUpdate
) {
  event.preventDefault();

  const nuevoProducto = {
    nombre: nombre,
    precio_hoy: precio_hoy,
    precio_1_semana: precio_semana_1,
    precio_2_semanas: precio_semana_2,
    precio_3_semanas: precio_semana_3,
    precio_4_semanas: precio_1_mes,
    precio_11_24: precio_11_24,
  };

  const token = obtenerDelSessionStorage("token");

  if (!token) {
    console.error(
      "Token no encontrado. Debes iniciar sesion como administrador para poder hacer peticiones"
    );
    return false;
  }

  try {
    const response = await fetch(`${BASEURL}/api/productos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoProducto),
    });

    const data = await response.json(); 

    if (response.ok) {
      if (onProductUpdate) {
        await onProductUpdate();
      }
      return true; 
    } else {
      console.error("Error en servidor:", data);
      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
    return false;
  }
}
