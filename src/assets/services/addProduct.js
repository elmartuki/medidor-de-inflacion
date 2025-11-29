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

  try {
    const response = await fetch("http://localhost:3000/api/productos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    });

    const data = await response.json();

    if (response.ok) {
      

      if (onProductUpdate) {
        await onProductUpdate();
      }
    } else {
     
    }
  } catch (error) {
    console.error("Error al conectar con el servicor");
    alert("Error al conectar con el servidor");
  }
}
