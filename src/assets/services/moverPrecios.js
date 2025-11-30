export async function updatePriceHistory(onProductUpdate) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/productos/move-history",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
