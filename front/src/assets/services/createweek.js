import { BASEURL } from "../db/connectURL";
import { obtenerDelSessionStorage } from "../utils/localStorage";

export async function createWeek(event, week, variacion, onSemanasUpdate) {
  event.preventDefault();

  const nuevaSemana = { semana: week, variacion: variacion };

  const token = obtenerDelSessionStorage("token");

  if (!token) {
    console.error(
      "Token no encontrado. Debes iniciar sesion como administrador para poder hacer peticiones"
    );
    return false;
  }
  try {
    const response = await fetch(`${BASEURL}/api/semanas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevaSemana),
    });

    if (response.ok) {
      if (onSemanasUpdate) {
        await onSemanasUpdate();
      }

      return true;
    } else {
      alert("Error al agregar una semana");
      return false;
    }
  } catch (error) {
    console.error("Error al conectar con el servicor", error);
    alert("Error al conectar con el servidor");
    return false;
  }
}
