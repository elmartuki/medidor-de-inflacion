import { BASEURL } from "../db/connectURL";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export async function updatePriceHistory(onProductUpdate) {
  const token = obtenerDelSessionStorage("token");

  if (!token) {
    console.error(
      "Token no encontrado. Debes iniciar sesion como administrador para poder hacer peticiones"
    );
    return false;
  }

  try {
    const response = await fetch(`${BASEURL}/api/productos/move-history`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert(
        `Éxito: ${data.message} Productos modificados: ${
          data.modifiedCount || 0
        }`
      );

      if (onProductUpdate) {
        await onProductUpdate();
      }
      return true;
    } else {
      alert(`Error en el servidor al actualizar el historial: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert(
      "Error al conectar con el servidor. Asegúrate de que el backend esté corriendo y CORS esté configurado."
    );
    return false;
  }
}
