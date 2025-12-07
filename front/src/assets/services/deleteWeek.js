import { BASEURL } from "../db/connectURL";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export async function handleDeleteWeek(id, onSemanasUpdate) {
  const token = obtenerDelSessionStorage("token");

  if (!token) {
    console.error(
      "Token no encontrado. Debes iniciar sesion como administrador para poder hacer peticiones"
    );
    return false;
  }

  try {
    const response = await fetch(`${BASEURL}/api/semanas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      if (onSemanasUpdate) {
        await onSemanasUpdate();
      }
      return true;
    } else {
      console.error("Error al eliminar la semana", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
    return false;
  }
}
