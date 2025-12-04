import { BASEURL } from "../db/connectURL";

export async function handleDeleteWeek(id, onSemanasUpdate) {
  try {
    const response = await fetch(`${BASEURL}/api/semanas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
