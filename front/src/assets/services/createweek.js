import { BASEURL } from "../db/connectURL";

export async function createWeek(event, week, variacion, onSemanasUpdate) {
  event.preventDefault();

  const nuevaSemana = { semana: week, variacion: variacion };

  try {
    const response = await fetch(`${BASEURL}/api/semanas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
