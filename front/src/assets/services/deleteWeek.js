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
      if (onSemanasUpdate) {
        await onSemanasUpdate();
      }
    } else {
    }
  } catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Error al conectar con el servidor");
  }
}
