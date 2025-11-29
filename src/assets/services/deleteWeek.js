export async function handleDeleteWeek(event, id, onSemanasUpdate) {
  event.preventDefault();

  try {
    const response = await fetch(`http://localhost:3000/api/semanas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Se eliminó la semana correctamente");

      if (onSemanasUpdate) {
        await onSemanasUpdate();
      }
    } else {
      alert("Error al eliminar la semana");
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
  }
}
